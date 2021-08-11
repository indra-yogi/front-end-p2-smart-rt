<template>
  <div class="full-height">
    <Sidebar/>
    <Navbar msg="Data Perceraian"/>
    <div class="row" v-if="auth.authenticated">
      <div class="centerx labelx">
        <vs-input @change="handleFilter" label="Cari data" placeholder="Nama kepala keluarga" v-model="search"/>
      </div>
      <br><br>
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              No. Akta Perceraian
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
              v-for="(tr, i) in divorceList"
              :data="tr"
          >
            <vs-td>
              {{ tr.divorce_number }}
            </vs-td>
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              {{ tr.address }}
            </vs-td>
            <vs-td>
              {{ tr.status.status }}
            </vs-td>
            <vs-td>
              <vs-button @click="handleReview(tr.id)">Review</vs-button>
              <vs-button @click="handlePrint(tr.id)">Print</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import {mapGetters} from 'vuex'
import {notyError} from "../utils/noty";
import {divorceApiIndex} from "../api/divorceApi";
import _ from "lodash";

export default {
  name: "DataPerceraian",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      divorceList: [],
      filteredDivorce: [],
      search: ""
    }
  },
  mounted() {
    this.fetchDivorce(this.search)
  },
  methods: {
    handleFilter: _.debounce(function() {
      this.fetchDivorce(this.search)
    }, 100),
    async fetchDivorce(name) {
      try {
        const {record} = await divorceApiIndex(1, 100000, name, this.$store.getters.auth.token)
        this.divorceList = record
      } catch (e) {
        notyError("Gagal fetch list perceraian")
      }
    },

    handlePrint(id) {
      this.$router.push(`/suratPerceraian/${id}`)
    },
    handleReview(id) {
      this.$router.push(`/perceraianDetail/${id}`)
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
  padding-left: 260px;


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
</style>