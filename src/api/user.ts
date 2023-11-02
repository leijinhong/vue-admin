import { http } from "@/utils/http";

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<
    ResultType<{
      nickname: string;
      token: string;
    }>
  >("post", "/admin/account/login", { data });
};

/** 获取权限列表 */
export const getRulePermission = (data?: object) => {
  return http.request<ResultType<string[]>>("get", "/admin/rule/permission", {
    data
  });
};

/** 获取个人资料 */
export const getAccountInfo = (data?: object) => {
  return http.request<ResultType<UserInfoType>>("get", "/admin/account/info", {
    data
  });
};

/** 获取角色列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultType<ResultDataType<UserItemType[]>>>(
    "get",
    "/admin/admin/select",
    {
      params: data
    }
  );
};
