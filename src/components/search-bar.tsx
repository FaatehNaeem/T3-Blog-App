import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="mt-2 flex h-12 items-center justify-center">
      <div className="relative rounded-lg bg-background2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground" />
        <Input
          type="search"
          placeholder="Search Blogs..."
          className="pl-8 text-foreground placeholder:text-foreground focus-visible:ring-0 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </form>
  );
}
