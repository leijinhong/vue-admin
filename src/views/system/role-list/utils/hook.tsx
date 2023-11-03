import { message } from "@/utils/message";
import { type PaginationProps } from "@pureadmin/table";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import editForm from "../form.vue";
import { getRoleList } from "@/api/role";
import { handleTree } from "@/utils/tree";
import { reactive, ref, onMounted, toRaw, h } from "vue";
import { useRoleStoreHook } from "@/store/modules/roleStore";
import { ElMessageBox } from "element-plus";
import { RoleType } from "./type";
import { cloneDeep } from "@pureadmin/utils";

export function useRole() {
  const { getList, add, edit, del } = useRoleStoreHook();
  /**
   * @description 搜索表单数据
   */
  const form = reactive({
    name: ""
  });
  /** 控制详情抽屉 */
  const dataList = ref<RoleType[]>([]);
  const loading = ref(true);
  const selectList = ref([]);
  const switchLoadMap = ref({});
  const formRef = ref();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 1000,
    currentPage: 1,
    background: true,
    layout: "",
    pageSizes: []
  });

  // 表格内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
      // width: 50
    },
    {
      label: "角色名称",
      prop: "name",
      align: "left",
      minWidth: 200
    },
    {
      label: "角色说明",
      prop: "desc",
      minWidth: 200
    },
    {
      label: "会员状态",
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
          style={{
            "--el-switch-off-color": "#e84749"
          }}
          onChange={() => onChange(scope as any)}
          onClick={() => handleSwitchClick(scope as any)}
        />
      ),
      width: 100
    },
    {
      label: "创建时间",
      prop: "created_at",
      width: 180
    },
    {
      label: "更新时间",
      prop: "updated_at",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
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
  function handleDelete(row: RoleType) {
    del(row.id).then(res => {
      if (res == 0) {
        message(`您删除了角色名称为${row.id}的这条数据`, { type: "success" });
        onSearch(form);
      }
    });
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

  async function onSearch(formData = { name: "" }) {
    loading.value = true;
    const { data } = await getList(
      toRaw({
        limit: pagination.pageSize,
        page: 1,
        name: formData.name
      })
    );
    dataList.value = handleTree(data.items, "id", "pid");
    pagination.total = data.total || 0;

    loading.value = false;
  }

  function openDialog(title = "新增", row?: RoleType) {
    addDialog({
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
      onSearch(form); // 刷新表格数据
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
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleDelete,
    handleSelectionChange,
    batchDel,
    openDialog
  };
}
