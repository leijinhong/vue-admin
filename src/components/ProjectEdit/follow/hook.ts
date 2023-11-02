import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import SingleSelect from "@/components/SingleSelect/index.vue";
export function useEditFollow() {
  function handleChanges(event) {
    console.log("点击了下拉选项", event);
  }
    /* 表单编辑数据 */
  const editForm = reactive({
    project_name: "",//项目名称
    project_type: null,//项目类型
  });
  return {
    handleChanges,
    editForm,
    SingleSelect
  };
}
