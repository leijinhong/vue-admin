export default {
    path: "/customer",
    redirect: "/customer/customer-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "客户",
        // showLink: false,
        rank: 1
    },
    children: [
        {
            path: "/customer/customer-list",
            name: "customerList",
            component: () => import("@/views/customer/customer-list/index.vue"),
            meta: {
                title: "客户列表",
                roles: [],
            }
        },
		{
		    path: "/customer/contact-list",
		    name: "contactList",
		    component: () => import("@/views/customer/contact-list/index.vue"),
		    meta: {
		        title: "联系人列表",
		        roles: [],
		    }
		},
		{
		    path: "/customer/channel-authorization",
		    name: "channelAuth",
		    component: () => import("@/views/customer/channel-authorization/index.vue"),
		    meta: {
		        title: "渠道授权书",
		        roles: [],
		    }
		},
        

    ]
} as RouteConfigsTable;
