'use client';
import React from 'react';
import GlobalSearchBar from '@/components/custom/global-search-ui/GlobalSearchBar';

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <section className="fixed bottom-0 left-0 p-4 w-full">
        <GlobalSearchBar />
      </section>
    </div>
  );
}
