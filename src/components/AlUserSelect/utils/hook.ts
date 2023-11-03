import { reactive, ref, h, toRaw, watch } from "vue";
import { type PaginationProps } from "@pureadmin/table";
import { useUserStoreHook } from "@/store/modules/userStore";
import { useAppStoreHook } from "@/store/modules/app";
function useHook() {
  const { getList } = useUserStoreHook();
  const dataList = ref<UserItemType[]>();
  const loading = ref(true);
  const isSearch = ref(false);

  const form = reactive({
    email: "",
    nickname: "",
    username: ""
  });
  // 列表表格内容
  const columns: TableColumnList = [
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
      label: "电话",
      prop: "mobile",
      width: 180
    },
    {
      label: "邮箱",
      prop: "email",
      width: 180
    }
  ];
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
  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    // console.log(`current page: ${val}`);
    onSearch(val);
  }
  const resetForm = formEl => {
    if (!formEl) return;
    isSearch.value = false;
    formEl.resetFields();
    onSearch();
  };
  return {
    form,
    columns,
    dataList,
    loading,
    pagination,
    onSearch,
    handleSizeChange,
    handleCurrentChange,
    resetForm
  };
}
export default useHook;
