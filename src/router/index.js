import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../../firebase/index.js'

const routes = [
  {
    path: '/',
    name: 'depan',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Depan.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "team" */ '../pages/Team.vue')
  },
  {
    path: '/kontak',
    name: 'kontak',
    component: () => import(/* webpackChunkName: "kontak" */ '../pages/Contact.vue')
  },
  {
    path: '/ptm',
    name: 'ptm',
    component: () => import(/* webpackChunkName: "kontak" */ '../pages/PTM.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import(/* webpackChunkName: "info" */ '../pages/Postinfo.vue')
  },
  {
    path: '/detailinfo/:id',
    name: 'detailinfo',
    component: () => import(/* webpackChunkName: "detailinfo" */ '../pages/Detailinfo.vue'),
    params: true
  },
  {
    path: '/pendaftaran/:namaForm',
    name: 'pendaftaran',
    component: () => import(/* webpackChunkName: "pendaftaran" */ '../pages/FormDaftar.vue'),
    params: true
  },
  {
    path: '/info/kegiatan/ptd2023',
    name: 'ptd2023',
    component: () => import(/* webpackChunkName: "ptd2023" */ '../pages/kegiatan/ptd2023.vue')
  },
  {
    path: '/info/kegiatan/ptdm2023',
    name: 'ptdm2023',
    component: () => import(/* webpackChunkName: "ptdm2023" */ '../pages/kegiatan/ptdm2023.vue')
  },
  {
    path: '/info/kegiatan/ptm2023',
    name: 'ptm2023',
    component: () => import(/* webpackChunkName: "ptdm2023" */ '../pages/kegiatan/ptm2023.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "formLogin" */ '../pages/user/formLogin.vue')
  },
  {
    path: '/updateuser',
    name: 'updateuser',
    component: () => import(/* webpackChunkName: "updateUser" */ '../pages/user/updateUser.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settingcountdown',
    name: 'settingcountdown',
    component: () => import(/* webpackChunkName: "settingCountdown" */ '../pages/data/settingCountdown.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/datacontact',
    name: 'datacontact',
    component: () => import(/* webpackChunkName: "datacontact" */ '../pages/data/dataContact.vue'),
    meta: { requiresAuth: true }
  },  
   
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    }else if(to.hash){
      return{
        el: to.hash,
        behavior: 'smooth',
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }
  next();
})

export default router