import { client } from '../utils/client';
import { postsEndpoint } from '../api';

async function fetchPost(id) {
  const response = await client.get(`${postsEndpoint}/${id}/`);
  return response.data;
}

export { fetchPost };
