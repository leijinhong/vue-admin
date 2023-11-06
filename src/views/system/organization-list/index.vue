<!-- 组织结构管理 -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useHook } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

const { dataSource, openDialog, handleDelete, defaultProps, loading } =
  useHook();

defineOptions({
  name: "organization-list"
});
</script>
<template>
  <div class="main p-5 rounded-[10px] shadow-1 bg-bg_color" v-loading="loading">
    <div class="flex px-3 pb-3">
      <Auth value="/admin/user/add">
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          新增
        </el-button>
      </Auth>
      <Auth value="/admin/user/add">
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('新增')"
        >
          导入
        </el-button>
      </Auth>
    </div>
    <el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node md:flex block">
          <span class="flex items-center gap-x-1">
            <component :is="useRenderIcon(data.icon)" />
            <span>{{ node.label }}</span>
          </span>
          <el-space wrap>
            <Auth value="/admin/user/add">
              <el-button
                :icon="useRenderIcon(AddFill)"
                link
                type="primary"
                @click="
                  openDialog('添加', {
                    pid: data.id
                  })
                "
              >
                添加
              </el-button>
            </Auth>

            <Auth value="/admin/user/add">
              <el-button
                link
                type="primary"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('编辑', data)"
              >
                编辑
              </el-button>
            </Auth>

            <Auth value="/admin/user/add">
              <el-popconfirm
                :title="`是否确认删除组织名称为${node.label}的这条数据`"
                @confirm="handleDelete(node, data)"
              >
                <template #reference>
                  <el-button
                    link
                    type="danger"
                    :icon="useRenderIcon(Delete)"
                    style="
                      border: none !important;
                      padding: 2px !important;
                      height: auto !important;
                    "
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </Auth>
          </el-space>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tree-node__content) {
  height: 40px;
}
.custom-tree-node {
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
:deep(.el-button) {
  font-size: 16px;
}
</style>
