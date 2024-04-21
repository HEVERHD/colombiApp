import { CImage, CTableDataCell, CTableRow } from "@coreui/react";
import { Presidents } from "../../../models/president.model";

interface PresidentProps {
    president: Presidents;

}

const PresidentTable = ({ president }: PresidentProps) => {
    return (
        <CTableRow key={president.id}>
            <CImage alt={president.name} src={president.image} width="80" height="80" className="rounded-circle" />
            <CTableDataCell>{president.name}</CTableDataCell>
            <CTableDataCell>{president.lastName}</CTableDataCell>
            <CTableDataCell>{president.startPeriodDate.toString()}</CTableDataCell>
            <CTableDataCell>{president.politicalParty}</CTableDataCell>
        </CTableRow>
    );
};

export default PresidentTable;