export function getJwtToken() {
  const tokenJson = localStorage.getItem('JWTtoken');
  if (!tokenJson) return null;
  const token = JSON.parse(tokenJson);
  return token;
}
