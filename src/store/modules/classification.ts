/**
 * 用于管理产品分类的增删改查
 */

import { store } from "@/store";
import { defineStore } from "pinia";
import {
  getClassification,
  addClassification,
  editClassification,
  delClassification
} from "@/api/product";
import { handleTree } from "@/utils/tree";
import { useRoute } from "vue-router";

export const useClassificationStore = defineStore({
  id: "pure-classification",
  state: () => ({
    dataList: [] as CategoriesType[]
  }),
  getters: {
    async list(state): Promise<CategoriesType[]> {
      const route = useRoute();
      if (state.dataList.length == 0 && route.name != "productCategories") {
        const res = await this.getList();
        return res.data.items;
      } else {
        return state.dataList;
      }
    },
    async treeList(): Promise<CategoriesType[]> {
      const list = await this.list;
      return handleTree(list, "id", "pid");
    }
  },
  actions: {
    /** 获取列表 */
    async getList(form) {
      const that = this;
      return new Promise<ResultType<ResultDataType<CategoriesType[]>>>(
        resolve => {
          getClassification(form).then(res => {
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
        addClassification(curData).then(res => {
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
        editClassification(curData).then(res => {
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
        delClassification({ id }).then(res => {
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
export function useClassificationStoreStoreHook() {
  return useClassificationStore(store);
}
