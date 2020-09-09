<template>
    <router-link class="absolute bg-indigo-700 text-white h-12 w-12 bottom-0 right-0 rounded-full mb-20 mr-4 md:mr-12 flex justify-center items-center cursor-pointer" :to="linkNew">
        <i class="material-icons">add</i>
    </router-link>
</template>
<script>
    export default {
        props:{
            linkNew:{
                type:String,
                default:()=>""
            },
        }
    }
</script>