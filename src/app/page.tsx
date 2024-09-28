import Image from "next/image"
import Link from "next/link"


import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

export default function Dashboard() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[559px] bg-black">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-white">Sign Up</h1>
            <p className="text-balance text-muted-foreground text-white">
              Enter your email below to sign up !
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="text-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-white"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required className="text-white"/>
            </div>
            <Button type="submit" className="w-full bg-zinc-900">
              Login
            </Button>
            <Button className="w-full bg-zinc-900 text-white">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="social/wp-content/uploads/2015/12/blog-background-2.jpg"
          alt="Image"
          width="1920"
          height="1000"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}