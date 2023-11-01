// 公共接口
import { http } from "@/utils/http";
/** 获取项目类型的下拉数据 */
export const getProjectType = (data?: object) => {
  return http.request<any>("post", "/admin/project/type");
};

/** 获取项目阶段的下拉数据 */
export const getProjectStage = (data?: object) => {
  return http.request<any>("post", "/admin/project/stage");
};

/** 获取项目规模的下拉数据 */
export const getProjectScale = (data?: object) => {
  return http.request<any>("post", "/admin/project/scale");
};
/** 获取运作方式的下拉数据 */
export const getOperationMode = (data?: object) => {
  return http.request<any>("post", "/admin/operation/mode");
};
/** 获取客户列表的下拉数据 */
export const getCustomerList = (data?: object) => {
  return http.request<any>("post", "/admin/customer/list");
};

