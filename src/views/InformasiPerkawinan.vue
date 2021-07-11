<template>
    <div class="full-height">
        <Sidebar />
        <Navbar msg="Informasi Perkawinan" />
        <div class="row">
            <div>
                
            </div>
        </div>    
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

export default {
    name: "InfoPerkawinan",
    components: {
        Sidebar,
        Navbar,
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