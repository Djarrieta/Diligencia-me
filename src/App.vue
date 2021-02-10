<template>
  <div id="app" class="flex flex-col items-center min-h-screen bg-primary-dark text-secundary">
    <Header/>
    <router-view  style="min-height: calc(100vh - 4rem)"/>
  </div>
</template>
<script>
import Header from "@/components/Header"
export default {
  components:{Header}
}
</script>>
<style lang="postcss">
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  input[type=number] { -moz-appearance:textfield; }
</style>
