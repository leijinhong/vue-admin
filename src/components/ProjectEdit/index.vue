<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="project-edit-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="销售线索" name="Lead">
        <el-form label-position="left">
          <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">项目名称：</p>
              </template>
              <el-input class="" style="height: 42px"></el-input>
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">项目类型：</p>
              </template>
              <SingleSelect
                name="项目类型"
                class="w-full"
                @change="handleChanges"
              />
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">客户名称：</p>
              </template>
              <SingleSelect
                name="客户名称"
                class="w-full noRotate"
                filterable
                @change="handleChanges"
              />
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">
                  项目预算(单位:元)：
                </p>
              </template>
              <el-input class="" style="height: 42px"></el-input>
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">预计签约日期：</p>
              </template>

              <el-date-picker
                style="height: 42px; width: 100%"
                type="date"
                placeholder="Pick a day"
              />
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">
                  客户经理(单位:元)：
                </p>
              </template>
              <el-input
                class=""
                placeholder="默认填单人姓名"
                style="height: 42px"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目跟进" name="follow-up"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useProjectEdit } from "./hook";
const {
  activeName,
  handleClick,
  handleChanges,
  editForm,
  getRef,
  SingleSelect
} = useProjectEdit();
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
