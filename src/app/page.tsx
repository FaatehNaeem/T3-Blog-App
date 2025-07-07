import Blogs from "~/components/blogs-container";
import Footer from "~/components/common/footer";
import Header from "~/components/common/header";
import HeroComponent from "~/components/hero-component";
import SearchBar from "~/components/search-bar";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-background">
      <Header />
      <HeroComponent/>
        <Blogs />
      <Footer />
    </div>
  );
}
