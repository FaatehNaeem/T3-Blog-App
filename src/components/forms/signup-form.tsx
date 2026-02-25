"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { motion } from "motion/react";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();
  const utils = api.useUtils();

  const user = api.user.createUser.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials.",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
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
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-[450px]"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="text-center mb-8 relative">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 text-primary"
            >
              <UserPlus size={32} />
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Create <span className="text-primary italic">Account</span>
            </h1>
            <p className="text-zinc-400">
              Join our community of passionate writers
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 relative">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 ml-1">Username</FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary transition-colors" size={18} />
                        <Input
                          placeholder="johndoe"
                          className="bg-zinc-900/50 border-zinc-800 text-white pl-10 h-12 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 ml-1">Email</FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary transition-colors" size={18} />
                        <Input
                          placeholder="name@example.com"
                          className="bg-zinc-900/50 border-zinc-800 text-white pl-10 h-12 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 ml-1">Password</FormLabel>
                    <FormControl>
                      <div className="relative group/input">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-primary transition-colors" size={18} />
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="bg-zinc-900/50 border-zinc-800 text-white pl-10 h-12 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1 ml-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={user.isPending}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(234,88,12,0.2)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] mt-2"
              >
                {user.isPending ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <p className="text-zinc-500 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-zinc-600 text-center text-xs mt-8"
        >
          By joining, you agree to our Terms of Service and Privacy Policy.
        </motion.p>
      </motion.div>
    </div>
  );
}

