// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/admin/account/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          code: 0,
          data: {
            nickname: "超级管理员",
            token: "c95524bc2d35d941666c536c3e6a3d9f",
            organization_id: 1
          }
        };
      } else {
        return {
          code: 0,
          data: {
            nickname: body.username,
            token: "c95524bc2d35d941666c536c3e6a3d9f",
            organization_id: 1
          }
        };
      }
    }
  },
  {
    url: "/admin/rule/permission",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: ["*"]
      };
    }
  }
] as MockMethod[];
