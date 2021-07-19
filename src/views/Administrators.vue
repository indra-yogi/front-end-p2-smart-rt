<template>
    <div id="dataUser">
        <Sidebar />
        <Navbar msg="Administrators"/>
        <template v-if="authenticated">   
            <div class="row">
                <vs-button to="AddAdmin">Add a new Adiministrator</vs-button>
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
                        <vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
                            <vs-td>
                                {{ tr.name }}
                            </vs-td>
                            <vs-td>
                                {{ tr.nik}}
                            </vs-td>
                            <vs-td>
                                <vs-button color="danger">Delete</vs-button>
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
import { mapGetters } from 'vuex'

export default {
    name: "Administrators",
    components: {
        Sidebar,
        Navbar,
    },
    mounted() {
        this.$store.dispatch('fetchAdmins')
    },
    computed: {
        ...mapGetters([
            'users',
            'authenticated',
            'user',
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