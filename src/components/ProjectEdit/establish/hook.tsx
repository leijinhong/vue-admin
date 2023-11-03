import { ref, reactive } from "vue";
import SingleSelect from "@/components/SingleSelect/index.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { Upload } from "@element-plus/icons-vue";

export function useEditForm() {
  function handleChanges(event) {
    console.log("点击了下拉选项", event);
  }
  /* 表单编辑数据 */
  const editForm = reactive({
    project_name: "", //项目名称
    project_type: null, //项目类型
    customer_name: "", //客户名称
    project_stage: null, //项目阶段
    project_scale: null, //项目规模
    project_budget: "", //项目预算
    projectEstimatedSigningDate: "", //项目预计签约日期
    customer_manager: null, //客户经理
    project_desc: "", //项目描述
    operation_mode: null, //运作方式
    project_manager: null, //项目经理
    solution_manager: null, //解决方案经理
    field_engineer: null, //现场工程师
    project_team_members: null, //项目组成成员
    notice_man: null, //通知人员
    //添加的产品
    product_list: [
      {
        id: 0,
        product_name: "服务器密码机",
        product_model: "SJJ631",
        number: 3,
        unit_price: 400,
        final_price: 360,
        tax_rate: null,
        untaxed_price: "",
        soft_title: "服务器密码机软件V4.0",
        notes: ""
      }
    ],
    upload_list: [] //上传的附件
  });
  // 项目列表表头与对应的内容
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "产品名称",
      prop: "product_name"
    },
    {
      label: "产品型号",
      prop: "product_model"
    },
    {
      label: "数量",
      prop: "number"
    },
    {
      headerSlot: "unitPrice",
      prop: "unit_price"
    },
    {
      headerSlot: "finalPrice",
      prop: "final_price"
    },
    {
      label: "税率",
      prop: "tax_rate"
    },
    {
      headerSlot: "untaxedPrice",
      prop: "untaxed_price"
    },
    {
      label: "软著名称",
      prop: "soft_title"
    },
    {
      label: "备注",
      prop: "notes",
      cellRenderer: ({ row, index }) => (
        <div class="align-center" style="width:100px">
          <input
            style="outline:none;background:transparent;width:100px;text-align:center;"
            placeholder="点击编辑备注"
            v-model={row.notes}
          />
        </div>
      )
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];
  let formRef = ref();
  return {
    handleChanges,
    editForm,
    SingleSelect,
    formRef,
    Upload,
    columns,
    useRenderIcon,
    AddFill,
    Delete
  };
}
