import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import ResouceCrud from '@/views/ResouceCrud.vue'
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component:Main,
    children: [
      {
        name:'Home',path:'/',component:Home
      },
      {
        name:'resouce-list',path:'/:resouce/list',component:ResouceCrud,props:true
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
