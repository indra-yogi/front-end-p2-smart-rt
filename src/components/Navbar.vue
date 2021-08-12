<template>
  <div>
    <vs-navbar color="#0088CC" text-white square center-collapsed>
      <h2>{{ msg }}</h2>
      <template v-if="auth.authenticated" #right>
        <h5>{{ auth.user.name }}</h5>
        <vs-button flat color="danger" @click="logout">Logout</vs-button>
      </template>
      <template v-else #right>
        <vs-button style="background-color: #f1f1f1;color: #2c3e50; font-weight: bold" to="Home">Login</vs-button>
      </template>
    </vs-navbar>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  data: () => ({
    active: "0",
    activeSidebar: false,
  }),
  computed: {
    ...mapGetters({
      auth: 'auth',
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("authLogout")
      window.location.href = "/"
    }
  }
};
</script>

<style scoped>
h2 {

  overflow: hidden;
  padding-left: 40px;

}

::placeholder {
  color: black;
  opacity: 1;

}

h5 {
  padding-right: 20px;
}
</style>