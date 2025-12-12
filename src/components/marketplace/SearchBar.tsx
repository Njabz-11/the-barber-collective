import { useState } from "react";
import { Search, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="search-bar-premium max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Location */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="hidden md:block w-px bg-border" />

        {/* Service */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Service type..."
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="hidden md:block w-px bg-border" />

        {/* Date */}
        <div className="flex-1 relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Search Button */}
        <Button variant="gold" size="lg" className="shrink-0">
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
