import { BlogCard } from "~/components/blog-card";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-wrap items-center justify-center gap-6 p-6 overflow-x-hidden bg-black">
    <BlogCard />
    </div>
  );
}