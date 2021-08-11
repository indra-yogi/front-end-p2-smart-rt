<template>
  <div id="dataUser">
    <Sidebar/>
    <Navbar msg="Administrators"/>
    <template v-if="auth.authenticated">
      <div class="row">
        <vs-button to="AddAdmin">Add a new Administrator</vs-button>
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                Nama
              </vs-th>
              <vs-th>
                NIK
              </vs-th>
              <vs-th>
                Action
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in adminList" :data="tr">
              <vs-td>
                {{ tr.name }}
              </vs-td>
              <vs-td>
                {{ tr.nik }}
              </vs-td>
              <vs-td>
                <vs-button color="danger" @click="handleDeleteAdmin(tr.id)">Delete</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </template>
  </div>

</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import {mapGetters} from 'vuex'
import {notyError, notySuccess} from "../utils/noty";
import {userApiAdminDelete, userApiAdminUserList} from "../api/userApi";
import {validate} from "../utils/validator";

export default {
  name: "Administrators",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      adminList: []
    }
  },
  methods: {
    async fetchAdminUser() {
      try {
        this.adminList = await userApiAdminUserList(this.$store.getters.auth.token)
      } catch (e) {
        notyError("Gagal fetch list admin")
      }
    },
    async handleDeleteAdmin(id) {
      try {
        await userApiAdminDelete(id, this.$store.getters.auth.token)
        notySuccess("Berhasil delete admin")
        await this.fetchAdminUser()
      } catch (e) {
        validate(e.message)
      }
    }
  },
  created() {
    this.fetchAdminUser()
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
  padding-top: 150px;
  padding-left: 260px;
}
</style>