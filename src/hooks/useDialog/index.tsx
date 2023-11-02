import { DialogOptions, addDialog, closeDialog } from "@/components/ReDialog";
import { VNode, ref } from "vue";

const formRef = ref();

export function alAddDialog(ANode: any, options: DialogOptions, cb: Function) {
  const component = <ANode ref={formRef}></ANode>;
  addDialog({
    width: "calc(100% - 80px)",
    /* 自定义表头 */
    title: "",
    /* 自定义内容 */
    contentRenderer: () => component,
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
          console.log(options, index, button);
          cb(1);
          closeDialog(options, index);
        }
      },

      {
        label: "保存后继续编辑",
        size: "large",
        type: "primary",
        style: {
          width: "192px"
        },
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          cb(1);
          closeDialog(options, index);
        }
      },

      {
        label: "重置",
        size: "large",
        type: "danger",
        style: {
          width: "112px",
          background: "#fff",
          color: "#F33D3D"
        },
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          cb(1);
          closeDialog(options, index);
        }
      }
    ],
    ...options
  });
}
