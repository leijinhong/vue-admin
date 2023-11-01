import { message } from "@/utils/message";
import { getProjectList } from "@/api/project";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { Close } from "@element-plus/icons-vue";
//引入编辑项目页面
import ProjectEdit from "@/components/ProjectEdit/index.vue";

import { reactive, ref, h, toRaw, watch } from "vue";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
const { VITE_CONFIG_URL } = import.meta.env;

export function useProject() {
  const formRef = ref();
  const selectValue = ref("name");
  /**
   * @description               搜索表单数据
   * @param project_name        项目名称
   * @param encode              项目编号
   * @param customer_id         客户名称即客户ID
   * @param customer_manager    客户经理即负责人ID
   * @param stage               项目阶段ID
   */
  /** 列表页的筛选表单 */
  const form = reactive({
    project_name: "",
    encode: "",
    customer_id: null,
    customer_manager: null,
    stage: null
  });
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const selectList = ref([]);
  /** 分页器 */
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

  // 项目列表表头与对应的内容
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
  // XX条/页变化
  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    onSearch();
  }
  //当前页变化
  function handleCurrentChange(val: number) {
    onSearch(val);
  }
  //当选择项发生变化时会触发该事件
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
    dataList.value = data.items;
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
  // 打开弹窗,传入对应的组件
  const openDialog = (str: string, VNode: any) => {
    alAddDialog(str, VNode, {}, res => {
      console.log(res);
    });
  };
  function alAddDialog(
    str: string,
    VNode: any,
    options: DialogOptions,
    cb: Function
  ) {
    addDialog({
      // showClose: false,
      width: "calc(100% - 320px - 180px)",
      /* 自定义表头 */
      title: str,
      /* 自定义内容 */
      contentRenderer: () => <VNode ref={formRef}></VNode>,
      /* 自定义底部 */
      footerButtons: [
        {
          label: "提交",
          size: "large",
          style: {
            width: "192px"
          },
          type: "primary",
          btnClick: ({ dialog: { options, index }, button }) => {
            console.log(options, index, button);
            cb(1);
            closeDialog(options, index);
          }
        },

        {
          label: "保存后继续编辑",
          size: "large",
          type: "primary",
          style: {
            width: "192px"
          },
          btnClick: ({ dialog: { options, index }, button }) => {
            console.log(options, index, button);
            cb(1);
            closeDialog(options, index);
          }
        },

        {
          label: "重置",
          size: "large",
          type: "danger",
          style: {
            width: "112px",
            background: "#fff",
            color: "#F33D3D"
          },
          btnClick: ({ dialog: { options, index }, button }) => {
            console.log(options, index, button);
            cb(1);
            closeDialog(options, index);
          }
        }
      ],
      ...options
    });
  }
  function handleClose({ options, index }) {
    console.log(formRef.value.getRef());
    closeDialog(options, index);
  }
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
    openDialog,
    formRef
  };
}
