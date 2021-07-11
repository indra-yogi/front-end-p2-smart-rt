<template>
  <div class="home">
    <div>
    <Login />
    </div>
    <h1>Aplikasi Smart RT Perkawinan dan Perceraian</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/LoginSidebar.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
