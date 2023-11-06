import { http } from "@/utils/http";

/** 获取产品分类列表 */
export const getClassification = (data?: object) => {
  return http.request<ResultType<ResultDataType<CategoriesType[]>>>(
    "get",
    "/admin/product-category/select",
    {
      params: data
    }
  );
};

export const addClassification = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product-category/select", {
    params: data
  });
};

export const editClassification = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product-category/select", {
    params: data
  });
};

export const delClassification = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product-category/select", {
    params: data
  });
};

/** 获取产品列表 */
export const getProductList = (data?: object) => {
  return http.request<ResultType<ResultDataType<ProductItemType[]>>>(
    "get",
    "/admin/product/select",
    {
      params: data
    }
  );
};

export const addProductList = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product/select", {
    params: data
  });
};

export const editProductList = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product/select", {
    params: data
  });
};

export const delProductList = (data?: object) => {
  return http.request<ResultType<[]>>("get", "/admin/product/select", {
    params: data
  });
};
