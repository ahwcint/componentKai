'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { createUser, listUser } from './actions/user';
import { API_RESPONSE_STATUS } from './api/requestHandler.enum';
import GlobalSearchBar from '@/components/custom/global-search-ui/GlobalSearchBar';

export default function HomePage() {
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    const fn = async () => {
      const res = await listUser();
      if (res.code === API_RESPONSE_STATUS.SUCCESS) setUserList(res.data);
      const cre = await createUser({ username: '123', password: '123' });
      console.log('cre', cre);
    };
    fn();
  }, []);
  return (
    <div className="h-full w-full">
      <section className="fixed bottom-0 left-0 p-4 w-full">
        <GlobalSearchBar />
        {userList.map((user) => (
          <div key={user.username}>{user.username}</div>
        ))}
      </section>
    </div>
  );
}
