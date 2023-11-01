import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";


/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "菜单名称为必填项", trigger: "blur" }],
  path: [{ required: true, message: "路径为必填项", trigger: "blur" }],
});

