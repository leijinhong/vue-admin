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

function buildTree(data) {
  const map = new Map();
  const tree = [];

  // Create a map of nodes using their IDs as keys
  data.forEach(node => {
    map.set(node.id, { ...node, children: [] });
  });

  // Build the tree structure
  data.forEach(node => {
    const parentNode = map.get(node.pid);

    if (parentNode) {
      parentNode.children.push(map.get(node.id));
    } else {
      tree.push(map.get(node.id));
    }
  });

  return tree;
}
export const useOrganizationStore = defineStore({
  id: "pure-organization",
  state: () => ({
    dataList: [] as OrganizationItemType[]
  }),
  getters: {
    async list(state): Promise<OrganizationItemType[]> {
      if (state.dataList.length == 0) {
        const res = await this.getList();
        return res;
      } else {
        return state.dataList;
      }
    },
    async treeList(): Promise<OrganizationItemType[]> {
      const list = await this.list;
      return buildTree(list);
    }
  },
  actions: {
    /** 获取列表 */
    async getList() {
      const that = this;
      return new Promise(resolve => {
        getOrganization({
          limit: 1000
        }).then(res => {
          if (res.code == 0) {
            that.dataList = res.data.items;
            resolve(res.data.items);
          } else if (res.code == -1) {
            resolve(res.msg);
          }
        });
      });
    },
    add(curData: { pid: number; name: string }) {
      const that = this;
      return new Promise(resolve => {
        addOrganization(curData).then(res => {
          if (res.code == 0) {
            that.getList();
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
        editOrganization(curData).then(res => {
          if (res.code == 0) {
            that.getList();
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
        delOrganization({ id }).then(res => {
          if (res.code == 0) {
            that.getList();
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
