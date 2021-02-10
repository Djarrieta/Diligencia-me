import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Empezar from '@/views/Empezar.vue'
import Ingresar from '@/views/Ingresar.vue'
import Perfil from '@/views/Perfil.vue'
import Tienda from '@/views/Tienda.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Empezar',
    name: 'Empezar',
    component: Empezar
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component:Ingresar
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component:Perfil
  },
  {
    path: '/Tienda',
    name: 'Tienda',
    component:Tienda
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* router.beforeEach((to,from,next)=>{
  let onlyLoggedIn=to.matched.some(record=>record.meta.onlyLoggedIn)
  let onlyConfirmated=to.matched.some(record=>record.meta.onlyConfirmated)

  if(onlyLoggedIn && !this.$store.state.currentUser){
      if(onlyConfirmated && !this.$store.state.currentUser.confirmated){
          next({name:"Confirmacion"})
        }else{
          next({name:"Ingresar"})
        }
    }
}) */

export default router
