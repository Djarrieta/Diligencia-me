<template>
    <div class="h-12 bg-indigo-700 text-gray-100 flex justify-center">
        <div class="container h-full flex justify-around items-center max-w-3xl">
            <router-link :to="linkBack">
                <i class="material-icons" title="Atrás">keyboard_backspace</i>
            </router-link>
            <span>{{title}}</span>
            <i class="material-icons" title="Buscar">search</i>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:()=>""
            },
            linkBack:{
                String,
                default:()=>""
            }
        }
    }
</script>