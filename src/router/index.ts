import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'

const home =() => import('../views/Home.vue')
const tManage = () => import('../components/templateManage/templateManage.vue')
const tEditor = () => import('../components/templateManage/templateEditor.vue')

const cManage = () => import('../components/courseManage/courseManage.vue')
const cEditor = () => import('../components/courseManage/courseEditor.vue')

const dManage = () => import('../components/documentManage/documentManage.vue')
const dEditor = () => import('../components/documentManage/documentEditor.vue')

const login = () => import('../views/Login.vue')

const uManage = () => import('../components/userManage/userManage.vue')

const setting = () => import('../components/personalSetting/setting.vue') 

const NoPermission = () => import('../components/common/NoPermission.vue')

const main = () => import('../components/home/home.vue')

Vue.use(VueRouter)
Vue.use(VueAxios,Axios)



const routes = [
  {
    path: '',
    redirect: '/login',
    meta: { requireLogin: false }
  },{
    path: '/home',
    name: 'home',
    meta: { requireLogin: true },
    component: home,
    children:[
      {
        path: '',
        name:'main',
        meta:{requireLogin: true},
        component: main
      },
      {
        path: 'template',
        name: 'template',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: tManage
      },{
        path: 'template/tEditor',
        name: 'tEditor',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: tEditor
      },{
        path: 'template/tEditor/:templateId',
        name: 'tEditorById',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: tEditor
      },{
        path: 'course',
        name: 'course',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: cManage
      },{
        path: 'course/cEditor',
        name: 'cEditor',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: cEditor
      },{
        path: 'document',
        name: 'dManage',
        meta: { requireLogin: true },
        component: dManage
      },{
        path: 'document/dEditor/:documentId',
        name: 'dEditorById',
        meta: { requireLogin: true },
        component: dEditor
      },{
        path: 'document/dEditor',
        name: 'dEditor',
        meta: { requireLogin: true },
        component: dEditor
      },{
        path: 'user',
        name: 'uManage',
        meta: { requireLogin: true,requireAuthority: 0 },
        component: uManage
      },{
        path: 'setting',
        name: 'setting',
        meta: { requireLogin: true },
        component: setting
      },{
        path: 'NoPermission',
        name: 'NoPermission',
        meta: { requireLogin: true },
        component: NoPermission
      }
    ]
  },{
    path: '/login',
    name: 'login',
    component: login,
    meta: { requireLogin: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {//检查是否需要登录
    if(store.state.isLogin){//检测是否登录
      if(to.meta.requireAuthority!=null){//检测是否需要权限查看
        if(to.meta.requireAuthority==store.state.user.authority){
          next()
        }else{
          next({name: 'NoPermission'})
        }
      }else{
        next()
      }
    }else{
      next({name: 'login'})
    }
  }else{
    next()
  }
})




export default router
