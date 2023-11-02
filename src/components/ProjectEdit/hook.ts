import { ref, reactive, onMounted, inject } from "vue";
import type { TabsPaneContext } from "element-plus";
import clue  from './clue/index.vue'
import follow  from './follow/index.vue'
export function useProjectEdit() {
  let activeName = ref("clueCompoent");
  /* 点击tab */
  const changeTab = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
 
  return {
    activeName,
    changeTab,
    clue,
    follow
  };
}
