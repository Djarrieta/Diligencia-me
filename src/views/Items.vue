<template>
  <div class="h-screen flex flex-col">
    <!-- HEADER -->
    <PxHeader :title="title" :linkBack="linkBack" ></PxHeader>

    <!-- MAIN -->
    <div class="h-full overflow-x-hidden overflow-y-scroll flex justify-center">
        <div class="container max-w-3xl">
            <div class="w-full h-16 bg-white border p-1 flex flex-col rounded justify-between"
                v-for="i in items"
                :key="i.id">
                  <router-link :to="{name:'ItemDetalle',params:{cod:i.cod}}" class="text-lg text-left cursor-pointer hover:text-blue-700">
                    {{i.nombre}}  
                  </router-link>   
                  <div class="text-sm text-right text-gray-500 flex justify-between">
                      <span>Cod:{{i.cod}}</span>
                      <span>{{i.familia}} - {{i.tipo}} Stk:{{i.almacen}}</span> 
                  </div>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <PxFooter/>
    <PxNew :linkNew="linkNew"/>
  </div>
</template>

<script>
import {db} from '@/firebase'
import PxFooter from '@/components/PxFooter'
import PxHeader from '@/components/PxHeader'
import PxNew from '@/components/PxNew'
  export default {
    name: 'Items',
    components:{
        PxFooter,
        PxHeader,
        PxNew
    },
    props:['vista'],
    data(){
      return{
        items:null,
        title:'ITEMS',
        linkBack:'/',
        linkNew:'/itemnuevo'
      }
    },
    firestore() {
      return{
        items: db.collection('items')
      }
    },
  }
</script>
