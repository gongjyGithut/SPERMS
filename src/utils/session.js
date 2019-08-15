import router from '@/router'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // getToken from cookie
const whiteList = ['/login'] // 不重定向白名单
NProgress.configure({ showSpinner: false })// NProgress configuration
router.beforeEach((to, from, next) => {
  NProgress.start()
  
  const session = sessionStorage.getItem('username')
  if(session){
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() 
    }else{
      if(!!store.getters.name){
        next()
      }else{
        
        const recordId = session.replace(/\"/g, "")
        
        store.dispatch('GetInfo',recordId).then(()=>{
          next({ ...to, replace: true })
        })
        .catch(err =>{
            store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
        // store.dispatch('GetInfo',session).then(() => {
        //   next()
        //     // 拉取user_info
        //     // const roles = res.data.roles // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
        //     // store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
        //     //   // 根据roles权限生成可访问的路由表
        //     //   router.addRoutes(accessRoutes) // 动态添加可访问路由表
              
        //     // })
        //     //next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        // })
        // .catch(err => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err)
        //     next({ path: '/' })
        //   })
        // })
      }
      
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
