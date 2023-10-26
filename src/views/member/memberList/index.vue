<!-- 
  会员列表
 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

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
  exportCheckItem
} = useRole();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="会员搜索：" prop="keyword">
        <el-input v-model="form.keyword" v-show="false" />
        <div>
          <el-select
            v-model="selectValue"
            placeholder="请选择"
            class="w-28"
            style="--el-input-border-radius: 0"
          >
            <el-option label="会员编号" value="code" />
            <el-option label="昵称" value="name" />
            <el-option label="手机" value="phone" />
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
      <el-form-item label="vip会员：" prop="is_vip">
        <el-select
          v-model="form.is_vip"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="是" :value="1" />
          <el-option label="否" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="会员类型：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="老师" :value="2" />
          <el-option label="学员" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="实名认证：" prop="smrz">
        <el-select
          v-model="form.smrz"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="是" :value="1" />
          <el-option label="否" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch()"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="会员列表"
      :columns="columns"
      @refresh="onSearch(pagination.currentPage)"
    >
      <template #buttons>
        <Auth value="/admin/user/export">
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="exportCheckItem"
          >
            导出
          </el-button>
        </Auth>
        <Auth value="/admin/user/add">
          <el-button type="primary" :icon="useRenderIcon(AddFill)">
            添加会员
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
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <Auth value="/admin/user/edit">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
              >
                编辑
              </el-button>
            </Auth>

            <Auth value="/admin/user/detail">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon('ooui:view-details-rtl')"
              >
                详情
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
    margin-bottom: 12px;
  }
}
</style>
