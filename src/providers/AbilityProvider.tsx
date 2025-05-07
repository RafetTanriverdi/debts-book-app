"use client";
import { createClient } from "@rt/authentication/supabase/client";
import { buildAbilityFor } from "@rt/authorization/ability";
import { AbilityContext } from "@rt/authorization/Can";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function AbilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { auth } = await createClient();
      const { data } = await auth.getUser();
      return data.user;
    },
    refetchOnWindowFocus: false,
  });

  const ability = buildAbilityFor(
    user?.user_metadata?.permission || []
  );
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export default AbilityProvider;
