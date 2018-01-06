import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from '../utils'
import { Error404 } from './components'
import { 
  Home,
  About,
  Login,
  Dashboard,
} from './pages'

export const Routes = ({ isAuth }) => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />

    {/* Public Route Middleware */}
    <PublicRoute authed={isAuth} path='/login' component={Login} />

    {/* Private Route Middleware */}
    <PrivateRoute authed={isAuth} path='/dashboard' component={Dashboard} />

    {/* Error 404 Not Found */}
    <Route component={Error404} />
  </Switch>
)