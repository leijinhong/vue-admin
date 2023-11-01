import { http } from "@/utils/http";

/** 获取审批流列表 */
export const getFlowPath = (data?: object) => {
  return http.request<ResultType<ResultDataType<FlowPathType[]>>>(
    "post",
    "/admin/flow/path",
    {
      data
    }
  );
};
