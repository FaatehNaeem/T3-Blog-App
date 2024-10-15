import Blogs from "~/components/blogs-container";
import Footer from "~/components/common/footer";
import Header from "~/components/common/header";

export default function Home() {

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-background">
      <div className="h-screen w-screen overflow-x-hidden bg-background">
        <Header />
        <Blogs />
      </div>
      <Footer />
    </div>
  );
}
