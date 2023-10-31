import { http } from "@/utils/http";

/** 获取项目管理列表 */
export const getProjectList = (data?: object) => {
  return http.request<any>("post", "/admin/project/select", { data });
};

/** 获取项目详情 */
export const getProjectDetail = (data?: object) => {
  return http.request<any>("get", "/admin/project/detail", { params: data });
};

