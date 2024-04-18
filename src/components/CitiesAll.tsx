import { useState, useEffect } from "react";
import { getCities } from "../services/getCities";
import { Cities } from "../models/useCities";
import { AxiosResponse } from "axios";

export const CitiesAll = () => {
const [cities, setCities] = useState<Cities[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    const response: AxiosResponse<Cities, any> = await getCities();
    setCities([response?.data]);
  };
  fetchProducts();
}, []);

  return (
    <>
      <div>Products</div>
      <ul>
        {cities.map((citie) => (
          <li key={citie.id}>
            {citie.name} - {citie.airports}
          </li>
        ))}
      </ul>
    </>
  );
};