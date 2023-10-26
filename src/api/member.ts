import { http } from "@/utils/http";

/** 获取角色管理列表 */
export const getMemberList = (data?: object) => {
  return http.request<any>("post", "/admin/user/list", { data });
};

