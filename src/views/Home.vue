<template>
  <div class="home">
    <div>
    <vs-button @click="activeSidebar = !activeSidebar" flat icon>
      <span class="material-icons">menu</span>
    </vs-button>
    <vs-sidebar square absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <h1>Aplikasi P2</h1>
      <br /><br /><br />
      <form @submit.prevent="userLogin">
        <vs-input label="NIK" type="text" placeholder="Enter NIK" v-model="form.nik" class="margin-left" />
        <br><br>
        <vs-input label="Password" type="password" placeholder="Password" v-model="form.password" class="margin-left" />
      <a style="text-decoration: none" href="" class="smalltext"> forgot password </a>
      <br /><br /><br /><br /><br />
        <vs-button flat color="#3467eb" :disabled="!isValid" type="submit" class="center">Login</vs-button>
        <div v-for="(error, index) in errors" :key="index">
          <vs-alert color="danger">
            {{ error[0] }}
          </vs-alert>
        </div>
      </form>
      <br />
      <a style="text-decoration: none" href="/register">
        Don't have an account? Sign up here
      </a>
      <template #footer>  
      </template>
    </vs-sidebar>
    </div>
    <h1>Aplikasi Smart RT Perkawinan dan Perceraian</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    active: "0",
    activeSidebar: false,
    form: {
      nik: '',
      password: ''
    },
    errors: null,
  }),

  methods: {
    userLogin() {
      this.$store.dispatch('login', this.form).then(response =>{
        console.log(response)
        this.$router.push({name:'Dashboard'})
      }).catch(error => {
        this.errors = error.response.data.errors
      }) 
    }
  },

  computed: {
        isValid() {
            return this.form.nik !== '' && this.form.password !== ''
        }
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 80px;
}

.smalltext {
  font-size: 12px;
}

.margin-left {
  margin-left: 20px;
}
</style>
