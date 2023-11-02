<!-- 项目列表--编辑项目的弹窗的内容 -->
<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="project-edit-tabs"
      @tab-click="changeTab"
    >
      <!-- 销售线索 -->
      <el-tab-pane v-if="props.step == 1" label="销售线索" name="clueCompoent">
        <clue ref="clueCompoent"></clue>
      </el-tab-pane>
      <!-- 项目跟进 -->
      <el-tab-pane
        v-if="props.step == 1"
        label="项目跟进"
        name="followCompoent"
      >
        <follow ref="followCompoent"></follow>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useProjectEdit } from "./hook";
import { ref } from "vue";
const { activeName, changeTab, clue } = useProjectEdit();
let clueCompoent = ref();
let followCompoent = ref();
defineExpose({ activeName, clueCompoent, followCompoent });
const props = defineProps({
  step: Number
});
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
