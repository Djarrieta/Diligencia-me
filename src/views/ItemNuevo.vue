<template>
  <div class="h-screen flex flex-col">
    <!-- HEADER -->
    <PxHeader :title="title" :linkBack="linkBack" ></PxHeader>

    <!-- MAIN -->
    <div class="h-full overflow-x-hidden overflow-y-scroll flex justify-center">
        <div class="flex flex-col container max-w-3xl bg-white h-full mx-2">
          <div class="flex flex-row mt-1">
            <div class="w-20 flex justify-end items-center text-xs text-gray-700 pr-1">Nombre:</div> 
            <input v-model="nombre" class=" w-64 focus:outline-none bg-gray-500 rounded-sm px-2" type="text" >
          </div>
          <div class="flex flex-row mt-1">
            <div class="w-20 flex justify-end items-center text-xs text-gray-700 pr-1">Codigo:</div> 
            <span class="bg-gray-300 rounded-sm px-2"></span>
          </div> 
        </div>
    </div>
    <div @click="guardar(nombre)" >
      <PxSave class="cursor-pointer"></PxSave>
    </div>

    
  </div>
</template>

<script>
import {db} from '@/firebase'
import PxHeader from '@/components/PxHeader'
import PxSave from '@/components/PxSave'

  export default {
    name: 'ItemNuevo',
    components:{
        PxHeader,
        PxSave
    },
    props:['vista'],
    data(){
      return{
        title:'Nuevo item',
        linkBack:'/items',
        nombre:null
      }
    },
    methods:{
      guardar:()=>{
        db.collection('items').sort('cod').get()
        .then(x=>console.log(x))
/*         db.collection('items').doc('5').set({
          mama:n
        }) */
      }
    }
  }
</script>
