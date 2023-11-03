<!-- 
  公共资料夹
 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHook } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import CaretBottom from "@/assets/svg/caret_bottom.svg?component";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "publicFolders"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  formatList,
  onSearch,
  resetForm,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  batchDel,
  handleDelete,
  openDialog
} = useHook();

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
        ref="formRef"
        :inline="true"
        :model="form"
        class="search-form flex flex-wrap gap-y-3"
      >
        <el-form-item label="" class="!mb-0 md:mt-0" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入文件名称"
            clearable
            class="!w-[184px]"
          />
        </el-form-item>
        <el-form-item label="" class="!mb-0 md:mt-0" prop="format">
          <el-select
            v-model="form.format"
            class="!w-[204px]"
            placeholder="请选择文件格式"
            clearable
            filterable
            :suffix-icon="useRenderIcon(CaretBottom)"
          >
            <el-option
              v-for="item in formatList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex mt-3 md:mt-0 gap-x-3 gap-y-3">
        <el-button
          style="
            padding: 10px 20px 10px 10px;
            --el-font-size-base: 16px;
            height: var(--el-component-size);
          "
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch(1, true)"
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
              @click="openDialog('上传')"
            >
              上传文件
            </el-button>
          </Auth>
          <Auth value="/admin/user/add">
            <el-button
              style="
                padding: 10px 20px 10px 10px;
                --el-font-size-base: 16px;
                height: var(--el-component-size);
              "
              type="primary"
              :icon="useRenderIcon(AddFill)"
              @click="openDialog()"
            >
              新建文件夹
            </el-button>
          </Auth>
          <Auth value="/admin/user/add">
            <el-button
              style="
                padding: 10px 20px 10px 10px;
                --el-font-size-base: 16px;
                height: var(--el-component-size);
              "
              type="primary"
              :icon="useRenderIcon(AddFill)"
              @click="openDialog('移动')"
            >
              移动文件
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
            <div class="flex gap-3">
              <Auth value="/admin/user/edit">
                <el-button
                  class="reset-margin"
                  link
                  type="info"
                  :size="size"
                  @click="openDialog('改名', row)"
                >
                  改名
                </el-button>
              </Auth>

              <Auth value="/admin/user/del">
                <el-popconfirm
                  :title="`是否确认删除事件编号为${row.code}的这条数据`"
                  @confirm="handleDelete(row)"
                >
                  <template #reference>
                    <el-button
                      class="reset-margin"
                      link
                      type="danger"
                      :size="size"
                    >
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
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
</style>
