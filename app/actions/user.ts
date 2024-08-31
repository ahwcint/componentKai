'use server';
import { env } from 'process';
import axios, { AxiosError, AxiosPromise } from 'axios';
import { User } from '@prisma/client';
import {
  getUserRequestApi,
  createUserRequestApi,
} from '../api/user/type/user.type';
import { requestHandler } from '../api/requestHandler';

const API_URL = env.API_URL;

const API_PATH = `${API_URL}/user`;

export const getUser = requestHandler<getUserRequestApi, User>((params) =>
  axios.get(API_PATH, { params }),
);

export const listUser = requestHandler<getUserRequestApi, User[]>((params) =>
  axios.get(API_PATH + '/list', { params }),
);

// FIXME: show data existed
export const createUser = requestHandler<createUserRequestApi, User>(
  (payload) => axios.post(API_PATH, payload),
);
