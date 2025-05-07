"use client";
import { signUp } from "@rt/actions/user";
import { AuthForm } from "@rt/app/(auth)/_components/Forms/AuthForm";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (formData: FormData) => {
      const email = formData.get(
        "email"
      ) as string;
      const password = formData.get(
        "password"
      ) as string;
      return await signUp(email, password).then(
        (res) => {
          router.replace("/debts");
          console.log("User signed up:", res);
          return res;
        }
      );
    },
    onSuccess: (data) => {
      console.log(
        "User signed up successfully",
        data
      );
      router.replace("/debts");
    },
  });

  return (
    <>
      <AuthForm action={mutation.mutate} />
    </>
  );
}
