import { MockMethod } from "vite-plugin-mock";

export default [
  // 项目类型
  {
    url: "/admin/project/type",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          items: [
            {
              label:'产品销售',
              value:'0',
            },
            {
              label:'集成项目',
              value:'1',
            },
            {
              label:'定制项目',
              value:'2',
            },
            {
              label:'综合项目',
              value:'3',
            }
          ],
        },
        msg: "ok"
      };
    }
  },
  // 项目阶段
  {
    url: "/admin/project/stage",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          items: [
            {
              label:'销售线索',
              value:'0',
            },
            {
              label:'销售商机',
              value:'1',
            },
            {
              label:'项目立项',
              value:'2',
            },
           
          ],
        },
        msg: "ok"
      };
    }
  },
  // 项目规模
  {
    url: "/admin/project/scale",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          items: [
            {
              label:'50W以下',
              value:'0',
            },
            {
              label:'50W-100W',
              value:'1',
            },
            {
              label:'100W-200W',
              value:'2',
            },
            {
              label:'200W-500W',
              value:'3',
            },
            {
              label:'500W-1000W',
              value:'4',
            }
          ],
        },
        msg: "ok"
      };
    }
  },
  // 运作方式
  {
    url: "/admin/operation/mode",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          items: [
            {
              label:'公开招标',
              value:'0',
            },
            {
              label:'邀请招标',
              value:'1',
            },
            {
              label:'竞争性谈判',
              value:'2',
            },
            {
              label:'比选',
              value:'3',
            },
            {
              label:'其他',
              value:'4',
            }
          ],
        },
        msg: "ok"
      };
    }
  },
  // 客户列表
  {
    url: "/admin/customer/list",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          items: [
            {
              label:'深圳市奥联信息安全技术有限公司',
              value:'0',
            },
            {
              label:'深圳市毕方网络科技有限公司',
              value:'1',
            },
            {
              label:'北京企密安信息安全技术有限公司',
              value:'2',
            },
            {
              label:'深圳市国鑫恒运信息安全有限公司',
              value:'3',
            },
            {
              label:'上海哲韵实业有限公司',
              value:'4',
            },
            {
              label:'上海熠洪科技有限公司',
              value:'5',
            }
            ,
            {
              label:'洪都航空工业集团有限公司',
              value:'6',
            }
            ,
            {
              label:'上海岩山科技股份有限公司',
              value:'7',
            }
          ],
        },
        msg: "ok"
      };
    }
  },
 
] as MockMethod[];
