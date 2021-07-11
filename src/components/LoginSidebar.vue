<template>
  <div class="hello">
    <vs-button @click="activeSidebar = !activeSidebar" flat icon>
      <span class="material-icons">menu</span>
    </vs-button>
    <vs-sidebar square absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <h1>Aplikasi P2</h1>
      <br /><br /><br />
      <form @submit.prevent="login">
      <vs-sidebar-item>
        <label for="NIK">NIK</label>
        <vs-input type="text" placeholder="Enter NIK" v-model="nik" />
      </vs-sidebar-item>

      <vs-sidebar-item>
        <label for="Password">Password</label>
        <vs-input type="password" placeholder="Password" v-model="password" />
      </vs-sidebar-item>
      <a style="text-decoration: none" href="" class="smalltext"> forgot password </a>
      <br /><br /><br /><br /><br />
        <vs-button flat color="#3467eb" type="submit" class="center">Login</vs-button>
      </form>
      <br />
      <a style="text-decoration: none" href="/register">
        Don't have an account? Sign up here
      </a>
      <template #footer>  
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data: () => ({
    active: "0",
    activeSidebar: false,
    nik: '',
    password: ''
  }),

  methods: {
    login() {
      this.$store.dispatch('login', {
        nik: this.nik,
        password: this.password,
      })
      .then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

h1 {
  padding-left: 0px;
  padding-right: 30px;
}

.smalltext  {
  font-size: 10px;
  padding-left: 30px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 80px;
}
</style>
