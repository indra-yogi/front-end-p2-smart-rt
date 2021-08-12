import {getApi} from "./api";

export const statisticApiGetChartData = (chartType) => {
    return getApi(`statistic?type=CHART&chartType=${chartType}`)
}
export const statisticApiGetTotalData = (query) => {
    const url = `statistic?${query}`;

    return getApi(url)
}