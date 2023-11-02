import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import SingleSelect from "@/components/SingleSelect/index.vue";
export function useEditClue() {
  function handleChanges(event) {
    console.log("点击了下拉选项", event);
  }
    /* 表单编辑数据 */
  const editForm = reactive({
    project_name: "",//项目名称
    project_type: null,//项目类型
    customer_name: "",//客户名称
    project_stage: null,//项目阶段
    clue_desc:'',//线索描述
    project_budget: '',//项目预算
    notice_man:null,//通知人员
  });
  return {
    handleChanges,
    editForm,
    SingleSelect
  };
}
