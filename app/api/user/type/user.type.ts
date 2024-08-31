import { User } from '@prisma/client';

export type createUserRequestApi = {
  username: string;
  password: string;
};

export type getUserRequestApi = {
  id: string;
};

export type createUserResponseApi = {
  data: User;
};
