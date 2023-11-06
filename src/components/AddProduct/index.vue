<script setup lang="ts">
import { useAddProduct } from "./hook";
const { handleChanges, editForm, SingleSelect } = useAddProduct();
</script>

<template>
  <div style="height: 600px; overflow: hidden; overflow-y: auto" class="scroll">
    <!-- 编辑添加产品的界面 -->
    <el-form label-position="left" ref="formRef" :model="editForm" class="mt-5">
      <div class="pr-5 grid grid-cols-2 w-full" style="column-gap: 51px">
        <!-- 产品名称 -->
        <el-form-item
          label-width="22.08%"
          label="产品名称"
          class="w-full"
          prop="product_name"
        >
          <el-input
            class=""
            style="height: 42px"
            placeholder="请输入产品名称"
            v-model="editForm.product_name"
          ></el-input>
        </el-form-item>
        <!-- 产品编码 -->
        <!-- 项目预算 -->
        <el-form-item label-width="22.08%" class="w-full" prop="product_budget">
          <template #label>
            <p
              style="height: 42px; line-height: 42px"
              class="whitespace-nowrap"
            >
              项目预算<span class="text-sm">(单位:元)</span>：
            </p>
          </template>
          <el-input
            class=""
            style="height: 42px"
            placeholder="请输入项目预算"
            v-model="editForm.product_budget"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
