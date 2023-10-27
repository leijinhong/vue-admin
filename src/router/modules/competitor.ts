export default {
    path: "/competitor",
    redirect: "/competitor/competitor-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "竞品",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/competitor/competitor-list",
            name: "competitorList",
            component: () => import("@/views/competitor/competitor-list/index.vue"),
            meta: {
                title: "竞争对手",
                roles: [],
            }
        },

    ]
} as RouteConfigsTable;
