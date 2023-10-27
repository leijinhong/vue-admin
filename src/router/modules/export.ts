export default {
    path: "/export",
    redirect: "/export/export-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "导出管理",
        // showLink: false,
        rank: 10
    },
    children: [
        {
            path: "/export/export-list",
            name: "exportList",
            component: () => import("@/views/export/export-list/index.vue"),
            meta: {
                title: "导出管理",
                roles: [],
            }
        },
    

    ]
} as RouteConfigsTable;
