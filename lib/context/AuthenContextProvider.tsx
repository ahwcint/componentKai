'use client';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useAuthen } from '../hooks/useAuthen';

export type TAuthenContext = {
  user: {
    name: string;
    role: string;
    token: string;
  };
};

export const AuthenContext = createContext<TAuthenContext | undefined>(
  undefined,
);

export const useAuthenData = () => {
  return useContext(AuthenContext);
};

export function AuthenContextProvider(props: PropsWithChildren) {
  const AuthenData = useAuthen();

  return (
    <AuthenContext.Provider value={AuthenData}>
      {props.children}
    </AuthenContext.Provider>
  );
}
