import CIcon from '@coreui/icons-react'
import {
  cibEsea,
  cilFeaturedPlaylist,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'ColombiApp',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'presidentes de  la República de  Colombia',
  },
  {
    component: CNavItem,
    name: 'Presidente  Actual',
    to: '/president',
    icon: <CIcon icon={cibEsea} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Lista de presidentes',
    to: '/presidents',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Ciudades de  Colombia',
  },
  {
    component: CNavItem,
    name: 'Lista de ciudades',
    to: '/cities',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
  },
]

export default _nav
