<!-- 项目列表--编辑项目的弹窗的内容 -->
<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="project-edit-tabs"
      @tab-click="changeTab"
    >
      <!-- 销售线索 -->
      <el-tab-pane
        v-if="[1, 2, 3].includes(props.step)"
        label="销售线索"
        name="clueComponent"
      >
        <clue ref="clueComponent"></clue>
      </el-tab-pane>
      <!-- 项目立项 -->
      <el-tab-pane
        v-if="[3].includes(props.step)"
        label="项目立项"
        name="establishComponent"
      >
        <establish ref="establishComponent"></establish>
      </el-tab-pane>
      <!-- 项目跟进 -->
      <el-tab-pane
        v-if="[1, 2, 3].includes(props.step)"
        label="项目跟进"
        name="followComponent"
      >
        <follow ref="followComponent"></follow>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { useProjectEdit } from "./hook";
import { ref } from "vue";
const { activeName, changeTab, clue, follow, establish } = useProjectEdit();
let clueComponent = ref();
let followComponent = ref();
let establishComponent = ref();

defineExpose({
  activeName,
  clueComponent,
  followComponent,
  establishComponent
});
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
