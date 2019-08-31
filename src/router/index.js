import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    hidden: true,
    children: [{
      path: 'index',
      name: '个人中心',
      component: () => import('@/views/personal/index'),
      meta: { title: '个人中心'},
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      //meta: { title: '首页'},
    }]
  },

  {
    path: '/dev-manage',
    component: Layout,
    redirect: '/dev-manage/index',
    meta: { title: '设备管理', icon: 'dev-manage' },
    children: [
      {
        path: 'message',
        name: '设备信息',
        component: () => import('@/views//dev-manage/message/index'),
        meta: { title: '设备信息' },
      },
      {
        path: 'deploy',
        name: '设备应用信息',
        component: () => import('@/views//dev-manage/deploy/index'),
        meta: { title: '设备应用信息'},
      }
    ]
  },

  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '统计报表',
        component: () => import('@/views/charts/index'),
        meta: { title: '统计报表', icon: 'charts' }
      }
    ]
  },

  {
    path: '/setting',
    redirect: '/setting/index',
    component: Layout,
    meta:{title:'系统管理',icon: 'setting'},
    children: [
      {
        path: 'customer',
        name: '客户信息',
        component: () => import('@/views/setting/customer/index'),
        meta: { title: '客户信息'}
      },{
        path:'caculation',
        name:'计费方式',
        component:() => import('@/views/setting/caculation/index'),
        meta: { title: '计费方式'}
      },{
        path:'rentmanager',
        name:'租赁信息',
        component:() => import('@/views/setting/rentmanager/index'),
        meta: { title: '租赁信息'}
      },{
        path:'sysmenu',
        name:'菜单信息',
        component:() => import('@/views/setting/sysmenu/index'),
        meta: { title: '菜单信息'}
      },{
        path:'users',
        name:'用户管理',
        component:() => import('@/views/setting/users/index'),
        meta: { title: '用户管理'}
      }
      ,{
        path:'sysrole',
        name:'角色管理',
        component:() => import('@/views/setting/sysrole/index'),
        meta: { title: '角色管理'}
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
