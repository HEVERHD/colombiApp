import { ColombiAppLayout } from "../layout/ColombiAppLayout"
import CitiesPage from "./CitiesPage";

import { PresidentsPage } from "./PresidentsPage";

export const ColombiAppPage = () => {

  return (
    <ColombiAppLayout>
      <CitiesPage />
      <PresidentsPage />
    </ColombiAppLayout>
  )
}
