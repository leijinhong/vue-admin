// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          success: true,
          data: {
            username: "admin",
            roles: ["*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2023/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: true,
          data: {
            username: "common",
            roles: ["/admin/user/list", '/admin/user/add', '/admin/user/edit'],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: "2023/10/30 00:00:00"
          }
        };
      }
    }
  }
] as MockMethod[];
