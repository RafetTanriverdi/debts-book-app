import { TanstackQuery } from "@rt/providers/TanstackQuery";
import { ThemeProvider } from "@rt/providers/ThemeProvider";
import React from "react";

function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQuery>{children}</TanstackQuery>
    </ThemeProvider>
  );
}

export default Providers;
