import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilList, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { set } from '../store'

const AppHeader = () => {
  const headerRef = useRef()
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);
  const { displayName } = useSelector((state: RootState) => state.auth);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Actualiza el estado de la consulta de búsqueda
    // Aquí puedes agregar lógica adicional, como enviar la consulta de búsqueda a algún servicio o componente
  };


  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink>
              { displayName  ? `Hola ${displayName}` : "Bienvenido"}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
