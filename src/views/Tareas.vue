<template>
  <div>
    Tareas
  </div>
</template>

<script>
export default {
  name:"Tareas",
  created(){
    console.log(this.$route.params.team)
  }
}
</script>
