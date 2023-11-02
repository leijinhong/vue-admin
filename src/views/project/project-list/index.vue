<!-- 项目列表 -->

<script setup lang="ts">
import { onMounted } from "vue";
import { useProjectList } from "./utils/hook";
defineOptions({
  name: "projectList"
});

const {
  selectValue,
  form,
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  resetForm,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  exportCheckItem,
  openDialog,
  ProjectDetail,
  ProjectEdit,
  useRenderIcon,
  CaretBottom,
  Delete,
  Search,
  Refresh,
  AddFill,
  PureTableBar,
  searchForm
} = useProjectList();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <div
      class="md:flex justify-between rounded-[10px] shadow-1 bg-bg_color p-5"
    >
      <el-form
        ref="searchForm"
        :inline="true"
        :model="form"
        class="search-form"
      >
        <el-form-item label="" class="mb-3 md:mt-0" prop="project_name">
          <el-input
            v-model="form.project_name"
            placeholder="项目名称"
            clearable
            class="!w-[184px]"
          />
        </el-form-item>
        <el-form-item label="" class="mb-3 md:mt-0" prop="encode">
          <el-input
            v-model="form.encode"
            placeholder="项目编号"
            clearable
            class="!w-[204px]"
          />
        </el-form-item>
        <el-form-item label="" class="mb-3 md:mt-0" prop="customer_id">
          <el-select
            v-model="form.customer_id"
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
          @click="resetForm(searchForm)"
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
        <div class="flex gap-3">
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
            >
              删除
            </el-button>
          </Auth>
          <Auth value="/admin/user/export">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="请选择需要的数据以便导出"
              placement="top-start"
            >
              <el-button
                style="
                  padding: 10px 20px 10px 10px;
                  --el-font-size-base: 16px;
                  height: var(--el-component-size);
                "
                type="success"
                :icon="useRenderIcon('fontisto:export')"
                @click="exportCheckItem"
              >
                导出
              </el-button>
            </el-tooltip>
          </Auth>
        </div>
      </template>
      <template #centerBens>
        <div class="flex flex-wrap">
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-primary border-primary font-bold border-solid"
          >
            全部
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            销售线索
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            销售商机
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            项目立项
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            项目立项
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            合同执行
          </button>
          <button
            class="w-[104px] h-[42px] leading-[42px] text-center bg-bg_color border rounded-[10px] text-[#333333] border-transparent"
          >
            售后运维
          </button>
        </div>
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
            <div class="flex gap-3 justify-center">
              <Auth value="/admin/user/edit">
                <el-button
                  class="reset-margin"
                  link
                  type="info"
                  :size="size"
                  @click="openDialog('编辑项目', ProjectEdit, {}, () => {})"
                >
                  编辑
                </el-button>
              </Auth>
              <Auth value="/admin/user/edit">
                <el-button
                  class="reset-margin"
                  w
                  link
                  type="info"
                  :size="size"
                  @click="
                    openDialog(
                      '查看详情',
                      ProjectDetail,
                      { hideFooter: true },
                      () => {}
                    )
                  "
                >
                  查看
                </el-button>
              </Auth>
              <Auth value="/admin/user/del">
                <el-button class="reset-margin" link type="danger" :size="size">
                  删除
                </el-button>
              </Auth>
            </div>
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

.search-form {
  :deep(.el-form-item) {
    // margin-bottom: 0;
  }
}
</style>
<style lang="scss"></style>
