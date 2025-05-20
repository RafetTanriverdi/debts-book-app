import Header from "@rt/components/custom/Header";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full ">
      <Header />
      {children}
    </div>
  );
}
