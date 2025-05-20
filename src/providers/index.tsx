import AbilityProvider from '@rt/providers/AbilityProvider';
import { ReduxProvider } from '@rt/providers/ReduxProvider';
import { TanstackQuery } from '@rt/providers/TanstackQuery';
import { ThemeProvider } from '@rt/providers/ThemeProvider';
import React from 'react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <TanstackQuery>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AbilityProvider>{children}</AbilityProvider>
        </ThemeProvider>
      </TanstackQuery>
    </ReduxProvider>
  );
}

export default Providers;
