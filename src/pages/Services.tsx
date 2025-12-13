import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Scissors, 
  Sparkles, 
  CircleDot, 
  Award, 
  Palette, 
  Star,
  Clock,
  ChevronRight
} from "lucide-react";

const services = [
  { 
    icon: Scissors, 
    name: "Haircuts & Fades",
    description: "Classic cuts, modern fades, and precision styling",
    priceFrom: 80,
    duration: "30-45 min",
    popular: true
  },
  { 
    icon: Sparkles, 
    name: "Braids & Twists",
    description: "Box braids, cornrows, twists, and protective styles",
    priceFrom: 150,
    duration: "1-4 hours",
    popular: true
  },
  { 
    icon: CircleDot, 
    name: "Beard Grooming",
    description: "Beard trims, shaping, and hot towel treatments",
    priceFrom: 50,
    duration: "20-30 min",
    popular: false
  },
  { 
    icon: Award, 
    name: "Line-Ups & Edge-Ups",
    description: "Sharp hairlines and crisp edges",
    priceFrom: 40,
    duration: "15-20 min",
    popular: true
  },
  { 
    icon: Palette, 
    name: "Hair Colour",
    description: "Full colour, highlights, and creative designs",
    priceFrom: 200,
    duration: "1-3 hours",
    popular: false
  },
  { 
    icon: Star, 
    name: "Specialty Styles",
    description: "Afros, locs, waves, and textured cuts",
    priceFrom: 100,
    duration: "45-90 min",
    popular: false
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16 space-y-4 fade-in-up">
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl">
              OUR SERVICES
            </h1>
            <p className="section-subtitle mx-auto">
              Browse the full range of services offered by barbershops and salons on our platform
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <Link 
                key={service.name}
                to={`/search?service=${encodeURIComponent(service.name)}`}
                className={`glass-card p-6 hover:border-primary/30 transition-all duration-300 group fade-in-up stagger-${index + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  {service.popular && (
                    <span className="badge-featured text-xs">Popular</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-primary font-bold">
                      From R{service.priceFrom}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="glass-card p-8 md:p-12 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Can't find what you're looking for?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Search our marketplace to find barbershops and salons that offer exactly what you need.
            </p>
            <Link to="/search">
              <Button className="btn-glow" size="lg">
                Browse All Salons
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
