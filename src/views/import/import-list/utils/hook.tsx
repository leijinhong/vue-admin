import { message } from "@/utils/message";
import { type PaginationProps } from "@pureadmin/table";
import { useUserStoreHook } from "@/store/modules/userStore";
import { reactive, ref, h, toRaw, watch } from "vue";
import { cloneDeep } from "@pureadmin/utils";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
import { getImportList } from "@/api/importExport";
import { IEItemType } from "@/views/export/export-list/utils/type";

export function useHook() {
  const { getList } = useUserStoreHook();

  /**
   * @description 搜索表单数据
   */
  const form = reactive({
    nickname: "",
    role: -1,
    time: 0
  });
  /** 控制详情抽屉 */
  const drawer = ref(false);
  const dataList = ref<IEItemType[]>();
  const loading = ref(true);
  const selectList = ref([]);
  const isSearch = ref(false);
  const selectValue = ref("name");
  const userList = ref<UserItemType[]>([]);

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
      // width: 50
    },
    {
      label: "数据类型",
      prop: "type"
    },
    {
      label: "数据条数",
      prop: "total"
    },
    {
      label: "导入时间",
      prop: "create_time"
    },
    {
      label: "创建人",
      prop: "nickname"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 150
    }
  ];

  function handleDelete(row: IEItemType) {
    getImportList({ id: row.id }).then(res => {
      // if (res == 0) {
      message(`您删除了数据类型为${row.type}的这条数据`, { type: "success" });
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
  async function onSearch(page = 1, flag?: boolean) {
    loading.value = true;
    if (flag) {
      isSearch.value = true;
    }
    const searchDataFn = () => {
      return isSearch.value ? form : {};
    };
    console.log(searchDataFn());

    const { data } = await getImportList(
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

  async function getUserList() {
    const { data } = await getList({
      limit: 1000
    });
    userList.value = data.items;
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
    userList,
    getUserList,
    onSearch,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    exportCheckItem,
    batchDel
  };
}
