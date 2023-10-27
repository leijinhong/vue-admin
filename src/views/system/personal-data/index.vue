<!-- 组织结构管理 -->
<script setup lang="ts">
import essentialInfo from "./components/essentialInfo.vue";
import securitySet from "./components/securitySet.vue";
</script>
<template>
  <div class="rounded-[10px] shadow-1 bg-bg_color p-5">
    <el-tabs model-value="User">
      <el-tab-pane label="基本信息" name="User">
        <essentialInfo />
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="Password">
        <securitySet />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
