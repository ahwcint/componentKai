'use server';
import { env } from 'process';
import { User } from '@prisma/client';
import { TUserRequest } from '../api/user/type/user.type';
import { TBaseResponse } from '../api/global.type';

const API_URL = env.API_URL;

export async function getUser() {
  const res = await fetch(`${API_URL}/user`, {
    method: 'GET',
  });
  const data: TBaseResponse<User> = await res.json();
  return data;
}

export async function createUser(payload: TUserRequest) {
  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data: TBaseResponse<User> = await res.json();
  return data;
}
