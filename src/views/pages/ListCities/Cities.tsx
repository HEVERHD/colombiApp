import React, { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CFormInput, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CPagination, CPaginationItem } from '@coreui/react';
import ColombiaService from '../../../services/colombia.service';
import { City } from '../../../models/city.model';
import { Page } from '../../../models/page.model';
import { adapterCities } from '../../../adapters/cities.Adapter';

const Cities = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const [cities, setCities] = useState<City[]>([]);
  const [pageData, setPageData] = useState<Page<null> | undefined>(undefined);
  const [pages, setPages] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filtering, setFiltering] = useState<boolean>(false);

  const onPageChange = (page: number) => {
    downloadCities(page);
  };

  const downloadCities = async (page: number): Promise<void> => {
    setLoading(true);
    setError(false);
    ColombiaService.getCities(page)
      .then((data) => {
        if (data) {
          const adaptedCities = data.data.map((cityData: any) => adapterCities(cityData));
          setCities([...adaptedCities] as City[]);
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
    setFiltering(true);
    setLoading(true);
    setError(false);

    if (text.trim().length >= 4) {
      ColombiaService.searchCities(text)
        .then((data) => {
          if (data) {
            setCities(Array.isArray(data) ? data : [data]);
            setLoading(false);
          } else {
            setCities([]);
            setError(true);
            setLoading(false);
          }
        })
        .catch(() => {
          setCities([]);
          setError(true);
          setLoading(false);
        })
        .finally(() => {
          setFiltering(false);
        });
    } else {
      downloadCities(page);
      setFiltering(false);
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
    downloadCities(page);
  }, [page]);

  useEffect(() => {
    searchCities(searchText);
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
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <CRow>
              <CCol xs={12}>
                {error ? (
                  <div>Error al cargar los datos.</div>
                ) : (
                  <>
                    {cities.length > 0 ? (
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">id</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {cities.map((city) => (
                            <CTableRow key={city.id}>
                              <CTableDataCell>{city.id}</CTableDataCell>
                              <CTableDataCell>{city.name}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    ) : (
                      <div>No se encontraron ciudades.</div>
                    )}
                  </>
                )}
              </CCol>
            </CRow>
          )}
        </CCardBody>
      </CCard>
      {!filtering && cities.length === pageData?.pageSize && pages.length > 0 && (
        <CPagination align="center" aria-label="Page navigation example">
          {pages.map((pageNumber) => (
            <CPaginationItem key={pageNumber} onClick={() => onPageChange(pageNumber)}>{pageNumber}</CPaginationItem>
          ))}
        </CPagination>
      )}

    </>
  );
};

export default Cities;
