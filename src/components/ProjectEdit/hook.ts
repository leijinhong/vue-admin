import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import SingleSelect from "@/components/SingleSelect/index.vue";
export function useProjectEdit() {
  let activeName = ref("Lead");
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
  function handleChanges(event) {
    console.log("bbbbb", event);
  }
  /* 表单编辑数据 */
  const editForm = reactive({
    project_name: "",//项目名称
    project_type: null,//项目类型
    customer_name: "",//客户名称
    project_stage: null,//项目阶段
    project_scale: null,//项目规模
    project_budget: '',//项目预算
    projectEstimatedSigningDate:'',//项目预计签约日期
    customer_manager:null,//客户经理
    opportunity_desc:'',//商机描述
    product_list:[
      // {
      //   id:0,
      //   name:'服务器密码机',
      //   type:'SJJ631',
      //   number:3,
      //   unitPriceIncludingTax:400,
      //   transactionPriceIncludingTax:360,
      //   tax_rate:null,
      //   priceBeforeTax:'',
      //   notes:''
      // }
    ]
    
  });
  function getRef() {
    return editForm;
  }

  return {
    activeName,
    handleClick,
    handleChanges,
    editForm,
    getRef,
    SingleSelect
  };
}
