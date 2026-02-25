"use client";

import { Button } from "~/components/ui/button";
import { toast } from "sonner";
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
import { motion } from "motion/react";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid Credentials", {
          description: "Please check your email and password.",
        });
      } else if (res?.ok) {
        toast.success("Welcome back!", {
          description: "Login successful.",
        });
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-[450px]"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="text-center mb-8 relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 text-primary"
            >
              <LogIn size={32} />
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Welcome <span className="text-primary italic">Back</span>
            </h1>
            <p className="text-zinc-400">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
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
                    <div className="flex items-center justify-between ml-1">
                      <FormLabel className="text-zinc-300">Password</FormLabel>
                      <Link href="#" className="text-xs text-primary/80 hover:text-primary transition-colors">
                        Forgot password?
                      </Link>
                    </div>
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
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(234,88,12,0.2)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <p className="text-zinc-500 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary font-medium hover:underline underline-offset-4">
                    Sign up for free
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
          &copy; {new Date().getFullYear()} Blog Nest. Crafted for creators.
        </motion.p>
      </motion.div>
    </div>
  );
}

