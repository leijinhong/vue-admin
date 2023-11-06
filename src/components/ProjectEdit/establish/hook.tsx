import { ref, reactive, computed } from "vue";
import SingleSelect from "@/components/SingleSelect/index.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { Upload } from "@element-plus/icons-vue";
import AddProduct from "@/components/AddProduct/index.vue";
import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
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
        product_name: "服务器密码机1",
        product_model: "SJJ631",
        number: 3,
        unit_price: 400,
        final_price: 360,
        tax_rate: null,
        get untaxed_price() {
          const item = editForm.product_list.find(item => item.id === 0);
          if (item) {
            return item.tax_rate !== null ? item.tax_rate * 200 : null;
          }
          return null;
        },
        soft_title: "服务器密码机软件V4.0",
        notes: ""
      },
      {
        id: 1,
        product_name: "服务器密码机2",
        product_model: "SJJ632",
        number: 3,
        unit_price: 500,
        final_price: 660,
        tax_rate: null,
        get untaxed_price() {
          const item = editForm.product_list.find(item => item.id === 1);
          if (item) {
            return item.tax_rate !== null ? item.tax_rate * 400 : null;
          }
          return null;
        },
        soft_title: "服务器密码机软件V4.1",
        notes: ""
      }
    ],
    //税率选择列表
    tax_rate_list: [
      {
        label: "3%",
        value: 0
      },
      {
        label: "6%",
        value: 1
      },
      {
        label: "9%",
        value: 2
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
    //遍历editForm.tax_rate_list
    {
      label: "税率",
      prop: "tax_rate",
      cellRenderer: ({ row, index }) => (
        <div class="align-center" style="width:100px">
          <el-select v-model={row.tax_rate}>
            {editForm.tax_rate_list.map(item => (
              <el-option
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </el-select>
        </div>
      )
    },
    //
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
  /* 打开添加产品的弹窗 */
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
      contentRenderer: () => <VNode></VNode>,
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
  const btnCallBack = (options, index, button) => {
    console.log("options", options);
    console.log("index", index);
    console.log("button", button);
    closeDialog(options, index);
  };
  /* 新增产品 */
  const addProduct = () => {
    const newProductId = editForm.product_list.length; // 创建一个新的产品ID
    const newProduct = {
      id: newProductId,
      product_name: "",
      product_model: "",
      number: 1,
      unit_price: 0,
      final_price: 0,
      tax_rate: null,

      get untaxed_price() {
        const item = editForm.product_list.find(
          item => item.id === newProductId
        );
        if (item) {
          return item.tax_rate !== null ? item.tax_rate * 200 : null;
        }
        return null;
      },
      soft_title: "",
      notes: ""
    };
    editForm.product_list.push(newProduct); // 将新产品对象添加到列表
  };

  // 删除产品

  return {
    handleChanges,
    editForm,
    SingleSelect,
    formRef,
    Upload,
    columns,
    useRenderIcon,
    AddFill,
    Delete,
    addProduct,
    openDialog,
    AddProduct
  };
}
