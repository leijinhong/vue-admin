import { ref, reactive } from "vue";
import SingleSelect from "@/components/SingleSelect/index.vue";
import { Upload } from '@element-plus/icons-vue'
export function useEditForm() {
  function handleChanges(event) {
    console.log("点击了下拉选项", event);
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
    project_desc:'',//项目描述
    operation_mode: null,//运作方式
    project_manager:null,//项目经理
    solution_manager:null,//解决方案经理
    field_engineer:null,//现场工程师
    project_team_members:null,//项目组成成员
    notice_man:null,//通知人员
    //添加的产品
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
    ],
    upload_list:[]//上传的附件

  });
  let formRef= ref();
  return {
    handleChanges,
    editForm,
    SingleSelect,
    formRef,
    Upload
  };
}
