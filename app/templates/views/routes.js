import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from '../utils'
import { Error404, App } from './components'
import { 
  HomePage,
  AboutPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
} from './pages'

export const Routes = ({ isAuth }) => (
  <App>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/about' component={AboutPage} />

      {/* Public Route Middleware */}
      <PublicRoute authed={isAuth} path='/login' component={LoginPage} />
      <PublicRoute authed={isAuth} path='/register' component={RegisterPage} />

      {/* Private Route Middleware */}
      <PrivateRoute authed={isAuth} path='/dashboard' component={DashboardPage} />

      {/* Error 404 Not Found */}
      <Route component={Error404} />
    </Switch>
  </App>
)