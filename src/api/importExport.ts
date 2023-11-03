import { http } from "@/utils/http";
import { IEItemType } from "@/views/export/export-list/utils/type";

/** 获取导出列表 */
export const getExportList = (data?: object) => {
  return http.request<ResultType<ResultDataType<IEItemType[]>>>(
    "get",
    "/admin/export/select",
    {
      params: data
    }
  );
};
/** 获取导入列表 */
export const getImportList = (data?: object) => {
  return http.request<ResultType<ResultDataType<IEItemType[]>>>(
    "get",
    "/admin/import/select",
    {
      params: data
    }
  );
};
