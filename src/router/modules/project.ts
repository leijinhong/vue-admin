export default {
    path: "/project",
    redirect: "/project/project-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "项目",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/project/project-list",
            name: "projectList",
            component: () => import("@/views/project/project-list/index.vue"),
            meta: {
                title: "项目列表",
                roles: [],
            }
        },

    ]
} as RouteConfigsTable;
