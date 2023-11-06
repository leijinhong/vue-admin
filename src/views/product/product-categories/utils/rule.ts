import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  pid: [{ required: true, message: "父级元素为必选项", trigger: "blur" }],
  name: [{ required: true, message: "产品名称为必填项", trigger: "blur" }]
});
