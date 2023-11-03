<script setup lang="ts">
import { ref, onMounted } from "vue";
import useHook from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { PureTableBar } from "@/components/RePureTableBar";

const porps = defineProps<{
  form: {
    nickname: string;
    username: string;
    email: string;
  };
}>();

const form = ref(porps.form);
const formRef = ref();
const {
  columns,
  pagination,
  dataList,
  loading,
  onSearch,
  handleSizeChange,
  handleCurrentChange,
  resetForm
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
      :isDrag="false"
      @refresh="onSearch(pagination.currentPage)"
    >
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
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped></style>
