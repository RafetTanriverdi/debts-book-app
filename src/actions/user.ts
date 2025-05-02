"use server";

import { createClient } from "@rt/authentication/supabase/server";

export const signUp = async (
  phone: string,
  password: string
) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signUp({
      email: phone,
      password,
    });

    if (error) {
      console.log("Error signing up:", error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.log("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
};
