<!-- 
  会员列表
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
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "memberList"
});

const formRef = ref();
const {
  selectValue,
  form,
  loading,
  columns,
  dataList,
  pagination,
  drawer,
  // buttonClass,
  onSearch,
  resetForm,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  exportCheckItem,
  batchDel
} = useRole();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <div class="flex justify-between rounded-[10px] shadow-1 bg-bg_color p-5">
      <el-form ref="formRef" :inline="true" :model="form" class="search-form">
        <el-form-item label="" prop="keyword">
          <el-input
            v-model="form.keyword"
            placeholder="项目名称"
            clearable
            class="!w-[184px]"
          />
        </el-form-item>
        <el-form-item label="" prop="is_vip">
          <el-input
            v-model="form.keyword"
            placeholder="项目编号"
            clearable
            class="!w-[204px]"
          />
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-select
            v-model="form.type"
            placeholder="客户名称"
            clearable
            class="!w-[138px]"
            :suffix-icon="useRenderIcon(CaretBottom)"
          >
            <el-option label="老师" :value="2" />
            <el-option label="学员" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
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
      title="会员列表"
      :columns="columns"
      @refresh="onSearch(pagination.currentPage)"
    >
      <template #buttons>
        <Auth value="/admin/user/add">
          <el-button
            style="
              padding: 10px 20px 10px 10px;
              --el-font-size-base: 16px;
              height: var(--el-component-size);
            "
            type="primary"
            :icon="useRenderIcon(AddFill)"
          >
            添加
          </el-button>
        </Auth>
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
        <Auth value="/admin/user/export">
          <el-button
            style="
              padding: 10px 20px 10px 10px;
              --el-font-size-base: 16px;
              height: var(--el-component-size);
            "
            type="success"
            :icon="useRenderIcon(AddFill)"
            @click="exportCheckItem"
          >
            导出
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
            <Auth value="/admin/user/edit">
              <el-button class="reset-margin" link type="info" :size="size">
                编辑
              </el-button>
            </Auth>

            <Auth value="/admin/user/del">
              <el-button class="reset-margin" link type="danger" :size="size">
                删除
              </el-button>
            </Auth>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
