import React, { PropsWithChildren } from 'react';

export function BackDropCard({ children }: PropsWithChildren) {
  return <div className="flex fixed inset-0">{children}</div>;
}
