import { message } from "@/utils/message";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h, toRaw, computed, watch } from "vue";
import { ElMessageBox } from "element-plus";
const { VITE_CONFIG_URL } = import.meta.env;
export function dialogData() {
  const { switchStyle } = usePublicHooks();
  const menuList = reactive([""]);
  return {};
}
