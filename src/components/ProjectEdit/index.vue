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
            <el-form-item required label-width="22.08%" class="w-full">
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
                name="客户名称"
                class="w-full noRotate"
                filterable
                @change="handleChanges"
              />
            </el-form-item>
            <el-form-item label-width="22.08%" class="w-full">
              <template #label>
                <p style="height: 42px; line-height: 42px">项目类型：</p>
              </template>
              <el-input class="" style="height: 42px"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目跟进" name="follow-up"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineExpose } from "vue";
import { message } from "@/utils/message";
import type { TabsPaneContext } from "element-plus";
import SingleSelect from "@/components/SingleSelect/index.vue";
export default {
  components: {
    SingleSelect // 注册选择器组件
  },
  setup() {
    console.log(123123123123123123);

    let activeName = ref("Lead");
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };
    function handleChanges(event) {
      console.log("bbbbb", event);
    }

    return {
      activeName,
      handleClick,
      handleChanges
    };
  }
};
</script>
<script setup lang="ts">
const form = ref({
  name: "小美"
});
function getRef() {
  return form.value;
}
defineExpose({
  getRef
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
