import React from "react";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function AboutPage() {
  const features = [
    {
      title: "Secure Authentication",
      description: "Sign in seamlessly using Google Authentication or Credentials Login. Enjoy a personalized experience with separate user dashboards.",
      icon: "🔐",
    },
    {
      title: "User Dashboard",
      description: "Create, edit, and manage blogs with ease. Save your favorite reads for later and customize your personal workspace.",
      icon: "👤",
    },
    {
      title: "Guest Experience",
      description: "Browse, search, and filter blogs without needing an account. Discover content effortlessly.",
      icon: "🌐",
    },
    {
      title: "Social Engagement",
      description: "Foster community by commenting on blogs and engaging with other creators.",
      icon: "💬",
    },
  ];

  const techStack = [
    { src: "https://www.svgrepo.com/show/374144/typescript.svg", alt: "Typescript" },
    { src: "https://www.svgrepo.com/show/354113/nextjs-icon.svg", alt: "Next.js" },
    { src: "https://trpc.io/img/logo.svg", alt: "tRPC" },
    { src: "https://www.svgrepo.com/show/303301/postgresql-logo.svg", alt: "PostgreSQL" },
  ];

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center gap-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-6 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            ABOUT <span className="text-primary">BLOG NEST</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A cozy space for bloggers to create and share. Whether you're a casual reader or an active blogger,
            our platform offers an engaging space for content creation, discovery, and interaction.
          </p>
          <div className="h-[1px] w-24 bg-primary/50 mt-4"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {features.map((feature, index) => (
            <Card key={index} className="border-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="text-4xl">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-[1px] w-full max-w-[100px] bg-border"></div>
            <Badge variant="outline" className="px-4 py-1 text-lg font-medium border-primary/20 text-muted-foreground">
              POWERED BY
            </Badge>
            <div className="h-[1px] w-full max-w-[100px] bg-border"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 items-center grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100">
            {techStack.map((tech, index) => (
              <div key={index} className="relative w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-110 duration-300">
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
