import { MockMethod } from "vite-plugin-mock";

export default [
  // 会员列表
  {
    url: "/admin/user/list",
    method: "post",
    response: () => {
      const LENGTH = 8;
      return {
        code: 0,
        data: {
          data: [
            ...new Array(LENGTH).fill(null).map((_, id) => ({
              // 编号
              id: id,
              // 头像
              // 会员名称
              name: "ccc" + id,
              // 手机号
              phone: 18888888888,
              // shengr生日
              brthday: 1689755889,
              // 所在地区
              area_str: "广东省深圳市",
              // 会员类型
              type: "老师",
              // 是否为Vip
              is_vip: Math.round(Math.random()),
              status: Math.round(Math.random()),
              // 注册时间
              registerTime: 1689755889,
              // 性别
              sex: Math.round(Math.random()),
              // 邮箱
              email: "149999@qq.com",
              // 微信
              weChat: "18888888888",
              // qq
              qq: "1556467787",
              // 简介
              intro: "简介",
              // 最后登录IP
              lastLoginIp: "127.0.0.1",
              // 最后登录时间
              lastLoginTime: 1689755889,
              // 余额
              balance: 200,
              // Vip到期时间
              vipExpirationTime: 1689825702,
              // 简历信息
              resumeInfo: {
                // 所在地区
                site: "广东省深圳市龙华区",
                // 详细地址
                detailsArea: "大道",
                // 毕业/就读院校
                school: "湖南理工",
                // 所学专业
                major: "计算机",
                // 老师类别
                teacherType: "金牌讲师",
                // 可授学科
                mayGiveLessonsInfo: "美术，音乐",
                // 授课经验
                experience: "五年以上",
                // 可授区域
                mayGiveArea: "龙华区，龙岗区",
                /**
                 * 授课时间
                 * 0上午 -> ['','','','*','','*','*']
                 * 1下午 -> ['','*','','*','*','','']
                 * 2晚上 -> ['','','','','','','']
                 */
                classHours: "0|3.5.6,1|1.3.4",
                // 擅长学科
                excelSubject: "英语，数学",
                // 荣誉奖项
                honor: [
                  ...new Array(4)
                    .fill(null)
                    .map(
                      _ =>
                        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
                    )
                ],
                // 认证图片
                authentication: [
                  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
                ],
                // 简介
                brief: "简介",
                // 详细介绍
                detailsBrief: "详细介绍"
              }
            }))
          ],
          total: LENGTH
        },
        msg: ""
      };
    }
  }
] as MockMethod[];
