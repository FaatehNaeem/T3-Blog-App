import Blogs from "~/components/blogs-container";
import Footer from "~/components/common/footer";
import Header from "~/components/common/header";
import SearchBar from "~/components/search-bar";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-background">
      <Header />
      <SearchBar/>
      <div className="w-screen overflow-x-hidden bg-background py-8">
        <Blogs />
      </div>
      <Footer />
    </div>
  );
}
