import React from "react";
import BlogPostForm from "~/components/forms/blog-post-form";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Create New Blog</h2>
              <p className="text-muted-foreground">
                Draft your thoughts, use AI to polish your content, and share them with the world.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl pt-4">
              <BlogPostForm />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
