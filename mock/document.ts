import { MockMethod } from "vite-plugin-mock";

const FILEEXTENSION = ["", "pdf", "doc", "docx", "rar", "zip"];
export default [
  // 导出记录
  {
    url: "/admin/file/my",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            ...new Array(10).fill(null).map((_, id) => {
              const index = Math.floor(Math.random() * 5);
              return {
                id: id,
                name: "文件名",
                format: FILEEXTENSION[index],
                size: "2M",
                create_time: "2023-01-15 10:55:20",
                update_time: "2023-01-15 10:55:20",
                nickname: "admin"
              };
            })
          ],
          total: 11
        },
        msg: "ok"
      };
    }
  },
  // 导入记录
  {
    url: "/admin/file/public",
    method: "get",
    response: r => {
      return {
        code: 0,
        data: {
          items: [
            ...new Array(10).fill(null).map((_, index) => ({
              id: index,
              name: "文件名" + FILEEXTENSION[Math.floor(Math.random() * 5)],
              size: "2M",
              create_time: "2023-01-15 10:55:20",
              update_time: "2023-01-15 10:55:20",
              nickname: "admin"
            }))
          ],
          total: 11
        },
        msg: "ok"
      };
    }
  }
] as MockMethod[];
