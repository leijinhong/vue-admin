<script setup lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useOrganizationStoreHook } from "@/store/modules/organization";
import { ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import Dept from "@iconify-icons/ri/git-branch-line";
import Reset from "@iconify-icons/ri/restart-line";
import Search from "@iconify-icons/ep/search";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import LocationCompany from "@iconify-icons/ep/add-location";
import ExpandIcon from "./svg/expand.svg?component";
import UnExpandIcon from "./svg/unexpand.svg?component";
import { useUserStoreHook } from "@/store/modules/user";
import { useUserStoreHook as useUserStoreStoreHook } from "@/store/modules/userStore";
import { isArray, isNumber } from "@pureadmin/utils";

const props = defineProps<{
  mv: number | number[] | null;
  isReset: boolean;
}>();
const emits = defineEmits<{
  (e: "change", id: number): void;
}>();

interface Tree {
  id: number;
  name: string;
  highlight?: boolean;
  children?: Tree[];
}

const treeRef = ref();
const treeData = ref([]);
const isExpand = ref(true);
const searchValue = ref("");
// 用于存储选中过的数据
const highlightMap = ref({});
const { proxy } = getCurrentInstance();
const defaultProps = {
  children: "children",
  label: "name"
};
const { treeList } = useOrganizationStoreHook();

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.name.includes(value);
};

function nodeClick(value) {
  const nodeId = value.id;
  const flag = highlightMap.value[nodeId]?.highlight;
  highlightMap.value[nodeId] = flag
    ? Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: false
      })
    : Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: true
      });
  Object.values(highlightMap.value).forEach((v: Tree) => {
    if (v.id !== nodeId) {
      v.highlight = false;
    }
  });

  // 为true表示当前选中，但是在上面会处理成不为选中
  emits("change", !flag ? nodeId : -1);
}

function toggleRowExpansionAll(status) {
  isExpand.value = status;
  const nodes = (proxy.$refs["treeRef"] as any).store._getAllNodes();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = status;
  }
}

/** 重置状态（选中状态、搜索框值、树初始化） */
function onReset() {
  highlightMap.value = {};
  searchValue.value = "";
  toggleRowExpansionAll(true);
  emits("change", -1);
}

watch(searchValue, val => {
  treeRef.value!.filter(val);
});

watch(
  () => props.isReset,
  val => {
    if (val) {
      onReset();
    }
  }
);

onMounted(async () => {
  const data = await treeList;
  treeData.value = data;

  const { organization_id } = useUserStoreHook().userInfo;
  nodeClick({ id: organization_id });
});
</script>

<template>
  <div
    class="h-full bg-bg_color overflow-auto"
    :style="{ minHeight: `calc(100vh - 133px)` }"
  >
    <div class="flex items-center h-[34px]">
      <el-input
        style="flex: 2"
        size="small"
        v-model="searchValue"
        placeholder="请输入组织名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <el-divider />
    <el-tree
      ref="treeRef"
      :data="treeData"
      node-key="id"
      size="small"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <span
          :data-id="node.data.id"
          :class="[
            'pl-1',
            'pr-1',
            'rounded',
            'flex',
            'items-center',
            'select-none',
            searchValue.trim().length > 0 &&
              node.label.includes(searchValue) &&
              'text-red-500',
            highlightMap[node.data.id]?.highlight ? 'text-primary' : ''
          ]"
          :style="{
            background: highlightMap[node.data.id]?.highlight
              ? 'var(--el-color-primary-light-7)'
              : 'transparent'
          }"
        >
          <IconifyIconOffline
            :icon="
              data.type === 1
                ? OfficeBuilding
                : data.type === 2
                ? LocationCompany
                : Dept
            "
          />
          {{ node.label }}
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-divider) {
  margin: 0;
}
</style>
