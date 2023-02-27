import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/account/Login'))

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={isAuthenticated ? <Navigate to={'/dashboard'} /> : <Login />}
          />
          <Route
            path="*"
            name="Home"
            element={isAuthenticated ? <DefaultLayout /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
