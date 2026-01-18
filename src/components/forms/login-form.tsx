"use client";

import { Button } from "~/components/ui/button";
import { toast } from "sonner"
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [error, setIsError] = useState(false);
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
toast.error("Invalid Credentials")
      } else if (res?.ok) {
toast.success("Login Successfull")
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
      <div className="w-full bg-background lg:grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-foreground lg:flex flex-col justify-center items-center">
        <h1 className="text-7xl text-background">
              BLOG <span className="font-bold text-primary">NEST</span>
            </h1>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col justify-center items-center lg:grid lg:w-[350px] gap-6 lg:rounded-2xl bg-foreground lg:p-6 h-screen lg:h-auto w-screen border-background border-1 shadow-md">
            <div className="grid gap-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-background">Login</h1>
              <p className="text-balance text-secondary">
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
                        <FormItem className="mt-4">
                          <FormLabel className="text-background">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              className="text-background"
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
                              placeholder="Enter your password"
                              className="text-background"
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
                  <Button type="submit" className="mt-4 bg-background text-foreground hover:bg-primary hover:text-background">
                    {!isSubmitted ? "Login" : "Logging In"}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-white">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline text-primary">
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
