import { client } from './src/utils/client';
import { postsEndpoint } from './src/api';
export function rgb(r, g, b) {
  if (r < 0 && g < 0 && b < 0) return null;
  if (r > 255 && g > 255 && b > 255) return null;

  return `rgb(${r} ${g} ${b})`;
}

export function calcSum(a, b) {
  return a + b;
}

export async function fetchPosts(params) {
  const { data } = await client.get(postsEndpoint, { params });
  return data;
}
