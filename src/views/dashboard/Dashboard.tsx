import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibBuffer, cibMinutemailer, cibPingup, cilChartPie, } from '@coreui/icons';
import { useEffect, useState } from 'react';
import ColombiaService from '../../services/colombia.service.js';
import { Colombia } from '../../models/colombia.model.js';
import { City } from '../../models/city.model.js';
import { Aiports } from '../../models/aiports.model.js';
import { Presidents } from '../../models/president.model.js';


const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [colombiaInfo, setColombiaInfo] = useState<Colombia | undefined>(undefined);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [aiports, setAiports] = useState<Aiports[]>([]);
  const [presidents, setPresidents] = useState<Presidents[]>([]);

  const downloadColombiaInfo = async (): Promise<void> => {
    ColombiaService.getColombiaInfo()
      .then((data) => {
        setColombiaInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setColombiaInfo(undefined);
        setLoading(false);
      });
  };
  const getTotalCities = async (): Promise<void> => {
    ColombiaService.getTotalCities()
      .then((data) => {
        if (data) {
          setCities(Array.isArray(data) ? data : [data]);
          setLoading(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setCities([]);
        setLoading(false);
        setError(true);
      });
  };

  const getAiports = async (): Promise<void> => {
    ColombiaService.getAirports()
      .then((data) => {
        setAiports(data as unknown as Aiports[]);
        setLoading(false);
      })
      .catch(() => {
        setColombiaInfo(undefined);
        setLoading(false);
      });
  };

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
      await downloadColombiaInfo();
      await getTotalCities();
      await getAiports();
      await getTotalPresident();
    })();
  }, []);

  return (
    <>
      <CRow>
        {loading &&
          <>
            <CCol xs={12}>
              <div className="d-flex justify-content-center">
                <CSpinner className="m-5" size="sm" style={{ width: '3rem', height: '3rem' }} />
              </div>
            </CCol>
          </>
        }
        {!loading && colombiaInfo &&
          <>
            <CCol sm={12} md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilChartPie} height={24} />}
                title="Modena oficial"
                value={colombiaInfo.currencyCode} />
            </CCol>
            <CCol sm={12} md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cibBuffer} height={24} />}
                title="Ciudades"
                value={cities.length} />
            </CCol>
            <CCol sm={12} md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="success"
                icon={<CIcon icon={cibPingup} height={24} />}
                title="Presidentes"
                value={presidents.length} />
            </CCol>
            <CCol sm={12} md={3}>
              <CWidgetStatsF
                className="mb-3"
                color="danger"
                icon={<CIcon icon={cibMinutemailer} height={24} />}
                title="Aeropuertos"
                value={aiports.length} />
            </CCol>
            <CCol sm={12} md={8}>
              <CCard className='mb-4'>
                <CCardHeader>{colombiaInfo.name}</CCardHeader>
                <CCardBody>
                  <p>{colombiaInfo.description}</p>
                  <div className="text-center">
                    <CImage rounded src={colombiaInfo.flags[1]} width={300} height={200} />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={12} md={4}>
              <CCard>
                <CCardHeader>Información adicional</CCardHeader>
                <CCardBody>
                  <CTable color="dark" borderless>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell><b>Capital</b></CTableDataCell>
                        <CTableDataCell>{colombiaInfo.stateCapital}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>
                          <b>
                            Población
                          </b>
                        </CTableDataCell>
                        <CTableDataCell>{colombiaInfo.population}  hab.</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell><b>Dominio web</b></CTableDataCell>
                        <CTableDataCell>{colombiaInfo.internetDomain}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell><b>Lenguage</b></CTableDataCell>
                        <CTableDataCell>{colombiaInfo.languages[0]}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell><b>
                          Zona horaria
                        </b></CTableDataCell>
                        <CTableDataCell>{colombiaInfo.timeZone}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell><b>
                          Superficie
                        </b></CTableDataCell>
                        <CTableDataCell>{colombiaInfo.surface}  km²</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </>
        }
        {!loading && !colombiaInfo &&
          <>
            <CCard className="mb-4">
              <CCardBody className="d-flex justify-content-center">Hubo un error al descargar la información. Intenta nuevamente.</CCardBody>
            </CCard>
          </>
        }
        {!loading && error && (
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardBody className="d-flex justify-content-center">Hubo un error al cargar la información. Intenta nuevamente.</CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default Dashboard
