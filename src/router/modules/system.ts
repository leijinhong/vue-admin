export default {
    path: "/system",
    redirect: "/system/user-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "系统管理",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/system/user-list",
            name: "userList",
            component: () => import("@/views/system/user-list/index.vue"),
            meta: {
                title: "用户管理",
                roles: [],
            }
        },
		{
		    path: "/system/role-list",
		    name: "roleList",
		    component: () => import("@/views/system/role-list/index.vue"),
		    meta: {
		        title: "角色管理",
		        roles: [],
		    }
		},
		{
		    path: "/system/organization-list",
		    name: "organizationList",
		    component: () => import("@/views/system/organization-list/index.vue"),
		    meta: {
		        title: "组织结构管理",
		        roles: [],
		    }
		},
		{
		    path: "/system/approval-flow-list",
		    name: "approvalFlowList",
		    component: () => import("@/views/system/approval-flow-list/index.vue"),
		    meta: {
		        title: "审批流管理",
		        roles: [],
		    }
		},
		{
		    path: "/system/log-list",
		    name: "logList",
		    component: () => import("@/views/system/log-list/index.vue"),
		    meta: {
		        title: "日志管理",
		        roles: [],
		    }
		},
		

    ]
} as RouteConfigsTable;
