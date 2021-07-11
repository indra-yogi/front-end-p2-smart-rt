<template>
    <div class="sidebar">
        <vs-sidebar
        absolute
        v-model="active"
        open
        square
        >
        <h1>Aplikasi P2</h1>
        <vs-sidebar-item id="Dashboard" to="Dashboard">
            Dashboard
        </vs-sidebar-item>
        <vs-sidebar-group>
            <template #header>
                <vs-sidebar-item arrow id="Perkawinan">
                    Perkawinan
                </vs-sidebar-item>
            </template>
            <vs-sidebar-item id="DataPerkawinan" to="DataPerkawinan">
                Data Perkawinan
            </vs-sidebar-item>
            <vs-sidebar-item id="InformasiPerkawinan" to="InfoPerkawinan">
                Informasi Perkawinan
            </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-group>
            <template #header>
                <vs-sidebar-item arrow id="Perceraian">
                    Perceraian
                </vs-sidebar-item>
            </template>
            <vs-sidebar-item id="DataPerceraian" to="DataPerceraian">
                Data Perceraian
            </vs-sidebar-item>
            <vs-sidebar-item id="InformasiPerceraian">
                Informasi Perceraian
            </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-item id="Kontak" to="About">
            Kontak Kami
        </vs-sidebar-item>
        
    </vs-sidebar>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        msg: String,
    },
    data: () => ({
        active: "0",
        activeSidebar: false,
    }),
};
</script>

<style>
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