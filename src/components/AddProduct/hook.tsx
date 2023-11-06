import SingleSelect from "@/components/SingleSelect/index.vue";
import { reactive, ref, toRaw, watch, onMounted } from "vue";
export function useAddProduct() {
  function handleChanges(event) {
    console.log("点击了下拉选项", event);
  }
  /* 表单编辑数据 */
  const editForm = reactive({
    product_name: "", //产品名称
    product_type: null, //产品类型
    customer_name: "", //客户名称
    product_stage: null, //产品阶段
    clue_desc: "", //线索描述
    product_budget: "", //产品预算
    notice_man: null //通知人员
  });

  return {
    handleChanges,
    SingleSelect,
    editForm
  };
}
