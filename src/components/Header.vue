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
            <div  class="flex flex-col px-10 pt-4 pb-6 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
              <router-link 
                v-for="(i,n) in $store.state.menuPrincipalItems"
                :key="n"
                :to="i.to"
                class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">{{i.name}}</router-link>
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
        class="relative flex items-center w-12 h-12 p-1 mx-1 rounded-full cursor-pointer "
        :class="$store.state.currentUser ? 'bg-realced' : 'bg-primary-light'">
        <div class="flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-primary">
          <img 
            v-if="$store.state.currentUser" 
            class="object-cover h-full"
            :src="$store.state.currentUser.profilePic" 
            alt="profilepic">
        </div>
        <!-- Menu perfil -->
        <div 
          v-if="menuProfile" 
          @mouseleave="menuProfile=!menuProfile"
          class="absolute top-0 pb-4 -ml-32 rigth-0">
          <div  class="flex flex-col px-10 pt-4 pb-6 mt-16 border-b border-l rounded-lg border-primary-light bg-primary">
            <router-link 
              to="/ingresar"
              v-if="!$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Ingresar</router-link>
            <router-link 
              to="/perfil"
              v-if="$store.state.currentUser"
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center whitespace-no-wrap border-b rounded hover:bg-primary-light border-primary-light text-realced"> {{$store.state.currentUser.name || "perfil"}} </router-link>
            <button 
              v-if="$store.state.currentUser"
              @click="signOut()" 
              class="w-full px-4 py-1 mb-1 overflow-hidden text-center border-b rounded hover:bg-primary-light border-primary-light text-realced">Salir</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Alerts -->
    <div 
      v-if="this.$store.state.alert"
      class="fixed top-0 left-0 w-full mt-16 ml-3 ">
        <div 
          v-for="(e,n) in $store.state.alert"
          :key="n"
          class="z-auto w-64 p-2 my-2 border rounded-lg cursor-pointer bg-primary-light">
           <span v-if="e.type==='success'" class="text-success">{{e.text}}</span>
           <span v-if="e.type==='info'" class="text-info">{{e.text}}</span>
           <span v-if="e.type==='error'" class="text-error">{{e.text}}</span>
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
    },
  },
  watch:{
    '$store.state.alert'(val){
      if(val.length>0){
        setTimeout(() => {
          if(val.length>0){
            this.$store.state.alert.pop()}
        }, 2000);
      }
    },
    '$store.state.currentUser'(u){
      /* Este watcher cambia la ruta una vez carga firebase y el estado de vuex, porque ambos se demoran en responder */
      if(u  && this.$route.path!="/perfil"){
        this.$router.replace("/perfil")
      }else if(this.$route.path!="/"){
        this.$router.replace("/")
      }
      },
  }

}
</script>