import { defineComponent, ref, onMounted } from "vue";
import { useUserStoreHook } from "@/store/modules/userStore";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";

export default defineComponent({
  name: "AlUserSelect",
  props: {
    modelValue: {
      type: Number,
      default: -1
    },
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { list } = useUserStoreHook();
    const userList = ref<UserItemType[]>([]);

    async function init() {
      userList.value = await list;
    }
    onMounted(() => {
      init();
    });
    return () => (
      <el-select
        class="w-full"
        model-value={props.modelValue}
        clearable
        filterable
        placeholder="请选择角色"
        onChange={$event => emit("update:modelValue", $event)}
        suffix-icon={useRenderIcon(CaretBottom)}
      >
        {userList.value.map(item => (
          <el-option key={item.id} label={item.username} value={item.id} />
        ))}
      </el-select>
    );
  }
});
