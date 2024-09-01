'use client';
import { DialogGlobalSearch } from '@/components/custom/global-search-ui/GlobalSearchBar';

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <DialogGlobalSearch
        onChange={() => console.log('hi')}
        onClose={() => console.log('close')}
      />
    </div>
  );
}
