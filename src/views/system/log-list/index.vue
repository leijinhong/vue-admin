<!-- 
  日志
 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import CaretBottom from "@/assets/svg/caret_bottom.svg?component";

// import Database from "@iconify-icons/ri/database-2-line";
// import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "log-list"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  resetForm,
  handleSizeChange,
  handleCurrentChange,
  handleDelete,
  batchDel,
  handleSelectionChange
} = useRole();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <div
      class="md:flex justify-between rounded-[10px] shadow-1 bg-bg_color p-5"
    >
      <el-form ref="formRef" :inline="true" :model="form" class="search-form">
        <el-form-item label="" class="mb-3 md:mt-0" prop="keyword">
          <div>
            <el-select
              v-model="form.type"
              placeholder="请选择"
              class="w-28"
              style="--el-input-border-radius: 0"
              :suffix-icon="useRenderIcon(CaretBottom)"
            >
              <el-option label="操作时间" value="code" />
              <el-option label="操作人员" value="name" />
              <el-option label="用户名" value="phone" />
              <el-option label="职位" value="phonea" />
              <el-option label="模块" value="phoneb" />
              <el-option label="IP" value="phonec" />
            </el-select>
            <el-input
              v-model="form.keyword"
              placeholder="请输入"
              clearable
              class="!w-[200px]"
              style="--el-input-border-radius: 0 4px 4px 0"
            />
          </div>
        </el-form-item>
      </el-form>
      <div class="flex gap-x-3 gap-y-3">
        <el-button
          style="
            padding: 10px 20px 10px 10px;
            --el-font-size-base: 16px;
            height: var(--el-component-size);
          "
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch()"
        >
          查询
        </el-button>
        <el-button
          style="
            padding: 10px 20px 10px 10px;
            --el-font-size-base: 16px;
            height: var(--el-component-size) !important;
          "
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </div>
    </div>
    <PureTableBar
      :columns="columns"
      @refresh="onSearch(pagination.currentPage)"
    >
      <template #buttons>
        <Auth value="/admin/user/del">
          <el-button
            style="
              padding: 10px 20px 10px 10px;
              --el-font-size-base: 16px;
              height: var(--el-component-size);
            "
            type="danger"
            :icon="useRenderIcon(Delete)"
            @click="batchDel"
          >
            删除
          </el-button>
        </Auth>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          stripe
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <Auth value="/admin/user/del">
              <el-popconfirm
                :title="`是否确认删除角色昵称为${1}的这条数据`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="danger"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </Auth>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 0;
}
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
