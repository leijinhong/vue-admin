import { message } from "@/utils/message";
import { getMemberList } from "@/api/member";
import { type PaginationProps } from "@pureadmin/table";
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
import { ElMessageBox } from "element-plus";
import { useAppStoreHook } from "@/store/modules/app";

export function useRole() {
  /**
   * @description 搜索表单数据
   */
  const form = reactive({
    type: null,
    keyword: ""
  });
  /** 控制详情抽屉 */
  const dataList = ref([]);
  const loading = ref(true);
  const selectList = ref([]);

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
      label: "会员编号",
      prop: "id",
      width: 120
    },
    {
      label: "昵称",
      prop: "name",
      cellRenderer: scope => <div>{scope.row.name || scope.row.nickname}</div>
    },
    {
      label: "手机号码",
      prop: "phone",
      width: 150
    },
    {
      label: "所在地区",
      prop: "resumeInfo.site"
    },
    {
      label: "会员类型",
      prop: "type",
      cellRenderer: scope => <div>{scope.row.type}</div>
    },
    {
      label: "VIP会员",
      prop: "is_vip",
      cellRenderer: scope => <div>{scope.row.is_vip == 1 ? "是" : "否"}</div>
    },
    {
      label: "注册时间",
      prop: "registerTime",
      width: 180
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 150
    }
  ];

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
    // console.log(`current page: ${val}`);
    onSearch(val);
  }

  function handleSelectionChange(val) {
    selectList.value = val;
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

  async function onSearch(page = 1) {
    loading.value = true;
    const { data } = await getMemberList(
      toRaw({
        limit: pagination.pageSize,
        page: page,
        [form.type]: form["keyword"]
      })
    );
    dataList.value = data.items;
    pagination.total = data.total || 0;
    pagination.currentPage = page;

    loading.value = false;
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
    // buttonClass,
    onSearch,
    resetForm,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    batchDel
  };
}
