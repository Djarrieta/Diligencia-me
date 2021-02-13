import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js"

import Home from '@/views/Home.vue'
import Ingresar from '@/views/Ingresar.vue'
import Perfil from '@/views/Perfil.vue'
import Equipo from '@/views/Equipo.vue'
import Tareas from '@/views/Tareas.vue'
import Error404 from '@/views/Error404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      restrictions:"none"
    }
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component:Ingresar,
    meta:{
      restrictions:"noLoggedOnly"
    }
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component:Perfil,
    meta:{
      restrictions:"loggedOnly"
    }
  },
  {
    path: '/equipo/:id',
    name: 'Equipo',
    component:Equipo,
    meta:{
      restrictions:"loggedOnly"
    }
  },
  {
    path: '/:team/tareas',
    name: 'Tareas',
    component:Tareas,
    meta:{
      restrictions:"teamedOnly"
    }
  },
  {
    path:'*',
    name:'Error404',
    component:Error404,
    meta:{
      restrictions:"none"
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//redirección automática cuando no hay usuario
router.beforeEach((to,from,next) => {
  const restrictions=to.meta.restrictions
  const user=store.state.currentUser!=null
  let team=null
  
  if(user && store.state.currentUser.defaultTeam){
    team=store.state.currentUser.defaultTeam
  }
   
  if(user && restrictions==="noLoggedOnly"){
    store.state.alert.unshift(
      {
        text:"No puedes ingresar, ya ingresaste. Finaliza sesión primero.",
        type:"error"
      }
    )
    next("/perfil")
  }else if(!user && restrictions==="loggedOnly"){
    store.state.alert.unshift(
      {
        text:"Necesitas una cuenta, crea una o ingresa si ya la tienes.",
        type:"error"
      }
    )
    next("/ingresar")
  }else if(!team && restrictions==="teamedOnly"){
    store.state.alert.unshift(
      {
        text:"Necesitas un equipo para continuar. Agrega un equipo primero.",
        type:"error"
      }
    )
    next("/perfil")
  }else{
    next();
  }

});

export default router
