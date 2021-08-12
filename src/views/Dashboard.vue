<template>
  <div class="full-height">
    <div>
      <Sidebar/>
      <Navbar msg="Aplikasi Perkawinan Dan Perceraian"/>
    </div>
    <div class="row">
      <div class="column" style="background-color:#aaa;">
        <vs-card class="center">
          <template #text>
            <h3>Data Statistik</h3>
            <vs-input type="date" class="center">
            </vs-input>
            <br>
            <h2>Total XXXXX</h2>
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
            <h2>Total XXXXXX</h2>
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
            <h2>Total XXXXXXX</h2>
          </template>
        </vs-card>
      </div>

      <vs-row>
        <div class="pieChartMarital">
          <h3>Chart Perkawinan</h3>
          <pie-chart :data="dataMarital" v-if="loadedMaritalChart">
          </pie-chart>
        </div>
        <div class="pieChartMarital">
          <h3>Chart Perceraian</h3>
          <pie-chart :data="dataDivorce" v-if="loadedDivorceChart">
          </pie-chart>
        </div>
      </vs-row>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import PieChart from '../components/PieChart.vue'
import {statisticApiGetChartData} from "../api/statisticApi";
import {notyError} from "../utils/noty";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    PieChart
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      loadedMaritalChart: false,
      loadedDivorceChart: false,
      dataMarital: [
        ['Tahun', 'Perkawinan'],
      ],
      dataDivorce: [
        ['Tahun', 'Perceraian']
      ]
    }
  },
  methods: {
    async fetchChartMarital() {
      try {
        const response = await statisticApiGetChartData("MARITAL")

        await response.map((obj) => {
          this.dataMarital.push([obj.name.toString(), obj.value])
        })

        this.loadedMaritalChart = true
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch perkawinan chart data")
      }
    },
    async fetchChartDivorce() {
      try {
        const response = await statisticApiGetChartData("DIVORCE")

        await response.map((obj) => {
          this.dataDivorce.push([obj.name.toString(), obj.value])
        })

        this.loadedDivorceChart = true
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch perceraian chart data")
      }
    }
  },
  mounted() {
    this.fetchChartMarital()
    this.fetchChartDivorce()
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