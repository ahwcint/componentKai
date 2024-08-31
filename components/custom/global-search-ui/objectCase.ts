import { createUser } from '@/app/actions/user';

export const objectCase: {
  condition: string;
  action: string;
  fn?: (...args: any) => any;
}[] = [
  {
    condition: '/?',
    action: '/? for more commands',
  },
  {
    condition: '/login',
    action: '/login [username] [password]',
  },
  {
    condition: '/register',
    action: '/register [username] [password]',
    fn: async (...props) =>
      await createUser({
        username: props[0],
        password: props[1],
      }),
  },
];
