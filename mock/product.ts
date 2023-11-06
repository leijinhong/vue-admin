import { MockMethod } from "vite-plugin-mock";

export default [
  // 产品分类
  {
    url: "/admin/product-category/select",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            {
              name: "密码基础硬件",
              value: "1",
              id: 1,
              pid: null,
              children: []
            },
            {
              name: "密码管理与服务平台",
              value: "2",
              id: 2,
              pid: null,
              children: []
            },
            {
              name: "密码中间件",
              value: "3",
              id: 3,
              pid: null,
              children: []
            },
            {
              name: "即时通讯安全",
              value: "4",
              id: 4,
              pid: null,
              children: []
            },
            {
              name: "视频安全",
              value: "5",
              id: 5,
              pid: null,
              children: []
            },
            {
              name: "物联网安全",
              value: "6",
              id: 6,
              pid: null,
              children: []
            }
          ],
          total: 8
        },
        msg: "ok"
      };
    }
  },
  // 产品列表
  {
    url: "/admin/product/select",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            {
              id: 1,
              admin_id: 1,
              admin_name: "超级管理员",
              category_id: "1",
              price_desc: "al_2023060001",
              location: "品牌",
              product_name: "产品名称1",
              product_model: "15*15",
              product_version: "1.0",
              price: "360.00",
              low_price: null,
              catalog_price: "400.00",
              line: "产品线",
              morphology: "2",
              soft_name: "d0031wk",
              spec: "nova7-se",
              download: "中国广东省深圳市坂田",
              annex: "",
              business_secret_model: "中国",
              bussiness_secret_date: "2024-08-29",
              sales_license_model: "adcgfb",
              sales_license_date: "2024-08-29",
              software_copyright: "ISO9001",
              max_concurrency: "",
              network_port_number: null,
              throughput: "",
              configuration: "",
              parameters: "",
              introduction: "",
              remark: "",
              status: 0,
              created_at: "2023-08-29 10:19:11",
              updated_at: "2023-09-18 10:18:48",
              category_name: "密码基础硬件",
              category: {
                id: 1,
                pid: null,
                name: "密码基础硬件",
                created_at: "2023-08-29 10:18:12",
                updated_at: "2023-10-12 17:37:19"
              }
            }
          ],
          total: 8
        },
        msg: "ok"
      };
    }
  }
] as MockMethod[];
