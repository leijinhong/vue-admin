import editForm from "../form.vue";
import { message } from "@/utils/message";
import { ref, onMounted, h } from "vue";

import { addDialog } from "@/components/ReDialog";
import { useOrganizationStoreHook } from "@/store/modules/organization";
import type Node from "element-plus/es/components/tree/src/model/node";
import { handleTree } from "@pureadmin/utils";

export function useHook() {
  const { getList, add, edit, del } = useOrganizationStoreHook();
  const dataSource = ref<OrganizationItemType[]>([]);
  const loading = ref(false);
  const formRef = ref();
  const defaultProps = {
    label: "name"
  };

  function handleDelete(node: Node, data: OrganizationItemType) {
    del(data.id).then(res => {
      if (res == 0) {
        message(`您删除了组织名称为${data.name}的这条数据`, {
          type: "success"
        });
        onSearch();
      }
    });
  }

  function openDialog(title = "新增", data = { pid: null }) {
    addDialog({
      title: `${title}组织`,
      props: {
        formInline: data
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = formRef.value.newFormInline;
        function chores() {
          // useUserStoreHook().initMenu();
          onSearch();
          message(title + "成功", { type: "success" });
          loading.value = false;
          done(); // 关闭弹框
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            loading.value = true;
            // 表单规则校验通过
            if (["新增", "添加"].includes(title)) {
              add(curData).then(res => {
                if (res == 0) {
                  chores();
                }
                loading.value = false;
              });
            } else {
              delete curData.child;
              delete curData.showTooltip;
              edit(curData).then(res => {
                if (res == 0) {
                  chores();
                }
                loading.value = false;
              });
            }
          }
        });
      }
    });
  }

  async function onSearch() {
    loading.value = true;

    const res = await getList({});
    dataSource.value = await handleTree(res.data.items, "id", "pid");
    loading.value = false;
  }
  onMounted(() => {
    onSearch();
  });

  return {
    loading,
    dataSource,
    defaultProps,
    handleDelete,
    openDialog,
    onSearch
  };
}
