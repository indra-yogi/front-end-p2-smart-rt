<template>
  <div class="full-height" v-if="auth.authenticated" v-show="isValidated">
    <Sidebar/>
    <Navbar msg="Data Perceraian"/>
    <div class="row" v-if="divorce">
      <vs-row>
        <vs-col w="6" vs-align="center">
          <table>
            <tr>
              <td style="width: 120px">Nama</td>
              <td style="width: 5%">:</td>
              <td style="width: 65%">{{ divorce.name }}</td>
            </tr>
            <br>
            <tr>
              <td>NIK</td>
              <td>:</td>
              <td>{{ divorce.nik }}</td>
            </tr>
            <br>
            <tr>
              <td>No.Akta Cerai</td>
              <td>:</td>
              <td>{{ divorce.divorce_number }}</td>
            </tr>
            <br>
            <tr>
              <td>No.Seri Cerai</td>
              <td>:</td>
              <td>{{ divorce.divorce_serial_number }}</td>
            </tr>
            <br>
            <tr>
              <td>No.Akta Kawin</td>
              <td>:</td>
              <td>{{ divorce.marital_number }}</td>
            </tr>
            <br>
            <tr>
              <td>Agama</td>
              <td>:</td>
              <td>{{ divorce.religion }}</td>
            </tr>
            <br>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>{{ divorce.address }}</td>
            </tr>
            <br>
          </table>
          <h4 style="text-align: left;"><strong>STATUS</strong>: {{ divorce.status.status.toUpperCase() }}</h4>
        </vs-col>
        <vs-col w="6" vs-align="center">
          <table>
            <tr>
              <th>Bukti Akta Perceraian :</th>
            </tr>
            <tr>
              <td><img :src="divorce.attachment"></td>
            </tr>
          </table>
          <div v-if="['admin'].includes(auth.user.role.name)">
            <vs-button @click="approveDivorce(divorce.id)" color="success">Approve</vs-button>
            <vs-button @click="waitingDivorce(divorce.id)" color="warn">Waiting</vs-button>
            <vs-button @click="rejectDivorce(divorce.id)" color="danger">Reject</vs-button>
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
import {notyError, notySuccess} from "../utils/noty";
import {validate} from "../utils/validator";
import {divorceApiDetail, divorceApiSetApprove, divorceApiSetReject, divorceApiSetWaiting} from "../api/divorceApi";

export default {
  name: "DataPerceraianDetail",
  components: {
    Sidebar,
    Navbar,
  },
  props: ["id"],
  data() {
    return {
      errors: null,
      divorce: {},
      isValidated: false
    }
  },
  mounted() {
    this.fetchDivorce()
  },
  methods: {
    async approveDivorce(id) {
      try {
        await divorceApiSetApprove(id, this.$store.getters.auth.token)
        notySuccess("Sukses set approve perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async rejectDivorce(id) {
      try {
        await divorceApiSetReject(id, this.$store.getters.auth.token)
        notySuccess("Sukses set reject perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async waitingDivorce(id) {
      try {
        await divorceApiSetWaiting(id, this.$store.getters.auth.token)
        notySuccess("Sukses set waiting perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async fetchDivorce() {
      try {
        const { divorce } = await divorceApiDetail(this.$route.params.id, this.$store.getters.auth.token)
        this.divorce = divorce

        if (this.$store.getters.auth.user.role.name === 'user') {
          if (divorce.user.id !== this.$store.getters.auth.user.id) {
            this.$router.go(-1)
          } else {
            this.isValidated = true
          }
        } else {
          this.isValidated = true
        }

        this.divorce.attachment = this.generateUrlImage(divorce.attachment)
      } catch (e) {
        notyError("Gagal fetch detail perceraian")
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
    }
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

img {
  width: 200px;
}

.row {
  padding-top: 125px;
  padding-left: 350px;


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