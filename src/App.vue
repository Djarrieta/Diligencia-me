<template>
  <div class="relative">
    <div  id="app" class="flex flex-col items-center min-h-screen bg-primary-dark text-secundary">
      <Header/>
      <router-view  style="min-height: calc(100vh - 4rem)"/>
    </div>
    <!-- Loading -->
    <div v-if="$store.state.loading" class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center opacity-75 bg-primary">
      <svg 
        class="h-24 cursor-pointer text-realced"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      <Loading/>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import Loading from "@/components/Loading"
export default {
  components:{Header,Loading},
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
