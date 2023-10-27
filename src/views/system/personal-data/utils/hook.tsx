import { reactive, ref, onMounted, h, toRaw, computed, watch, Ref } from "vue";
import { getAccountInfo } from "@/api/user";

export function useHook() {
  const loading = ref(true);
  const userForm: Ref<UserInfoType> = ref({
    id: -1,
    username: "",
    nickname: "",
    avatar: "",
    email: "",
    mobile: "",
    bank_name: "",
    bank_username: "",
    bank_account: "",
    isSupperAdmin: false,
    token: ""
  });
  const securityForm = ref({
    password: ""
  });

  async function getUserInfo() {
    loading.value = true;
    getAccountInfo().then(res => {
      if (res.code == 0) {
        userForm.value = res.data;
        loading.value = false;
      }
    });
  }

  return {
    loading,
    getUserInfo,
    userForm,
    securityForm
  };
}
