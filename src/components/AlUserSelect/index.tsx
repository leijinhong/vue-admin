import { defineComponent, ref, onMounted, h } from "vue";
import { useUserStoreHook } from "@/store/modules/userStore";
import { DialogOptions, addDialog, closeDialog } from "../ReDialog";
import Bar from "./bar";

export default defineComponent({
  name: "AlUserSelect",
  props: {
    modelValue: {
      type: Number,
      default: -1
    },
    title: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const BarRef = ref();

    function openDialog() {
      addDialog({
        top: "2vh",
        width: "80%",
        /* 自定义表头 */
        title: props.title,
        /* 自定义内容 */
        contentRenderer: () => h(Bar, { ref: BarRef, mv: props.modelValue }),
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

      function chores(options: DialogOptions, index: number, item) {
        emit("change", item);
        emit("update:modelValue", item.id);
        closeDialog(options, index);
      }
      function handleCB(options: DialogOptions, index: number) {
        const FormRef = BarRef.value.getItem();
        console.log(FormRef);
        chores(options, index, FormRef);
      }
    }

    return () => (
      <div class="relative">
        <div
          class="absolute w-full h-full top-0 left-0 z-10 bg-red"
          onClick={() => openDialog()}
        ></div>
        <el-select
          class="w-full"
          model-value={null}
          clearable
          filterable
          placeholder={props.placeholder}
          suffix-icon={""}
        ></el-select>
      </div>
    );
  }
});
