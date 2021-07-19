<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg="Tambah Data Perceraian" />
        <div class="row">
            <template v-if="authenticated">
                <form action="#" @submit.prevent="createDivorce">
                <div class="padding-left">
                <vs-row>
                <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
              <vs-input type="Text" label="No. Akta Perceraian" v-model="divorces.divorce_number" placeholder="No. Akta Perceraian"></vs-input>
              <br><br>
              <vs-input type="Text" label="No. Akta Perkawinan" v-model="divorces.marital_number" placeholder="No. Akta Perkawinan"></vs-input>
              <br><br>
              <vs-input type="Text" label="No. Seri Perceraian" v-model="divorces.divorce_serial_number" placeholder="No. Seri Perceraian"></vs-input>
              <br><br>
              <vs-input type="date" label="Tanggal Perceraian" v-model="divorces.divorce_date"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Perceraian" v-model="divorces.divorce_place" placeholder="Tempat Perceraian"></vs-input>
              <br><br>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
              <vs-input type="Text" label="Nama Lengkap" v-model="divorces.name" placeholder="Nama"></vs-input>
              <br><br>
              <vs-input type="Text" label="NIK" v-model="divorces.nik" placeholder="NIK"></vs-input>
              <br><br>
              <vs-input type="Text" label="Tempat Lahir" v-model="divorces.birth_place" placeholder="Tempat Lahir"></vs-input>
              <br><br>
              <vs-input type="date" label="Tanggal Lahir" v-model="divorces.birth_date"></vs-input>
              <br><br>
              <vs-input type="Text" label="Agama" v-model="divorces.religion" placeholder="Agama"></vs-input>
              <br><br>
              <vs-input type="Text" label="Alamat" v-model="divorces.address" placeholder="Alamat"></vs-input>
              <br><br>
              <div>
              <vs-input type="file" accept="image/*" @change="onFileChange" label="Foto Akta Perceraian "></vs-input>
              <br><br>
              </div>
              <vs-button flat color="primary" type="submit">Submit</vs-button>
              <div v-for="(error, index) in errors" :key="index">
                    <vs-alert color="danger">
                        {{ error[0] }}
                    </vs-alert>
              </div>
              </vs-col>
            </vs-row>
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
                attachment:'',
            },
            
            errors: null
        }
    },
    methods: {
        createDivorce() {
            let fd = new FormData();

            fd.append("divorce_number", this.divorces.divorce_number)
            fd.append("marital_number", this.divorces.marital_number)
            fd.append("divorce_serial_number", this.divorces.divorce_serial_number)
            fd.append("divorce_date", this.divorces.divorce_date)
            fd.append("divorce_place", this.divorces.divorce_place)
            fd.append("name", this.divorces.name)
            fd.append("nik", this.divorces.nik)
            fd.append("birth_place", this.divorces.birth_place)
            fd.append("birth_date", this.divorces.birth_date)
            fd.append("religion", this.divorces.religion)
            fd.append("address", this.divorces.address)
            fd.append("attachment", this.divorces.attachment)

            this.$store.dispatch('createDivorce', fd).then(response =>{
            console.log(response)
            this.$router.push({name:'DataPerceraian'})
            }).catch(error => {
            this.errors = error.response.data.errors
            }) 
        },
        onFileChange(e) {
            this.divorces.attachment = e.target.files[0]
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