/**
 * 用户列表
 */

import { store } from "@/store";
import { defineStore } from "pinia";
import { getUserList } from "@/api/user";
import { useRoute } from "vue-router";

export const useUserStore = defineStore({
  id: "user-store",
  state: () => ({
    dataList: [] as UserItemType[]
  }),
  getters: {
    async list(state): Promise<UserItemType[]> {
      const route = useRoute();
      if (state.dataList.length == 0 && route.name != "userList") {
        const res = await this.getList({ limit: 1000 });
        return res.data.items;
      } else {
        return state.dataList;
      }
    }
  },
  actions: {
    setList(data: UserItemType[]) {
      this.dataList = data;
    },
    /** 获取列表 */
    async getList(form): Promise<ResultType<ResultDataType<UserItemType[]>>> {
      const that = this;
      return new Promise(resolve => {
        getUserList(form).then(res => {
          if (res.code == 0) {
            that.setList(res.data.items);
            // that.dataList = res.data.items;
            resolve(res);
          } else if (res.code == -1) {
            resolve(res);
          }
        });
      });
    },
    add(curData: any) {
      const that = this;
      return new Promise(resolve => {
        getUserList(curData).then(res => {
          if (res.code == 0) {
            // that.getList();
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    },
    edit(curData: { id: number; pid: number; name: string }) {
      const that = this;
      return new Promise(resolve => {
        getUserList(curData).then(res => {
          if (res.code == 0) {
            // that.getList();
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    },
    del(id: number) {
      const that = this;
      return new Promise(resolve => {
        getUserList({ id }).then(res => {
          if (res.code == 0) {
            // that.getList();
            resolve(0);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    }
  }
});
export function useUserStoreHook() {
  return useUserStore(store);
}
