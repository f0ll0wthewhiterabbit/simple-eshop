import jwtDecode from 'jwt-decode'

const isTokenExpired = token => {
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    return true
  }

  return false
}

export default isTokenExpired
