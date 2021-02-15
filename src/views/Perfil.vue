<template>
  <div class="container flex flex-col w-full mt-3">
    <!-- Barra de carga -->
    <progress v-if="progress" class="fixed bottom-0 left-0 w-full" :value="progress"/>
    <!-- Datos Perfil -->
    <section class="p-2 my-2 border-b border-l rounded-lg border-primary-light bg-primary">
      <h1 class="pl-4 text-4xl border-b border-primary-light">DATOS DE PERFIL</h1>
      <div class="flex flex-col-reverse sm:flex-row">
        <!-- Datos -->
        <div class="w-full px-2 pb-2 my-3">
          <!-- Nombre -->
          <div class="flex flex-col">
            <label>Nombre</label>
            <input 
              v-model="$store.state.currentUser.name"
              type="text"
              class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light">
          </div>
          <!-- Whatsapp-->
          <div class="flex flex-col ">
            <label>WhatsApp</label>
            <div class="flex items-center overflow-hidden rounded bg-primary-light">
              <input 
                v-model="$store.state.currentUser.indicative"
                type="text"
                class="w-10 px-1 py-1 text-center bg-primary-light focus:outline-none "
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
              <span class="flex items-center h-full">|</span>
              <input 
                v-model="$store.state.currentUser.whatsapp"
                type="text"
                class="px-1 py-1 bg-primary-light focus:outline-none"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')">
            </div>
          </div>
          <!-- Correo -->
          <div class="flex flex-col ">
            <label>Correo</label>
            <input 
              v-model="$store.state.currentUser.email"
              disabled
              type="email"
              class="px-1 py-1 rounded bg-primary-light focus:outline-none">
          </div>
          <!-- Acciones -->
          <div class="flex flex-col">
            <!-- Guardar -->
            <Button 
              class="mx-4" 
              
              name="Guardar Cambios" 
              @buttonClicked="saveProfile()"/>
            <div class="flex justify-around w-full">
              <!-- Cambiar Contraseña -->
              <button class="text-realced hover:text-secundary-light focus:outline-none">Cambiar Contraseña</button>
              <!-- Cambiar Contraseña -->
              <button class="text-realced hover:text-secundary-light focus:outline-none">Eliminar Cuenta</button>
            </div>
          </div>
        </div>
        <!-- Foto -->
        <div class="relative flex items-center justify-center w-full overflow-hidden">
          <img class="z-0 object-cover w-64 h-64 rounded-full" :src="profilePicTemporal ? profilePicTemporal : $store.state.currentUser.profilePic" alt="profilePicture">
          <input 	accept="image/png, image/jpeg" id="inputFile" class="absolute z-10 w-full h-full -mt-16 cursor-pointer focus:outline-none" type="file" @change="getProfilePictemporal()">
        </div >
      </div>
    </section>
    <!-- Equipos -->
    <section class="p-2 my-2 border-b border-l rounded-lg border-primary-light bg-primary">
      <div class="flex justify-between pl-4 text-4xl border-b border-primary-light">
        <h1 >EQUIPOS</h1>
         <Button name="Agregar" class="px-4" @buttonClicked="$router.replace('/equipo/0')"/>
      </div>
      <div class="flex sm:flex-row">
        <!-- Lista -->
        <div class="flex flex-col items-center w-full pt-2">
          <div 
            v-for="(i,n) in teams" 
            :key="n"
            
            class="flex items-center justify-between w-full h-24 px-2 my-1 border rounded-lg bg-primary-dark border-primary-light">
              <!-- Logo Team -->
              <div 
                class="flex items-center cursor-pointer" 
                @click="$router.replace('/equipo/'+i.id)"  >
                <img class="object-cover w-16 h-16 mr-2 rounded-full " :src="i.teamPic" alt="teamPic">
                <span>{{i.name}}</span>
              </div>
              <div class="flex items-center">
                <span>{{i.members.length}} Miembros </span>
                <svg 
                  @click="changeDefaultTeam(i.id)"
                  class="h-10 ml-4 cursor-pointer" 
                  :class="i.id===defaultTeam ? 'text-realced' : ' text-primary' " 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
          </div>
          <Loading v-if="loading"/>
          <!-- Esto está muy vacío --> 
          <div v-if="!teams.length && !loading" class="px-3 my-6 sm:px-0 sm:w-1/3">
            <span class="text-lg text-center">Esto está muy vacío. <strong class=" text-secundary-light">¡Agrega tu primer equipo!</strong></span>
            <img class="mt-6" src="https://firebasestorage.googleapis.com/v0/b/adreco-11ef9.appspot.com/o/assets%2Flist-is-empty.png?alt=media&token=9d41e34a-eb7c-4573-a41f-6fefff42e4bb" alt="list-is-empty">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import {firebase} from "@/main.js"
import {db} from "@/main.js"

export default {
  name:"Perfil",
  components:{Button,Loading},
  data(){
    return{
      profilePicTemporal:null,
      teams:[],
      progress:0,
      loading:true,
    }
  },
  mounted(){
    if(this.$store.state.currentUser){
      db.collection("teams").get()
      .then((teams)=>{teams.forEach(team => {
        const members=team.data().members

        const matches=members.filter(x=>x.email===this.email)
        if(matches.length>0){
          this.teams.push({...team.data(),id:team.id})
        }
        this.loading=false
      })})
    }
  },
  methods:{
    saveProfile(){
      const u=this.$store.state.currentUser
      if(!u.name){
        this.alert("Nombre inválido.","error")}
      if(!u.indicative){
        this.alert("Indicativo de WhatsApp inválido.","error")}
      if(!u.whatsapp){
        this.alert("Número de WhatsApp inválido.","error")}
      if(this.$store.state.alert.length>0){return}

      if (this.profilePicTemporal){
        this.$store.state.loading=true

        const storageFileName=`user/${u.uid}/profilePic.jpg`
        const storageRef = firebase.storage().ref()

        const profilePicLocalRef=document.getElementById("inputFile").files[0]
				const fileRef=storageRef.child(storageFileName);
        const uploadTask=fileRef.put(profilePicLocalRef);

        uploadTask.on("state_change",
          x=>{
            //progreso
            console.log(x.bytesTransferred/x.totalBytes)
          },
          e=>{
            //error,
            console.log(e)
             this.$store.state.loading=false
          },
          ()=>{
            uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL)=>{
              u.profilePic=downloadURL
              this.profilePicTemporal=null
              this.saveFirestoreInfo()
            })
          }
        )
      }else{
        this.saveFirestoreInfo()
      }
    },
    saveFirestoreInfo(){
      const u=this.$store.state.currentUser
      db.collection("users")
      .doc(u.uid)
      .set({
        name:u.name,
        indicative:u.indicative,
        whatsapp:u.whatsapp,
        email:u.email,
        profilePic:u.profilePic,
      })
      .then(()=>{
        this.$store.state.alert.unshift(
          {
            text:"Has guardado tus cambios satisfactoriamente!",
            type:"success"
          }
        )
        this.$store.state.loading=false
        })
      .catch(e=>{
        console.error(e)
        })
    },
    getProfilePictemporal(){
      const file=document.getElementById("inputFile").files[0]
      if(!file){return}
      this.profilePicTemporal=URL.createObjectURL(file)
    },
    changeDefaultTeam(idTeam){
      if(idTeam!=this.$store.state.currentUser.defaultTeam){
        this.$store.state.loading=true
        db.collection("users")
        .doc(this.$store.state.currentUser.uid)
        .update({defaultTeam:idTeam})
        .then(()=>{
          this.$store.state.currentUser.defaultTeam=idTeam
          this.alert("Ahora estás en el equipo " + idTeam,"success")
          this.$store.state.loading=false
        })
      }
    },
    alert(text,type){
      this.$store.state.alert.unshift({text,type})
    },


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
