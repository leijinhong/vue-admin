export default {
    path: "/workhour",
    redirect: "/workhour/standard-hours-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "工时管理",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/workhour/standard-hours-list",
            name: "standardHoursList",
            component: () => import("@/views/workhour/standard-hours-list/index.vue"),
            meta: {
                title: "标准工时列表",
                roles: [],
            }
        },

    ]
} as RouteConfigsTable;
