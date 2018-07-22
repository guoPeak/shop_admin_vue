import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'

import Home from '@/components/home/Home'

import UserList from '@/components/userlist'
import RolesList from '@/components/roleslist'
import Rightlist from '@/components/rightlist'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      component: Home,
      children: [
        { path: '/userlist', component: UserList },
        { path: '/roleslist', component: RolesList },
        { path: '/rightslist', component: Rightlist }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('访问了页面', to, from)

  if (to.path === '/login') return next()

  if (localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})

export default router
