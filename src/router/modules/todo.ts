export default {
    path: "/todo",
    redirect: "/todo/approval-quotes",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "待办",
        // showLink: false,
        rank: 1
    },
    children: [
        {
            path: "/todo/approval-quotes",
            name: "approvalQuotes",
            component: () => import("@/views/todo/approval-quotes/index.vue"),
            meta: {
                title: "待审报价单",
                roles: [],
            }
        },
        {
            path: "/todo/approval-contracts",
            name: "approvalContracts",
            component: () => import("@/views/todo/approval-contracts/index.vue"),
            meta: {
                title: "待审批合同",
                roles: [],
            }
        },
        {
            path: "/todo/approval-profit-budget",
            name: "approvalProfitBudget",
            component: () => import("@/views/todo/approval-profit-budget/index.vue"),
            meta: {
                title: "待审批毛利预算",
                roles: [],
            }
        },
        {
            path: "/todo/approval-seals",
            name: "approvalSeals",
            component: () => import("@/views/todo/approval-seals/index.vue"),
            meta: {
                title: "待审批用印",
                roles: [],
            }
        },
        {
            path: "/todo/approval-shipping",
            name: "approvalShipping",
            component: () => import("@/views/todo/approval-shipping/index.vue"),
            meta: {
                title: "待审批发货",
                roles: [],
            }
        },
        {
            path: "/todo/approval-invoicing",
            name: "approvalInvoicing",
            component: () => import("@/views/todo/approval-invoicing/index.vue"),
            meta: {
                title: "待审批开票",
                roles: [],
            }
        },
        {
            path: "/todo/pending-tasks",
            name: "pending",
            component: () => import("@/views/todo/pending-tasks/index.vue"),
            meta: {
                title: "待查阅任务",
                roles: [],
            }
        },
        {
            path: "/todo/approved-tasks",
            name: "approvedTasks",
            component: () => import("@/views/todo/approved-tasks/index.vue"),
            meta: {
                title: "已审批任务",
                roles: [],
            }
        },
        {
            path: "/todo/viewed-tasks",
            name: "viewedTasks",
            component: () => import("@/views/todo/viewed-tasks/index.vue"),
            meta: {
                title: "已查阅任务",
                roles: [],
            }
        },


    ]
} as RouteConfigsTable;
