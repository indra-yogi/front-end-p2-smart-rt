<template>
  <div class="full-height">
    <div>
      <Sidebar/>
      <Navbar msg="Aplikasi Perkawinan Dan Perceraian"/>
    </div>
    <div class="row">
      <div class="column">
        <vs-card class="center">
          <template #text>
            <h3>Data Statistik</h3>
            <vs-input type="date" label="Tanggal awal" v-model="date.all.startDate"></vs-input>
            <br><br>
            <vs-input type="date" label="Tanggal akhir" v-model="date.all.endDate" @input="handleDateAll"></vs-input>
            <br><br>
            <vs-select label="Provinsi" placeholder="Pilih provinsi" v-model="select.all.provinceId" id="selectProvince" :key="list.all.provinceList.length" @input="fetchCityAll">
              <vs-option v-for="(item, index) in list.all.provinceList" :key="index" :label="item.name" :value="item.id">
                {{ item.name }}
              </vs-option>
            </vs-select>
            <br><br>
            <vs-select :disabled="select.all.provinceId === ''" label="Kota" placeholder="Pilih kota" v-model="select.all.cityId" id="selectCity" :key="list.all.cityList.length" @input="fetchDistrictAll">
              <vs-option v-for="(item, index) in list.all.cityList" :key="index" :label="item.name" :value="item.id">
                {{ item.name }}
              </vs-option>
            </vs-select>
            <br><br>
            <vs-select :disabled="select.all.cityId === ''" label="Kecamatan" placeholder="Pilih kecamatan" v-model="select.all.districtId" id="selectDistrict" :key="list.all.districtList.length" @input="fetchVillageAll">
              <vs-option v-for="(item, index) in list.all.districtList" :key="index" :label="item.name" :value="item.id">
                {{ item.name }}
              </vs-option>
            </vs-select>
            <br><br>
            <vs-select :disabled="select.all.districtId === ''" label="Kelurahan" placeholder="Pilih kelurahan" v-model="select.all.villageId" id="selectVillage" :key="list.all.villageList.length" @input="fetchNeighbourhoodAll">
              <vs-option v-for="(item, index) in list.all.villageList" :key="index" :label="item.name" :value="item.id">
                {{ item.name }}
              </vs-option>
            </vs-select>
            <br><br>
            <vs-select :disabled="select.all.villageId === ''" label="RT" placeholder="Pilih RT" v-model="select.all.neighbourhoodId" id="selectNeighbourhood" :key="list.all.neighbourhoodList.length" @input="handleSelectNeighbourhoodAll">
              <vs-option v-for="(item, index) in list.all.neighbourhoodList" :key="index" :label="item.name" :value="item.id">
                {{ item.name }}
              </vs-option>
            </vs-select>
            <br><br>
            <br>
            <h2>Total {{ widget.all }}</h2>
          </template>
        </vs-card>
      </div>
      <div class="column">
        <vs-card class="center">
          <template #text>
            <h3>Data Perkawinan</h3>
            <br>
            <h2>Total {{ widget.marital }}</h2>
          </template>
        </vs-card>
      </div>
      <div class="column">
        <vs-card class="center">
          <template #text>
            <h3>Data Perceraian</h3>
            <br>
            <h2>Total {{ widget.divorce }}</h2>
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
import {statisticApiGetChartData, statisticApiGetTotalData} from "../api/statisticApi";
import {notyError} from "../utils/noty";
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../api/locationApi";
import moment from 'moment'

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    PieChart
  },
  data() {
    return {
      widget: {
        all: 0,
        marital: 0,
        divorce: 0
      },
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
      ],
      select: {
        all: {
          provinceId: "",
          cityId: "",
          districtId: "",
          villageId: "",
          neighbourhoodId: ""
        },
        marital: {
          provinceId: "",
          cityId: "",
          districtId: "",
          villageId: "",
          neighbourhoodId: ""
        },
        divorce: {
          provinceId: "",
          cityId: "",
          districtId: "",
          villageId: "",
          neighbourhoodId: ""
        }
      },
      date: {
        all: {
          startDate: "2000-01-01",
          endDate: moment().format("YYYY-MM-DD")
        },
        marital: {
          startDate: "",
          endDate: ""
        },
        divorce: {
          startDate: "",
          endDate: ""
        }
      },
      list: {
        all: {
          provinceList: [],
          cityList: [],
          districtList: [],
          villageList: [],
          neighbourhoodList: []
        },
        marital: {
          provinceList: [],
          cityList: [],
          districtList: [],
          villageList: [],
          neighbourhoodList: []
        },
        divorce: {
          provinceList: [],
          cityList: [],
          districtList: [],
          villageList: [],
          neighbourhoodList: []
        }
      },
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
    },
    async fetchProvince() {
      try {
        const response = await locationApiProvinceList()
        this.list.all.provinceList = response
        this.list.marital.provinceList = response
        this.list.divorce.provinceList = response
      } catch (e) {
        notyError("Gagal fetch list provinsi")
      }
    },
    async fetchCityAll() {
      console.log()
      try {
        this.list.all.cityList = await locationApiCityList(this.select.all.provinceId)
        await this.handleQueryAll()
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch list kota")
      }
    },
    async fetchDistrictAll() {
      try {
        this.list.all.districtList = await locationApiDistrictList(this.select.all.cityId)
        this.select.all.districtId = ""
        this.select.all.villageId = ""
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list kecamatan")
      }
    },
    async fetchVillageAll() {
      try {
        this.list.all.villageList = await locationApiVillageList(this.select.all.districtId)
        this.select.all.villageId = ""
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list kelurahan")
      }
    },
    async fetchNeighbourhoodAll() {
      try {
        this.list.all.neighbourhoodList = await locationApiNeighbourhoodList(this.select.all.villageId)
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list RT")
      }
    },
    async handleSelectNeighbourhoodAll() {
      await this.handleQueryAll()
    },
    async handleDateAll() {
      await this.handleQueryAll()
    },
    async handleQueryAll() {
      try {
        const query = [];
        query.push("type=ALL")

        if (this.date.all.startDate !== "" && this.date.all.endDate !== "") {
          query.push(`startDate=${this.date.all.startDate}&endDate=${this.date.all.endDate}`)
        }

        if (this.select.all.provinceId !== "") {
          query.push(`provinceId=${this.select.all.provinceId}`)
        }

        if (this.select.all.cityId !== "") {
          query.push(`cityId=${this.select.all.cityId}`)
        }

        if (this.select.all.districtId !== "") {
          query.push(`districtId=${this.select.all.districtId}`)
        }

        if (this.select.all.villageId !== "") {
          query.push(`villageId=${this.select.all.villageId}`)
        }

        if (this.select.all.neighbourhoodId !== "") {
          query.push(`neighbourhoodId=${this.select.all.neighbourhoodId}`)
        }


        const response = await statisticApiGetTotalData(query.join("&"))
        this.widget.all = response.totalData
        this.widget.marital = response.marital
        this.widget.divorce = response.divorce
      } catch (e) {
        notyError("Gagal fetch data statistik")
      }
    },
  },
  mounted() {
    this.fetchChartMarital()
    this.fetchChartDivorce()
    this.fetchProvince()
    this.handleQueryAll()
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