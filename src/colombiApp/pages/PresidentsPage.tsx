import  { useEffect, useState } from "react";
import { ColombiAppLayout } from "../layout/ColombiAppLayout";
import { getPresidents } from "../../services/getPresidents";
import { adapterPresidents } from "../../adapters/presidents.Adapter";
import { Presidents } from '../../models/presidents.models';
import PresidentCard from "../components/presidents/PresidentCard";


export const PresidentsPage = () => {
  const [presidents, setPresidents] = useState<Presidents[]>([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      try {
        const response = await getPresidents();
        const allPresidents = response?.data as any;
        const adaptedPresidents: Presidents[] = allPresidents.map(adapterPresidents); 
        setPresidents(adaptedPresidents);
      } catch (error) {
        console.error("Error fetching presidents:", error);
      }
    };
    fetchPresidents();
  }, []);

  return (
    <ColombiAppLayout>
      <div>PresidentsPage</div>
      {presidents.map((president) => (
        <PresidentCard key={president.id} president={president} />
      ))}
    </ColombiAppLayout>
  );
};
