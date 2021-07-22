<template>
    <div class="full-height" v-if="authenticated">
        <Sidebar />
        <Navbar msg="Validasi Data Perceraian" />
        <div class="row" v-if="divorce">
            <vs-row>
                <vs-col w="6" vs-align="center">
                    <table>
                        <tr>
                            <td style="width: 120px">Nama</td>
                            <td style="width: 5%">:</td>
                            <td style="width: 65%">{{ divorce[0].name }}</td>
                        </tr><br>
                        <tr>
                            <td>NIK</td>
                            <td>:</td>
                            <td>{{ divorce[0].nik }}</td>
                        </tr><br>
                        <tr>
                            <td>No.Akta Cerai</td>
                            <td>:</td>
                            <td>{{ divorce[0].divorce_number}}</td>
                        </tr><br>
                        <tr>
                            <td>No.Seri Cerai</td>
                            <td>:</td>
                            <td>{{ divorce[0].divorce_serial_number }}</td>
                        </tr><br>
                        <tr>
                            <td>No.Akta Kawin</td>
                            <td>:</td>
                            <td>{{ divorce[0].marital_number }}</td>
                        </tr><br>
                        <tr>
                            <td>Agama</td>
                            <td>:</td>
                            <td>{{ divorce[0].religion }}</td>
                        </tr><br>
                        <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td>{{ divorce[0].address }}</td>
                        </tr><br>
                    </table>
                </vs-col>
                <vs-col w="6" vs-align="center">
                    <table>
                        <tr>
                            <th>Bukti Akta Perceraian :</th>
                        </tr>
                        <tr>
                            <td><img :src="'http://localhost:8000/api/divorce/img/' + divorce[0].attachment" > </td>
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
import {mapGetters} from 'vuex'

export default {
    name: "ValidasiDataPerceraian",
    components: {
        Sidebar,
        Navbar,
    },
    props: ["id"],
    data(){
        return {
            errors: null
        }
    },
    mounted(){
        this.$store.dispatch('getDivorcebyId', this.id)
    },
    methods: {
        approved() {
            this.$store.dispatch('updateDivorce', this.id)
            this.$router.push({name:'ValidasiPerceraian'})
        },
        deletePost() {
            this.$store.dispatch('deleteDivorce', this.id)
            this.$router.push({name:'ValidasiPerceraian'})
        }
    }, 
    computed: {
      ...mapGetters([
        'authenticated',
        'user',
        'divorce',
        'image',
      ])
    }
}
</script>

<style scoped>
    .full-height {
    height: 100%;
        

}
* {
    box-sizing: border-box;
}

/* Create three equal columns that floats next to each other */
    .column {
    float: left;
    width: 33.33%;
    padding: 10px;
    
}
    img {
      width: 200px;  
    }

    .row {
        padding-top: 125px;
        padding-left: 350px;


}
/* Clear floats after the columns */
    .row:after {
    content: "";
    display: table;
    clear: both;
}


    .card {
    padding: 16px;
    text-align: center;
    background-color: #f1f1f1;
}
    .vs-input-content {
        align-content: stretch;
        justify-content: center;


}
.content {
    margin-left: 40px;
    padding-left: 40px;
}

.side{
    margin-right: 40px;
}

.center {
        display: flex;
        align-items: center;
        justify-content: center;
        
}

.padding-left {
  padding-left: 90px;
}
</style>