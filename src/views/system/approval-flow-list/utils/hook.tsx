import { message } from "@/utils/message";
import { getFlowPath } from "@/api/flowPath";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, toRaw, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
import { useFloePathStoreHook } from "@/store/modules/flowPath";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";
import { string } from "vue-types";

export function useHook() {
  const selectValue = ref("name");

  /** 控制详情抽屉 */
  const drawer = ref(false);
  const dataList = ref<FlowPathType[]>([]);
  const loading = ref(true);
  const selectList = ref([]);
  const eventList = useFloePathStoreHook().getEventList;

  /** 未选事件 */
  const unSelectedEvent = computed(() => {
    const events = dataList.value.map(i => i.event);
    return eventList.filter(item => !events.includes(item.value));
  });

  // 分页器配置
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 1000,
    currentPage: 1,
    background: true,
    layout: "",
    pageSizes: [10, 20, 50, 100, 200]
  });

  // 表格内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left",
      prop: "event"
      // width: 50
    },
    {
      label: "审批事件",
      prop: "event",
      cellRenderer: scope => (
        <>
          {scope.row.editing && typeof scope.row.event == "string" ? (
            <el-select
              placeholder="请选择审批事件"
              clearable
              suffix-icon={useRenderIcon(CaretBottom)}
              onChange={event => handleSelect(event, scope.row)}
            >
              {unSelectedEvent.value.map(i => (
                <el-option label={i.label} value={i.value} />
              ))}
            </el-select>
          ) : (
            <div>{eventList[scope.row.event].label}</div>
          )}
        </>
      ),
      width: 380
    },
    {
      label: "审批级别",
      prop: "level",
      width: 100
    },
    {
      label: "审核人",
      slot: "reviewed",
      minWidth: 300
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      prop: "event",
      width: 200
    }
  ];

  function handleAdd(row?: FlowPathType) {
    if (!row) {
      dataList.value.push({
        id: +new Date(),
        event: +new Date() + "",
        level: 1,
        reviewedBy: "",
        editing: true
      });
    } else {
      let index = dataList.value.findIndex(i => i.id == row.id);
      dataList.value.splice(index + 1, 0, {
        ...dataList.value[index],
        reviewedBy: ""
      });
    }
  }

  function handleSelect(event, row: FlowPathType) {
    console.log(event);

    dataList.value.forEach(i => {
      if (i.id == row.id) {
        i.event = event;
        i.editing = true;
      }
    });
  }

  function handleDelete(row: FlowPathType) {
    message(`您删除了id为${row.id}的这条数据`, { type: "success" });
    onSearch(pagination.currentPage);
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    onSearch(val);
  }

  function handleSelectionChange(val: FlowPathType[]) {
    selectList.value = val.map(i => i.id);
  }

  function batchDel() {
    if (selectList.value.length == 0) {
      message("请选择要删除的数据", { type: "warning" });
    } else {
      ElMessageBox.confirm(
        "选中数据id为" + selectList.value.join() + "，确认要删除这些数据吗？",
        "删除提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          handleDelete({ id: selectList.value.join() } as any);
        })
        .catch(() => {});
    }
  }

  async function onSearch(page = 1) {
    loading.value = true;
    const { data } = await getFlowPath(
      toRaw({
        limit: pagination.pageSize,
        page: page
      })
    );
    dataList.value = data.items
      .sort((a, b) => a.level - b.level)
      .sort((a, b) => (a.event as number) - (b.event as number));

    pagination.total = data.total || 0;
    pagination.currentPage = page;

    loading.value = false;
  }

  function exportCheckItem() {
    useExecl(columns, selectList.value);
  }

  function objectSpanMethod({
    column,
    rowIndex,
    columnIndex
  }: SpanMethodProps) {
    if (
      columnIndex === 0 ||
      columnIndex === 1 ||
      columnIndex == columns.length - 1
    ) {
      var spanArr = getSpanArr(dataList.value, column.property);
      const _row = spanArr[rowIndex]; //合并
      const _col = _row > 0 ? 1 : 0;

      return {
        rowspan: _row,
        colspan: _col
      };
    }
  }
  function getSpanArr(data: FlowPathType[], spanKey: string) {
    var spanArr = []; //合并数组
    var pos = 0; //位置
    for (var i = 0; i < data.length; i++) {
      if (i === 0) {
        spanArr.push(1);
        pos = 0;
      } else {
        if (data[i][spanKey] === data[i - 1][spanKey]) {
          // 判断当前元素与上一个元素是否相同
          spanArr[pos] += 1;
          spanArr.push(0);
        } else {
          spanArr.push(1);
          pos = i;
        }
      }
    }
    return spanArr;
  }
  return {
    selectValue,
    loading,
    columns,
    dataList,
    pagination,
    drawer,
    eventList,
    handleAdd,
    onSearch,
    handleDelete,
    objectSpanMethod,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    exportCheckItem,
    batchDel
  };
}
