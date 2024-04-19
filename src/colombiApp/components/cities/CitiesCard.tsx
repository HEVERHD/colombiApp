import React from "react";
import { Cities } from "../../../models/useCities";
import "../../../styles/colombiApp/components/cities/CitiesCard.scss"


interface CitiesCardProps {
  city: Cities;
}

const CitiesCard: React.FC<CitiesCardProps> = ({ city }) => {
  return (
    <div className="cities-card">
      <h3>{city.name}</h3>
      <p>Population: {city.population}</p>
      <p>Country: {city.name}</p>

      {/* Agrega más información si es necesario */}
    </div>
  );
};

export default CitiesCard;