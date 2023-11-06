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
        <el-form-item label="姓名" prop="nickname">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入姓名"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="员工编号" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入员工编号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="部门" prop="bm">
          <al-organization-select
            v-model="newFormInline.bm"
          ></al-organization-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="性别" prop="sex">
          <el-select
            class="!w-full"
            v-model="newFormInline.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="职位" prop="bm">
          <al-organization-select
            v-model="newFormInline.bm"
          ></al-organization-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色" prop="role">
          <al-role-select v-model="newFormInline.role"></al-role-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="账户名">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入角色描述"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="密码">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="默认账号名+后缀（123456）"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="手机号">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入手机号"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="入职时间">
          <el-date-picker
            class="!w-full"
            v-model="newFormInline.time"
            type="date"
            placeholder="请选择入职时间"
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
    </el-row>
  </el-form>
</template>
