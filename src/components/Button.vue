<template>
   <button @click="buttonClicked()" class="py-2 my-3 text-xl border-2 rounded-lg border-realced hover:text-secundary-light focus:outline-none "> {{name}} </button>
</template>

<script>
export default {
  name:"Button",
  props:["name",],
  methods:{
    buttonClicked(){
      this.$emit('buttonClicked')
    }
  }
}
</script>

