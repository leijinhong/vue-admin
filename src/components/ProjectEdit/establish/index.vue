<template>
  <div>
    <!-- 销售线索 -->
    <el-tabs
      v-model="activeName"
      class="project-edit-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="销售线索" name="clue">
        <el-form label-position="left">
          <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
            <!-- 项目名称 -->
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">项目名称：</p>
              </template>
              <el-input
                class=""
                style="height: 42px"
                v-model="editForm.project_name"
              ></el-input>
            </el-form-item>
            <!-- 项目类型 -->
            <el-form-item label-width="22.08%" class="w-full">
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
            <el-form-item label-width="22.08%" class="w-full">
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
            <el-form-item label-width="22.08%" class="w-full">
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
            <el-form-item label-width="22.08%" class="w-full">
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
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">
                  项目预算(单位:元)：
                </p>
              </template>
              <el-input
                class=""
                style="height: 42px"
                v-model="editForm.project_budget"
              ></el-input>
            </el-form-item>
            <!-- 预计签约日期 -->
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">预计签约日期：</p>
              </template>
              <el-date-picker
                v-model="editForm.projectEstimatedSigningDate"
                style="height: 42px; width: 100%"
                type="date"
                placeholder="Pick a day"
              />
            </el-form-item>
            <!-- 客户经理 -->
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">
                  客户经理(单位:元)：
                </p>
              </template>
              <el-input
                v-model="editForm.customer_manager"
                class=""
                placeholder="默认填单人姓名"
                style="height: 42px"
              ></el-input>
            </el-form-item>
          </div>
          <!-- 商机描述 -->
          <el-form-item label-width="10.79%" class="w-full pr-5">
            <template #label>
              <p>商机描述：</p>
            </template>
            <el-input
              v-model="editForm.opportunity_desc"
              :autosize="{ minRows: 4, maxRows: 4 }"
              type="textarea"
              placeholder="请输入商机描述"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 项目跟进 -->
      <el-tab-pane label="项目跟进" name="follow-up"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useEditClue } from "./hook";
const {
  activeName,
  handleClick,
  handleChanges,
  editForm,
  getRef,
  SingleSelect
} = useEditClue();
</script>

<style lang="scss">
.project-edit-tabs {
  .el-input__wrapper {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .el-form-item__label:before {
    margin-top: 6px;
  }
  .el-tabs__header {
    height: 66px;
  }
  .el-tabs__nav-wrap {
    .el-tabs__nav-scroll {
      height: 66px;
      .el-tabs__nav {
        height: 45px;
        .el-tabs__item {
          height: 60px;
        }
      }
    }
  }
}
</style>
