<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { usePublicHooks } from "../hooks";
import AlRoleSelect from "@/components/AlRoleSelect";
import AlOrganizationSelect from "@/components/AlOrganizationSelect";

interface FormType {
  nickname: string;
  code: string;
  post: string;
  status: 1 | 2;
  role: number;
  bm: number;
  sex: 1 | 2;
  time: number;
}
interface FormPropsType<T = any> {
  formInline: T;
}
const props = withDefaults(defineProps<FormPropsType<FormType>>(), {
  formInline: () => ({
    nickname: "",
    code: "",
    post: "",
    status: 1,
    role: 1,
    bm: 1,
    sex: 1,
    time: 0
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    class="mt-4"
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="事件名称" prop="nickname">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入事件名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="标准工时" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入标准工时"
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入备注"
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="状态">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="1"
            :inactive-value="2"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="创建人">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入备注"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
