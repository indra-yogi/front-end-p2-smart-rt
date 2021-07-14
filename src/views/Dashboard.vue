<template>
    <div class="full-height">
        <div>
            <Sidebar />
            <Navbar msg="Aplikasi Perkawinan Dan Perceraian" />
        </div>
        <div class="row">
            <div class="column" style="background-color:#aaa;">
                <vs-card class="center">
                    <template #text>
                        <h3>Data Statistik</h3>
                        <vs-input type="date" class="center">
                        </vs-input>
                        <br>
                        <h2>Total --</h2>
                    </template>
                </vs-card>
            </div>
            <div class="column" style="background-color:#aaa;">
                <vs-card class="center">
                    <template #text>
                        <h3>Data Perkawinan</h3>
                        <vs-input type="text" class="center">
                        </vs-input>
                        <br>
                        <h2>Total --</h2>
                    </template>
                </vs-card>
            </div>
            <div class="column" style="background-color:#aaa;">
                <vs-card class="center">
                    <template #text>
                        <h3>Data Perceraian</h3>
                        <vs-input type="text" class="center">
                        </vs-input>
                        <br>
                        <h2>Total --</h2>
                    </template>
                </vs-card>
            </div>
        </div>
        <div class="pieChart">
            <pie-chart weight="500px" height="500px">
            
            </pie-chart>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import PieChart from '../components/PieChart.js'
import {mapGetters} from 'vuex'

export default {
    name: "Dashboard",
    components: {
        Sidebar,
        Navbar,
        PieChart
    },
    data(){
        return {
            datacollection: null,
            loaded: false,
        }
    },
    computed: {
      ...mapGetters({ 
        authenticated: 'authenticated',
        user: 'user',
      })
    },
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
    padding: 5px;
    
}

    .row {
        padding-top: 125px;
        padding-left: 250px;
        padding-right: 20px;


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
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
}

    .pieChart {
        padding-top: 50px;
        padding-left: 250px;
}
</style>