import React from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-9/10">{children}</div>;
}
