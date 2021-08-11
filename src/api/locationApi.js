import {getApi} from "./api";

export const locationApiProvinceList = () => {
    return getApi(`location?type=province`)
}

export const locationApiCityList = (provinceId) => {
    return getApi(`location?type=city&provinceId=${provinceId}`)
}

export const locationApiDistrictList = (cityId) => {
    return getApi(`location?type=district&cityId=${cityId}`)
}

export const locationApiVillageList = (districtId) => {
    return getApi(`location?type=village&districtId=${districtId}`)
}

export const locationApiNeighbourhoodList = (villageId) => {
    return getApi(`location?type=neighbourhood&villageId=${villageId}`)
}