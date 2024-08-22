'use client';
import { useEffect, useState } from 'react';
import { TAuthenContext } from '../context/AuthenContextProvider';
import { inValidateTokenUser } from '../user/inValidateTokenUser';

type TUseAuthen = TAuthenContext | undefined;

export function useAuthen(): TUseAuthen {
  const [useSessionStorage, setUseSessionStorage] =
    useState<TUseAuthen>(undefined);

  useEffect(() => {
    if (typeof window !== undefined) {
      const dataJsonString = sessionStorage.getItem('authen');
      if (!dataJsonString) return;
      const dataJson = JSON.parse(dataJsonString) as TAuthenContext;
      inValidateTokenUser(dataJson.user.token);
    }
  }, []);
  return useSessionStorage;
}
