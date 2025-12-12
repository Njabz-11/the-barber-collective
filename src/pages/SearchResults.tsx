import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SalonCard from "@/components/marketplace/SalonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Star,
  X,
  ChevronDown,
} from "lucide-react";

import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import haircutFade from "@/assets/haircut-fade.jpg";
import haircutBraids from "@/assets/haircut-braids.jpg";

const allSalons = [
  {
    id: "1",
    name: "The Gentleman's Cut",
    image: salon1,
    rating: 4.9,
    reviewCount: 234,
    priceFrom: 80,
    location: "Kempton Park",
    distance: "1.2 km",
    isOpen: true,
  },
  {
    id: "2",
    name: "Urban Fade Studio",
    image: barber1,
    rating: 4.8,
    reviewCount: 189,
    priceFrom: 100,
    location: "Birch Acres",
    distance: "2.4 km",
    isOpen: true,
  },
  {
    id: "3",
    name: "Crown & Glory Salon",
    image: salon2,
    rating: 4.7,
    reviewCount: 156,
    priceFrom: 120,
    location: "Glen Marais",
    distance: "3.1 km",
    isOpen: false,
  },
  {
    id: "4",
    name: "Sharp Lines Barbershop",
    image: barber2,
    rating: 4.9,
    reviewCount: 312,
    priceFrom: 90,
    location: "Norkem Park",
    distance: "1.8 km",
    isOpen: true,
  },
  {
    id: "5",
    name: "Precision Cuts",
    image: haircutFade,
    rating: 4.6,
    reviewCount: 98,
    priceFrom: 70,
    location: "Rhodesfield",
    distance: "4.2 km",
    isOpen: true,
  },
  {
    id: "6",
    name: "Braids & Beauty Lounge",
    image: haircutBraids,
    rating: 4.8,
    reviewCount: 267,
    priceFrom: 150,
    location: "Kempton Park",
    distance: "0.8 km",
    isOpen: true,
  },
  {
    id: "7",
    name: "Classic Barber Lounge",
    image: salon1,
    rating: 4.5,
    reviewCount: 145,
    priceFrom: 85,
    location: "Birch Acres",
    distance: "2.9 km",
    isOpen: false,
  },
  {
    id: "8",
    name: "The Fade Factory",
    image: barber1,
    rating: 4.7,
    reviewCount: 203,
    priceFrom: 95,
    location: "Glen Marais",
    distance: "3.5 km",
    isOpen: true,
  },
];

const serviceTypes = [
  "All Services",
  "Fades",
  "Braids",
  "Beard Grooming",
  "Line-Up",
  "Cornrows",
  "Hair Colour",
  "Full Cut",
];

const SearchResults = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [availableToday, setAvailableToday] = useState(false);
  const [mobileBarber, setMobileBarber] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              BARBERSHOPS & SALONS
            </h1>
            <p className="text-muted-foreground">
              Showing {allSalons.length} results near Kempton Park
            </p>
          </div>

          {/* Search Bar & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or service..."
                className="pl-12"
              />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="nearest">Nearest</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"
              } md:block md:relative md:w-72 shrink-0`}
            >
              <div className="space-y-8">
                {/* Mobile Close */}
                <div className="flex items-center justify-between md:hidden">
                  <h3 className="font-display text-xl">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Enter location" className="pl-10" />
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Rating</h4>
                  <div className="flex gap-2">
                    {[4, 3, 2].map((rating) => (
                      <Button
                        key={rating}
                        variant={selectedRating === rating ? "gold" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedRating(
                            selectedRating === rating ? null : rating
                          )
                        }
                      >
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {rating}+
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">
                      Price Range
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      R{priceRange[0]} - R{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">
                    Service Type
                  </h4>
                  <Select defaultValue="All Services">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="available"
                      checked={availableToday}
                      onCheckedChange={(checked) =>
                        setAvailableToday(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="available"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Available Today
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="mobile"
                      checked={mobileBarber}
                      onCheckedChange={(checked) =>
                        setMobileBarber(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="mobile"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Mobile Barber
                    </label>
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Gender</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Male
                    </Button>
                    <Button variant="outline" size="sm">
                      Female
                    </Button>
                    <Button variant="outline" size="sm">
                      Unisex
                    </Button>
                  </div>
                </div>

                {/* Apply Button (Mobile) */}
                <Button
                  variant="gold"
                  className="w-full md:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {allSalons.map((salon) => (
                  <SalonCard key={salon.id} {...salon} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Results
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
