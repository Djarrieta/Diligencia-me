<template>
  <div class="container flex flex-col w-full mt-3">
    <div class="flex flex-col-reverse sm:flex-row">
      <!-- Datos -->
      <div class="w-full px-2 pb-2 my-3">
        <!-- Nombre -->
        <div class="flex flex-col">
          <label>Nombre</label>
          <input 
            v-model="name"
            type="text"
            class="px-1 py-1 rounded text-letraDark focus:outline-none">
        </div>
        <!-- Whatsapp-->
        <div class="flex flex-col ">
          <label>WhatsApp</label>
          <div class="flex items-center overflow-hidden bg-white rounded">
            <input 
              v-model="indicative"
              type="text"
              class="w-10 px-1 py-1 text-center text-letraDark focus:outline-none "
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
            <span class="flex items-center h-full">|</span>
            <input 
              v-model="whatsapp"
              type="text"
              class="px-1 py-1 text-letraDark focus:outline-none"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
          </div>
        </div>
        <!-- Correo -->
        <div class="flex flex-col ">
          <label>Correo</label>
          <input 
            v-model="email"
            disabled
            type="email"
            class="px-1 py-1 bg-white rounded text-letra focus:outline-none">
        </div>
        <!-- Acciones -->
        <div class="flex flex-col">
          <!-- Guardar -->
          <button  class="py-1 my-3 rounded-lg bg-fondoLight hover:bg-realceAzul focus:outline-none hover:text-letraLight"> Guardar Cambios</button>
          <div class="flex justify-around w-full">
            <!-- Cambiar Contraseña -->
            <button class=" text-realceAzul">Cambiar Contraseña</button>
            <!-- Cambiar Contraseña -->
            <button class=" text-realceAzul">Eliminar Cuenta</button>
          </div>
        </div>
      </div>
      <!-- Foto -->
      <div class="flex items-center justify-center w-full">
        <div class="w-64 h-64 p-1 my-3 overflow-hidden rounded-full bg-realceAzul">
          <img :src="img" alt="profilePicture">
        </div>
      </div >
    </div>
    <!-- Equipos -->
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="text-2xl ">Equipos</h1> 
      <div class="w-full max-w-3xl rounded-lg bg-fondo"> tabla</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Perfil",
  data(){
    return{
      name:null,
      indicative:null,
      whatsapp:null,
      email:null,
      img:null
    }
  },
  mounted(){
    this.name=this.$store.state.currentUser.name
    this.indicative=this.$store.state.currentUser.indicative
    this.whatsapp=this.$store.state.currentUser.whatsapp
    this.email=this.$store.state.currentUser.email
  },
  methods:{
/*     SendMail(){
      window.Email.send(
        {
          SecureToken : "15b50171-a11e-4dbf-a5d6-9525e51cff72",
          To : "notificacioneswebapp@gmail.com",
          From : "notificacioneswebapp@gmail.com",
          Subject : "CR-Lotes: TIENES UN NUEVO MENSAJE SIN LEER📧",
          Body : "Tienes un nuevo mensaje sin leer en CR-Lotes. Ve a revisar dando click acá http://localhost:8080/mensajes"
        })
        .then(()=>console.log("mensaje enviado"))
        .catch(e=>console.error(e))
    } */
  }

}
</script>