import { http } from "@/utils/http";

/** 获取项目管理列表 */
export const getProjectList = (data?: object) => {
  return http.request<any>("post", "/admin/project/select", { data });
};

