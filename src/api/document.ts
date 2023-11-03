import { http } from "@/utils/http";

/** 我的文件列表 */
export const getFileMyList = (data?: object) => {
  return http.request<ResultType<ResultDataType<FileType[]>>>(
    "get",
    "/admin/file/my",
    {
      params: data
    }
  );
};

/** 公共文件列表 */
export const getFilePublicList = (data?: object) => {
  return http.request<ResultType<ResultDataType<FileType[]>>>(
    "get",
    "/admin/file/public",
    {
      params: data
    }
  );
};
