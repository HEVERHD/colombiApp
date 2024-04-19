import { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'


const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Presidente Actual de la República de Colombia
        </CCardHeader>
        <CCardBody>
          <CRow>
            <ThemeColor className="bg-primary">Iván Duque Márquez</ThemeColor>
            <ThemeColor className="bg-secondary">Marta Lucía Ramírez</ThemeColor>
            <ThemeColor className="bg-success">Carlos Holmes Trujillo</ThemeColor>
            <ThemeColor className="bg-danger">Claudia Blum</ThemeColor>
            <ThemeColor className="bg-warning">Fernando Ruiz</ThemeColor>
            <ThemeColor className="bg-info">María Victoria Angulo</ThemeColor>
            <ThemeColor className="bg-light">Rodolfo Enrique Zea</ThemeColor>
            <ThemeColor className="bg-dark">Diego Molano Aponte</ThemeColor>
          </CRow>
        </CCardBody>
      
      </CCard>
    </>
  )
}

export default Colors
