

import { ColombiAppLayout } from "../layout/ColombiAppLayout"
import CitiesPage from "./CitiesPage";
import { PresidentsPage } from "./presidents/PresidentsPage";


export const ColombiAppPage = () => {

  return (
    <ColombiAppLayout>
      <CitiesPage />
      <PresidentsPage />  
    </ColombiAppLayout>
  )
}
