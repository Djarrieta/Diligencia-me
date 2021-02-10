<template>
  <div class="flex justify-center w-full h-16 border-b border-primary-light bg-primary"> 
    <div class="container relative flex items-center justify-between mx-auto"> 
      <div class="flex">
        <!-- Menu -->
        <div 
          class="relative" >
          <svg 
            @click="menuPrincipal=!menuPrincipal"
            class="h-12 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Menu Principal -->
          <div 
            v-if="menuPrincipal" 
            @click="menuPrincipal=!menuPrincipal"
            @mouseleave="menuPrincipal=!menuPrincipal" 
            class="absolute top-0 left-0 ml-2">
            <div  class="flex flex-col px-10 pt-2 pb-6 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
              <router-link 
                to="/ingresar"
                v-if="!$store.state.currentUser"
                class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Ingresar</router-link>
              <button 
                v-if="$store.state.currentUser"
                class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Perfil</button>
            </div>
          </div>
        </div>
        <!-- Logo -->
        <div>
          <router-link class="h-12" to="/">
            <svg 
              class="h-12 cursor-pointer text-realced"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </router-link>
        </div>
      </div>
      <!-- Perfil -->
      <div 
        @click="menuProfile=!menuProfile"
        class="relative flex items-center w-12 h-12 p-1 mx-1 rounded-full cursor-pointer"
        :class="$store.state.currentUser ? 'bg-realced' : 'bg-primary-light'">
        <div class="w-full h-full rounded-full bg-primary ">
        </div>
        <!-- Menu perfil -->
        <div 
          v-if="menuProfile" 
          @mouseleave="menuProfile=!menuProfile"
          class="absolute top-0 -ml-32 rigth-0">
          <div  class="flex flex-col px-10 pt-2 pb-6 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
            <router-link 
              to="/"
              v-if="!$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Inicio</router-link>
            <router-link 
              to="/ingresar"
              v-if="!$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Ingresar</router-link>
            <button 
              v-if="$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Perfil</button>
            <button 
              v-if="$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Equipos</button>
            <button 
              v-if="$store.state.currentUser"
              @click="signOut()" 
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Salir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name:"Header",
  data(){
    return{
      menuProfile:false,
      menuPrincipal:false,
    }
  },
  methods:{
    signOut(){
      firebase.auth().signOut().catch(e=>{console.error(e)})
    }
  }

}
</script>