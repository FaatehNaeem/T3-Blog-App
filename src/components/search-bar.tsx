import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="flex h-12 items-center justify-center mt-2">
      <div className="relative rounded-lg bg-background">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
        <Input
          type="search"
          placeholder="Search Blogs..."
          className="border-foreground pl-8 text-background shadow-foreground shadow-sm placeholder:text-background focus-visible:ring-0 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-foreground"
        />
      </div>
    </form>
  );
}
