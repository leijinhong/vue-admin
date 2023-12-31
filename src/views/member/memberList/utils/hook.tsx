import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getMemberList } from "@/api/member";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
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
import { priceToThousands } from "@pureadmin/utils";
import { ElMessageBox } from "element-plus";
import useExecl from "@/hooks/useExecl";
import { useAppStoreHook } from "@/store/modules/app";
const { VITE_CONFIG_URL } = import.meta.env;

export function useHook() {
  const selectValue = ref("name");

  /**
   * @description 搜索表单数据
   * @param is_vip              是否vip会员
   * @param type                会员类型
   * @param smrz                是否实名认证
   * @param phone               手机 phone/会员编号code/名称name 搜索
   * @param code
   * @param name
   */
  const form = reactive({
    is_vip: null,
    type: null,
    smrz: null,
    keyword: ""
  });
  /** 控制详情抽屉 */
  const drawer = ref(false);
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const selectList = ref([]);

  // 分页器配置
  // const pageLayout = computed(() => {
  //   return useAppStoreHook().device == "mobile"
  //     ? "prev,pager,next"
  //     : "total, sizes, prev, pager, next, jumper";
  // });
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
      label: "会员状态",
      prop: "status",
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size}
          loading={switchLoadMap.value[scope.index]?.loading}
          model-value={scope.row.status}
          active-value={1}
          inactive-value={2}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
          onClick={() => handleSwitchClick(scope as any)}
        />
      ),
      width: 100
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
      delete copyRow.area_str;
      delete copyRow.idcard;
      delete copyRow.realname;
      delete copyRow.register_time;
      delete copyRow.smrz;
      delete copyRow.update_time;
      var url = row.avatar;
      var domain = url.split("/upload")[0]; // 获取域名部分
      copyRow.avatar = url.replace(domain, ""); // 用空字符串替换域名部分
      copyRow.status = row.status == 1 ? 2 : 1;

      getMemberList(copyRow).then(res => {
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
      });
    });
    // .catch(() => {
    //   row.status === 1 ? (row.status = 2) : (row.status = 1);
    // });
  }
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
    const { is_vip, smrz, type } = form;
    const { data } = await getMemberList(
      toRaw({
        limit: pagination.pageSize,
        page: page,
        is_vip,
        smrz,
        type,
        [selectValue.value]: form["keyword"]
      })
    );
    dataList.value = data.items;
    pagination.total = data.total || 0;
    pagination.currentPage = page;

    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl);

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
    batchDel
  };
}
