import { message } from "@/utils/message";
import { getProjectList } from "@/api/project";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, toRaw, watch, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
import ProjectDetail from "@/components/ProjectDetail/index.vue";
import ProjectEdit from "@/components/ProjectEdit/index.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";
import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { PureTableBar } from "@/components/RePureTableBar";
export function useProjectList() {
  const selectValue = ref("name");
  const searchForm = ref();
  const editDialog = ref();
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
  /** 列表页的数据 */
  const dataList = ref([]);
  const loading = ref(true);
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
  //筛选的重置表单
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  //导出表格
  const exportCheckItem = () => {
    useExecl(columns, selectList.value);
  };
  /* 进入弹窗的时候,告诉子组件, 该项目是什么阶段
    销售线索:1
    销售商机:2
    销售立项:3
  */
  let step = 3;
  // 打开弹窗,传入对应的组件
  const openDialog = (
    str: string,
    VNode: any,
    options: DialogOptions,
    cb: Function
  ) => {
    addDialog({
      width: "73.95%",
      title: str,
      /* 自定义内容 */
      contentRenderer: () => <VNode step={step} ref={editDialog}></VNode>,
      footerButtons: [
        {
          label: "提交",
          size: "large",
          style: {
            width: "192px"
          },
          type: "primary",
          btnClick: ({ dialog: { options, index }, button }) => {
            btnCallBack(options, index, button);
          }
        },

        {
          label: "保存后继续编辑",
          size: "large",
          type: "primary",
          style: {
            width: "192px",
            marginLeft: "40px",
            marginRight: "40px"
          },
          btnClick: ({ dialog: { options, index }, button }) => {
            btnCallBack(options, index, button);
          }
        },

        {
          label: "重置",
          size: "large",
          type: "danger",
          style: {
            width: "112px",
            background: "#fff",
            color: "#F33D3D",
            marginLeft: "0px"
          },
          btnClick: ({ dialog: { options, index }, button }) => {
            btnCallBack(options, index, button);
          }
        }
      ],
      ...options
    });
  };

  const btnCallBack = async (options, index, button) => {
    console.log("options", options);
    console.log("index", index);
    console.log("button", button);
    let projectDialog = editDialog.value;
    let activeName = projectDialog.activeName;
    let editForm = projectDialog[activeName].editForm;
    let editFormRef = projectDialog[activeName].formRef;
    let flagClose = false;
    //根据step和activeName和button的label来执行对应的功能
    var actionMap = [
      [
        () =>
          [1, 2, 3].includes(step) &&
          activeName === "clueComponent" &&
          button.btn.label === "提交",
        () => {
          console.log("执行编辑项目中【销售线索】的提交方法");
          return new Promise(resolve => {
            setTimeout(() => {
              flagClose = true;
              resolve(null);
            }, 2000);
          });
        }
      ],
      [
        () =>
          [1, 2, 3].includes(step) &&
          activeName === "clueComponent" &&
          button.btn.label === "保存后继续编辑",
        () => console.log("执行编辑项目中【销售线索】的保存后继续编辑方法")
      ],
      [
        () =>
          [1, 2, 3].includes(step) &&
          activeName === "followComponent" &&
          button.btn.label === "提交",
        () => {
          console.log("执行编辑项目中【项目跟进】的提交方法");
          return new Promise(resolve => {
            setTimeout(() => {
              flagClose = true;
              resolve(null);
            }, 2000);
          });
        }
      ],
      [
        () =>
          [1, 2, 3].includes(step) &&
          activeName === "followComponent" &&
          button.btn.label === "保存后继续编辑",
        () => console.log("执行编辑项目中【项目跟进】的保存后继续编辑方法")
      ],
      [
        () =>
          [3].includes(step) &&
          activeName === "establishComponent" &&
          button.btn.label === "提交",
        () => {
          console.log("执行编辑项目中【项目立项】的提交方法");
          return new Promise(resolve => {
            setTimeout(() => {
              flagClose = true;
              resolve(null);
            }, 2000);
          });
        }
      ],
      [
        () =>
          [3].includes(step) &&
          activeName === "establishComponent" &&
          button.btn.label === "保存后继续编辑",
        () => console.log("执行编辑项目中【项目立项】的保存后继续编辑方法")
      ]
    ];

    const targetAction = actionMap.find(action => action[0]());
    if (targetAction) {
      await targetAction[1]();
    } else {
      console.log("重置编辑项目中的当前表单");
      editFormRef.resetFields();
    }
    console.log("activeName,", activeName);
    console.log("editForm,", editForm);
    if (flagClose) {
      // console.log("执行关闭弹窗");
      closeDialog(options, index);
    }
  };

  return {
    selectValue,
    searchForm,
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    exportCheckItem,
    openDialog,
    ProjectDetail,
    ProjectEdit,
    useRenderIcon,
    CaretBottom,
    Delete,
    Search,
    Refresh,
    AddFill,
    PureTableBar,
    ref
  };
}
