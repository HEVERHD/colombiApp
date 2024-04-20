import { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CPagination, CPaginationItem, CImage } from '@coreui/react';
import ColombiaService from '../../../services/colombia.service';

import { Presidents } from '../../../models/president.model';
const PresidentsList = () => {

  const [presidents, setPresidents] = useState<Presidents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);



  const getTotalPresident = async (): Promise<void> => {
    ColombiaService.getPresidents()
      .then((data) => {
        if (data) {
          setPresidents(data);
          setLoading(false);
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
                  {presidents.map((president, index) => (
                    <CTableRow key={president.id}>

                      <CImage alt={president.name} src={president.image} width="80" height="80" className="rounded-circle" />


                      <CTableDataCell>{president.name}</CTableDataCell>
                      <CTableDataCell>{president.lastName}</CTableDataCell>
                      <CTableDataCell>{president.startPeriodDate}</CTableDataCell>
                      <CTableDataCell>{president.politicalParty}</CTableDataCell>
                    </CTableRow>
                  ))}
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


