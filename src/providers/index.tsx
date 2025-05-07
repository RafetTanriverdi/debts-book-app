import AbilityProvider from "@rt/providers/AbilityProvider";
import { TanstackQuery } from "@rt/providers/TanstackQuery";
import { ThemeProvider } from "@rt/providers/ThemeProvider";
import React from "react";

function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackQuery>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AbilityProvider>
          {children}
        </AbilityProvider>
      </ThemeProvider>
    </TanstackQuery>
  );
}

export default Providers;
