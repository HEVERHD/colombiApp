import { Dispatch } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {

  cilExitToApp,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'
import { RootState } from '../../types'

const AppHeaderDropdown = () => {
  const { photoURL }: any = useSelector((state: RootState) => state.auth);
  const dispatch: Dispatch<any> = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0 pe-0" caret={false}>
        <CAvatar src={photoURL} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Mi cuenta
        </CDropdownHeader>

        <CDropdownDivider />
        <CDropdownItem onClick={onLogout}>
          <CIcon icon={cilExitToApp} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
