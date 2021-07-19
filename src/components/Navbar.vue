<template>
    <div>
        <vs-navbar color="#7d33ff" text-white square center-collapsed>
            <h2>{{ msg }}</h2>
            <template v-if="authenticated" #right>
                <h5>{{ user.name }}</h5>
                <vs-input type="text" v-model="search" placeholder="Search"/>
                <vs-button color="rgb(255,255,255)" flat>Search</vs-button>
                <vs-button flat color="danger" @click="logout" to="/">Logout</vs-button>
            </template>
            <template v-else #right>
                <vs-button color="primary" to="Home">Login</vs-button>
            </template>
        </vs-navbar>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Navbar",
    props: {
    msg: String,
    },
    data: () => ({
        active: "0",
        activeSidebar: false,
    }),
    computed: {
        ...mapGetters({
            authenticated: 'authenticated',
            user: 'user',   
        })
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout").then(() => {
            this.$router.push("/");
            });
        }
    }
};
</script>

<style scoped>
    h2 {
    
    overflow: hidden;
    padding-left: 40px;
    
    }
    ::placeholder {
        color: black;
        opacity: 1;

    }
    h5 {
        padding-right: 20px;
    }
</style>