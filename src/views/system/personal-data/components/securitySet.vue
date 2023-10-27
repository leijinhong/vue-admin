<script setup lang="ts">
import { useHook } from "../utils/hook";
const { securityForm } = useHook();
</script>
<template>
  <div>
    <el-form
      ref="formRef"
      :inline="false"
      label-position="left"
      :model="securityForm"
      scroll-to-error
    >
      <el-form-item label="原始密码：" class="" prop="password">
        <el-input
          v-model="securityForm.password"
          placeholder="请输入原始密码"
          clearable
        />
      </el-form-item>
      <el-form-item label="新密码：" class="" prop="password">
        <el-input
          v-model="securityForm.password"
          placeholder="请输入新密码"
          clearable
        />
      </el-form-item>
      <el-form-item label="确认密码：" class="" prop="password">
        <el-input
          v-model="securityForm.password"
          placeholder="请输入确认密码"
          clearable
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
