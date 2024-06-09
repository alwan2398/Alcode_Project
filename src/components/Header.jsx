import { BellDot, Search } from "lucide-react";
import { Button } from "./ui/button";

const Header = ({ handleSearch }) => {
  return (
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 border p-2 rounded-md items-center w-full md:w-auto">
          <Search className="h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="outline-none text-sm w-full md:w-64" 
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <BellDot className="h-5 w-5" />
          <Button>Masuk</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
