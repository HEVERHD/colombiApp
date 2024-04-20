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
    try {
      const data = await ColombiaService.getPresidents();
      setPresidents(data as unknown as Presidents[]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalPresident();
  }, []);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Lista de presidentes de Colombia
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div>Error al cargar los datos.</div>
          ) : (
            <CRow>
              <CCol xs={12}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Apellidos</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Año Inicio</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Partido Político</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {presidents.map((president) => (
                      <CTableRow key={president.id}>
                        <CImage alt={president.name} src={president.image} width="80" height="80" className="rounded-circle" />
                        <CTableDataCell>{president.name}</CTableDataCell>
                        <CTableDataCell>{president.lastName}</CTableDataCell>
                        <CTableDataCell>{president.startPeriodDate.toString()}</CTableDataCell>
                        <CTableDataCell>{president.politicalParty}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default PresidentsList;
