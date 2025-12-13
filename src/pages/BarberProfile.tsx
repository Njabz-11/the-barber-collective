import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Star,
  MapPin,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  Clock,
  Award,
  ChevronLeft,
} from 'lucide-react';

import barber1 from '@/assets/barber-1.jpg';
import haircutFade from '@/assets/haircut-fade.jpg';
import haircutBraids from '@/assets/haircut-braids.jpg';

// Mock data
const barberData = {
  id: '1',
  name: 'Marcus Johnson',
  bio: 'Master barber with 8+ years of experience specializing in fades, beard grooming, and modern cuts. Known for precision and attention to detail.',
  avatar: barber1,
  rating: 4.9,
  reviewCount: 156,
  specialties: ['Fades', 'Beard Grooming', 'Line-Ups', 'Modern Cuts'],
  businessName: 'Sharp Lines Barbershop',
  businessSlug: 'sharp-lines',
  location: 'Kempton Park',
  portfolio: [haircutFade, haircutBraids, barber1, haircutFade, haircutBraids, barber1],
  availability: [
    { day: 'Monday', hours: '09:00 - 18:00' },
    { day: 'Tuesday', hours: '09:00 - 18:00' },
    { day: 'Wednesday', hours: '09:00 - 18:00' },
    { day: 'Thursday', hours: '09:00 - 20:00' },
    { day: 'Friday', hours: '09:00 - 20:00' },
    { day: 'Saturday', hours: '08:00 - 16:00' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  services: [
    { name: 'Classic Fade', price: 100, duration: 45 },
    { name: 'Skin Fade', price: 120, duration: 50 },
    { name: 'Beard Trim', price: 60, duration: 25 },
    { name: 'Haircut + Beard', price: 150, duration: 60 },
  ],
};

const BarberProfile = () => {
  const { id } = useParams();
  const barber = barberData;

  const handleWhatsApp = () => {
    const message = `Hi, I'd like to book an appointment with ${barber.name}`;
    window.open(`https://wa.me/27820001111?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: barber.name,
        text: `Check out ${barber.name} on CLIPR`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-32 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link 
            to={`/salon/${barber.businessSlug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to {barber.businessName}
          </Link>
          
          {/* Profile Header */}
          <div className="glass-card p-6 md:p-8 mb-6 fade-in-up">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-primary/20">
                <AvatarImage src={barber.avatar} alt={barber.name} className="object-cover" />
                <AvatarFallback className="text-2xl">{barber.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">{barber.name}</h1>
                    <Link 
                      to={`/salon/${barber.businessSlug}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {barber.businessName}
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 rating-star" />
                    <span className="font-bold">{barber.rating}</span>
                    <span className="text-muted-foreground">({barber.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{barber.location}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mt-4">{barber.bio}</p>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {barber.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="glass-card p-6 mb-6 fade-in-up stagger-1">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Services
            </h2>
            <div className="space-y-3">
              {barber.services.map((service) => (
                <div 
                  key={service.name}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </p>
                  </div>
                  <span className="price-tag">R{service.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Availability */}
          <div className="glass-card p-6 mb-6 fade-in-up stagger-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Availability
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {barber.availability.map((day) => (
                <div 
                  key={day.day}
                  className={`p-3 rounded-xl text-center ${
                    day.hours === 'Closed' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-muted/30'
                  }`}
                >
                  <p className="font-medium text-sm">{day.day}</p>
                  <p className="text-xs text-muted-foreground mt-1">{day.hours}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Portfolio */}
          <div className="glass-card p-6 fade-in-up stagger-3">
            <h2 className="text-xl font-bold mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-2">
              {barber.portfolio.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={image} 
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-4 md:hidden safe-bottom">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 h-12"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
          <Link to={`/salon/${barber.businessSlug}/book?barber=${barber.id}`} className="flex-1">
            <Button className="w-full h-12 btn-glow">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BarberProfile;
