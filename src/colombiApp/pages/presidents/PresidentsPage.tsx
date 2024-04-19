import React, { useEffect, useState } from "react";
import { ColombiAppLayout } from "../../layout/ColombiAppLayout";
import { getPresidents } from "../../../services/getPresidents";
import { adapterPresidents } from "../../../adapters/presidents.Adapter";
import { Presidents } from '../../../models/presidents.models';
import PresidentCard from "../../components/presidents/PresidentCard";

export const PresidentsPage = () => {
  const [presidents, setPresidents] = useState<Presidents[]>([]);
  const [filteredPresidents, setFilteredPresidents] = useState<Presidents[]>([]);
  const [randomPresidents, setRandomPresidents] = useState<Presidents[]>([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      try {
        const response = await getPresidents();
        const allPresidents = response?.data as any;
        const adaptedPresidents: Presidents[] = allPresidents.map(adapterPresidents); 
        setPresidents(adaptedPresidents);
        setFilteredPresidents(adaptedPresidents);
      } catch (error) {
        console.error("Error fetching presidents:", error);
      }
    };
    fetchPresidents();
  }, []);

  // Función para seleccionar 5 presidentes de manera aleatoria
  useEffect(() => {
    const getRandomPresidents = () => {
      const randomIndex = new Set();
      while (randomIndex.size < 5) {
        const index = Math.floor(Math.random() * presidents.length);
        randomIndex.add(index);
      }
      const selectedPresidents = Array.from(randomIndex).map(index => presidents[index]);
      setRandomPresidents(selectedPresidents);
    };
    if (presidents.length > 0) {
      getRandomPresidents();
    }
  }, [presidents]);

  const handleSearch = (query: string) => {
    const filtered = presidents.filter(president =>
      president.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPresidents(filtered);
  };

  return (
    <ColombiAppLayout handleSearch={handleSearch}>
      <div>PresidentsPage</div>
      {filteredPresidents.map((president) => (
        <PresidentCard key={president.id} president={president} />
      ))}
    </ColombiAppLayout>
  );
};
