import { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CImage } from '@coreui/react';
import ColombiaService from '../../../services/colombia.service';

import { Presidents } from '../../../models/president.model';

const PresidentsList = () => {
  const [presidents, setPresidents] = useState<Presidents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getTotalPresident = async (): Promise<void> => {
    setLoading(true);
    ColombiaService.getPresidents()
      .then((data) => {
        if (data) {
          setPresidents(data as unknown as Presidents[]);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    (async () => {
      await getTotalPresident();
    })();
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Lista de presidentes de Colombia
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Apellidos</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Año Inicio</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Partido  Político</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {loading ? (
                    <tr>
                      <td colSpan={5}>Cargando...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5}>Error al cargar los datos.</td>
                    </tr>
                  ) : (
                    presidents.map((president) => (
                      <CTableRow key={president.id}>
                        <CImage alt={president.name} src={president.image} width="80" height="80" className="rounded-circle" />
                        <CTableDataCell>{president.name}</CTableDataCell>
                        <CTableDataCell>{president.lastName}</CTableDataCell>
                        <CTableDataCell>{president.startPeriodDate.toString()}</CTableDataCell>
                        <CTableDataCell>{president.politicalParty}</CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
          <CRow>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default PresidentsList;
