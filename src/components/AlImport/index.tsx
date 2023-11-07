import { defineComponent, ref, onMounted, h, unref, watch } from "vue";
import { useUserStoreHook } from "@/store/modules/userStore";
import { DialogOptions, addDialog, closeDialog } from "../ReDialog";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Bar from "./Bar";

export default defineComponent({
  name: "AlImport",
  props: {
    modelValue: Boolean
  },
  emits: ["update:modelValue", "confirm"],
  setup(props, { emit }) {
    function openDialog() {
      addDialog({
        top: "20vh",
        width: "46%",
        /* 自定义表头 */
        title: "批量导入",
        /* 自定义内容 */
        contentRenderer: () => h(Bar, {}),
        closeOnClickModal: false,
        /* 自定义底部 */
        footerButtons: [
          {
            label: "提交",
            size: "large",
            style: {
              width: "192px"
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
        closeDialog(options, index);
        emit("update:modelValue", false);
      }
      function handleCB(options: DialogOptions, index: number) {
        chores(options, index);
      }
    }
    watch(
      () => props.modelValue,
      n => {
        if (n) {
          openDialog();
        }
      }
    );
    return () => <div></div>;
  }
});
