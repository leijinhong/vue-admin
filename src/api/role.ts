import { http } from "@/utils/http";
import { RoleType } from "@/views/system/role-list/utils/type";

/** 获取角色列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultType<ResultDataType<RoleType[]>>>(
    "get",
    "/admin/role/select",
    {
      params: data
    }
  );
};
