/**
 * 用于角色的增删改查
 */

import { store } from "@/store";
import { defineStore } from "pinia";
import { getRoleList } from "@/api/role";
import { handleTree } from "@/utils/tree";
import { RoleType } from "@/views/system/role-list/utils/type";
import { useRoute } from "vue-router";

export const useRoleStore = defineStore({
  id: "pure-role",
  state: () => ({
    dataList: [] as RoleType[]
  }),
  getters: {
    async list(state): Promise<RoleType[]> {
      const route = useRoute();

      if (state.dataList.length == 0 && route.name != "roleList") {
        const res = await this.getList();
        return res.data.items;
      } else {
        return state.dataList;
      }
    },
    async treeList(): Promise<RoleType[]> {
      const list = await this.list;
      return handleTree(list, "id", "pid");
    }
  },
  actions: {
    setList(data: RoleType[]) {
      this.dataList = data;
    },
    /** 获取列表 */
    async getList(form) {
      const that = this;
      return new Promise<ResultType<ResultDataType<RoleType[]>>>(resolve => {
        getRoleList(form).then(res => {
          if (res.code == 0) {
            that.setList(res.data.items);
            resolve(res);
          } else if (res.code == -1) {
            resolve(res);
          }
        });
      });
    },
    add(curData: { pid: number; name: string }) {
      return new Promise(resolve => {
        getRoleList(curData).then(res => {
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
        getRoleList(curData).then(res => {
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
        getRoleList({ id }).then(res => {
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
export function useRoleStoreHook() {
  return useRoleStore(store);
}
