<template>
    <div @click="guardarItem" class="absolute bg-indigo-700 text-white h-12 w-12 bottom-0 right-0 rounded-full mb-20 mr-4 md:mr-12 flex justify-center items-center">
        <i class="material-icons">save</i>
    </div>
</template>
<script>
    import {db} from '@/firebase'
    export default {
            props:{
            itemID:{
                type:String,
                default:()=>""
            },
        },
        methods:{
            guardarItem:()=>{
                let item = db.collection('items').doc(this.itemID)
                item.update({
                    'nombre':'otro nombre'
                })
            }
        }
    }
</script>

