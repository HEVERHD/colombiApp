import React, { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CFormInput, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CPagination, CPaginationItem, CWidgetStatsF } from '@coreui/react';
import ColombiaService from '../../../services/colombia.service';
import { City } from '../../../models/city.model';
import { Page } from '../../../models/page.model';
import CIcon from '@coreui/icons-react';
import { cilChartPie } from '@coreui/icons';

const Cities = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [cities, setCities] = useState<City[]>([]);
  const [pageData, setPageData] = useState<Page<null> | undefined>(undefined);
  const [pages, setPages] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const onPageChange = (page: number) => {
    downloadCities(page);
  };

  const downloadCities = async (page: number): Promise<void> => {
    setLoading(true);
    ColombiaService.getCities(page)
      .then((data) => {
        if (data) {
          setCities(data.data);
          setPageData(data as unknown as Page<null>);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setCities([]);
        setLoading(false);
        setError(true);
      });
  };

  const searchCities = async (text: string): Promise<void> => {
    if (text.trim().length >= 4) {
      ColombiaService.searchCities(text)
        .then((data) => {
          if (data) {
            setCities(data);
            setLoading(false);
          } else {
            setCities([]);
            setLoading(false);
            setError(true);
          }
        })
        .catch(() => {
          setCities([]);
          setLoading(false);
          setError(true);
        });
    } else {
      // Si el texto de búsqueda está vacío, descarga todas las ciudades
      downloadCities(page); // Descarga todas las ciudades al estado cities
    }
  };
  useEffect(() => {
    if (pageData) {
      const pageCount = Math.ceil(pageData.totalRecords / pageData.pageSize);
      const pagesArray = [];
      for (let i = 1; i <= pageCount; i++) {
        pagesArray.push(i);
      }
      setPages(pagesArray);
    }
  }, [pageData]);

  useEffect(() => {
    (async () => {
      await downloadCities(page);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      await searchCities(searchText);
    })();
  }, [searchText]);

  const handleSearch = () => {
    searchCities(searchText);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Lista de ciudades de Colombia
        </CCardHeader>
        <CCardBody>
          <CRow className='mb-4'>
            <CCol xs={10}>
              <CFormInput
                placeholder="Ingresa el nombre de una ciudad"
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
              />
            </CCol>
            <CCol xs={2}>
              <CButton color="primary" type="button" onClick={handleSearch}>Buscar</CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cities.map((city, index) => (
                    <CTableRow key={city.id}>
                      <CTableDataCell>{city.id}</CTableDataCell>
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
                {pages.map((pageNumber) => (
                  <CPaginationItem key={pageNumber} onClick={() => onPageChange(pageNumber)}>{pageNumber}</CPaginationItem>
                ))}
              </CPagination>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Cities;
