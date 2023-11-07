import { defineComponent, ref, onMounted, h, unref } from "vue";
import { useUserStoreHook } from "@/store/modules/userStore";
import { DialogOptions, addDialog, closeDialog } from "../ReDialog";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Bar from "./bar";

export default defineComponent({
  name: "AlUserSelect",
  props: {
    // 单选为 number或者null, 多选为数组
    modelValue: [Number, Array],
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    // 单选
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 多选，设置多选时需要把单选为false
    selection: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { list } = useUserStoreHook();

    const dataList = ref([]);
    const BarRef = ref();
    const selectedRow = ref([]);

    function openDialog() {
      addDialog({
        top: "2vh",
        width: "80%",
        /* 自定义表头 */
        title: props.title,
        /* 自定义内容 */
        contentRenderer: () =>
          h(Bar, {
            ref: BarRef,
            mv: props.modelValue,
            highlightCurrentRow: props.highlightCurrentRow,
            selection: props.selection,
            onChangeBar: event => {
              selectedRow.value = event;
            }
          }),
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        /* 自定义底部 */
        footerButtons: [
          {
            label: "确认",
            size: "large",
            style: {
              width: "152px"
            },
            type: "primary",
            btnClick: ({ dialog: { options, index }, button }) => {
              handleCB(options, index);
            }
          },
          {
            label: "取消",
            size: "large",
            style: {
              width: "152px"
            },
            btnClick: ({ dialog: { options, index }, button }) => {
              handleCB(options, index);
            }
          }
        ]
      });

      function chores(options: DialogOptions, index: number) {
        const list = unref(selectedRow);

        emit("change", list);
        if (list.length > 1) {
          emit(
            "update:modelValue",
            list.map(i => i.id)
          );
        } else {
          emit("update:modelValue", list[0] ? list[0].id : null);
        }
        closeDialog(options, index);
      }
      function handleCB(options: DialogOptions, index: number) {
        chores(options, index);
      }
    }

    onMounted(async () => {
      dataList.value = await list;
    });
    return () => (
      <div class="relative">
        <div
          class="absolute w-full h-full top-0 left-0 z-10 bg-red"
          onClick={() => openDialog()}
        ></div>
        <el-select
          class="w-full"
          style="--el-select-input-font-size:20px;"
          model-value={props.modelValue}
          multiple={props.selection}
          clearable
          filterable
          placeholder={props.placeholder}
          suffix-icon={useRenderIcon("fluent:people-add-28-filled")}
        >
          {dataList.value.map(item => (
            <el-option key={item.id} label={item.nickname} value={item.id} />
          ))}
        </el-select>
      </div>
    );
  }
});
