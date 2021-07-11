<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg="Data Perceraian" />
        <div class="row">
            <div>
              <vs-button flat color="primary" to="AddPerceraian">Add New Data</vs-button>
            </div>
                <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              No. Akta Perceraian
            </vs-th>
            <vs-th>
              Attachment
            </vs-th>
            <vs-th>
              Action
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in divorces"
            :data="tr"
          >
            <vs-td>
              {{ tr.divorce_number }}
            </vs-td>
            <vs-td>
            {{ tr.attachment }}
            </vs-td>
            <vs-td>
            <vs-button>Preview</vs-button>
            <vs-button color="success">Download</vs-button>
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

export default {
    name: "DataPerceraian",
    components: {
        Sidebar,
        Navbar,
    },
    mounted() {
      this.$store.dispatch('fetchDivorce')
    },
    methods: {
      
    },
    computed: {
      ...mapGetters([
        'divorces'
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

.side{
    margin-right: 40px;
}
</style>