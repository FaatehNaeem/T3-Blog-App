"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import type z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { loginSchema } from "~/utils/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [isSubmitted, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Form submitted with values:", values); // Check if the form values are correct

    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Prevent auto-redirect for custom handling
      });
      if (res?.error) {
        console.error("Login failed:", res.error);
      } else if (res?.ok) {
        router.push("/"); // Redirect to dashboard upon success
      }
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <div className="w-full bg-zinc-950 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[559px]">
        <div className="hidden bg-muted lg:block">
          <Image
            src="social/wp-content/uploads/2015/12/blog-background-2.jpg"
            alt="Image"
            width="1920"
            height="1000"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="fixed mx-auto grid w-[350px] gap-6 rounded-2xl bg-zinc-800 p-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold text-white">Login</h1>
              <p className="text-balance text-muted-foreground text-white">
                Enter your details below to login !
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
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-4 text-white">
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email"
                              className="bg-zinc-800"
                              type="email"
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
                              placeholder="password"
                              className="bg-zinc-800"
                              type="password"
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
                  <Button type="submit" className="mt-4">
                    {!isSubmitted ? "Login" : "Logging In"}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-white">
                  Don&apos;t have an account?{" "}
                  <Link href="#" className="underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
