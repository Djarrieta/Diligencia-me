<template>
  <div>
    {{firebaseData}}
  </div>
</template>

<script>
import {db} from '@/firebase'
  export default {
    name: 'Items',
    data(){
      return{
        firebaseData:null,
      }
    },
    firestore() {
      console.log('se crea el componente')
      return{
        firebaseData: db.collection('items')
      }
    },
  }
</script>
