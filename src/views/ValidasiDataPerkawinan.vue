<template>
    <div v-if="authenticated">
        <div>
            <Sidebar />
            <Navbar msg="Validasi Data Perceraian" />
        </div>
        <div v-if="marital" class="row">
            <vs-row>
                <vs-col w="6" vs-align="center">
                    <table>
                        <tr>
                            <td style="width: 120px">No.Akta Kawin</td>
                            <td style="width: 5%">:</td>
                            <td style="width: 65%">{{ marital[0].marital_number }}</td>
                        </tr><br>
                        <tr>
                            <td>No.Seri Kawin</td>
                            <td>:</td>
                            <td>{{ marital[0].marital_serial_number }}</td>
                        </tr><br>
                        <tr>
                            <td>Tempat, Tanggal Kawin</td>
                            <td>:</td>
                            <td>{{ marital[0].married_place }}, {{ marital[0].married_date}}</td>
                        </tr><br>
                        <tr>
                            <td>Alamat Tinggal</td>
                            <td>:</td>
                            <td>{{ marital[0].address }}</td>
                        </tr><br>
                        <h4 style="text-align: left;"><strong>DATA SUAMI</strong></h4>
                        <tr>
                            <td>NIK</td>
                            <td>:</td>
                            <td>{{ marital[0].husband_nik }}</td>
                        </tr><br>
                        <tr>
                            <td>Nama</td>
                            <td>:</td>
                            <td>{{ marital[0].husband_name }}</td>
                        </tr><br>
                        <tr>
                            <td>Tempat Tanggal Lahir</td>
                            <td>:</td>
                            <td>{{ marital[0].husband_birth_place }}, {{ marital[0].husband_birth_date }}</td>
                        </tr><br>
                        <tr>
                            <td>Agama</td>
                            <td>:</td>
                            <td>{{ marital[0].husband_religion }}</td>
                        </tr><br>
                        <tr>
                            <td>Kewarganegaraan</td>
                            <td>:</td>
                            <td>{{ marital[0].husband_nationality }}</td>
                        </tr><br>
                        <h4 style="text-align: left;"><strong>DATA ISTRI</strong></h4>
                        <tr>
                            <td>NIK</td>
                            <td>:</td>
                            <td>{{ marital[0].wife_nik }}</td>
                        </tr><br>
                        <tr>
                            <td>Nama</td>
                            <td>:</td>
                            <td>{{ marital[0].wife_name }}</td>
                        </tr><br>
                        <tr>
                            <td>Tempat Tanggal Lahir</td>
                            <td>:</td>
                            <td>{{ marital[0].wife_birth_place }}, {{ marital[0].wife_birth_date }}</td>
                        </tr><br>
                        <tr>
                            <td>Agama</td>
                            <td>:</td>
                            <td>{{ marital[0].wife_religion }}</td>
                        </tr><br>
                        <tr>
                            <td>Kewarganegaraan</td>
                            <td>:</td>
                            <td>{{ marital[0].wife_nationality }}</td>
                        </tr>
                    </table>
                </vs-col>
                <vs-col w="6" vs-align="center">
                    <table>
                            <tr>
                                <th>Bukti Akta Perkawinan :</th>
                            </tr>
                            <tr>
                                <td><img :src="'http://localhost:8000/api/marital/img/' + marital[0].marital_attachment" > </td>
                            </tr>
                            <tr>
                                <td><img :src="'http://localhost:8000/api/marital/husband_img/' + marital[0].husband_marital_attachment" > </td>
                            </tr>
                            <tr>
                                <td><img :src="'http://localhost:8000/api/marital/wife_img/' + marital[0].wife_marital_attachment" > </td>
                            </tr>
                        </table>
                        <div>
                            <vs-button @click="approved" color="success">Approve</vs-button>
                            <vs-button @click="deletePost" color="danger">Deny</vs-button>
                        </div>
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import { mapGetters } from 'vuex'

export default {
    name: "ValidasiDataPerkawinan",
    components: {
        Sidebar,
        Navbar,
    },
    props: ['id'],

    methods: {
        approved() {
            this.$store.dispatch('updateMarital', this.id)
            this.$router.push({name:'ValidasiPerkawinan'})
        },
        deletePost() {
            this.$store.dispatch('deleteMarital', this.id)
            this.$router.push({name:'ValidasiPerkawinan'})
        }
    }, 

    mounted(){
        this.$store.dispatch('getMaritalbyId', this.id)
    },
    computed:{
        ...mapGetters([
            'authenticated',
            'user',
            'marital'
        ])
    }
}
</script>
<style scoped>
.row {
        padding-top: 125px;
        padding-left: 350px;
}

img {
    width: 300px;
}
</style>
