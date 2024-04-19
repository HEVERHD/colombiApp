import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/colombiApp/components/navbar.scss";
import { searchPresidents } from '../../services/getPresidents';
import { Presidents } from '../../models/presidents.models';

export const Navbar = ({ handleSearch }: { handleSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);

    if (query.length >= 4) { // Validación para ejecutar la búsqueda solo si hay al menos tres letras
      try {
        const response = await searchPresidents(query);
        const presidents: Presidents = response.data; 
        handleSearch(presidents); 

        navigate('/results');
      } catch (error) {
        console.error("Error searching presidents:", error);
      }
    }
  };


  return (
    <div className="navbar_main">
      <div className="links"></div>
      <div className="search">
        <form>
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Buscar presidente..."
          />
        </form>
      </div>
    </div>
  );
};
