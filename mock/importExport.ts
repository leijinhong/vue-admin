import { MockMethod } from "vite-plugin-mock";

export default [
  // 导出记录
  {
    url: "/admin/export/select",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            ...new Array(10).fill(null).map((_, index) => ({
              id: index,
              type: "产品",
              total: 100,
              nickname: "张莉莉",
              create_time: "2023-01-15 10:55:20"
            }))
          ],
          total: 8
        },
        msg: "ok"
      };
    }
  },
  // 导入记录
  {
    url: "/admin/import/select",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            ...new Array(10).fill(null).map((_, index) => ({
              id: index,
              type: "产品",
              total: 100,
              nickname: "张莉莉",
              create_time: "2023-01-15 10:55:20"
            }))
          ],
          total: 8
        },
        msg: "ok"
      };
    }
  }
] as MockMethod[];
