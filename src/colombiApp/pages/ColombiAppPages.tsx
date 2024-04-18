import { useEffect, useState } from "react";
import { ColombiAppLayout } from "../layout/ColombiAppLayout"
import { getCities } from "../../services/getCities";
import { Cities } from "../../models/useCities";
import { adapterCities } from "../../adapters/cities.Adapter";

export const ColombiAppPage = () => {
  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities();
      const allCities = response?.data as any; // Update the type of allCities using type assertion
      const adaptedCities: Cities[] = allCities.map(adapterCities); // Ensure adaptedCities has the correct type
      setCities(adaptedCities);
    };
    fetchCities();
  }, []);
  return (
    <ColombiAppLayout>
      <h1>ColombiApp</h1>
      <p>ColombiApp is a simple app that shows a list of cities</p>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    


    </ColombiAppLayout>
  )
}
