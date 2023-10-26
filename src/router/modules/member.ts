export default {
    path: "/member",
    redirect: "/member/memberList",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "会员管理",
        // showLink: false,
        roles: ['/admin/user/list'],
        rank: 1
    },
    children: [
        {
            path: "/member/member-list",
            name: "memberList",
            component: () => import("@/views/member/memberList/index.vue"),
            meta: {
                title: "会员列表",
                roles: ['/admin/user/list'],
            }
        },

    ]
} as RouteConfigsTable;
