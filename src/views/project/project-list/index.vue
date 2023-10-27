<!-- 项目列表 -->
<template>
  <div>
    <el-button @click="open">点击打开弹窗</el-button>
  </div>
</template>
<script setup lang="tsx">
import { Close } from "@element-plus/icons-vue";
import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from "@/components/ReDialog";
import { h, createVNode, ref, defineProps, defineEmits, onMounted } from "vue";
import { message } from "@/utils/message";

defineOptions({
  name: "project-list"
});

const open = () => {
  addDialog({
    title: "隐藏底部取消、确定按钮",
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
      // jsx 语法
      <div id={titleId} class={titleClass + " my-header"}>
        <div class="flex justify-between mb-5">
          <span style="color: #111" class="text-16 font-bold">
            编辑项目
          </span>
          <el-icon class="cursor-pointer" onClick={close}>
            <Close style="width: 17px; height: 17px; color: #999" />
          </el-icon>
        </div>
        <hr style="color: #cccccc" />
      </div>
    ),
    contentRenderer: () => (
      <div class="">
        <p class="" style=""></p>
      </div>
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
</style>
