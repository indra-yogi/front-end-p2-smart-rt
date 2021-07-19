<template>
    <div id="register">
        <vs-navbar color="#7d33ff" text-white square>
            <template #left>
                <h3>Add a new Administrator</h3>
            </template>
        </vs-navbar>
        <form @submit.prevent="createUser(users)">
            <div class="register-form">
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
                        <vs-input type="text" label="Full name" v-model="users.name" placeholder="Full Name"></vs-input>
                        <br><br>
                        <vs-input type="email" label="E-mail" v-model="users.email" placeholder="E-mail"></vs-input>
                        <br><br>
                        <vs-input type="text" label="No. Telepon" v-model="users.phone" placeholder="ex: +6281234567890"></vs-input>
                        <br><br>
                        <vs-input type="Text" label="Jabatan/Pekerjaan" v-model="users.position" placeholder="Jabatan/Pekerjaan"></vs-input>
                        <br><br>
                        <vs-input type="text" label="NIK" v-model="users.nik" placeholder="NIK"></vs-input>
                        <br><br>
                        <vs-input type="password" label="Password" v-model="users.password" placeholder="Password"></vs-input>
                        <br><br>
                        <vs-input type="password" label="Konfirmasi Password" v-model="users.password_confirmation" placeholder="Password"></vs-input>
                        <br><br>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
                        <vs-input type="text" label="Alamat" v-model="users.address" placeholder="Alamat"></vs-input>
                        <br><br>
                        <vs-input type="text" label="RT" v-model="users.neighbourhood" placeholder="01"></vs-input>
                        <br><br>
                        <vs-input type="Text" label="Kelurahan" v-model="users.village" placeholder="Kelurahan"></vs-input>
                        <br><br>
                        <vs-input type="Text" label="Kecamatan" v-model="users.district" placeholder="Kecamatan"></vs-input>
                        <br><br>
                        <vs-input type="Text" label="Kota" v-model="users.city" placeholder="Kota"></vs-input>
                        <br><br>
                        <vs-input type="Text" label="Provinsi" v-model="users.province" placeholder="Provinsi"></vs-input>
                        <br><br>
                        <vs-button :disabled="!isValid" flat color="primary" type="submit">Submit</vs-button>
                        <div v-for="(error, index) in errors" :key="index">
                            <vs-alert color="danger">
                            {{ error[0] }}
                            </vs-alert>
                        </div>
                    </vs-col>
                </vs-row>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddAdmin",
    data(){
        return {
            users: {
                name: '',
                email: '',
                phone: '',
                position: '',
                nik: '',
                address: '',
                neighbourhood: '',
                village: '',
                district: '',
                city: '',
                province: '',
                password: '',
                password_confirmation: '',
            },
            errors: null,
        }
    },
    methods: {
        createUser(users) {
            this.$store.dispatch('createAdmin', users).then(response =>{
        console.log(response)
      }).catch(error => {
        this.errors = error.response.data.errors
      }) 
        },
    },
    computed: {
        isValid() {
            return this.users.nik !== ''
        }
    }
}
</script>

<style scoped>
    h3 {
        padding-left: 50px;
    }

    .register-form {
        padding-top: 40px;
        margin-top: 50px;
        padding-left: 50px;
    }

    label {
        font-size: 24px;
    }
</style>