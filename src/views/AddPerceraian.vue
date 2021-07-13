<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg="Tambah Data Perceraian" />
        <div class="row">
            <template v-if="authenticated">
                <form action="#" @submit.prevent="createDivorce(divorces)">
            <div class="padding-left">
              <vs-input type="Text" label="No. Akta Perceraian" v-model="divorces.divorce_number" placeholder="No. Akta Perceraian"></vs-input>
              <br><br>
              <vs-input type="Text" label="No. Akta Perkawinan" v-model="divorces.marital_number" placeholder="No. Akta Perkawinan"></vs-input>
              <br><br>
              <vs-input type="Text" label="No. Seri Perceraian" v-model="divorces.divorce_serial_number" placeholder="No. Seri Perceraian"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tanggal Perceraian" v-model="divorces.divorce_date" placeholder="hari-bulan-tahun"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Perceraian" v-model="divorces.divorce_place" placeholder="Tempat Perceraian"></vs-input>
              <br><br>
              <vs-input type="Text" label="Nama Lengkap" v-model="divorces.name" placeholder="Nama"></vs-input>
              <br><br>
              <vs-input type="Text" label="NIK" v-model="divorces.nik" placeholder="NIK"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Lahir" v-model="divorces.birth_place" placeholder="Tempat Lahir"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tanggal Lahir" v-model="divorces.birth_date" placeholder="hari-bulan-tahun"></vs-input>
              <br><br>
              <vs-input type="Text" label="Agama" v-model="divorces.religion" placeholder="Agama"></vs-input>
              <br><br>
              <vs-input type="Text" label="Alamat" v-model="divorces.address" placeholder="Alamat"></vs-input>
              <br><br>
              <vs-input type="file" label="Attachment"></vs-input>
              <br><br>
              <vs-button flat color="primary" type="submit">Submit</vs-button>
            </div>
            </form>
            </template>
        </div>    
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import {mapGetters} from 'vuex'

export default {
    name: "AddPerceraian",
    components: {
        Sidebar,
        Navbar,
    },
    data(){
        return {
            divorces: {
                divorce_number:'',
                marital_number:'',
                divorce_serial_number:'',
                divorce_date:'',
                divorce_place:'',
                name:'',
                nik:'',
                birth_place:'',
                birth_date:'',
                religion:'',
                address:'',
            },
            errors: null
        }
    },
    methods: {
     createDivorce(divorces) {
            this.$store.dispatch('createDivorce', divorces).then(response =>{
        console.log(response)
        this.$router.push({name:'DataPerceraian'})
      }).catch(error => {
        this.errors = error.response.data.errors
      }) 
        },
    }, 
    computed: {
      ...mapGetters([
        'authenticated'
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