import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: "",
    name: '',
    component: layout,
    children: [
      {
        path: "/Home",
        name: "Home",
        component: Home
      },
    ],
  },
  // 用户列表
  {
    path: "#",
    name: '',
    meta: {
      name: "用户管理",
      icon: "el-icon-user",
    },
    component: layout,
    children: [
      {
        path: "/users/users",
        name: "users",
        component: () =>
          import("../views/users/users.vue"),
        meta: {
          icon: "el-icon-folder-opened",
          name: "用户列表",
        },
      },],
  },
  {
    path: "#",
    name: '',
    component: layout,
    meta: {
      name: "权限管理",
      icon: "el-icon-user",
    },
    children: [
      {
        path: "/rights/roles",
        name: "roles",
        component: () =>
          import("../views/roles/roles.vue"),
        meta: {
          icon: "el-icon-folder-opened",
          name: "角色列表",
        },
      },
      {
        path: "/rights/rights",
        name: "rights",
        component: () =>
          import("../views/rights/rights.vue"),
        meta: {
          icon: "el-icon-folder-opened",
          name: "权限列表",
        },
      }
    ],
  },

  {
    path: "#",
    name: "",
    component:
      layout,
    meta: {
      name: "商品管理",
      icon: "el-icon-shopping-bag-2",
    },
    children: [

      {
        path: "/goods/goods",
        name: "goods",
        component: () =>
          import("../views/goods//goods.vue"),
        meta: {
          name: "商品列表",
          icon: "el-icon-bangzhu",
        },
        // children: [, ],
      },
      {
        path: "/goods/addgoods",
        name: "addgoods",
        component: () =>
            import ("../views/addgoods/addgoods.vue"),
        meta: {
            name: "商品列表",
            icon: "el-icon-bangzhu",
        },
    },
      {
        path: "/goods/params",
        name: "params",
        component: () =>
          import("../views/params//params"),
        meta: {
          name: "分类参数",
          icon: "el-icon-bell",
        },
      },
      {
        path: "/goods/categories",
        name: "categories",
        component: () =>
          import("../views/categories/categories.vue"),
        meta: {
          name: "商品分类",
          icon: "el-icon-date",
        },
      },
    ],
  },
  {
    path: "#",
    name: "",
    component: layout,
    meta: {
      name: "订单管理",
      icon: "el-icon-s-order",
    },
    children: [{
      path: "/orders/orders",
      name: "orders",
      component: () =>
        import("../views/orders/orders"),
      meta: {
        name: "订单列表",
        icon: "el-icon-folder-add",
      },
    },],
  },
  {
    path: "#",
    name: "",
    component: layout,
    meta: {
      name: "数据统计",
      icon: "el-icon-message",
    },
    children: [{
      path: "/reports/reports",
      name: "reports",
      component: () =>
        import("../views/reports/reports.vue"),
      meta: {
        name: "数据列表",
        icon: "el-icon-position",
      },
    },],
  },
  {
    path: '/Sign',
    name: 'Sign',
    component: () => import('../views/Sign/Sign.vue'),
    meta: {
      title: '登录页'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   let adminUser = JSON.parse(localStorage.getItem('adminUser'))
//   if (to.path === '/Sign') next()
//   else adminUser ? next() : next('/Sign')
// })
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
export default router
