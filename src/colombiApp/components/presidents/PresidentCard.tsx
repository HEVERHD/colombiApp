import React from 'react';
import { Presidents } from '../../../models/presidents.models';
import "../../../styles/colombiApp/components/presidents/PresidentCard.scss";


interface PresidentCardProps {
  president: Presidents;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
  return (
    <div className="president-card">
      <img src={president.image} alt={president.name} />
      <p>{president.name}</p>
      <p>{president.lastName}</p>
      <p>{president.politicalParty}</p>
      <p>{president.description}</p>
      <p>{president.cityId}</p>
    </div>
  );
};

export default PresidentCard;
