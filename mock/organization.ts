import { MockMethod } from "vite-plugin-mock";

export default [
  // 组织机构
  {
    url: "/admin/organization/select",
    method: "get",
    response: r => {
      console.log(r);

      return {
        code: 0,
        data: {
          items: [
            {
              id: 1,
              name: "奥联",
              pid: null,
              level: null
            },
            {
              id: 2,
              name: "广东奥联",
              pid: 1,
              level: 1
            },
            {
              id: 3,
              name: "用户服务部",
              pid: 2,
              level: 2
            },
            {
              id: 4,
              name: "解决方案部",
              pid: 2,
              level: 2
            },
            {
              id: 5,
              name: "中央市场部",
              pid: 2,
              level: 2
            },
            {
              id: 6,
              name: "财务管理部",
              pid: 2,
              level: 2
            },
            {
              id: 15,
              name: "董事会",
              pid: 14,
              level: 2
            }
          ],
          total: 8
        },
        msg: "ok"
      };
    }
  }
] as MockMethod[];
