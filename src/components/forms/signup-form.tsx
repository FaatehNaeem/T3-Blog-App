"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { signupSchema } from "~/utils/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import type z from "zod";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

// trpc logic
export default function SignUpForm() {
  const router = useRouter();
  const utils = api.useUtils();

  const user = api.user.createUser.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    user.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    router.push("/login");
  }

  return (
    <Form {...form}>
      <div className="w-full bg-background lg:grid h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col justify-center items-center lg:grid lg:w-[350px] gap-6 lg:rounded-2xl bg-foreground lg:p-6 h-screen lg:h-auto w-screen border-background border-1 shadow-md">
            <div className="grid gap-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white">Sign Up</h1>
              <p className="text-balance text-muted-foreground text-white">
                Enter your details below to signup !
              </p>
            </div>

            <div className="grid gap-12">
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="text-white">
                          <FormLabel className="text-white">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your username"
                              {...field}
                            />
                          </FormControl>
                          <div className="h-0">
                            <FormMessage className="font-extrabold" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-4 text-white">
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <div className="h-0">
                            <FormMessage className="font-extrabold" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mt-4 text-white">
                          <FormLabel className="text-white">Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <div className="h-0">
                            <FormMessage className="font-extrabold" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 hover:bg-background hover:text-foreground"
                    disabled={user.isPending}
                  >
                    {user.isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-white">
                  Already have an account?{" "}
                  <Link href="/login" className="underline text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden bg-foreground lg:flex flex-col justify-center items-center">
        <h1 className="text-7xl text-background">
              BLOG <span className="font-bold text-primary">NEST</span>
            </h1>
        </div>
      </div>
    </Form>
  );
}
