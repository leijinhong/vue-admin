import { http } from "@/utils/http";

/** 获取工时列表 */
export const getHoursList = (data?: object) => {
  return http.request<ResultType<ResultDataType<HoursItemType[]>>>(
    "get",
    "/admin/hours/select",
    {
      params: data
    }
  );
};
