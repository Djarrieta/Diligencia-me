<template>
  <div class="h-screen flex flex-col">
    <!-- HEADER -->
    <PxHeader :title="title" :linkBack="linkBack" ></PxHeader>

    <!-- MAIN -->
    <div class="h-full overflow-x-hidden overflow-y-scroll flex justify-center">
        <div class="flex flex-col container max-w-3xl bg-white h-full mx-2">
          <div class="flex flex-row mt-1">
            <div class="w-20 flex justify-end items-center text-xs text-gray-700 pr-1">Nombre:</div> 
            <input class=" w-64 focus:outline-none bg-gray-500 rounded-sm px-2" type="text" :value=item.nombre>
          </div>
          <div class="flex flex-row mt-1">
            <div class="w-20 flex justify-end items-center text-xs text-gray-700 pr-1">Codigo:</div> 
            <span class="bg-gray-300 rounded-sm px-2">{{item.cod}}</span>
          </div> 
        </div>
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase'
import PxHeader from '@/components/PxHeader'
  export default {
    name: 'ItemDetalle',
    components:{
        PxHeader,
    },
    props:['vista'],
    data(){
      return{
        item:null,
        title:'Detalle item',
        linkBack:'/items'
      }
    },
    firestore() {
      const cod=this.$route.params.cod;
       return{
        item: db.doc('items/'+cod)
      }
    },
  }
</script>
