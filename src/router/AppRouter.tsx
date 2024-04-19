import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ColombiAppPage } from "../colombiApp/pages/ColombiAppPages"

import { Loader } from "../components/Loader"
import { useCheckAuth } from "../hooks"
import { PresidentsPage } from "../colombiApp/pages/PresidentsPage"
import CitiesPage from "../colombiApp/pages/CitiesPage"

export const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === "checking") return <Loader />

  return (
    <Routes>
      {
        status === "authenticated"
          ? (
            <>
              <Route path="/*" element={<ColombiAppPage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/presidents" element={<PresidentsPage/>} />
            </>
          )
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }
        <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
