import React from 'react';
import { Presidents } from '../../../models/presidents.models';
import PresidentCard from '../../components/presidents/PresidentCard';


interface ResultsPageProps {
  searchResults: Presidents[]; // Los resultados de la búsqueda
}

const ResultsPage: React.FC<ResultsPageProps> = ({ searchResults }) => {
  return (
    <div className="results-page">
      <h2>Resultados de la búsqueda</h2>
      {searchResults.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <div className="president-list">
          {searchResults.map(president => (
            <PresidentCard key={president.id} president={president} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
