import { useEffect, useState } from "react";
import { Cities } from "../models/useCities";
import { getCities } from "../services/getCities";

// import { adaptProduct } from "../adapters/productsApadter";

export function useProductData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState<Cities[]>([]);

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await getCities();
            const allCities = response?.data;
            setCities([allCities]); 
            setIsLoading(false);
        } catch (error: unknown) {
            setError(error);
            setIsLoading(false);
        }
    };
    fetchProducts();
}, []);

  return { cities, isLoading, error }
}