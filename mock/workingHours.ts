import { MockMethod } from "vite-plugin-mock";

export default [
  // 组织机构
  {
    url: "/admin/hours/select",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            ...new Array(10).fill(null).map((_, index) => ({
              id: index,
              code: "SJ2023123456",
              event_name: "安装系统",
              hours: "1.0",
              notes: "",
              status: 1,
              nickname: "王佳佳",
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
