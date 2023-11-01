import { MockMethod } from "vite-plugin-mock";

export default [
  // 会员列表
  {
    url: "/admin/flow/path",
    method: "post",
    response: () => {
      const LENGTH = 3;
      return {
        code: 0,
        data: {
          data: [
            ...new Array(LENGTH).fill(null).map((_, id) => ({
              id: id,
              event: Math.floor(Math.random() * 5),
              level: Math.floor(Math.random() * 4),
              reviewedBy: "张美丽",
              editing: false
            }))
            // {
            //   event: +new Date() + "",
            //   level: 1,
            //   reviewedBy: "",
            //   editing: true
            // }
          ],
          total: LENGTH
        },
        msg: ""
      };
    }
  }
] as MockMethod[];
