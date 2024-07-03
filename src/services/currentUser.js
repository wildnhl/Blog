import { client } from '../utils/client';
import { dataUserEndpoint, userPostsEndpoint } from '../api';

async function fetchUserData() {
  const response = await client.get(dataUserEndpoint);
  if (!response.statusText) return response;
  return response.data;
}

async function fetchUserPosts(params) {
  const response = await client.get(userPostsEndpoint, { params });
  return response.data;
}

export { fetchUserData, fetchUserPosts };
