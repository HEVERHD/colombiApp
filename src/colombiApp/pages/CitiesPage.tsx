import React, { useEffect, useState } from "react";
import { ColombiAppLayout } from "../layout/ColombiAppLayout";
import { getCities } from "../../services/getCities";
import { Cities } from "../../models/useCities";
import { adapterCities } from "../../adapters/cities.Adapter";
import CitiesCard from "../components/cities/CitiesCard";
import ReactPaginate from 'react-paginate';

import "../../styles/colombiApp/pages/CitiesPage.scss";

const CitiesPage = () => {
  const [cities, setCities] = useState<Cities[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Comenzar desde la página 0
  const citiesPerPage = 10;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCities();
        const allCities = response?.data as any;
        const adaptedCities: Cities[] = allCities.map(adapterCities); 
        setCities(adaptedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Calcular el índice del último elemento en la página actual
  const indexOfLastCity = (currentPage + 1) * citiesPerPage;
  // Calcular el índice del primer elemento en la página actual
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  // Obtener las ciudades de la página actual
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);


  const handlePageClick = ({ selected }: { selected: number }) => setCurrentPage(selected);

  return (
    <ColombiAppLayout>
      <div className="container_main_cities_page">
        <h1>Ciudades</h1>

        <div className="cities-list">
          {currentCities.map((city) => (
            <CitiesCard key={city.id} city={city} />
          ))}
        <ReactPaginate
          pageCount={Math.ceil(cities.length / citiesPerPage)}
          pageRangeDisplayed={5} 
          marginPagesDisplayed={2} 
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel={<span className="pagination-arrow">&lt;</span>}
          nextLabel={<span className="pagination-arrow">&gt;</span>}
        />
        </div>
        
      </div>
    </ColombiAppLayout>
  );
};

export default CitiesPage;
