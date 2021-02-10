<template >
<div class="w-full max-w-sm">
    <div
     class="container flex flex-col w-full p-4 my-4 border-b border-l sm:rounded-lg bg-primary border-primary-light">
     <!-- Nombre -->
      <div v-if="action==='Registrarse'" class="flex flex-col ">
        <label>Nombre</label>
        <input 
          v-model="name"
          type="text"
          class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light">
      </div>
     <!-- Whatsapp-->
      <div v-if="action==='Registrarse'" class="flex flex-col my-3">
        <label>WhatsApp</label>
        <div class="flex items-center overflow-hidden rounded bg-primary-light">
          <input 
            v-model="indicative"
            type="text"
            class="w-10 px-1 py-1 text-center text-secundary focus:outline-none bg-primary-light focus:bg-primary-light active:bg-primary-light "
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
          <span class="flex items-center h-full">|</span>
          <input 
            v-model="whatsapp"
            type="text"
            class="px-1 py-1 text-secundary focus:outline-none bg-primary-light focus:bg-primary-light active:bg-primary-light"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
        </div>
      </div>
     <!-- Correo -->
      <div class="flex flex-col my-3">
        <label>Correo</label>
        <input 
          v-model="email"
          type="email"
          class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light active:bg-primary-light">
      </div>
      <!-- Contraseña -->
      <div class="flex flex-col my-3">
        <label>Contraseña</label>
        <input 
          v-model="password"
          type="password"
          class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light active:bg-primary-light">
      </div>
      <!-- Confirmation -->
      <div 
        class="flex flex-col my-3" 
        v-if="action==='Registrarse'">
        <label>Confirmación contraseña</label>
        <input 
          v-model="password2"
          type="password"
          class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light active:bg-primary-light">
      </div>
      <!-- Problems -->
      <span class=" text-error"> {{problems}} </span>
      <!-- Acción -->
      <button @click="runAction" class="py-2 my-3 text-xl rounded-lg bg-realced hover:text-secundary-light focus:outline-none hover:text-letraLight"> {{action}} </button>
      <div class="flex flex-col items-start pt-2 mt-2 border-t border-primary-light">
        <button v-if="action==='Ingresar'" @click="resetPass()" class="text-realced hover:text-secundary-light focus:outline-none">Restablecer contraseña</button>
        <button 
          @click="changeAction"
          class="text-realced hover:text-secundary-light focus:outline-none">{{action==="Ingresar" ? "Crear una cuenta" : "Ya tengo una cuenta"}}  </button>
      </div>
    </div>
</div>
</template>

<script>
import firebase from "firebase"
import {db} from "@/main.js"
export default {
  name:"Ingresar",
  data(){
    return{
      confirmation:false,
      action:"Ingresar",
      name:"",
      indicative:57,
      whatsapp:null,
      email:"",
      password:null,
      password2:null,

      problems:null
    }
  },
  mounted(){
    if(localStorage.action){this.action=localStorage.action}
    if(localStorage.name){this.name=localStorage.name}
    if(localStorage.indicative){this.indicative=localStorage.indicative}
    if(localStorage.whatsapp){this.whatsapp=localStorage.whatsapp}
    if(localStorage.email){this.email=localStorage.email}

  },
  watch:{
    action(){
      localStorage.action=this.action
    },
    name(){
      localStorage.name=this.name
    },
    indicative(){
      localStorage.indicative=this.indicative
    },
    whatsapp(){
      localStorage.whatsapp=this.whatsapp
    },
    email(){
      localStorage.email=this.email
    },

    problems(){
      if(this.problems){
        setTimeout(()=>{this.problems=null},2000)
      }
    }
  },
  methods:{
    runAction(){
      if(this.action==="Ingresar"){
        this.login()
      }else if(this.action==="Registrarse"){
        this.signup()
      }
    },
    signup(){
      this.problems=null;
      if(this.password!=this.password2){this.problems="Las contraseñas no coinciden."}
      if(!this.whatsapp){this.problems="Número de teléfono no válido."}
      if(!this.indicative){this.problems="Número de teléfono no válido."}
      if(!this.name){this.problems="Nombre inválido."}
      if(this.problems){return}
      firebase.auth()
      .createUserWithEmailAndPassword(this.email,this.password)
      .then((currentUser)=>{
        db.collection("users").doc(currentUser.user.uid.toString()).set({
          name:this.name,
          email:this.email,
          indicative:this.indicative,
          whatsapp:this.whatsapp,
        })
      })
      .catch(e=>{
        console.error(e)
        if(e.code==="auth/invalid-email"){this.problems="Correo inválido."}
        if(e.code==="auth/email-already-in-use"){this.problems="Ya hay una cuenta vinculada a este correo."}
        if(e.code==="auth/weak-password"){this.problems="Coloca una contraseña más dificil de adivinar."}
      })
    },
    login(){
      this.problems=null;
      if(!this.password){this.problems="La contraseña no puede estar vacía."}
      if(this.problems){return}
      firebase.auth()
      .signInWithEmailAndPassword(this.email,this.password)
      .then(()=>{
        this.problems = null
        this.$router.replace("/")
      })
      .catch(e=>{
        console.error(e)
        if(e.code==="auth/argument-error"){this.problems="Datos inválidos."}
        if(e.code==="auth/invalid-email"){this.problems="Correo electrónico inválido."}
        if(e.code==="auth/user-not-found"){this.problems="El correo ingresado no existe."}
        if(e.code==="auth/wrong-password"){this.problems="Contraseña incorrecta."}
      })
    },
    resetPass(){
      if(!this.email){this.problems="Coloca por favor un correo registrado para hacer el proceso de cambio de contraseña."}
      if(this.problems){return}
      firebase.auth()
        .sendPasswordResetEmail(this.email)
        .then(this.problems=`Hemos enviado un correo a ${this.email}.`)
        .catch(e=>{
          console.error(e)
          if (e.code == "auth/user-not-found")
          {this.problems=`No hay ninguna cuenta asociada a ${this.email}. Puedes crear una nueva.`}
        })
    },
    changeAction(){
      if(this.action==="Ingresar"){
        this.action="Registrarse"
      }else if(this.action==="Registrarse"){
        this.action="Ingresar"
      }
    }
  }
}
</script>
