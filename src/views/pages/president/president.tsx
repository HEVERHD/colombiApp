import { CCard, CCardHeader } from '@coreui/react'
import { DocsLink } from '../../../components'
import { useEffect, useState } from 'react';
import { getPresidents } from '../../../services/getPresiden';
import { Presidents } from '../../../models/president.model';
import { adapterPresidents } from '../../../adapters/president.Adapter';
import ColombiaService from '../../../services/colombia.service';
import { LoadingButton } from '@mui/lab';

const Typography = () => {
  const [presidents, setPresidents] = useState<Presidents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPresident, setCurrentPresident] = useState<Presidents | null>(null);

  const getTotalPresident = async (): Promise<void> => {
    ColombiaService.getPresidents()
      .then((data) => {
        if (data) {
          setPresidents(data);
          setLoading(false);
          const currentPresident = data.find(president => president.endPeriodDate === null);
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
            <h5>{currentPresident?.city?.name}</h5>
          </div>
        </CCardHeader>
      </CCard>
    </>
  )
}

export default Typography
