import Blogs from "~/components/blogs-container";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-background">
      <div className="w-screen overflow-x-hidden bg-background py-8">
        <Blogs />
      </div>
    </div>
  );
}
