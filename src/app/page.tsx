import Blogs from "~/components/blogs-container";
import Header from "~/components/common/header";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-black">
      <div className="h-screen w-screen overflow-x-hidden bg-black">
        <Header />
        <Blogs />
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}
