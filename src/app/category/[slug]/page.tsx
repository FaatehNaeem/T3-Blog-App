// app/category/[slug]/page.tsx
import dynamic from "next/dynamic";

// Dynamically import the client component
const BlogClient = dynamic(() => import("./client"), { ssr: false });

export default function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  return <BlogClient categoryName={slug} />;
}
