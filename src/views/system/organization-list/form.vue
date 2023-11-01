<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { formRules } from "./utils/rule";

interface PropsType {
  formInline: OrganizationItemType;
}
const defaultProps = {
  children: "children",
  label: "name",
  value: "id"
};
const dataSource = computed(() => [{ name: "根节点", id: 0 }]);
const props = withDefaults(defineProps<PropsType>(), {
  // formInline: () => ()
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef, newFormInline });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="上一级组织" prop="pid">
      <el-tree-select
        :props="defaultProps"
        v-model="newFormInline.pid"
        :data="dataSource"
        check-strictly
        default-expand-all
        :render-after-expand="false"
      />
    </el-form-item>
    <el-form-item label="组织名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入组织名称"
      />
    </el-form-item>
  </el-form>
</template>
