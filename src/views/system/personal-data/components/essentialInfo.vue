<script setup lang="ts">
import { onMounted } from "vue";
import { useHook } from "../utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";
const { getUserInfo, userForm } = useHook();

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div>
    <el-form
      ref="formRef"
      :inline="false"
      label-position="left"
      :model="userForm"
      scroll-to-error
    >
      <el-form-item label="账户名：" class="" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入账户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="姓名：" class="" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="员工编号：" class="" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入员工编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="手机号：" class="" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入员工编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="邮箱：" class="" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入员工编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="部门：" class="" prop="username">
        <el-select
          v-model="userForm.username"
          placeholder="客户名称"
          clearable
          :suffix-icon="useRenderIcon(CaretBottom)"
        >
          <el-option label="老师" :value="2" />
          <el-option label="学员" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位：" class="" prop="username">
        <el-select
          v-model="userForm.username"
          placeholder="客户名称"
          clearable
          :suffix-icon="useRenderIcon(CaretBottom)"
        >
          <el-option label="老师" :value="2" />
          <el-option label="学员" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间：" class="" prop="username">
        <el-date-picker
          v-model="userForm.username"
          type="date"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          style="
            padding: 10px 40px 10px;
            --el-font-size-base: 16px;
            height: var(--el-component-size);
          "
          type="primary"
        >
          提交
        </el-button>
        <el-button
          style="
            padding: 10px 40px 10px;
            --el-font-size-base: 16px;
            height: var(--el-component-size) !important;
          "
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  width: 88px;
}
</style>
