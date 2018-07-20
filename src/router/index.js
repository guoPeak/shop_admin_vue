import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'

import Home from '@/components/home/Home'

import UserList from '@/components/userlist'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      component: Home,
      children: [
        { path: '/userlist', component: UserList }
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
