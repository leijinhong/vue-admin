<script setup lang="ts">
import { ref, computed } from "vue";
import { useClassificationStoreStoreHook } from "@/store/modules/classification";
import { formRules } from "./utils/rule";
import { onMounted } from "vue";
import { Ref } from "vue";

interface PropsType {
  formInline: CategoriesType;
}
const defaultProps = {
  children: "children",
  label: "name",
  value: "id"
};
const { treeList } = useClassificationStoreStoreHook();
const dataSource: Ref<CategoriesType[]> = ref([
  { name: "根节点", pid: null, id: null }
]);
const props = withDefaults(defineProps<PropsType>(), {
  // formInline: () => ()
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef, newFormInline });

onMounted(async () => {
  const list = await treeList;
  dataSource.value[0].children = list;
});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="90px"
    class="mt-4"
  >
    <el-form-item label="上级分类" prop="pid">
      <el-tree-select
        :props="defaultProps"
        v-model="newFormInline.pid"
        :data="dataSource"
        check-strictly
        default-expand-all
        :render-after-expand="false"
      />
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入分类名称"
      />
    </el-form-item>
  </el-form>
</template>
