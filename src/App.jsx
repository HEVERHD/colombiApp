import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import { useCheckAuth } from './hooks'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Register = React.lazy(() => import('./auth/pages/RegisterPage'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Login = React.lazy(() => import('./auth/pages/LoginPage'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const { status } = useCheckAuth()


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('/') && urlParams.get('/').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  return (

    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >


        <Routes>
          {
            status === "authenticated"
              ?
              <>
                <Route path="*" name="Home" element={<DefaultLayout />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
              </>
              : <>
                <Route exact path="/" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
              </>
          }

        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
