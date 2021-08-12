<template>
  <div>
    <GChart type="PieChart" :options="{ width: 500, height: 500 }" :data="data"></GChart>
  </div>
</template>
<script>
import { GChart } from "vue-google-charts"

export default {
  name: "PieChart",
  components: {
    GChart
  },
  props: {
    options: {
      type: Object,
      defaults: {
        width: 1100,
        height: 400
      }
    },
    data: {
      type: Array,
      defaults: []
    }
  },
}
</script>
