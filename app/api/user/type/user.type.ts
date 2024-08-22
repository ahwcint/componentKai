import { User } from '@prisma/client';

export type TUserRequest = {
  username: string;
  password: string;
};

export type TUserResponse = {
  data: User;
};
