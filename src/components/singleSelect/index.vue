<!-- selece选择器 单选/多选 -->
<template>
  <div class="relative">
    <el-select
      style="min-height: 42px"
      class="w-full"
      v-model="selectedValue"
      :placeholder="(name == '客户名称' ? '请输入/选择' : '请选择') + name"
      :multiple="multiple"
      :filterable="filterable"
      :suffix-icon="
        filterable
          ? useRenderIcon('icon-park-solid:add')
          : useRenderIcon(CaretBottom)
      "
      @change="handleChange"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      ></el-option>
    </el-select>
    <div
      v-if="filterable"
      class="absolute cursor-pointer"
      @click.stop="addCustomer"
      style="
        background: transparent;
        width: 20px;
        height: 20px;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      "
    ></div>
  </div>
</template>

<script lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import { ref, onMounted, computed } from "vue";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";
import {
  getProjectStage,
  getProjectType,
  getProjectScale,
  getOperationMode,
  getCustomerList
} from "@/api/public";
export default {
  props: {
    modelValue: {
      type: String,
      default: null
    },
    name: String, // 从父组件传来的字段
    multiple: {
      type: Boolean,
      default: false
    },
    //启用搜索功能
    filterable: {
      type: Boolean,
      default: false
    }
    /*  //选项是否从服务器远程加载:注意如果后端不能返回所有客户,则需要调用它
    remote: {
      type: Boolean,
      default: false
    } */
  },
  emit: ["update:modelValue", "change"],
  setup(props, { emit }) {
    // 选中的ID/值
    // 下拉数据数组
    const options = ref([]);
    // 获取项目类型的下拉数据
    async function fetchProjectType() {
      try {
        const res = await getProjectType();
        const { data } = res;
        options.value = data.items; //更新下拉数据
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // 获取项目阶段的下拉数据
    async function fetchProjectStage() {
      try {
        const res = await getProjectStage();
        const { data } = res;
        options.value = data.items;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // 获取项目规模的下拉数据
    async function fetchProjectScale() {
      try {
        const res = await getProjectScale();
        const { data } = res;
        options.value = data.items;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // 获取运作方式的下拉数据
    async function fetchOperationMode() {
      try {
        const res = await getOperationMode();
        const { data } = res;
        options.value = data.items;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // 获取客户列表的下拉数据
    async function fetchCustomerList() {
      try {
        const res = await getCustomerList();
        const { data } = res;
        options.value = data.items;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const selectedValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });
    const addCustomer = () => {
      console.log("开启添加客户弹窗");
    };
    const fetchData = async () => {
      //根据父组件传来的字段获取下拉数据
      var map = [
        [() => props.name == "项目类型", () => fetchProjectType()],
        [() => props.name == "项目阶段", () => fetchProjectStage()],
        [() => props.name == "项目规模", () => fetchProjectScale()],
        [() => props.name == "运作方式", () => fetchOperationMode()],
        [() => props.name == "客户名称", () => fetchCustomerList()]
      ];
      // 遍历元组  用map.find 找到每个映射的第一项并且运行它,如果返回true,就运行该映射的第二项
      const target = map.find(m => m[0]()); //这里会把第一个符合条件的整个映射传递给target
      if (target) {
        target[1]();
      }
    };

    const handleChange = val => {
      // 触发自定义事件并传递选中的值给父组件
      emit("change", val);
    };

    // 在组件加载时获取数据
    onMounted(() => {
      fetchData();
    });

    return {
      selectedValue,
      options,
      handleChange,
      Delete,
      useRenderIcon,
      addCustomer,
      CaretBottom
    };
  }
};
</script>

<style lang="scss" scoped>
.noRotate {
  :deep(.el-select .el-input .el-select__caret) {
    transform: rotateZ(0) !important;
    font-size: 20px;
  }
}
</style>
