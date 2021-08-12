<template>
  <div id="register">
    <vs-navbar color="#7d33ff" text-white square>
      <template #left>
        <h3>Add a new Administrator</h3>
      </template>
    </vs-navbar>
    <form @submit.prevent="handleAddAdmin">
      <div class="register-form">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
            <vs-input type="text" label="Full name" v-model="users.name" placeholder="Full Name"></vs-input>
            <br><br>
            <vs-input type="email" label="E-mail" v-model="users.email" placeholder="E-mail"></vs-input>
            <br><br>
            <vs-input type="text" label="No. Telepon" v-model="users.phone" placeholder="ex: +6281234567890"></vs-input>
            <br><br>
            <vs-input type="Text" label="Jabatan/Pekerjaan" v-model="users.position"
                      placeholder="Jabatan/Pekerjaan"></vs-input>
            <br><br>
            <vs-input type="text" label="NIK" v-model="users.nik" placeholder="NIK"></vs-input>
            <br><br>
            <vs-input type="password" label="Password" v-model="users.password" placeholder="Password"></vs-input>
            <br><br>
            <vs-input type="password" label="Konfirmasi Password" v-model="users.password_confirmation"
                      placeholder="Password"></vs-input>
            <br><br>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="left" vs-align="left" w="6">
            <vs-input type="text" label="Alamat" v-model="users.address" placeholder="Alamat"></vs-input>
            <br><br>
              <vs-select label="Provinsi" placeholder="Pilih provinsi" v-model="select.provinceId" id="selectProvince" :key="list.provinceList.length" @input="fetchCity">
                <vs-option v-for="(item, index) in list.provinceList" :key="index" :label="item.name" :value="item.id">
                  {{ item.name }}
                </vs-option>
              </vs-select>
            <br><br>
              <vs-select :disabled="select.provinceId === ''" label="Kota" placeholder="Pilih kota" v-model="select.cityId" id="selectCity" :key="list.cityList.length" @input="fetchDistrict">
                <vs-option v-for="(item, index) in list.cityList" :key="index" :label="item.name" :value="item.id">
                  {{ item.name }}
                </vs-option>
              </vs-select>
            <br><br>
              <vs-select :disabled="select.cityId === ''" label="Kecamatan" placeholder="Pilih kecamatan" v-model="select.districtId" id="selectDistrict" :key="list.districtList.length" @input="fetchVillage">
                <vs-option v-for="(item, index) in list.districtList" :key="index" :label="item.name" :value="item.id">
                  {{ item.name }}
                </vs-option>
              </vs-select>
            <br><br>
              <vs-select :disabled="select.districtId === ''" label="Kelurahan" placeholder="Pilih kelurahan" v-model="select.villageId" id="selectVillage" :key="list.villageList.length" @input="fetchNeighbourhood">
                <vs-option v-for="(item, index) in list.villageList" :key="index" :label="item.name" :value="item.id">
                  {{ item.name }}
                </vs-option>
              </vs-select>
            <br><br>
            <vs-select :disabled="select.villageId === ''" label="RT" placeholder="Pilih RT" v-model="select.neighbourhoodId" id="selectNeighbourhood" :key="list.neighbourhoodList.length">
                <vs-option v-for="(item, index) in list.neighbourhoodList" :key="index" :label="item.name" :value="item.id">
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
  </div>
</template>

<script>
import {notyError, notySuccess} from "../utils/noty";
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../api/locationApi";
import {authApiCreateUserAdmin} from "../api/authApi";
import {validate} from "../utils/validator";

export default {
  name: "AddAdmin",
  data() {
    return {
      id: new Date().getTime(),
      users: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
        phone: '',
        nik: '',
        position: '',
        neighbourhood_id: ''
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
      errors: null,
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
      try {
        this.list.cityList = await locationApiCityList(this.select.provinceId)
      } catch (e) {
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
    async handleAddAdmin() {
      try {
        this.users.neighbourhood_id = this.select.neighbourhoodId
        await authApiCreateUserAdmin(this.users, this.$store.getters.auth.token)
        notySuccess("Berhasil create admin baru")
        this.$router.push('/Administrators')
      } catch (e) {
        validate(e.message)
      }
    }
  },
  created() {
    this.fetchProvince()
  }
}
</script>

<style scoped>
h3 {
  padding-left: 50px;
}

.register-form {
  padding-top: 40px;
  margin-top: 50px;
  padding-left: 50px;
}

label {
  font-size: 24px;
}
</style>