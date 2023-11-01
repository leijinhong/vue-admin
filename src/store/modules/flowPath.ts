import { store } from "@/store";
import { defineStore } from "pinia";

let list = ["销售线索", "销售商机", "项目立项", "合同审批", "报价单审批"];
export const useFloePathStore = defineStore({
  id: "pure-flowPath",
  state: () => ({
    eventList: list.map<{
      label: string;
      value: 0 | 1 | 2 | 3 | 4 | 5;
    }>((item, index) => ({
      label: item,
      value: index as 0 | 1 | 2 | 3 | 4 | 5
    }))
  }),
  getters: {
    getEventList(state) {
      return state.eventList;
    }
  }
});
export function useFloePathStoreHook() {
  return useFloePathStore(store);
}
