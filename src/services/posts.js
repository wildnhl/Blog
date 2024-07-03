import { client } from '../utils/client';
import { postsEndpoint } from '../api';

async function fetchPosts(params) {
  const { data } = await client.get(postsEndpoint, { params });
  return data;
}
async function fetchCreatePost(formData) {
  const response = await client.post(postsEndpoint, formData);
  return response;
}

export { fetchPosts, fetchCreatePost };
