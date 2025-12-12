import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/marketplace/SearchBar";
import SalonCard from "@/components/marketplace/SalonCard";
import ServiceIcon from "@/components/marketplace/ServiceIcon";
import LocationCard from "@/components/marketplace/LocationCard";
import { Button } from "@/components/ui/button";
import { 
  Scissors, 
  Star, 
  ChevronRight, 
  MapPin, 
  Users,
  Award,
  Clock,
  Sparkles,
  Palette,
  CircleDot
} from "lucide-react";

import heroBg from "@/assets/hero-barbershop.jpg";
import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import haircutFade from "@/assets/haircut-fade.jpg";
import haircutBraids from "@/assets/haircut-braids.jpg";

const services = [
  { icon: Scissors, label: "Fades" },
  { icon: Sparkles, label: "Braids" },
  { icon: CircleDot, label: "Beard" },
  { icon: Award, label: "Line-Up" },
  { icon: Palette, label: "Cornrows" },
  { icon: Star, label: "Colour" },
];

const locations = [
  { name: "Kempton Park", image: salon1, salonCount: 45 },
  { name: "Birch Acres", image: salon2, salonCount: 32 },
  { name: "Glen Marais", image: barber1, salonCount: 28 },
  { name: "Norkem Park", image: haircutFade, salonCount: 36 },
  { name: "Rhodesfield", image: haircutBraids, salonCount: 24 },
];

const featuredSalons = [
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
];

const stats = [
  { value: "500+", label: "Partner Salons" },
  { value: "50k+", label: "Happy Customers" },
  { value: "4.8", label: "Average Rating" },
  { value: "100k+", label: "Bookings Made" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Premium barbershop interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">
                South Africa's #1 Barber Marketplace
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-card tracking-wide">
              FIND YOUR
              <span className="block text-accent">PERFECT CUT</span>
            </h1>

            <p className="text-lg md:text-xl text-card/80 max-w-2xl mx-auto">
              Discover top-rated barbershops and hair salons near you. 
              Book appointments with the best stylists in your area.
            </p>

            {/* Search Bar */}
            <div className="pt-8">
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl text-accent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-card/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-6 h-10 border-2 border-card/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-card/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-title">EXPLORE AREAS</h2>
              <p className="section-subtitle">
                Find barbershops and salons in your neighborhood
              </p>
            </div>
            <Button variant="outline" className="self-start md:self-auto">
              View All Areas <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {locations.map((location) => (
              <LocationCard key={location.name} {...location} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">TOP SERVICES</h2>
            <p className="section-subtitle mx-auto">
              Browse by the service you need
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {services.map((service) => (
              <ServiceIcon key={service.label} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Salons */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-title">RECOMMENDED</h2>
              <p className="section-subtitle">
                Top-rated salons picked just for you
              </p>
            </div>
            <Button variant="outline" className="self-start md:self-auto">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} {...salon} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground">
              OWN A BARBERSHOP?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Join South Africa's fastest-growing barber marketplace. 
              Reach thousands of new customers and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl">
                List Your Shop
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-primary-foreground">
                  Reach More Customers
                </h4>
                <p className="text-sm text-primary-foreground/60 text-center">
                  Get discovered by thousands of customers searching for services
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-primary-foreground">
                  Easy Booking Management
                </h4>
                <p className="text-sm text-primary-foreground/60 text-center">
                  Manage all your appointments in one simple dashboard
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-primary-foreground">
                  Build Your Reputation
                </h4>
                <p className="text-sm text-primary-foreground/60 text-center">
                  Collect reviews and showcase your best work
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="section-title">FIND NEARBY</h2>
              <p className="text-muted-foreground text-lg">
                Use our interactive map to discover barbershops and salons 
                near your current location. See ratings, prices, and 
                availability at a glance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Location-Based Search
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Find salons within walking distance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Real-Time Ratings
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      See verified customer reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Live Availability
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Book instantly when slots are open
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="gold" size="lg" className="mt-4">
                <MapPin className="w-5 h-5 mr-2" />
                Open Map View
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-secondary flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Interactive Map
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Click to enable location services
                  </p>
                </div>
              </div>
              {/* Map dots decoration */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-pulse" />
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/70 rounded-full animate-pulse delay-100" />
              <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-accent rounded-full animate-pulse delay-200" />
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent/60 rounded-full animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
