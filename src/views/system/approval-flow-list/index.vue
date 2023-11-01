<!-- 
  会员列表
 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHook } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useFloePathStoreHook } from "@/store/modules/flowPath";

defineOptions({
  name: "memberList"
});

const {
  loading,
  columns,
  dataList,
  pagination,
  eventList,
  handleAdd,
  onSearch,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  batchDel,
  objectSpanMethod,
  handleDelete
} = useHook();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <PureTableBar
      class="mt-0"
      title="会员列表"
      :columns="columns"
      :isDrag="false"
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
              @click="handleAdd()"
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
          border
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          stripe
          :span-method="objectSpanMethod"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #reviewed="{ row }">
            <el-space wrap>
              <el-input :model-value="row.reviewedBy"></el-input>
              <Auth value="/admin/user/add">
                <el-button
                  class="reset-margin"
                  link
                  type="info"
                  @click="handleAdd(row)"
                >
                  添加审批人
                </el-button>
              </Auth>

              <Auth value="/admin/user/del">
                <el-popconfirm
                  :title="
                    row.reviewedBy
                      ? `是否确认删除审核人为${row.reviewedBy}的这条数据`
                      : '确定要删除该审批人数据吗？'
                  "
                  @confirm="handleDelete(row)"
                >
                  <template #reference>
                    <el-button class="reset-margin" link type="danger">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </Auth>
            </el-space>
          </template>
          <template #operation="{ row }">
            <div class="flex gap-3">
              <Auth value="/admin/user/add">
                <el-button
                  class="reset-margin"
                  link
                  type="info"
                  :size="size"
                  @click="handleAdd()"
                >
                  添加审批事件
                </el-button>
              </Auth>

              <Auth value="/admin/user/del">
                <el-popconfirm
                  :title="
                    eventList[row.event]
                      ? `是否确认删除审批事件为${
                          eventList[row.event].label
                        }的这条数据`
                      : '是否删除该空白数据'
                  "
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
:deep(.el-table .el-table__row) {
  background-color: white;
}
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--right) {
  background-color: white;
}
:deep(.el-table td.el-table__cell) {
  border-bottom: var(--el-table-border) !important;
}
</style>
