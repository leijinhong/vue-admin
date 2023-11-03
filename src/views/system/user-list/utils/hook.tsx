import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getUserList } from "@/api/user";
import { usePublicHooks } from "../../hooks";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, h, toRaw, watch } from "vue";
import { cloneDeep, priceToThousands } from "@pureadmin/utils";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
import { useUserStoreHook } from "@/store/modules/userStore";
const { VITE_CONFIG_URL } = import.meta.env;

export function useHook() {
  const selectValue = ref("name");
  const { getList, setList, add, edit, del } = useUserStoreHook();

  /**
   * @description 搜索表单数据
   */
  const form = reactive({
    email: "",
    nickname: "",
    username: ""
  });
  /** 控制详情抽屉 */
  const drawer = ref(false);
  const formRef = ref();
  const dataList = ref<UserItemType[]>();
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const selectList = ref([]);
  const isSearch = ref(false);

  // 分页器配置
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

  // 会员列表表格内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
      // width: 50
    },
    {
      label: "用户编号",
      prop: "number",
      width: 120
    },
    {
      label: "账户名",
      prop: "username"
    },
    {
      label: "姓名",
      prop: "nickname"
    },
    {
      label: "职位",
      prop: "post"
    },
    {
      label: "角色",
      prop: "roles"
    },
    {
      label: "状态",
      prop: "status",
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size}
          loading={switchLoadMap.value[scope.index]?.loading}
          model-value={scope.row.status}
          active-value={1}
          inactive-value={2}
          active-text="启用"
          inactive-text="停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
          onClick={() => handleSwitchClick(scope as any)}
        />
      ),
      width: 100
    },
    {
      label: "电话",
      prop: "mobile",
      width: 180
    },
    {
      label: "邮箱",
      prop: "email",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 150
    }
  ];

  function onChange({ row, index }) {
    // row.status === 1 ? (row.status = 2) : (row.status = 1);
  }
  function handleSwitchClick({ row, index }) {
    // if (!filterBtn("/admin/user/edit")) {
    //   message("暂无权限", { type: "error" });
    //   return;
    // }

    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 1 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    ).then(() => {
      switchLoadMap.value[index] = Object.assign(
        {},
        switchLoadMap.value[index],
        {
          loading: true
        }
      );
      const copyRow = Object.assign({}, row);

      // getMemberList(copyRow).then(res => {
      let res: any = {};
      if (res.code == 0) {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: false
          }
        );
        row.status = copyRow.status;
        message(`已${row.status === 2 ? "停用" : "启用"}${row.name}`, {
          type: "success"
        });
      } else if (res.code == -1) {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: false
          }
        );
        message(res.msg, { type: "error" });
      }
      // });
    });
    // .catch(() => {
    //   row.status === 1 ? (row.status = 2) : (row.status = 1);
    // });
  }
  function handleDelete(row) {
    del(row.id).then(res => {
      if (res == 0) {
        message(`您删除了角色名称为${row.id}的这条数据`, { type: "success" });
        onSearch(pagination.currentPage);
      }
    });
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    // console.log(`current page: ${val}`);
    onSearch(val);
  }

  function handleSelectionChange(val) {
    selectList.value = val.map(i => i.id);
  }

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
  function openDialog(title = "新增", row = { role: 1, bm: 1 }) {
    addDialog({
      width: "70%",
      /* 自定义表头 */
      title: title + "角色",
      /* 自定义内容 */
      contentRenderer: () => h(editForm, { ref: formRef }),
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      props: {
        formInline: {
          higherDeptOptions: cloneDeep(dataList.value),
          ...row
        }
      },
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
            handleCB(options, index);
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
            handleCB(options, index);
          }
        }
      ]
    });

    function chores(options: DialogOptions, index: number) {
      message(`${title}成功`, { type: "success" });
      closeDialog(options, index);
      onSearch(); // 刷新表格数据
    }
    function handleCB(options: DialogOptions, index: number) {
      const FormRef = formRef.value.getRef();
      const curData = options.props.formInline;
      FormRef.validate(valid => {
        if (valid) {
          console.log("curData", curData);
          // 表单规则校验通过
          if (title === "新增") {
            add(curData).then(res => {
              if (res == 0) {
                chores(options, index);
              }
            });
          } else {
            edit(curData).then(res => {
              if (res == 0) {
                chores(options, index);
              }
            });
          }
        }
      });
    }
  }
  async function onSearch(page = 1, flag?: boolean) {
    loading.value = true;
    if (flag) {
      isSearch.value = true;
    }
    const searchDataFn = () => {
      return isSearch.value ? form : {};
    };

    const { data } = await getList(
      toRaw({
        limit: pagination.pageSize,
        page: page,
        ...searchDataFn()
      })
    );
    dataList.value = data.items;
    pagination.total = data.total || 0;
    pagination.currentPage = page;

    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    isSearch.value = false;
    formEl.resetFields();
    onSearch();
  };

  const exportCheckItem = () => {
    useExecl(columns, selectList.value);
  };
  return {
    selectValue,
    form,
    loading,
    columns,
    dataList,
    isSearch,
    pagination,
    drawer,
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
