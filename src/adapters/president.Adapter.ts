import { Presidents } from "../models/president.model"

export const adapterPresidents = (apiPresidents: Presidents) => {
    return {
        id: apiPresidents.id,
        image: apiPresidents.image,
        name: apiPresidents.name,
        lastName: apiPresidents.lastName,
        startPeriodDate: new Date(apiPresidents.startPeriodDate),
        endPeriodDate: apiPresidents.endPeriodDate ? new Date(apiPresidents.endPeriodDate) : null,
        politicalParty: apiPresidents.politicalParty,
        description: apiPresidents.description,
        cityId: apiPresidents.cityId,
        city: apiPresidents.city,
    }
}