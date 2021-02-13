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

      <!-- Acción -->
      <Button @buttonClicked="runAction()" :name="action" />
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
import {firebase} from "@/main.js"
import {db} from "@/main.js"
import Button from "@/components/Button"
export default {
  name:"Ingresar",
  components:{Button},
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
      if(this.password!=this.password2){
        this.alert("Las contraseñas no coinciden.","error")}
      if(!this.whatsapp || !this.indicative){
        this.alert("Número de teléfono no válido.","error")}
      if(!this.name){
        this.alert("Nombre no válido.","error")}
      if(this.$store.state.alert.length>0){return}

      firebase.auth()
      .createUserWithEmailAndPassword(this.email,this.password)
      .then((currentUser)=>{
        db.collection("users").doc(currentUser.user.uid.toString()).set({
          name:this.name,
          email:this.email,
          indicative:this.indicative,
          whatsapp:this.whatsapp,
        })
        .then(()=>{
          this.alert("Cuenta creada con éxito. Ve a crear tu primer equipo.","success")
        })
      })
      .catch(e=>{
        console.error(e)
        if(e.code==="auth/invalid-email"){
          this.alert("Correo inválido.","error")}
        if(e.code==="auth/email-already-in-use"){
          this.alert("Ya hay una cuenta vinculada a este correo.","error")}
        if(e.code==="auth/weak-password"){  
          this.alert("Coloca una contraseña más dificil de adivinar.","error")}
      })
    },
    login(){
      if(!this.password){
        this.alert("Contraseña inválida.","error")
      }
      if(this.$store.state.alert.length>0){return}

      firebase.auth()
      .signInWithEmailAndPassword(this.email,this.password)
      .then(()=>{
        this.problems = null
        this.$router.replace("/")
      })
      .catch(e=>{
        console.error(e)
        if(e.code==="auth/argument-error"){
          this.alert("Datos inválidos.","error")
        }
        if(e.code==="auth/invalid-email"){
          this.alert("Correo electrónico inválido.","error")
        }
        if(e.code==="auth/user-not-found"){
          this.alert("El correo ingresado no existe.","error")
        }
        if(e.code==="auth/wrong-password"){
          this.alert("Contraseña incorrecta.","error")
        }
      })
    },
    resetPass(){
      if(!this.email){
        this.alert("Correo inválido. Digita un correo para enviar un correo de recuperación","error")
        }
      if(this.$store.state.alert.length>0){return}
      firebase.auth()
        .sendPasswordResetEmail(this.email)
        .then(()=>{
          this.alert(`Hemos enviado un correo a ${this.email}.`,"info")})
        .catch(e=>{
          console.error(e)
          if (e.code == "auth/user-not-found"){
            this.alert(`No hay ninguna cuenta asociada a ${this.email}. Puedes crear una nueva.`,"error")
          }
        })
    },
    alert(text,type){
      this.$store.state.alert.unshift({text,type})
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
