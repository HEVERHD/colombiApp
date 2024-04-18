import { Navigate, Route, Routes } from "react-router-dom"
import { ColombiApp } from "../pages/ColombiAppPages"


export const ColombiAppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ColombiApp />} />
        <Route path="/*" element={<Navigate  to="/" />} />
    </Routes>
  )
}
