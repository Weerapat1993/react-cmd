import PropTypes from 'prop-types'

export const AuthPropTypes = {
  auth: PropTypes.shape({
    isAuth: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ])
  }),
}