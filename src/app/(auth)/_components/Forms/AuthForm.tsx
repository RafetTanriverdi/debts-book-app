"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "@rt/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rt/components/ui/card";
import { Input } from "@rt/components/ui/input";
import { usePathname } from "next/navigation";
import React from "react";

type LoginAndRegisterCardProps = {
  action?: (
    formData: FormData
  ) => void | Promise<void>;
};
export const AuthForm = ({
  action,
}: LoginAndRegisterCardProps) => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <Card className="w-1/4 cursor-default">
      <CardHeader>
        <CardTitle className="text-center text-3xl ">
          {isLogin ? "Login" : "Sign Up"}
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          {isLogin
            ? "Login to your account"
            : "Create a new account"}
        </p>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="flex flex-col gap-2 ">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-muted-foreground "
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <Label
              htmlFor="password"
              className=" text-sm font-medium text-muted-foreground "
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full my-6 "
            type="submit"
            variant={"default"}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
