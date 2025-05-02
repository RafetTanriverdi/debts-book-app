import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden w-full">
      {children}
    </div>
  );
}
