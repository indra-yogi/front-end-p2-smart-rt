<template>
  <div class="full-height">
    <Sidebar/>
    <Navbar msg="Data Perkawinan"/>
    <div class="row">
      <div class="centerx labelx">
        <vs-input @change="handleFilter" label="Cari data" placeholder="Nama kepala keluarga" v-model="search"/>
      </div>
      <br><br>
      <div>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                No. Akta Perkawinan
              </vs-th>
              <vs-th>
                Nama
              </vs-th>
              <vs-th>
                Alamat
              </vs-th>
              <vs-th>
                Status
              </vs-th>
              <vs-th>
                Action
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in maritalList"
                :data="tr"
            >
              <vs-td>
                {{ tr.marital_number }}
              </vs-td>
              <vs-td>
                {{ tr.husband_name }}
              </vs-td>
              <vs-td>
                {{ tr.address }}
              </vs-td>
              <vs-td>
                {{ tr.status.status }}
              </vs-td>
              <vs-td>
                <vs-button @click="handlePreview(tr.id)">Review</vs-button>
                <vs-button @click="handlePrint(tr.id)">Print</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import {mapGetters} from 'vuex'
import {notyError} from "../utils/noty";
import {maritalApiIndex} from "../api/maritalApi";
import _ from "lodash";

export default {
  name: "ValidasiPerkawinan",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      maritalList: [],
      filteredMarital: [],
      search: ""
    }
  },
  mounted() {
    this.fetchMarital(this.search)
  },
  methods: {
    handleFilter: _.debounce(function() {
      this.fetchMarital(this.search)
    }, 100),
    async fetchMarital(name) {
      try {
        const { record } = await maritalApiIndex(1, 100000, name, this.$store.getters.auth.token)
        this.maritalList = record
      } catch (e) {
        notyError("Gagal fetch list perkawinan")
      }
    },
    handlePreview(id) {
      this.$router.push(`/perkawinanDetail/${id}`)
    },
    handlePrint(id) {
      this.$router.push(`/suratPerkawinan/${id}`)
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

.row {
  padding-top: 125px;
  padding-left: 250px;


}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: inline-block;
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