import React, { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CImage, CPaginationItem, CPagination, CInputGroup, CInputGroupText, CButton, CFormInput } from '@coreui/react';
import ColombiaService from '../../../services/colombia.service';
import { City } from '../../../models/city.model';
import { Page } from '../../../models/page.model';
import { cilMagnifyingGlass } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Cities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCities = async (page: number): Promise<void> => {
    setLoading(true);
    ColombiaService.getCities(page)
      .then((data) => {
        if (data) {
          setCities(data.data);
          setTotalPages(data.totalPages);
          setCurrentPage(page);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      await getCities(1);
    })();
  }, []);

  const onPageChange = (page: number) => {
    getCities(page);
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        Lista de ciudades de Colombia
      </CCardHeader>
      <CInputGroup className="input-prepend">
        <CInputGroupText>
          <CIcon icon={cilMagnifyingGlass} />
        </CInputGroupText>
        <CFormInput type="text" placeholder="What are you looking for?" />
        <CButton color="info">Search</CButton>
      </CInputGroup>
      <CCardBody>
        <CRow>
          <CCol xs={12}>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {cities.map((city, index) => (
                  <CTableRow key={city.id}>
                    <CTableDataCell>{city.name}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CPagination align="center" aria-label="Page navigation example">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <CPaginationItem
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </CPaginationItem>
              ))}
            </CPagination>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default Cities;
