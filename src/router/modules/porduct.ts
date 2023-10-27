export default {
    path: "/product",
    redirect: "/product/product-list",
    meta: {
        icon: "streamline:interface-award-crown-reward-social-rating-media-queen-vip-king-crown",
        title: "产品",
        // showLink: false,
        rank: 3
    },
    children: [
        {
            path: "/product/product-list",
            name: "productList",
            component: () => import("@/views/product/product-list/index.vue"),
            meta: {
                title: "产品列表",
                roles: [],
            }
        },
		{
		    path: "/product/product-categories",
		    name: "productCategories",
		    component: () => import("@/views/product/product-categories/index.vue"),
		    meta: {
		        title: "产品分类",
		        roles: [],
		    }
		},

    ]
} as RouteConfigsTable;
