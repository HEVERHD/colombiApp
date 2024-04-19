import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { Presidents } from '../../../models/presidents.models';
import "../../../styles/colombiApp/components/presidents/PresidentCard.scss";

interface PresidentCardProps {
  president: Presidents;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
  return (
    <div className="president-card">
      {/* Agrega un enlace a la vista de detalle del presidente */}
      <Link to={`/presidents/${president.id}`}>
        <img src={president.image} alt={president.name} />
        <h3>{president.name}</h3>
        <p>{president.lastName}</p>
        <p>{president.politicalParty}</p>
      </Link>
    </div>
  );
};

export default PresidentCard;
