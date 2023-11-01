import { http } from "@/utils/http";

/** 获取组织结构列表 */
export const getOrganization = (data?: object) => {
  return http.request<ResultType<ResultDataType<OrganizationItemType[]>>>(
    "get",
    "/admin/organization/select",
    {
      params: data
    }
  );
};

export const addOrganization = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/organization/select", {
    params: data
  });
};

export const editOrganization = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/organization/select", {
    params: data
  });
};

export const delOrganization = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/organization/select", {
    params: data
  });
};
