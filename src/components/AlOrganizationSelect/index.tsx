import { defineComponent, ref, onMounted } from "vue";
import { useOrganizationStoreHook } from "@/store/modules/organization";
import { cloneDeep } from "@pureadmin/utils";
export default defineComponent({
  name: "AlOrganizationSelect",
  props: {
    modelValue: {
      type: Number,
      default: -1
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const list = ref<OrganizationItemType[]>([]);
    const { treeList } = useOrganizationStoreHook();

    async function init() {
      list.value = await treeList;
    }
    onMounted(() => {
      init();
    });
    return () => (
      <el-cascader
        class="w-full"
        options={list.value}
        model-value={props.modelValue}
        props={{
          value: "id",
          label: "name",
          emitPath: false,
          checkStrictly: true
        }}
        clearable
        filterable
        placeholder="请选择部门"
        onChange={$event => emit("update:modelValue", $event)}
        v-slots={{
          default: ({ node, data }) => {
            return (
              <div>
                <span>{data.name}</span>
                {/* <span> {data.children ? data.children.length : ""} </span> */}
              </div>
            );
          }
        }}
      ></el-cascader>
    );
  }
});
