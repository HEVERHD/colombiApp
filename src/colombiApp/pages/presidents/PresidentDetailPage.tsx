import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPresidentDetails } from "../../../services/getPresidents";
import PresidentDetail from "../../components/presidents/PresidentDetail";
import { Presidents } from "../../../models/presidents.models";

const PresidentDetailPage = () => {
  const { id } = useParams(); 
  const [president, setPresident] = useState<Presidents | null>(null);

  useEffect(() => {
    const fetchPresidentDetails = async () => {
      try {
        const presidentDetails = await getPresidentDetails(id ?? ""); 
        
        setPresident(presidentDetails.data);
      } catch (error) {
        console.error("Error fetching president details:", error);
      }
    };
    fetchPresidentDetails();
  }, [id]);

  return (
    <div>
      <div>
        <h1>
          {president ? `${president.name} ${president.lastName}` : "Cargando..."}
        </h1>

      </div>
      {president ? <PresidentDetail president={president} /> : <p>Loading...</p>}
    </div>
  );
};

export default PresidentDetailPage;
