import {getApi} from "./api";

export const statisticApiGetChartData = (chartType) => {
    return getApi(`statistic?type=CHART&chartType=${chartType}`)
}