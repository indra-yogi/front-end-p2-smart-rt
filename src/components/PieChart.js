import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data: () => ({
    chartdata: {
        labels: ['Perkawinan', 'Perceraian'],
        datasets: [
        {
            label: 'Data One',
            backgroundColor: ['#00ff00', '#ffa500'],
            data: [380, 120]
        },
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
}),

    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}