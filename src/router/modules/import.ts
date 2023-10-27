export default {
    path: "/import",
    redirect: "/import/import-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "导入管理",
        // showLink: false,
        rank: 9
    },
    children: [
        {
            path: "/import/import-list",
            name: "importList",
            component: () => import("@/views/import/import-list/index.vue"),
            meta: {
                title: "导入管理",
                roles: [],
            }
        },
         

    ]
} as RouteConfigsTable;
