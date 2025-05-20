"use client";

import { useContext } from "react";
import { AbilityContext } from "@rt/authorization/Can";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@rt/authentication/client";

type Props = {
  role: string;
  action: string;
  subject: string;
  children: React.ReactNode;
};

export default function CanWithRole({
  role,
  action,
  subject,
  children,
}: Props) {
  const ability = useContext(AbilityContext);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } =
        await supabase.auth.getUser();
      return data.user;
    },
  });

  const userRole = user?.user_metadata?.role;

  if (userRole !== role) return null;
  if (!ability.can(action, subject)) return null;

  return <>{children}</>;
}
