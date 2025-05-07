"use server";

import { createClient } from "@rt/authentication/supabase/server";

export const signUp = async (
  email: string,
  password: string
) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "customer",
          permission: [
            {
              action: "read",
              subject: "debts",
            },
            {
              action: "read",
              subject: "financial",
            },
          ],
        },
      },
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

export const signIn = async (
  email: string,
  password: string
) => {
  try {
    const { auth } = await createClient();
    const { data, error } =
      await auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      console.log("Error signing in:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log("Error signing in:", error);
    throw new Error("Failed to sign in");
  }
};

export const signOut = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) {
      console.log("Error signing out:", error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.log("Error signing out:", error);
    throw new Error("Failed to sign out");
  }
};
