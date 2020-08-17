<template>
  <div class="h-screen flex flex-col">
    <!-- HEADER -->
    <div class="h-12 bg-indigo-700 text-gray-100 flex justify-center">
        <div class="container h-full flex justify-around items-center max-w-3xl">
            <router-link to='/'>
                <i class="material-icons" title="Atrás">keyboard_backspace</i>
            </router-link>
            <span>ITEMS</span>
            <i class="material-icons" title="Buscar">search</i>
        </div>
    </div>
    <!-- MAIN -->
    <div class="h-full overflow-x-hidden overflow-y-scroll flex justify-center">
        <div class="container max-w-3xl">
            <div class="w-full h-12 bg-white border p-1 flex flex-col rounded"
                v-for="i in items"
                :key="i.id">
                    <div class="text-lg text-left cursor-pointer hover:text-blue-700">
                        {{i.nombre}}    
                    </div>
                    <div class="text-sm text-right text-gray-500 flex justify-between">
                        <span>Cod:{{i.cod}}</span>
                        <span>{{i.familia}} - {{i.tipo}} Stk:{{i.almacen}}</span> 
                    </div>
            </div>
            
        </div>
    </div>
    <!-- FOOTER -->
    <PxFooter/>
  </div>
</template>

<script>
import {db} from '@/firebase'
import PxFooter from '@/components/PxFooter'
  export default {
    name: 'Items',
    components:{
        PxFooter,
    },
    data(){
      return{
        items:null,
      }
    },
    firestore() {
      return{
        items: db.collection('items')
      }
    },
  }
</script>
