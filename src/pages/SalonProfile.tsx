import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  MapPin,
  Clock,
  Phone,
  Share2,
  ChevronRight,
  Check,
  Calendar,
  User,
} from "lucide-react";

import heroBg from "@/assets/hero-barbershop.jpg";
import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import haircutFade from "@/assets/haircut-fade.jpg";
import haircutBraids from "@/assets/haircut-braids.jpg";

const galleryImages = [haircutFade, haircutBraids, barber1, barber2, salon1, salon2];

const services = {
  haircuts: [
    { name: "Classic Cut", price: 80, duration: "30 min" },
    { name: "Skin Fade", price: 100, duration: "45 min" },
    { name: "Scissor Cut", price: 90, duration: "40 min" },
    { name: "Kids Cut (Under 12)", price: 60, duration: "25 min" },
  ],
  fades: [
    { name: "Low Fade", price: 100, duration: "40 min" },
    { name: "Mid Fade", price: 100, duration: "40 min" },
    { name: "High Fade", price: 110, duration: "45 min" },
    { name: "Burst Fade", price: 120, duration: "50 min" },
  ],
  beard: [
    { name: "Beard Trim", price: 50, duration: "20 min" },
    { name: "Beard Shape-Up", price: 70, duration: "30 min" },
    { name: "Hot Towel Shave", price: 100, duration: "40 min" },
  ],
  braids: [
    { name: "Cornrows", price: 200, duration: "2 hrs" },
    { name: "Box Braids", price: 350, duration: "4 hrs" },
    { name: "Feed-In Braids", price: 280, duration: "3 hrs" },
  ],
};

const team = [
  {
    id: "1",
    name: "Marcus Johnson",
    image: barber1,
    specialty: "Fades & Line-Ups",
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "2",
    name: "David Williams",
    image: barber2,
    specialty: "Classic Cuts & Beard",
    rating: 4.8,
    reviewCount: 134,
  },
];

const reviews = [
  {
    id: "1",
    author: "John M.",
    rating: 5,
    date: "2 days ago",
    comment:
      "Best fade I've ever had! Marcus really knows his craft. The shop is clean and the vibe is great.",
    image: haircutFade,
  },
  {
    id: "2",
    author: "Sipho K.",
    rating: 5,
    date: "1 week ago",
    comment:
      "Always consistent quality. Been coming here for 2 years and never disappointed.",
  },
  {
    id: "3",
    author: "Michael T.",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great service, just had to wait a bit longer than expected. But the result was worth it!",
  },
];

const SalonProfile = () => {
  const { id } = useParams();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const totalPrice = selectedServices.reduce((total, serviceName) => {
    for (const category of Object.values(services)) {
      const service = category.find((s) => s.name === serviceName);
      if (service) return total + service.price;
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src={heroBg}
          alt="The Gentleman's Cut"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </section>

      {/* Profile Info */}
      <section className="relative z-10 -mt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-bold text-foreground">4.9</span>
                  </div>
                  <span className="text-muted-foreground">(234 reviews)</span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl text-foreground">
                  THE GENTLEMAN'S CUT
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>15 Main Road, Kempton Park</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-green-600 font-medium">Open</span>
                    <span>• Closes 7:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-accent text-accent" : ""
                    }`}
                  />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="gold" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl text-foreground mb-6">GALLERY</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className="aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">
                ABOUT US
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The Gentleman's Cut is a premium barbershop dedicated to
                providing exceptional grooming services. Our skilled barbers
                combine traditional techniques with modern styles to deliver the
                perfect cut every time. We take pride in creating a relaxed,
                welcoming atmosphere where you can unwind and leave looking your
                best.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">
                HOURS
              </h2>
              <div className="space-y-2">
                {[
                  { day: "Monday - Friday", hours: "8:00 AM - 7:00 PM" },
                  { day: "Saturday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Sunday", hours: "9:00 AM - 2:00 PM" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-sm py-2 border-b border-border/50"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium text-foreground">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-foreground">
              SERVICES & PRICES
            </h2>
            {selectedServices.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {selectedServices.length} selected
                </span>
                <span className="font-bold text-accent">R{totalPrice}</span>
              </div>
            )}
          </div>

          <Tabs defaultValue="haircuts" className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-secondary/50 p-1 rounded-xl overflow-x-auto">
              <TabsTrigger value="haircuts" className="rounded-lg">
                Haircuts
              </TabsTrigger>
              <TabsTrigger value="fades" className="rounded-lg">
                Fades
              </TabsTrigger>
              <TabsTrigger value="beard" className="rounded-lg">
                Beard
              </TabsTrigger>
              <TabsTrigger value="braids" className="rounded-lg">
                Braids
              </TabsTrigger>
            </TabsList>

            {Object.entries(services).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-3">
                  {items.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => toggleService(service.name)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedServices.includes(service.name)
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedServices.includes(service.name)
                              ? "border-accent bg-accent"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selectedServices.includes(service.name) && (
                            <Check className="w-4 h-4 text-accent-foreground" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">
                            {service.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {service.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">
                        R{service.price}
                      </span>
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {selectedServices.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40 md:relative md:mt-8 md:border md:rounded-xl">
              <div className="container mx-auto flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedServices.length} service(s) selected
                  </p>
                  <p className="font-bold text-xl text-foreground">
                    R{totalPrice}
                  </p>
                </div>
                <Button variant="gold" size="lg">
                  Continue Booking
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl text-foreground mb-6">
            OUR BARBERS
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((barber) => (
              <div
                key={barber.id}
                className="card-premium overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-foreground">
                    {barber.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {barber.specialty}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {barber.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({barber.reviewCount})
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-foreground">REVIEWS</h2>
            <Button variant="outline">
              Write a Review
            </Button>
          </div>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-xl bg-secondary/30 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-accent">
                        {review.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {review.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SalonProfile;
