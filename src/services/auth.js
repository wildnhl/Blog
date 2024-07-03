import {
  activate,
  authUserEndpoint,
  createUserEndpoint,
  jwtRefreshEndpoint
} from '../api';
import { client } from '../utils/client';

export async function fetchCreateUser(user) {
  console.log(user);
  const response = await client.post(createUserEndpoint, user);

  return response.data;
}

export async function fetchActivateUser(obj) {
  await client.post(activate, obj);
}

export async function fetchAuthUser(objPost) {
  const response = await client.post(authUserEndpoint, objPost);
  return response.data;
}

export const requestRefreshJwtToken = async (body) => {
  const response = await client.post(jwtRefreshEndpoint, body);

  return response.data;
};
