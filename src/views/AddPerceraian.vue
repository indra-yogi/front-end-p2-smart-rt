<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg="Tambah Data Perceraian" />
        <div class="row">
            <div class="padding-left">
              <vs-input type="Text" label="No. Akta Perkawinan" v-model="maritals.marital_number" placeholder="No. Akta Perkawinan"></vs-input>
              <br><br>
              <vs-input type="file" label="Attachment" @change="maritals.attachment"></vs-input>
              <br><br>
              <vs-button flat color="primary" type="submit">Submit</vs-button>
            </div>
        </div>    
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import {mapGetters} from 'vuex'

export default {
    name: "DataPerkawinan",
    components: {
        Sidebar,
        Navbar,
    },
    mounted() {
      this.$store.dispatch('fetchMarital')
    },
    methods: {
      
    },
    computed: {
      ...mapGetters([
        'maritals'
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