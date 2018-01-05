import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { PATH_AUTH_LOGIN, PATH_HAS_LOGIN } from './config/path'

export const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: PATH_AUTH_LOGIN, state: {from: props.location}}} />}
    />
  )
}

export const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={PATH_HAS_LOGIN} />}
    />
  )
}

export const AdminRoute = ({component: Component, authed, role_id, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed && role_id === 1
        ? <Component {...props} />
        : <Redirect to={{pathname: PATH_AUTH_LOGIN, state: {from: props.location}}} />}
    />
  )
}