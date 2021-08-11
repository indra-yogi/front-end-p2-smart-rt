<template>
  <div v-if="auth.authenticated">
    <div id="print" v-if="marital">
      <div class="Head">
        <table class="hform">
          <tr>
            <td style="width: 30%">PEMERINTAH PROVINSI</td>
            <td style="width: 5%">:</td>
            <td style="width: 50%">{{ marital.province.name }}</td>
          </tr>
          <tr>
            <td>KABUPATEN/KOTA</td>
            <td>:</td>
            <td>{{ marital.city.name }}</td>
          </tr>
          <tr>
            <td>KECAMATAN</td>
            <td>:</td>
            <td>{{ marital.district.name }}</td>
          </tr>
          <tr>
            <td>KELURAHAN</td>
            <td>:</td>
            <td>{{ marital.village.name }}</td>
          </tr>
          <tr>
            <td>RT</td>
            <td>:</td>
            <td>{{ marital.neighbourhood.name }}</td>
            <td>KODE POS</td>
            <td>:</td>
            <td>............</td>
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
        <table class="form">
          <h4 style="text-align: left;"><strong>DATA PERKAWINAN</strong></h4>
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
          <div>

          </div>
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
        </table>
        <br>

        <p style="text-align: left;">Demikian surat keterangan ini dibuat, untuk dapat dipergunakan sebagaimana
          mestinya.</p>

        <div style="width: 50%; text-align: right; float: right;">Mengetahui</div>
        <br>
        <div style="width: 40%; text-align: right; float: right;">Ketua RT</div>
        <br><br>
      </div>
    </div>
    <button id="printBtn" type="button" @click="handlePrint">
      Print PDF
    </button>
    <button id="backBtn" type="button" @click="handleBack">
      Kembali
    </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {maritalApiDetail} from "../api/maritalApi";
import {notyError} from "../utils/noty";

export default {
  name: "SuratPerkawinan",
  props: ['id'],
  data() {
    return {
      marital: {}
    }
  },
  methods: {
    async fetchMarital() {
      try {
        const {marital} = await maritalApiDetail(this.$route.params.id, this.$store.getters.auth.token)
        this.marital = marital
      } catch (e) {
        notyError("Gagal fetch detail perkawinan")
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
    this.fetchMarital()
  },
  computed: {
    ...mapGetters([
      'auth',
    ])
  }
}
</script>

<style>
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


  padding-left: 0px;
  padding-top: 30px;
  padding-right: 0px;
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