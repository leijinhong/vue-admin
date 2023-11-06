import editForm from "../../components/form.vue";
import { message } from "@/utils/message";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, h, toRaw, watch } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import { ElMessageBox } from "element-plus";
import { useAppStoreHook } from "@/store/modules/app";
import { getFilePublicList } from "@/api/document";

export function useHook() {
  /**
   * @description 搜索表单数据
   */
  const form = reactive({
    name: "",
    format: null
  });
  /** 控制详情抽屉 */
  const drawer = ref(false);
  const formRef = ref();
  const dataList = ref<FileType[]>();
  const loading = ref(true);
  const selectList = ref([]);
  const isSearch = ref(false);
  const selectValue = ref("name");
  const formatList = ["pdf", "doc", "docx", "rar", "zip"].map(
    (label, value) => ({
      label,
      value
    })
  );

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

  // 表格内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "名称",
      prop: "name",
      width: 120
    },
    {
      label: "文件格式",
      prop: "format"
    },
    {
      label: "文件大小",
      prop: "size"
    },
    {
      label: "创建时间",
      prop: "create_time"
    },
    {
      label: "修改时间",
      prop: "update_time"
    },
    {
      label: "创建人",
      prop: "nickname",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 150
    }
  ];

  function handleDelete(row: FileType) {
    getFilePublicList({ id: row.id }).then(res => {
      // if (res == 0) {
      message(`您删除了文件名为${row.name}的这条数据`, { type: "success" });
      onSearch(pagination.currentPage);
      // }
    });
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
    selectList.value = val.map(i => i.id);
  }

  const batchDel = () => {
    if (selectList.value.length == 0) {
      message("请选择要删除的数据", { type: "warning" });
    } else {
      ElMessageBox.confirm("确定要删除选择的数据吗？", "删除提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          handleDelete({ id: selectList.value.join() } as any);
        })
        .catch(() => {});
    }
  };
  function openDialog(title = "新增", row = { role: 1, bm: 1 }) {
    addDialog({
      /* 自定义表头 */
      title: title != "改名" ? title + "文件" : title,
      /* 自定义内容 */
      contentRenderer: () => h(editForm, { ref: formRef }),
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      width: "50%",
      props: {
        formInline: {
          title,
          higherDeptOptions: cloneDeep(dataList.value),
          ...row
        }
      },
      /* 自定义底部 */
      footerButtons: [
        {
          label: "取消",
          size: "large",
          style: {
            width: "152px"
          },
          btnClick: ({ dialog: { options, index }, button }) => {
            handleCB(options, index);
          }
        },
        {
          label: "确认",
          size: "large",
          style: {
            width: "152px"
          },
          type: "primary",
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
            getFilePublicList(curData).then(res => {
              // if (res == 0) {
              chores(options, index);
              // }
            });
          } else {
            getFilePublicList(curData).then(res => {
              // if (res == 0) {
              chores(options, index);
              // }
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

    const { data } = await getFilePublicList(
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

  return {
    selectValue,
    form,
    loading,
    columns,
    dataList,
    isSearch,
    pagination,
    drawer,
    formatList,
    onSearch,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    batchDel,
    openDialog
  };
}
