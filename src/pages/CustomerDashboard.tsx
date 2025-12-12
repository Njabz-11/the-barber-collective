import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Heart,
  Settings,
  User,
  ChevronRight,
} from "lucide-react";

import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";

const upcomingBookings = [
  {
    id: "1",
    salonName: "The Gentleman's Cut",
    salonImage: salon1,
    service: "Skin Fade + Beard Trim",
    date: "Dec 15, 2024",
    time: "10:00 AM",
    barber: "Marcus Johnson",
    price: 150,
    status: "confirmed",
  },
  {
    id: "2",
    salonName: "Urban Fade Studio",
    salonImage: salon2,
    service: "Line-Up",
    date: "Dec 22, 2024",
    time: "2:30 PM",
    barber: "David Williams",
    price: 40,
    status: "pending",
  },
];

const pastBookings = [
  {
    id: "3",
    salonName: "Sharp Lines Barbershop",
    salonImage: barber1,
    service: "Full Cut + Hot Towel Shave",
    date: "Nov 28, 2024",
    time: "11:00 AM",
    barber: "Marcus Johnson",
    price: 200,
    rated: true,
  },
  {
    id: "4",
    salonName: "The Gentleman's Cut",
    salonImage: salon1,
    service: "Skin Fade",
    date: "Nov 14, 2024",
    time: "3:00 PM",
    barber: "David Williams",
    price: 100,
    rated: false,
  },
];

const savedSalons = [
  {
    id: "1",
    name: "The Gentleman's Cut",
    image: salon1,
    rating: 4.9,
    location: "Kempton Park",
  },
  {
    id: "2",
    name: "Urban Fade Studio",
    image: barber1,
    rating: 4.8,
    location: "Birch Acres",
  },
  {
    id: "3",
    name: "Crown & Glory Salon",
    image: salon2,
    rating: 4.7,
    location: "Glen Marais",
  },
];

const savedBarbers = [
  {
    id: "1",
    name: "Marcus Johnson",
    image: barber1,
    specialty: "Fades & Line-Ups",
    rating: 4.9,
    salon: "The Gentleman's Cut",
  },
  {
    id: "2",
    name: "David Williams",
    image: barber2,
    specialty: "Classic Cuts & Beard",
    rating: 4.8,
    salon: "Urban Fade Studio",
  },
];

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl text-foreground">
                  WELCOME BACK, JOHN
                </h1>
                <p className="text-muted-foreground">
                  Manage your bookings and saved places
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Profile Settings
            </Button>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-secondary/50 p-1 rounded-xl overflow-x-auto">
              <TabsTrigger value="upcoming" className="rounded-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="rounded-lg">
                <Clock className="w-4 h-4 mr-2" />
                Past
              </TabsTrigger>
              <TabsTrigger value="salons" className="rounded-lg">
                <Heart className="w-4 h-4 mr-2" />
                Saved Salons
              </TabsTrigger>
              <TabsTrigger value="barbers" className="rounded-lg">
                <Star className="w-4 h-4 mr-2" />
                Saved Barbers
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12 bg-secondary/30 rounded-xl">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Find a salon and book your next appointment
                  </p>
                  <Button variant="gold">Browse Salons</Button>
                </div>
              ) : (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="card-premium p-4 md:p-6 flex flex-col md:flex-row gap-4"
                  >
                    <img
                      src={booking.salonImage}
                      alt={booking.salonName}
                      className="w-full md:w-32 h-32 rounded-xl object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {booking.salonName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.service}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {booking.barber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-bold text-foreground">
                          R{booking.price}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="space-y-4">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="card-premium p-4 md:p-6 flex flex-col md:flex-row gap-4"
                >
                  <img
                    src={booking.salonImage}
                    alt={booking.salonName}
                    className="w-full md:w-32 h-32 rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {booking.salonName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {booking.service}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {booking.barber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-foreground">
                        R{booking.price}
                      </span>
                      <div className="flex gap-2">
                        {!booking.rated && (
                          <Button variant="gold" size="sm">
                            <Star className="w-4 h-4 mr-1" />
                            Leave Review
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Saved Salons */}
            <TabsContent value="salons">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSalons.map((salon) => (
                  <div key={salon.id} className="card-premium overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 fill-accent text-accent" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">
                        {salon.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {salon.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {salon.rating}
                        </span>
                      </div>
                      <Button variant="gold" size="sm" className="w-full mt-4">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Saved Barbers */}
            <TabsContent value="barbers">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBarbers.map((barber) => (
                  <div key={barber.id} className="card-premium overflow-hidden">
                    <div className="aspect-square">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">
                          {barber.name}
                        </h3>
                        <button>
                          <Heart className="w-5 h-5 fill-accent text-accent" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {barber.specialty}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {barber.salon}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {barber.rating}
                        </span>
                        <Button variant="gold" size="sm">
                          Book With Me
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;
