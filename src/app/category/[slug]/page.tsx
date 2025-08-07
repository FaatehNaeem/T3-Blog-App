import BlogClient from "./client";


export default function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  return <BlogClient categoryName={slug}/>;
}
