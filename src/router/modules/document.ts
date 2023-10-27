export default {
    path: "/document",
    redirect: "/document/my-folders",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "文档管理",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/document/my-folders",
            name: "myFolders",
            component: () => import("@/views/document/my-folders/index.vue"),
            meta: {
                title: "我的资料夹",
                roles: [],
            }
        },
		{
		    path: "/document/public-folders",
		    name: "publicFolders",
		    component: () => import("@/views/document/public-folders/index.vue"),
		    meta: {
		        title: "公共资料夹",
		        roles: [],
		    }
		},

    ]
} as RouteConfigsTable;
