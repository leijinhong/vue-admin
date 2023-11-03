<template>
  <div>
    <!-- 编辑销售线索的界面 -->
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
        <!-- 客户名称 -->
        <el-form-item label-width="22.08%" class="w-full" prop="customer_name">
          <template #label>
            <p style="height: 42px; line-height: 42px">客户名称：</p>
          </template>
          <SingleSelect
            v-model="editForm.customer_name"
            name="客户名称"
            class="w-full noRotate"
            filterable
            @change="handleChanges"
          />
        </el-form-item>
        <!-- 项目阶段 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_stage">
          <template #label>
            <p style="height: 42px; line-height: 42px">项目阶段：</p>
          </template>
          <SingleSelect
            v-model="editForm.project_stage"
            name="项目阶段"
            class="w-full"
            @change="handleChanges"
          />
        </el-form-item>
      </div>
      <!-- 线索描述 -->
      <el-form-item label-width="10.79%" class="w-full pr-5" prop="clue_desc">
        <template #label>
          <p>线索描述：</p>
        </template>
        <el-input
          v-model="editForm.clue_desc"
          :autosize="{ minRows: 4, maxRows: 4 }"
          type="textarea"
          placeholder="请输入线索描述"
        />
      </el-form-item>
      <!-- 项目预算 -->
      <el-form-item
        label-width="10.79%"
        class="w-full pr-5"
        prop="project_budget"
      >
        <template #label>
          <p style="height: 42px; line-height: 42px" class="whitespace-nowrap">
            项目预算<span class="text-sm">(单位:元)</span>：
          </p>
        </template>
        <el-input
          class=""
          style="height: 42px"
          placeholder="请输入项目预算"
          v-model="editForm.project_budget"
        ></el-input>
      </el-form-item>
      <!-- 通知人员 -->
      <el-form-item label-width="10.79%" class="w-full pr-5" prop="notice_man">
        <template #label>
          <p style="height: 42px; line-height: 42px">通知人员：</p>
        </template>
        <el-input
          class=""
          placeholder="这里应该是人员通知器,等待写组件...."
          style="height: 42px"
          v-model="editForm.notice_man"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditForm } from "./hook";
const { handleChanges, editForm, SingleSelect, formRef } = useEditForm();

defineExpose({ editForm, formRef });
</script>

<style lang="scss"></style>
