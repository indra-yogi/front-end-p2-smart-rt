<template>
  <div class="full-height">
    <Sidebar/>
    <Navbar msg="Tambah Data Perceraian"/>
    <div class="row">
      <template v-if="auth.authenticated">
        <form action="#" @submit.prevent="createDivorce">
          <div class="padding-left">
            <vs-row>
              <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
                <vs-input type="Text" label="No. Akta Perceraian" v-model="divorces.divorce_number"
                          placeholder="No. Akta Perceraian"></vs-input>
                <br><br>
                <vs-input type="Text" label="No. Akta Perkawinan" v-model="divorces.marital_number"
                          placeholder="No. Akta Perkawinan"></vs-input>
                <br><br>
                <vs-input type="Text" label="No. Seri Perceraian" v-model="divorces.divorce_serial_number"
                          placeholder="No. Seri Perceraian"></vs-input>
                <br><br>
                <vs-input type="date" label="Tanggal Perceraian" v-model="divorces.divorce_date"></vs-input>
                <br><br>
                <vs-input type="Text" label="Tempat Perceraian" v-model="divorces.divorce_place"
                          placeholder="Tempat Perceraian"></vs-input>
                <br><br>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
                <vs-input type="Text" label="Nama Lengkap" v-model="divorces.name" placeholder="Nama"></vs-input>
                <br><br>
                <vs-input type="Text" label="NIK" v-model="divorces.nik" placeholder="NIK"></vs-input>
                <br><br>
                <vs-input type="Text" label="Tempat Lahir" v-model="divorces.birth_place"
                          placeholder="Tempat Lahir"></vs-input>
                <br><br>
                <vs-input type="date" label="Tanggal Lahir" v-model="divorces.birth_date"></vs-input>
                <br><br>
                <vs-input type="Text" label="Agama" v-model="divorces.religion" placeholder="Agama"></vs-input>
                <br><br>
                <vs-input type="Text" label="Alamat" v-model="divorces.address" placeholder="Alamat"></vs-input>
                <br><br>
                <div>
                  <vs-input type="file" accept="image/*" @change="onFileChange"
                            label="Foto Akta Perceraian "></vs-input>
                  <br><br>
                </div>
                <br><br>
                <vs-select label="Provinsi" placeholder="Pilih provinsi" v-model="select.provinceId" id="selectProvince"
                           :key="list.provinceList.length" @input="fetchCity">
                  <vs-option v-for="(item, index) in list.provinceList" :key="index" :label="item.name"
                             :value="item.id">
                    {{ item.name }}
                  </vs-option>
                </vs-select>
                <br><br>
                <vs-select :disabled="select.provinceId === ''" label="Kota" placeholder="Pilih kota"
                           v-model="select.cityId" id="selectCity" :key="list.cityList.length" @input="fetchDistrict">
                  <vs-option v-for="(item, index) in list.cityList" :key="index" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </vs-option>
                </vs-select>
                <br><br>
                <vs-select :disabled="select.cityId === ''" label="Kecamatan" placeholder="Pilih kecamatan"
                           v-model="select.districtId" id="selectDistrict" :key="list.districtList.length"
                           @input="fetchVillage">
                  <vs-option v-for="(item, index) in list.districtList" :key="index" :label="item.name"
                             :value="item.id">
                    {{ item.name }}
                  </vs-option>
                </vs-select>
                <br><br>
                <vs-select :disabled="select.districtId === ''" label="Kelurahan" placeholder="Pilih kelurahan"
                           v-model="select.villageId" id="selectVillage" :key="list.villageList.length"
                           @input="fetchNeighbourhood">
                  <vs-option v-for="(item, index) in list.villageList" :key="index" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </vs-option>
                </vs-select>
                <br><br>
                <vs-select :disabled="select.villageId === ''" label="RT" placeholder="Pilih RT"
                           v-model="select.neighbourhoodId" id="selectNeighbourhood"
                           :key="list.neighbourhoodList.length">
                  <vs-option v-for="(item, index) in list.neighbourhoodList" :key="index" :label="item.name"
                             :value="item.id">
                    {{ item.name }}
                  </vs-option>
                </vs-select>
                <br><br>
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
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../api/locationApi";
import {notyError, notySuccess} from "../utils/noty";
import {validate} from "../utils/validator";
import {divorceApiCreate} from "../api/divorceApi";

export default {
  name: "AddPerceraian",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      divorces: {
        divorce_number: '',
        marital_number: '',
        divorce_serial_number: '',
        divorce_date: '',
        divorce_place: '',
        name: '',
        nik: '',
        birth_place: '',
        birth_date: '',
        religion: '',
        address: '',
        attachment: '',
      },
      select: {
        provinceId: "",
        cityId: "",
        districtId: "",
        villageId: "",
        neighbourhoodId: ""
      },
      list: {
        provinceList: [],
        cityList: [],
        districtList: [],
        villageList: [],
        neighbourhoodList: []
      },
      errors: null
    }
  },
  methods: {
    async fetchProvince() {
      try {
        this.list.provinceList = await locationApiProvinceList()
      } catch (e) {
        notyError("Gagal fetch list provinsi")
      }
    },
    async fetchCity() {
      console.log()
      try {
        this.list.cityList = await locationApiCityList(this.select.provinceId)
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch list kota")
      }
    },
    async fetchDistrict() {
      try {
        this.list.districtList = await locationApiDistrictList(this.select.cityId)
      } catch (e) {
        notyError("Gagal fetch list kecamatan")
      }
    },
    async fetchVillage() {
      try {
        this.list.villageList = await locationApiVillageList(this.select.districtId)
      } catch (e) {
        notyError("Gagal fetch list kelurahan")
      }
    },
    async fetchNeighbourhood() {
      try {
        this.list.neighbourhoodList = await locationApiNeighbourhoodList(this.select.villageId)
      } catch (e) {
        notyError("Gagal fetch list RT")
      }
    },
    async createDivorce() {
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
      fd.append("neighbourhood_id", this.select.neighbourhoodId)

      try {
        await divorceApiCreate(fd, this.$store.getters.auth.token)
        notySuccess("Berhasil mengajukan perceraian")
        this.$router.push('/dataPerceraian')
      } catch (e) {
        validate(e.message)
      }
    },
    onFileChange(e) {
      this.divorces.attachment = e.target.files[0]
    },
  },
  mounted() {
    this.fetchProvince()
  },
  computed: {
    ...mapGetters([
      'auth'
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

.side {
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