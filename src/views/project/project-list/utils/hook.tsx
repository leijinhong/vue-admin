import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getProjectList } from "@/api/project";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { Close } from "@element-plus/icons-vue";
import {
  reactive,
  ref,
  onMounted,
  h,
  toRaw,
  computed,
  watch,
  watchEffect
} from "vue";
import { priceToThousands } from "@pureadmin/utils";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
const { VITE_CONFIG_URL } = import.meta.env;

export function useProject() {
  const selectValue = ref("name");

  /**
   * @description               搜索表单数据
   * @param project_name        项目名称
   * @param encode              项目编号
   * @param customer_id         客户名称即客户ID
   * @param customer_manager    客户经理即负责人ID
   * @param stage               项目阶段ID
   */
  const form = reactive({
    project_name: "",
    encode: "",
    customer_id: null,
    customer_manager: null,
    stage: null
  });
  /** 控制详情抽屉 */
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const selectList = ref([]);
  /* 分页器 */
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true,
    layout: "",
    pageSizes: [10, 20, 50, 100, 200]
  });
  watch(
    () => useAppStoreHook().device,
    n => {
      pagination.layout =
        n == "mobile"
          ? "prev,pager,next"
          : "total, sizes, prev, pager, next, jumper";
    },
    {
      immediate: true
    }
  );

  // 项目列表表格内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
      // width: 50
    },
    {
      label: "项目名称",
      prop: "project_name",
      cellRenderer: scope => <div>{scope.row.project_name}</div>
    },
    {
      label: "项目编号",
      prop: "encode",
      width: 175
    },

    {
      label: "客户名称",
      prop: "customer_name",
      width: 150
    },
    {
      label: "客户经理",
      prop: "customer_manager_name",
      width: 150
    },
    {
      label: "项目阶段",
      prop: "stage",
      width: 150,
      cellRenderer: scope => (
        <div>{scope.row.stage == 3 ? "销售线索" : "其他阶段"}</div>
      )
    },
    {
      label: "状态",
      prop: "status",
      cellRenderer: scope => (
        <div>{scope.row.status == 0 ? "待申请" : "非待申请"}</div>
      ),
      width: 100
    },
    {
      label: "创建时间",
      prop: "created_at",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];
  //删除
  function handleDelete(row) {
    message(`您删除了角色名称为${row.id}的这条数据`, { type: "success" });
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

  function handleSelectionChange(val) {
    selectList.value = val;
  }
  //删除提示
  const batchDel = () => {
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
  };

  //获取数据
  async function onSearch(page = 1) {
    loading.value = true;
    // const { is_vip, smrz, type } = form;
    const { data } = await getProjectList(
      toRaw({
        limit: pagination.pageSize,
        page: page,
        [selectValue.value]: form["keyword"]
      })
    );
    dataList.value = data.data;
    pagination.total = data.total || 0;
    pagination.currentPage = page;

    loading.value = false;
  }
  //重置表单
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  //导出表格
  const exportCheckItem = () => {
    useExecl(columns, selectList.value);
  };
  // 打开查看详情弹窗
  const openDialog = (str: String, VNode: String) => {
    addDialog({
      hideFooter: true,
      showClose: false,
      width: "calc(100% - 320px - 180px)",
      style: {
        marginRight: "90px",
        borderRadius: "10px",
        boxShadow: "2px 2px 16px 1px rgba(62, 62, 62, 0.12)"
      },
      class: "project-dialog",
      headerRenderer: ({ close, titleId, titleClass }) => (
        <div id={titleId} class={titleClass + " my-header"}>
          <div class="flex justify-between mb-5">
            <span style="color: #111" class="text-16 font-bold">
              {str}
            </span>
            <el-icon
              class="cursor-pointer"
              onClick={() => {
                close();
              }}
            >
              <Close style="width: 17px; height: 17px; color: #999" />
            </el-icon>
          </div>
          <hr style="color: #cccccc" />
        </div>
      ),
      contentRenderer: () => <div v-html={VNode}></div>
    });
  };

  return {
    selectValue,
    form,
    loading,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    exportCheckItem,
    batchDel,
    openDialog
  };
}
