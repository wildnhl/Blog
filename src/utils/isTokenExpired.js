import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token) {
  const decoded = jwtDecode(token);
  // console.log('expired', new Date(decoded.exp * 1000));
  // console.log(new Date(Date.now()));
  if (decoded.exp < Date.now() / 1000) {
    return true;
  }
  return false;
}
