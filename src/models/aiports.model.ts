import { City } from "./city.model";

export interface Aiports {
    id: number;
    name: string;
    iataCode: string;
    oaciCode: string;
    type: TypeError;
    deparmentId: number;
    cityId: number;
    city: City;
    latitude: number;
    longitude: number;
}