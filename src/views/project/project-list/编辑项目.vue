<!-- 项目列表 -->
<template>
  <div>
    <el-button @click="open">点击打开弹窗</el-button>
  </div>
</template>

<script setup lang="tsx">
import { Close } from "@element-plus/icons-vue";
import { addDialog } from "@/components/ReDialog";
import { ref, onMounted } from "vue";
import { message } from "@/utils/message";
const activeName = ref("Lead");
import type { TabsPaneContext } from "element-plus";
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
defineOptions({
  name: "project-list"
});
const open = () => {
  addDialog({
    hideFooter: true,
    showClose: false,
    width: "calc(100% - 320px - 180px)",
    style: {
      marginRight: "90px",
      borderRadius: "10px",
      boxShadow: "2px 2px 16px 1px rgba(62, 62, 62, 0.12)"
    },
    class: "project-dialog",
    headerRenderer: ({ close, titleId, titleClass }) => (
      <div id={titleId} class={titleClass + " my-header"}>
        <div class="flex justify-between mb-5">
          <span style="color: #111" class="text-16 font-bold">
            编辑项目
          </span>
          <el-icon
            class="cursor-pointer"
            onClick={() => {
              close();
            }}
          >
            <Close style="width: 17px; height: 17px; color: #999" />
          </el-icon>
        </div>
        <hr style="color: #cccccc" />
      </div>
    ),
    contentRenderer: () => (
      <el-tabs
        v-model={activeName.value}
        class="project-tabs"
        onTab-click="handleClick"
      >
        <el-tab-pane label="销售线索" name="Lead">
          销售线索
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">
          Config
        </el-tab-pane>
        <el-tab-pane label="Role" name="third">
          Role
        </el-tab-pane>
        <el-tab-pane label="Task" name="fourth">
          Task
        </el-tab-pane>
      </el-tabs>
    )
  });
};
onMounted(() => {});
</script>
<style lang="scss">
.project-dialog {
  header {
    padding-bottom: 0;
    margin-right: 0;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 20px;
  }
}
.project-tabs {
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
