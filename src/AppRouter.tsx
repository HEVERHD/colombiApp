import { Navigate, Route, Routes } from "react-router-dom"
import { useCheckAuth } from "./hooks"
import { AuthRoutes } from "./auth/routes/AuthRoutes"






export const AppRouter = () => {
  const { status } = useCheckAuth()

 if ( status === "checking") return <h1> Loading...</h1>;

  return (
    <Routes>
      {
        status === "authenticated" 
        ? <Route path="/*" element={<App />} />
        : <Route path="/auth/*" element={<AuthRoutes />} />   
      }
      <Route path="/*" element={<Navigate to="/auth/login" />} />
  
    </Routes>
  )
}
