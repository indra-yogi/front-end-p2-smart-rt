<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg=" Tambah Data Perkawinan" />
        <div class="row">
            <div class="padding-left">
                <template v-if="authenticated">
                <form @submit.prevent="createMarital(maritals)">
                 <vs-row>
                     <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
              <vs-input type="Text" label="No. Akta Perkawinan" v-model="maritals.marital_number" placeholder="No. Akta Perkawinan"></vs-input>
              <br><br>
              <vs-input type="Text" label="No. Seri Perkawinan" v-model="maritals.marital_serial_number" placeholder="No. Seri Perkawinan"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tanggal Perkawinan" v-model="maritals.married_date" placeholder="hari-bulan-tahun"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Perkawinan" v-model="maritals.married_place" placeholder="Tempat Perkawinan"></vs-input>
              <br><br>
              <vs-input type="Text" label="Nama Suami" v-model="maritals.husband_name" placeholder="Nama Suami"></vs-input>
              <br><br>
              <vs-input type="Text" label="NIK Suami" v-model="maritals.husband_nik" placeholder="NIK Suami"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Lahir Suami" v-model="maritals.husband_birth_place" placeholder="Tempat Lahir Suami"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tanggal Lahir Suami" v-model="maritals.husband_birth_date" placeholder="hari-bulan-tahun"></vs-input>
              <br><br>
              <vs-input type="Text" label="Kewarganegaraan Suami" v-model="maritals.husband_nationality" placeholder="Kewarganegaraan Suami"></vs-input>
              <br><br>
              <vs-input type="Text" label="Agama Suami" v-model="maritals.husband_religion" placeholder="Agama Suami"></vs-input>
              <br><br>
                     </vs-col>
                     <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
              <vs-input type="Text" label="Nama Istri" v-model="maritals.wife_name" placeholder="Nama Istri"></vs-input>
              <br><br>
              <vs-input type="Text" label="NIK Istri" v-model="maritals.wife_nik" placeholder="NIK Istri"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Lahir Istri" v-model="maritals.wife_birth_place" placeholder="Tempat Lahir Istri"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tanggal Lahir Istri" v-model="maritals.wife_birth_date" placeholder="hari-bulan-tahun"></vs-input>
              <br><br>
              <vs-input type="Text" label="Kewarganegaraan Istri" v-model="maritals.wife_nationality" placeholder="Kewarganegaraan Istri"></vs-input>
              <br><br>
              <vs-input type="Text" label="Agama Istri" v-model="maritals.wife_religion" placeholder="Agama Istri"></vs-input>
              <br><br>
              <vs-input type="Text" label="Alamat" v-model="maritals.address" placeholder="Alamat"></vs-input>
              <br><br>
              <vs-input type="file" label="Foto Akta Perkawinan" v-model="maritals.marital_attachment"></vs-input>
              <br><br>
              <vs-input type="file" label="Foto Buku Nikah Suami" v-model="maritals.husband_marital_attachment"></vs-input>
              <br><br>
              <vs-input type="file" label="Foto Buku Nikah Istri" v-model="maritals.wife_marital_attachment"></vs-input>
              <br><br>
                     </vs-col>
               </vs-row>
              <vs-button flat color="primary" type="submit">Submit</vs-button>
              </form> 
              </template>
            </div>
        </div>    
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import {mapGetters} from 'vuex'

export default {
    name: "AddPerkawinan",
    components: {
        Sidebar,
        Navbar,
    },
    data(){
        return {
            maritals: {
                marital_number:'',
                marital_serial_number:'',
                married_date:'',
                married_place:'',
                husband_name:'',
                husband_nik:'',
                husband_birth_place:'',
                husband_birth_date:'',
                husband_nationality:'',
                husband_religion:'',
                wife_name:'',
                wife_nik:'',
                wife_birth_place:'',
                wife_birth_date:'',
                wife_nationality:'',
                wife_religion:'',
                address:'',
            },
            errors: null
        }
    },
    methods: {
      createMarital(maritals) {
            this.$store.dispatch('createMarital', maritals).then(response =>{
        console.log(response)
        this.$router.push({name:'DataPerkawinan'})
      }).catch(error => {
        this.errors = error.response.data.errors
      }) 
        },
    },
    computed: {
      ...mapGetters([
        'authenticated',
        'user'
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

    .row {
        padding-top: 125px;
        padding-left: 250px;


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