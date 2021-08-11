<template>
  <div class="full-height">
    <vs-sidebar
        absolute
        v-model="active"
        open
        square
    >
      <h1>Aplikasi P2</h1>
      <vs-sidebar-item id="Dashboard" to="/">
        Dashboard
      </vs-sidebar-item>
      <vs-sidebar-item id="Kontak" to="About">
        Kontak Kami
      </vs-sidebar-item>
      <template v-if="auth.authenticated">
        <vs-sidebar-group v-if="['admin'].includes(auth.user.role.name)">
          <template #header>
            <vs-sidebar-item arrow id="Perkawinan">
              Perkawinan
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="DataPerkawinan" to="DataPerkawinan">
            Data Perkawinan
          </vs-sidebar-item>
          <vs-sidebar-item id="AddPerkawinan" to="AddPerkawinan">
            Pengajuan Data Perkawinan
          </vs-sidebar-item>
          <template v-if="auth.user.role_id === (1 || 3)">
            <vs-sidebar-item id="validasiPerkawinan" to="ValidasiPerkawinan">
              Validasi Perkawinan
            </vs-sidebar-item>
          </template>
        </vs-sidebar-group>
        <vs-sidebar-group v-if="['admin'].includes(auth.user.role.name)">
          <template #header>
            <vs-sidebar-item arrow id="Perceraian">
              Perceraian
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="DataPerceraian" to="DataPerceraian">
            Data Perceraian
          </vs-sidebar-item>
          <vs-sidebar-item id="AddPerceraian" to="AddPerceraian">
            Pengajuan Data Perceraian
          </vs-sidebar-item>
          <template v-if="auth.user.role_id === (1 || 3)">
            <vs-sidebar-item id="validasiPerceraian" to="ValidasiPerceraian">
              ValidasiPerceraian
            </vs-sidebar-item>
          </template>
        </vs-sidebar-group>
        <template v-if="['superadmin'].includes(auth.user.role.name)">
          <vs-sidebar-group>
            <vs-sidebar-item id="Administrators" to="Administrators">
              Administrators
            </vs-sidebar-item>
            <template #header>
              <vs-sidebar-item arrow id="PanelAdmin">
                Panel Admin
              </vs-sidebar-item>
            </template>
          </vs-sidebar-group>
        </template>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Sidebar",
  props: {
    msg: String,
  },
  data: () => ({
    active: "0",
    activeSidebar: false,
  }),

  computed: {
    ...mapGetters({
      auth: 'auth',
    })
  }
};
</script>

<style>
.full-height {
  height: 100%;
}

vs-sidebar {
  border-radius: 0px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>