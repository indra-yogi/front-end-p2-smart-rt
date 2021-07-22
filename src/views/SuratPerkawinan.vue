<template>
    <div v-if="authenticated">
        <div class="Head">
            <table class="hform">
                <tr>
                    <td style="width: 30%">PEMERINTAH PROVINSI</td>
                    <td style="width: 5%">:</td>
                    <td style="width: 50%">{{ user.province }}</td>
                </tr>
                <tr>
                    <td>KABUPATEN/KOTA</td>
                    <td>:</td>
                    <td>{{ user.city }}</td>
                </tr>
                <tr>
                    <td>KECAMATAN</td>
                    <td>:</td>
                    <td>{{ user.district }}</td>
                </tr>
                <tr>
                    <td>KELURAHAN</td>
                    <td>:</td>
                    <td>{{ user.village }}</td>
                </tr>
                <tr>
                    <td>RT</td>
                    <td>:</td>
                    <td>{{ user.neighbourhood }}</td>
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
        <div class="Body" v-if="marital">
            <p style="text-align: left;">Yang bertanda tangan dibawah ini selaku Ketua RT menerangkan bahwa :</p>
            <table class="form">
                <h4 style="text-align: left;"><strong>DATA PERKAWINAN</strong></h4>
                <tr>
                    <td style="width: 120px">No.Akta Kawin</td>
                    <td style="width: 5%">:</td>
                    <td style="width: 65%">{{ marital[0].marital_number }}</td>
                </tr><br>
                <tr>
                    <td>No.Seri Kawin</td>
                    <td>:</td>
                    <td>{{ marital[0].marital_serial_number }}</td>
                </tr><br>
                <tr>
                    <td>Tempat, Tanggal Kawin</td>
                    <td>:</td>
                    <td>{{ marital[0].married_place }}, {{ marital[0].married_date}}</td>
                </tr><br>
                <tr>
                    <td>Alamat Tinggal</td>
                    <td>:</td>
                    <td>{{ marital[0].address }}</td>
                </tr><br>
                <h4 style="text-align: left;"><strong>DATA SUAMI</strong></h4>
                <tr>
                    <td>NIK</td>
                    <td>:</td>
                    <td>{{ marital[0].husband_nik }}</td>
                </tr><br>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ marital[0].husband_name }}</td>
                </tr><br>
                <tr>
                    <td>Tempat Tanggal Lahir</td>
                    <td>:</td>
                    <td>{{ marital[0].husband_birth_place }}, {{ marital[0].husband_birth_date }}</td>
                </tr><br>
                <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>{{ marital[0].husband_religion }}</td>
                </tr><br>
                <tr>
                    <td>Kewarganegaraan</td>
                    <td>:</td>
                    <td>{{ marital[0].husband_nationality }}</td>
                </tr><br>
                <h4 style="text-align: left;"><strong>DATA ISTRI</strong></h4>
                <tr>
                    <td>NIK</td>
                    <td>:</td>
                    <td>{{ marital[0].wife_nik }}</td>
                </tr><br>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ marital[0].wife_name }}</td>
                </tr><br>
                <tr>
                    <td>Tempat Tanggal Lahir</td>
                    <td>:</td>
                    <td>{{ marital[0].wife_birth_place }}, {{ marital[0].wife_birth_date }}</td>
                </tr><br>
                <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>{{ marital[0].wife_religion }}</td>
                </tr><br>
                <tr>
                    <td>Kewarganegaraan</td>
                    <td>:</td>
                    <td>{{ marital[0].wife_nationality }}</td>
                </tr>
            </table>
            <br>
            
            <p style="text-align: left;">Demikian surat keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.</p>

            <div style="width: 50%; text-align: right; float: right;">Mengetahui</div>
            <br>
            <div style="width: 40%; text-align: right; float: right;">Ketua RT </div>
            <br><br>
        </div>
        <button type="button">
            Print PDF
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "SuratPerkawinan",
    props: ['id'],

    mounted(){
        this.$store.dispatch('getMaritalbyId', this.id)
    },
    computed:{
        ...mapGetters([
            'authenticated',
            'user',
            'marital'
        ])
    }
}
</script>

<style>
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
        margin-top: 120px;
        margin-left: 120px;
        margin-right: 120px;
        margin-bottom: 10px;
        text-align: left;
        font-weight: 900;
}
    
</style>