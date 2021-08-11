<template>
  <div v-if="auth.authenticated" v-show="isValidated">
    <div>
      <Sidebar/>
      <Navbar msg="Validasi Data Perkawinan"/>
    </div>
    <div v-if="marital" class="row">
      <vs-row>
        <vs-col w="6" vs-align="center">
          <table>
            <tr>
              <td style="width: 120px">No.Akta Kawin</td>
              <td style="width: 5%">:</td>
              <td style="width: 65%">{{ marital.marital_number }}</td>
            </tr>
            <br>
            <tr>
              <td>No.Seri Kawin</td>
              <td>:</td>
              <td>{{ marital.marital_serial_number }}</td>
            </tr>
            <br>
            <tr>
              <td>Tempat, Tanggal Kawin</td>
              <td>:</td>
              <td>{{ marital.married_place }}, {{ marital.married_date }}</td>
            </tr>
            <br>
            <tr>
              <td>Alamat Tinggal</td>
              <td>:</td>
              <td>{{ marital.address }}</td>
            </tr>
            <br>
            <h4 style="text-align: left;"><strong>DATA SUAMI</strong></h4>
            <tr>
              <td>NIK</td>
              <td>:</td>
              <td>{{ marital.husband_nik }}</td>
            </tr>
            <br>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{{ marital.husband_name }}</td>
            </tr>
            <br>
            <tr>
              <td>Tempat Tanggal Lahir</td>
              <td>:</td>
              <td>{{ marital.husband_birth_place }}, {{ marital.husband_birth_date }}</td>
            </tr>
            <br>
            <tr>
              <td>Agama</td>
              <td>:</td>
              <td>{{ marital.husband_religion }}</td>
            </tr>
            <br>
            <tr>
              <td>Kewarganegaraan</td>
              <td>:</td>
              <td>{{ marital.husband_nationality }}</td>
            </tr>
            <br>
            <h4 style="text-align: left;"><strong>DATA ISTRI</strong></h4>
            <tr>
              <td>NIK</td>
              <td>:</td>
              <td>{{ marital.wife_nik }}</td>
            </tr>
            <br>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{{ marital.wife_name }}</td>
            </tr>
            <br>
            <tr>
              <td>Tempat Tanggal Lahir</td>
              <td>:</td>
              <td>{{ marital.wife_birth_place }}, {{ marital.wife_birth_date }}</td>
            </tr>
            <br>
            <tr>
              <td>Agama</td>
              <td>:</td>
              <td>{{ marital.wife_religion }}</td>
            </tr>
            <br>
            <tr>
              <td>Kewarganegaraan</td>
              <td>:</td>
              <td>{{ marital.wife_nationality }}</td>
            </tr>
            <br>
          </table>
          <h4 style="text-align: left;"><strong>STATUS</strong>: {{ marital.status.status.toUpperCase() }}</h4>
        </vs-col>
        <vs-col w="6" vs-align="center">
          <table>
            <tr>
              <th>Bukti Akta Perkawinan :</th>
            </tr>
            <tr>
              <td><img :src="marital.marital_attachment"></td>
            </tr>
            <tr>
              <td><img :src="marital.husband_marital_attachment">
              </td>
            </tr>
            <tr>
              <td><img :src="marital.wife_marital_attachment"></td>
            </tr>
          </table>
          <div v-if="['admin'].includes(auth.user.role.name)">
            <vs-button @click="approveMarital(marital.id)" color="success">Approve</vs-button>
            <vs-button @click="waitingMarital(marital.id)" color="warn">Waiting</vs-button>
            <vs-button @click="rejectMarital(marital.id)" color="danger">Reject</vs-button>
            <vs-button @click="$router.go(-1)" color="info">Kembali</vs-button>
          </div>
          <div v-else>
            <vs-button @click="$router.go(-1)" color="info">Kembali</vs-button>
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
import {maritalApiDetail, maritalApiSetApprove, maritalApiSetReject, maritalApiSetWaiting} from "../api/maritalApi";
import {notyError, notySuccess} from "../utils/noty";
import {validate} from "../utils/validator";

export default {
  name: "DataPerkawinanDetail",
  components: {
    Sidebar,
    Navbar,
  },
  props: ['id'],
  data() {
    return {
      marital: {},
      isValidated: false
    }
  },
  methods: {
    async approveMarital(id) {
      try {
        await maritalApiSetApprove(id, this.$store.getters.auth.token)
        notySuccess("Sukses set approve perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async rejectMarital(id) {
      try {
        await maritalApiSetReject(id, this.$store.getters.auth.token)
        notySuccess("Sukses set reject perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async waitingMarital(id) {
      try {
        await maritalApiSetWaiting(id, this.$store.getters.auth.token)
        notySuccess("Sukses set waiting perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async fetchMarital() {
      try {
        const { marital } = await maritalApiDetail(this.$route.params.id, this.$store.getters.auth.token)

        if (this.$store.getters.auth.user.role.name === 'user') {
          if (marital.user.id !== this.$store.getters.auth.user.id) {
            this.$router.go(-1)
          } else {
            this.isValidated = true
          }
        } else {
          this.isValidated = true
        }

        this.marital = marital
        this.marital.marital_attachment = this.generateUrlImage(marital.marital_attachment)
        this.marital.husband_marital_attachment = this.generateUrlImage(marital.husband_marital_attachment)
        this.marital.wife_marital_attachment = this.generateUrlImage(marital.wife_marital_attachment)
      } catch (e) {
        notyError("Gagal fetch detail perkawinan")
      }
    },
    generateUrlImage(path) {
      let isContainFullUrlHttps = path.search("https")
      let isContainFullUrlHttp = path.search("http")
      console.log(isContainFullUrlHttp)

      if (isContainFullUrlHttp >= 0 || isContainFullUrlHttps >= 0) {
        return path
      } else {
        return process.env.VUE_APP_BASE_URL_IMAGE + path
      }
    },
  },
  mounted() {
    this.fetchMarital()
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  }
}
</script>
<style scoped>
.row {
  padding-top: 125px;
  padding-left: 350px;
}

img {
  width: 300px;
}
</style>
