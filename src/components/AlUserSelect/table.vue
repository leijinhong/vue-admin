<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useHook } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { PureTableBar } from "@/components/RePureTableBar";
import { useThrottleFn } from "@vueuse/core";
import { isArray, isObject } from "@pureadmin/utils";
import { nextTick } from "process";

const props = defineProps<{
  id: number;
  mv: number | number[] | null;
  highlightCurrentRow?: boolean;
  selection?: boolean;
}>();

const emits = defineEmits<{
  (e: "reset", v: boolean): void;
  (e: "change", v: UserItemType[]): void;
}>();

const tableRef = ref();
// 选中行
const selectedRow = ref<UserItemType[]>([]);
const formRef = ref();
const {
  form,
  columns,
  pagination,
  dataList,
  loading,
  onSearch,
  handleSizeChange,
  handleCurrentChange,
  resetForm
} = useHook();

const handleReset = useThrottleFn(() => {
  resetForm(formRef.value);
  emits("reset", true);
  // 还需变为false,否者一直true
  setTimeout(() => {
    emits("reset", false);
  }, 400);
}, 500);
function handleCurrentChangeRow(event: UserItemType | UserItemType[]) {
  // 为多选时 点击行也会触发 需要过滤
  if (isObject(event) && props.selection) return;

  if (isArray(event)) {
    selectedRow.value = event;
  } else {
    selectedRow.value = [event];
  }

  emits("change", selectedRow.value);
}
watch(
  [() => props.mv, () => dataList.value],
  ([mv, list]) => {
    if (mv != null && list) {
      if (isArray(mv)) {
        // 需等dom渲染完成在执行`toggleRowSelection`否者无效
        nextTick(() => {
          // 默认多选状态
          const rows = list.filter(i => mv.includes(i.id));
          const { toggleRowSelection } = tableRef.value.getTableRef();
          if (rows.length) {
            rows.forEach(row => {
              toggleRowSelection(row, undefined);
            });
          }
        });
      } else {
        // 为单选默认选中状态
        const item = list.find(i => i.id == mv);
        const { setCurrentRow } = tableRef.value.getTableRef();
        setCurrentRow(item);
      }
    }
  },
  {
    immediate: true
  }
);
watch(
  () => props.selection,
  n => {
    if (n && props.highlightCurrentRow == false) {
      columns.unshift({
        type: "selection",
        align: "left"
      });
    }
  },
  {
    immediate: true
  }
);
watch(
  () => props.id,
  n => {
    onSearch(1, n);
  }
);
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
        <el-form-item label="" class="!mb-0 md:mt-0" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账户名"
            clearable
            class="!w-[184px]"
          />
        </el-form-item>
        <el-form-item label="" class="!mb-0 md:mt-0" prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请输入姓名"
            clearable
            class="!w-[204px]"
          />
        </el-form-item>
        <el-form-item label="" class="!mb-0 md:mt-0" prop="email">
          <el-input
            type="email"
            v-model="form.email"
            placeholder="请输入邮箱"
            clearable
            class="!w-[204px]"
          />
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
          @click="onSearch(1, props.id, true)"
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
          @click="handleReset"
        >
          重置
        </el-button>
      </div>
    </div>
    <PureTableBar
      :columns="columns"
      :isDrag="false"
      @refresh="onSearch(pagination.currentPage)"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          :max-height="408"
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          ref="tableRef"
          :highlight-current-row="highlightCurrentRow"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange($event, props.id)"
          @page-current-change="handleCurrentChange($event, props.id)"
          @current-change="handleCurrentChangeRow"
          @selection-change="handleCurrentChangeRow"
        >
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table .el-table__row) {
  background-color: white;
}
:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
  border-bottom: var(--el-table-border) !important;
}
</style>
