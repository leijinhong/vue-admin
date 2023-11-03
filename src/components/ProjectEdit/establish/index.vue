<template>
  <div style="height: 450px; overflow: hidden; overflow-y: auto" class="scroll">
    <!-- 编辑 项目立项 的界面 -->
    <el-form label-position="left" ref="formRef" :model="editForm">
      <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
        <!-- 项目名称 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_name">
          <template #label>
            <p style="height: 42px; line-height: 42px">项目名称：</p>
          </template>
          <el-input
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
        <!-- 项目规模 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_scale">
          <template #label>
            <p style="height: 42px; line-height: 42px">项目规模：</p>
          </template>
          <SingleSelect
            v-model="editForm.project_scale"
            name="项目规模"
            class="w-full"
            @change="handleChanges"
          />
        </el-form-item>
        <!-- 项目预算 -->
        <el-form-item label-width="22.08%" class="w-full" prop="project_budget">
          <template #label>
            <p
              style="height: 42px; line-height: 42px"
              class="whitespace-nowrap"
            >
              项目预算<span class="text-sm">(单位:元)：</span>
            </p>
          </template>
          <el-input
            placeholder="请输入预算"
            style="height: 42px"
            v-model="editForm.project_budget"
          ></el-input>
        </el-form-item>
        <!-- 预计签约日期 -->
        <el-form-item
          label-width="22.08%"
          class="w-full"
          prop="projectEstimatedSigningDate"
        >
          <template #label>
            <p style="height: 42px; line-height: 42px">预计签约日期：</p>
          </template>
          <el-date-picker
            v-model="editForm.projectEstimatedSigningDate"
            style="height: 42px; width: 100%"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <!-- 客户经理 -->
        <el-form-item
          label-width="22.08%"
          class="w-full"
          prop="customer_manager"
        >
          <template #label>
            <p style="height: 42px; line-height: 42px">客户经理：</p>
          </template>
          <el-input
            v-model="editForm.customer_manager"
            class=""
            placeholder="默认填单人姓名【应为人员选择器......】"
            style="height: 42px"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 项目描述 -->
      <el-form-item
        label-width="10.79%"
        class="w-full pr-5"
        prop="project_desc"
      >
        <template #label>
          <p>项目描述：</p>
        </template>
        <el-input
          v-model="editForm.project_desc"
          :autosize="{ minRows: 4, maxRows: 4 }"
          type="textarea"
          placeholder="请输入项目描述"
        />
      </el-form-item>
      <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
        <!-- 运作方式 -->
        <el-form-item label-width="22.08%" class="w-full" prop="operation_mode">
          <template #label>
            <p style="height: 42px; line-height: 42px">运作方式：</p>
          </template>
          <SingleSelect
            v-model="editForm.operation_mode"
            name="运作方式"
            class="w-full"
            @change="handleChanges"
          />
        </el-form-item>
        <!-- 项目经理 -->
        <el-form-item
          label-width="22.08%"
          class="w-full"
          prop="project_manager"
        >
          <template #label>
            <p style="height: 42px; line-height: 42px">项目经理：</p>
          </template>
          <el-input
            v-model="editForm.project_manager"
            class=""
            placeholder="默认填单人姓名【应为人员选择器......】"
            style="height: 42px"
          ></el-input>
        </el-form-item>
        <!-- 解决方案经理 -->
        <el-form-item
          label-width="22.08%"
          class="w-full"
          prop="solution_manager"
        >
          <template #label>
            <p style="height: 42px; line-height: 42px">解决方案经理：</p>
          </template>
          <el-input
            v-model="editForm.solution_manager"
            class=""
            placeholder="默认填单人姓名【应为人员选择器......】"
            style="height: 42px"
          ></el-input>
        </el-form-item>
        <!-- 现场工程师 -->
        <el-form-item label-width="22.08%" class="w-full" prop="field_engineer">
          <template #label>
            <p style="height: 42px; line-height: 42px">现场工程师：</p>
          </template>
          <el-input
            v-model="editForm.field_engineer"
            class=""
            placeholder="默认填单人姓名【应为人员选择器......】"
            style="height: 42px"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 项目组成成员 -->
      <el-form-item
        label-width="10.79%"
        class="w-full pr-5"
        prop="project_team_members"
      >
        <template #label>
          <p style="height: 42px; line-height: 42px">项目组成成员：</p>
        </template>
        <el-input
          style="height: 42px"
          v-model="editForm.project_team_members"
          placeholder="请输入项目组成成员【应为多选的人员选择器】"
        />
      </el-form-item>
      <!-- 产品列表表格 -->
      <div class="mb-5">
        <pure-table
          align-whole="center"
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          stripe
          showOverflowTooltip
          :data="editForm.product_list"
          :columns="columns"
        >
          <template #unitPrice>含税单价<br />(单位：元)</template>
          <template #finalPrice>含税成交价<br />(单位：元)</template>
          <template #untaxedPrice>未税价<br />(单位：元)</template>
          <template #operation="{ row }">
            <span style="color: red">删除</span>
          </template>
        </pure-table>
        <div class="flex gap-3 mt-5">
          <el-button
            style="
              padding: 10px 20px 10px 10px;
              --el-font-size-base: 16px;
              height: var(--el-component-size);
            "
            type="primary"
            :icon="useRenderIcon(AddFill)"
          >
            添加
          </el-button>
          <el-button
            style="
              padding: 10px 20px 10px 10px;
              --el-font-size-base: 16px;
              height: var(--el-component-size);
            "
            type="danger"
            :icon="useRenderIcon(Delete)"
          >
            删除
          </el-button>
        </div>
      </div>
      <!-- 通知人员 -->
      <el-form-item label-width="10.79%" class="w-full pr-5" prop="notice_man">
        <template #label>
          <p style="height: 42px; line-height: 42px">通知人员：</p>
        </template>
        <el-input
          style="height: 42px"
          v-model="editForm.notice_man"
          placeholder="请输入通知人员【应为多选的人员选择器】"
        />
      </el-form-item>
      <!-- 上传附件 -->
      <el-form-item label-width="10.79%" class="w-full pr-5" prop="notice_man">
        <template #label>
          <p style="height: 42px; line-height: 42px">上传附件：</p>
        </template>
        <el-button class="mr-2.5" style="height: 42px" plain :icon="Upload">
          选择附件
        </el-button>
        *支持格式：.pdf .doc .docx .rar .zip .svg .sng .jpg 单个文件不超过20M
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditForm } from "./hook";
const {
  handleChanges,
  editForm,
  SingleSelect,
  formRef,
  Upload,
  columns,
  useRenderIcon,
  AddFill,
  Delete
} = useEditForm();
defineExpose({ editForm, formRef });
</script>

<style lang="scss" scoped>
.scroll {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
