import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react'


export const AppSidebarNav = ({ items }: { items: any[] }) => {
  const navLink = (name: any, icon: any, badge: { color: string | undefined; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined } | undefined, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: { [x: string]: any; component: any; name?: any; icon?: any }, index: Key | null | undefined, indent?: boolean) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item: { [x: string]: any; items: any; component?: any; name?: any; icon?: any; to?: any }, index: Key | null | undefined) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component;
    return (
      <Component
        compact
        as="div"
        key={index}
        toggler={navLink(name, icon, undefined)}
        {...rest}
      >
        {item.items?.map((subItem: { [x: string]: any; items: any; component: any; name?: any; icon?: any; to?: any }, subIndex: Key | null | undefined) =>
          subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex, true),
        )}


      </Component>
    );
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)) as JSX.Element)}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
