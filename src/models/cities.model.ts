export interface Cities {
    map(adapterCities: (apiCities: Cities) => { id: number; name: string; country: null; description: string; }): unknown;
    id:                     number;
    name:                   string;
    description:            string;
    surface:                number | null;
    population:             number | null;
    postalCode:             null | string;
    departmentId:           number;
    department:             null;
    touristAttractions:     null;
    presidents:             null;
    indigenousReservations: null;
    airports:               null;
    radios:                 null;
}