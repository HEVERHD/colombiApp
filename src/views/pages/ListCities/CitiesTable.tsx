import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { City } from '../../../models/city.model';

interface CitiesTableProps {
    cities: City[];
}

const CitiesTable = ({ cities }: CitiesTableProps) => {
    return (
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
    );
};

export default CitiesTable;
