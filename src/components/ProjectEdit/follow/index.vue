<template>
  <div>
    <!-- 编辑 项目跟进 的界面 -->
    <el-form label-position="left" ref="formRef" :model="editForm">
      <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
        <!-- 项目名称 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_name">
          <template #label>
            <p style="height: 42px; line-height: 42px">项目名称：</p>
          </template>
          <el-input
            class=""
            style="height: 42px"
            placeholder="请输入项目名称"
            v-model="editForm.project_name"
          ></el-input>
        </el-form-item>
        <!-- 项目类型 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_type">
          <template #label>
            <p style="height: 42px; line-height: 42px">项目类型：</p>
          </template>
          <SingleSelect
            v-model="editForm.project_type"
            name="项目类型"
            class="w-full"
            @change="handleChanges"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditForm } from "./hook";
const { handleChanges, editForm, SingleSelect, formRef } = useEditForm();
defineExpose({ editForm, formRef });
</script>

<style lang="scss" scoped></style>
