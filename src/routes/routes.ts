import React from 'react'


const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const Cities = React.lazy(() => import('../views/pages/ListCities/Cities'))
const President = React.lazy(() => import('../views/pages/president/president'))
const Presidents = React.lazy(() => import('../views/pages/presidents/Presidents'))
// const Error = React.lazy(() => import('../views/pages/page404/Page404'))

const routes = [
  { path: '/', name: 'dashboard', element: Dashboard },
  { path: '/cities', name: 'cities', element: Cities, exact: true },
  { path: '/presidents', name: 'presidents', element: Presidents },
  { path: '/president', name: 'president', element: President },
]

export default routes
