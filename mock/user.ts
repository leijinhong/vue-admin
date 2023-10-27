// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/admin/account/info",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: {
          "id": 1,
          "username": "admin",
          "nickname": "超级管理员",
          "avatar": "\/admin\/images\/avatar.png",
          "email": "123@456.com",
          "mobile": "13699779479",
          "bank_name": "中国银行",
          "bank_username": "超管",
          "bank_account": "136997794791645312",
          "isSupperAdmin": true,
          "token": "c95524bc2d35d941666c536c3e6a3d9f"
        },
        msg: ''
      };
    }
  }
] as MockMethod[];
