"use client";
import { signIn } from "@rt/actions/user";
import { AuthForm } from "@rt/app/(auth)/_components/Forms/AuthForm";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: FormData) => {
      const email = formData.get(
        "email"
      ) as string;
      const password = formData.get(
        "password"
      ) as string;
      await signIn(email, password)
        .then((res) =>
          console.log("User signed in:", res)
        )
        .catch((err) => {
          console.log("Error signing in:", err);
          throw new Error(err.message);
        });
    },
    onSuccess: (data) => {
      console.log(
        "User signed in successfully",
        data
      );
      router.replace("/debts");
    },
  });
  return <AuthForm action={mutation.mutate} />;
}
