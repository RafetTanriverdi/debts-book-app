"use client";
import { AuthForm } from "@rt/app/(auth)/_components/Forms/AuthForm";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function RegisterPage() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (formData: FormData) => {
      const phone = formData.get(
        "phone"
      ) as string;
      const password = formData.get(
        "password"
      ) as string;
      console.log(phone, password);
      console.log(
        "SUPABASE_URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL
      );
      console.log(
        "SUPABASE_KEY:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    },
  });

  return (
    <>
      <AuthForm action={mutation.mutate} />
    </>
  );
}
