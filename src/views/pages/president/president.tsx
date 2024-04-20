import { CCard, CCardHeader } from '@coreui/react'
import { useEffect, useState } from 'react';
import { Presidents } from '../../../models/president.model';
import ColombiaService from '../../../services/colombia.service';

const Typography = () => {
  const [, setPresidents] = useState<Presidents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPresident, setCurrentPresident] = useState<Presidents | null>(null);

  const getTotalPresident = async (): Promise<void> => {
    ColombiaService.getPresidents()
      .then((data) => {
        if (data) {
          setPresidents(data as unknown as Presidents[]);
          setLoading(false);
          const currentPresident = data.find((president: { endPeriodDate: null; }) => president.endPeriodDate === null) as Presidents;
          setCurrentPresident(currentPresident);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      await getTotalPresident();
    })();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar los presidentes.</p>;
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div key={currentPresident?.id}>
            <img src={currentPresident?.image} alt={currentPresident?.name} />
            <h2>{currentPresident?.name} {currentPresident?.lastName}</h2>
            <h4>{currentPresident?.politicalParty}</h4>
            <p>{currentPresident?.description}</p>
          </div>
        </CCardHeader>
      </CCard>
    </>
  )
}

export default Typography
