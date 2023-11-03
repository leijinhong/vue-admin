import editForm from "../form.vue";
import { message } from "@/utils/message";
import { ref, onMounted, h, computed } from "vue";
import {
  addOrganization,
  delOrganization,
  editOrganization,
  getOrganization
} from "@/api/organization";
import { addDialog } from "@/components/ReDialog";
import { useOrganizationStoreHook } from "@/store/modules/organization";
import type Node from "element-plus/es/components/tree/src/model/node";
import { handleTree } from "@pureadmin/utils";

export function useHook() {
  const { getList, add, edit, del, treeList } = useOrganizationStoreHook();
  const dataSource = ref<OrganizationItemType[]>([]);
  const loading = ref(false);
  const formRef = ref();
  const defaultProps = {
    label: "name"
  };

  function handleDelete(node: Node, data: OrganizationItemType) {
    delOrganization({ id: data.id }).then(res => {
      if (res.code == 0) {
        message(`您删除了菜单名称为${data.name}的这条数据`, {
          type: "success"
        });
        onSearch();
      } else if (res.code == -1) {
        message(res.msg, { type: "error" });
      }
    });
  }

  function openDialog(title = "新增", data?: OrganizationItemType) {
    addDialog({
      title: `${title}菜单`,
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
              addOrganization(curData).then(res => {
                if (res.code == 0) {
                  chores();
                } else if (res.code == -1) {
                  message(res.msg, { type: "error" });
                  loading.value = false;
                }
              });
            } else {
              delete curData.child;
              delete curData.showTooltip;
              editOrganization(curData).then(res => {
                if (res.code == 0) {
                  chores();
                } else if (res.code == -1) {
                  message(res.msg, { type: "error" });
                  loading.value = false;
                }
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
