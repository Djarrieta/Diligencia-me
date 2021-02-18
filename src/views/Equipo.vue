<template>
  <div class="container flex flex-col w-full mt-3">
    <!-- Datos Equipo -->
    <section class="p-2 my-2 border-b border-l rounded-lg border-primary-light bg-primary">
      <h1 class="pl-4 text-4xl border-b border-primary-light">DATOS DEL EQUIPO</h1>
      <div class="flex flex-col-reverse sm:flex-row">
        <!-- Datos -->
        <div class="w-full px-2 pb-2 my-3">
          <!-- Alias -->
          <div class="flex flex-col">
            <label>Alias</label>
            <input 
              v-model="alias"
              type="text"
              :disabled="id!=0"
              class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light"
              maxlength="10"
              oninput="this.value = this.value.replace(' ','').toLowerCase()">
          </div>
          <!-- Nombre -->
          <div class="flex flex-col">
            <label>Nombre</label>
            <input 
              v-model="name"
              type="text"
              class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light">
          </div>

          <!-- Documento -->
          <div class="flex flex-col">
            <label>Documento</label>
            <input 
              v-model="doc"
              type="text"
              class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light"
              oninput="this.value = this.value.replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1')">
          </div>
          <!-- Correo -->
          <div class="flex flex-col ">
            <label>Correo</label>
            <input 
              v-model="email"
              type="email"
              class="px-1 py-1 rounded bg-primary-light focus:outline-none">
          </div>
          <!-- Dirección -->
          <div class="flex flex-col">
            <label>Dirección</label>
            <input 
              v-model="dir"
              type="text"
              class="px-1 py-1 rounded text-secundary focus:outline-none bg-primary-light focus:bg-primary-light">
          </div>

          <!-- Acciones -->
          <div class="flex flex-col">
            <!-- Guardar -->
            <Button class="mx-4" name="Guardar" @buttonClicked="saveTeam()"/>
            <div class="flex justify-around w-full">
              <!-- Cambiar Contraseña -->
              <button class="text-realced hover:text-secundary-light focus:outline-none">Eliminar Equipo</button>
            </div>
          </div>
        </div>
        <!-- Foto -->
        <div class="relative flex items-center justify-center w-full overflow-hidden">
          <img class="z-0 object-cover w-64 h-64 rounded-full" :src="teamPicTemporal ? teamPicTemporal : teamPic" alt="teamPicture">
          <input 	accept="image/png, image/jpeg" id="inputFile" class="absolute z-10 w-full h-full -mt-16 cursor-pointer focus:outline-none" type="file" @change="getTeamPictemporal()">
        </div >
      </div>
    </section>
    <!-- MIEMBROS -->
    <section class="p-2 my-2 border-b border-l rounded-lg border-primary-light bg-primary">
      <div class="flex justify-between pl-4 text-4xl border-b border-primary-light">
        <h1 >MIEMBROS</h1>
         <Button @buttonClicked="addMember()" name="Agregar" class="px-4" />
      </div>
      <div class="flex sm:flex-row">
        <!-- Lista -->
        <div class="flex flex-col items-center w-full pt-2">
          <div 
            v-for="(i,n) in members" 
            :key="n"
            class="flex items-center justify-between w-full h-24 px-2 my-1 border rounded-lg bg-primary-dark border-primary-light">
              <!-- profile member -->
              <div 
                class="flex items-center cursor-pointer">
                <!-- <img class="object-cover w-16 h-16 mr-2 rounded-full "  alt="profilePicMember"> -->
                <span>{{i.email}}</span>
              </div>
              <div>
                <span> {{i.roll}} </span>
              </div>
          </div>
          <Loading v-if="localLoading"/>
          <!-- Esto está muy vacío --> 
          <div v-if="!members.length && !localLoading" class="px-3 my-6 sm:px-0 sm:w-1/3">
            <span class="text-lg text-center">Esto está muy vacío. <strong class=" text-secundary-light">¡Agrega miembros a tu equipo!</strong></span>
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
  name:"Equipo",
  components:{Button,Loading},
  data(){
    return{
      id:"",
      alias:"",
      name:"",
      doc:"",
      email:"",
      dir:"",
      teamPic:"",
      members:[],

      teamPicTemporal:"",
      localLoading:false
    }
  },
  created(){
    this.id = this.$route.params.id;
    
    if(this.id==0){
      this.teamPic="https://firebasestorage.googleapis.com/v0/b/adreco-11ef9.appspot.com/o/assets%2FTeamPic.png?alt=media&token=93ea1dbb-e7ff-4fbf-8dfd-21d2718c6e66"
    }else{
      this.$store.state.loading=true
      console.log("arranca a buscar los datos iniciales")
      db.collection("teams").doc(this.id).get()
      .then((info)=>{
        if(!info.exists){
          this.$router.replace("/perfil")
          this.localLoading=false
          return
        }

        const data=info.data()
        this.alias=info.id
        this.name=data.name
        this.doc=data.doc
        this.email=data.email
        this.dir=data.dir
        this.teamPic=data.teamPic
        this.members=data.members
        this.$store.state.loading=false

      }).catch(e=>{
        this.$store.state.loading=false
        console.log(e)
      })
    }
  },
  methods:{
    getTeamPictemporal(){
      const file=document.getElementById("inputFile").files[0]
      if(!file){return}
      this.teamPicTemporal=URL.createObjectURL(file)
    },
    saveTeam(){
      if(!this.name){
        this.$store.state.alert.unshift(
          {
            text:"Nombre inválido.",
            type:"error"
          }
        )
      }
      if(!this.alias || this.alias.length<3){
        this.$store.state.alert.unshift(
          {
            text:"Alias inválido. Ingresa un alias entre 3 y 7 caracteres.",
            type:"error"
          }
        )
      }
      if(this.$store.state.alert.length>0){return}

      this.$store.state.loading=true
      if (this.teamPicTemporal){
        const storageFileName=`teams/${this.alias}/teamPic.jpg`
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
              this.teamPic=downloadURL
              this.teamPicTemporal=null
              this.saveFirestoreInfo()
            })
          }
        )
      }else{
        this.saveFirestoreInfo()
      }
    },
    saveFirestoreInfo(){
      db.collection("teams")
      .doc(this.alias)
      .set({
        name:this.name,
        doc:this.doc,
        email:this.email,
        dir:this.dir,
        teamPic:this.teamPic,
        members:[
          {email:this.$store.state.currentUser.email,roll:"ownner"}
        ],
      })
      .then(()=>{
        this.$store.state.loading=false
        this.$store.state.alert.unshift(
          {
            text:"Has guardado tus cambios satisfactoriamente!",
            type:"success"
          }
        )
        
        this.$router.push("/equipo/"+this.alias)
      })
      .catch(e=>{
        console.error(e)
        this.$store.state.loading=false
      })
    },
    addMember(){
      console.log("this.addMember")
    },
  }
}
</script>