/**
 * 用于管理组织的增删改查
 */

import { store } from "@/store";
import { defineStore } from "pinia";
import {
  addOrganization,
  delOrganization,
  editOrganization,
  getOrganization
} from "@/api/organization";
import { handleTree } from "@/utils/tree";
import { useRoute } from "vue-router";

export const useOrganizationStore = defineStore({
  id: "pure-organization",
  state: () => ({
    dataList: [] as OrganizationItemType[]
  }),
  getters: {
    async list(state): Promise<OrganizationItemType[]> {
      const route = useRoute();
      if (state.dataList.length == 0 && route.name != "organizationList") {
        const res = await this.getList();
        return res.data.items;
      } else {
        return state.dataList;
      }
    },
    async treeList(): Promise<OrganizationItemType[]> {
      const list = await this.list;
      return handleTree(list, "id", "pid");
    }
  },
  actions: {
    /** 获取列表 */
    async getList(form) {
      const that = this;
      return new Promise<ResultType<ResultDataType<OrganizationItemType[]>>>(
        resolve => {
          getOrganization(form).then(res => {
            if (res.code == 0) {
              that.dataList = res.data.items;

              resolve(res);
            } else if (res.code == -1) {
              resolve(res);
            }
          });
        }
      );
    },
    add(curData: { pid: number; name: string }) {
      return new Promise(resolve => {
        addOrganization(curData).then(res => {
          if (res.code == 0) {
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    },
    edit(curData: { id: number; pid: number; name: string }) {
      return new Promise(resolve => {
        editOrganization(curData).then(res => {
          if (res.code == 0) {
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    },
    del(id: number) {
      return new Promise(resolve => {
        delOrganization({ id }).then(res => {
          if (res.code == 0) {
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    }
  }
});
export function useOrganizationStoreHook() {
  return useOrganizationStore(store);
}
