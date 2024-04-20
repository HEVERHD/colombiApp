import { Cities } from "../models/cities.model"

export const adapterCities = (apiCities: Cities) => {
    return{
        id: apiCities.id,
        name: apiCities.name,
        country: apiCities.department,
        description: apiCities.description,
    }
}