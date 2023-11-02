import { defineComponent, ref, onMounted } from "vue";
import { useRoleStoreHook } from "@/store/modules/roleStore";
import { RoleType } from "@/views/system/role-list/utils/type";
import { cloneDeep } from "@pureadmin/utils";
export default defineComponent({
  name: "AlRoleSelect",
  props: {
    modelValue: {
      type: Number,
      default: -1
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const roleList = ref<RoleType[]>([]);
    const { treeList } = useRoleStoreHook();

    // const id = ref(props.modelValue);

    async function init() {
      roleList.value = await treeList;
    }
    onMounted(() => {
      init();
    });
    return () => (
      <el-cascader
        class="w-full"
        options={roleList.value}
        model-value={props.modelValue}
        props={{
          value: "id",
          label: "name",
          emitPath: false,
          checkStrictly: true
        }}
        clearable
        filterable
        placeholder="请选择角色"
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
