<template>
  <div v-if="auth.authenticated">
    <div v-if="divorce">
      <div class="Head">
        <table class="form">
          <tr>
            <td style="width: 30%">PEMERINTAH PROVINSI</td>
            <td style="width: 5%">:</td>
            <td style="width: 50%">{{ divorce.province.name }}</td>
          </tr>
          <tr>
            <td>KABUPATEN/KOTA</td>
            <td>:</td>
            <td>{{ divorce.city.name }}</td>
          </tr>
          <tr>
            <td>KECAMATAN</td>
            <td>:</td>
            <td>{{ divorce.district.name }}</td>
          </tr>
          <tr>
            <td>KELURAHAN</td>
            <td>:</td>
            <td>{{ divorce.village.name }}</td>
          </tr>
          <tr>
            <td>RT</td>
            <td>:</td>
            <td>{{ divorce.neighbourhood.name }}</td>
            <td>KODE POS</td>
            <td>:</td>
            <td>..........</td>
          </tr>
        </table>
        <hr size="1" color="black">
        <hr size="1" color="black">
        <br>
        <p style="text-align: center; text-decoration: underline;"><strong>SURAT KETERANGAN</strong></p>
        <p style="text-align: center;"><strong>NO. ...........................................</strong></p>
      </div>
      <div class="Body">
        <p style="text-align: left;">Yang bertanda tangan dibawah ini selaku Ketua RT menerangkan bahwa :</p>
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
            <td>{{ divorce.divorce_number }}</td>
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
          <tr>
            <td>Keterangan</td>
            <td>:</td>
            <td></td>
          </tr>
        </table>
        <br>

        <p style="text-align: left;">Demikian surat keterangan ini dibuat, untuk dapat dipergunakan sebagaimana
          mestinya.</p>

        <div style="width: 50%; text-align: right; float: right;">Mengetahui</div>
        <br>
        <div style="width: 40%; text-align: right; float: right;">Ketua RT</div>
        <br><br>
      </div>
      <button type="button"  id="printBtn" @click="handlePrint">
        Print PDF
      </button>
      <button id="backBtn" type="button" @click="handleBack">
        Kembali
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {notyError} from "../utils/noty";
import {divorceApiDetail} from "../api/divorceApi";

export default {
  name: "SuratPerceraian",
  props: ["id"],
  data() {
    return {
      divorce: {}
    }
  },
  methods: {
    async fetchDivorce() {
      try {
        const {divorce} = await divorceApiDetail(this.$route.params.id, this.$store.getters.auth.token)
        this.divorce = divorce
      } catch (e) {
        notyError("Gagal fetch detail perceraian")
      }
    },
    async handlePrint() {
      window.print()
    },
    handleBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.fetchDivorce()
  },

  computed: {
    ...mapGetters([
      'auth'
    ])
  }
}
</script>

<style scoped>
@media print {
  #printBtn {
    visibility: hidden;
  }
  #backBtn {
    visibility: hidden;
  }
}

.form {
  text-align: left;
}

.Body {
  margin: 10px;
  margin-left: 120px;
  margin-right: 120px;


  padding-left: px;
  padding-top: 30px;
  padding-right: px;
  padding-bottom: 80px;
}

.Head {
  margin-top: 50px;
  margin-left: 120px;
  margin-right: 120px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: 900;
}

</style>