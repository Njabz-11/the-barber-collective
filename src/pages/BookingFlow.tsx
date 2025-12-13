import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone,
  MessageSquare,
  Calendar as CalendarIcon,
  Loader2,
  Mail,
} from "lucide-react";

import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";

const steps = ["Select Services", "Choose Barber", "Pick Date & Time", "Your Details", "Confirm"];

const services = [
  { id: "1", name: "Skin Fade", price: 100, duration: 45 },
  { id: "2", name: "Beard Trim", price: 50, duration: 20 },
  { id: "3", name: "Line-Up", price: 40, duration: 15 },
  { id: "4", name: "Hot Towel Shave", price: 100, duration: 40 },
  { id: "5", name: "Classic Cut", price: 80, duration: 30 },
  { id: "6", name: "Scissor Cut", price: 90, duration: 40 },
  { id: "7", name: "Kids Cut", price: 60, duration: 25 },
];

const barbers = [
  {
    id: "1",
    name: "Marcus Johnson",
    image: barber1,
    specialty: "Fades & Line-Ups",
    rating: 4.9,
  },
  {
    id: "2",
    name: "David Williams",
    image: barber2,
    specialty: "Classic Cuts & Beard",
    rating: 4.8,
  },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const BookingFlow = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Pre-fill customer details if logged in
  useEffect(() => {
    if (profile) {
      setCustomerDetails(prev => ({
        ...prev,
        name: profile.full_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      }));
    }
  }, [profile]);

  // Handle pre-selected services from salon profile
  useEffect(() => {
    if (location.state?.selectedServices) {
      const preSelected = location.state.selectedServices;
      const serviceIds = preSelected.map((s: any) => {
        const found = services.find(srv => srv.name === s.name);
        return found?.id;
      }).filter(Boolean);
      setSelectedServices(serviceIds);
    }
  }, [location.state]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = services.find((s) => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const totalDuration = selectedServices.reduce((sum, id) => {
    const service = services.find((s) => s.id === id);
    return sum + (service?.duration || 0);
  }, 0);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedServices.length > 0;
      case 1:
        return selectedBarber !== null;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return customerDetails.name && customerDetails.phone;
      default:
        return true;
    }
  };

  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      // Format date as YYYY-MM-DD
      const bookingDate = selectedDate.toISOString().split('T')[0];
      const endTime = calculateEndTime(selectedTime, totalDuration);

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          business_id: salonId || '00000000-0000-0000-0000-000000000001', // Demo business ID
          customer_id: user?.id || null,
          customer_name: customerDetails.name,
          customer_email: customerDetails.email || null,
          customer_phone: customerDetails.phone,
          customer_notes: customerDetails.notes || null,
          booking_date: bookingDate,
          start_time: selectedTime,
          end_time: endTime,
          total_amount: totalPrice,
          status: 'pending',
          barber_id: selectedBarber === 'auto' ? null : selectedBarber || null,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Add booking services
      const bookingServices = selectedServices.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return {
          booking_id: booking.id,
          service_name: service?.name || '',
          service_price: service?.price || 0,
          service_duration: service?.duration || 0,
        };
      });

      const { error: servicesError } = await supabase
        .from('booking_services')
        .insert(bookingServices);

      if (servicesError) throw servicesError;

      setBookingId(booking.id);
      setCurrentStep(4);

      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked.",
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      handleSubmitBooking();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateWhatsAppUrl = () => {
    const businessPhone = "+27123456789";
    const selectedServiceNames = selectedServices
      .map(id => services.find(s => s.id === id)?.name)
      .join(", ");
    const message = `Hi! I've just booked an appointment:\n\n📅 Date: ${selectedDate?.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n⏰ Time: ${selectedTime}\n✂️ Services: ${selectedServiceNames}\n💰 Total: R${totalPrice}\n\nBooking ID: ${bookingId}`;
    return `https://wa.me/${businessPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      index < currentStep
                        ? "bg-accent text-accent-foreground"
                        : index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 ${
                        index < currentStep ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center font-display text-2xl text-foreground">
              {steps[currentStep].toUpperCase()}
            </p>
          </div>

          {/* Step Content */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            {/* Step 1: Select Services */}
            {currentStep === 0 && (
              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedServices.includes(service.id)
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedServices.includes(service.id)
                            ? "border-accent bg-accent"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedServices.includes(service.id) && (
                          <Check className="w-4 h-4 text-accent-foreground" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.duration} min
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">
                      R{service.price}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Choose Barber */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedBarber("auto")}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    selectedBarber === "auto"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">
                        No Preference
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Auto-assign first available barber
                      </p>
                    </div>
                  </div>
                </button>

                {barbers.map((barber) => (
                  <button
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      selectedBarber === barber.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="text-left flex-1">
                        <p className="font-medium text-foreground">
                          {barber.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {barber.specialty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-accent">{barber.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Pick Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-accent" />
                    Select Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-xl border mx-auto pointer-events-auto"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" />
                      Select Time
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Customer Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-accent" />
                    Your Name *
                  </label>
                  <Input
                    value={customerDetails.name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    Email (Optional)
                  </label>
                  <Input
                    value={customerDetails.email}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        email: e.target.value,
                      })
                    }
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    Phone Number *
                  </label>
                  <Input
                    value={customerDetails.phone}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+27 XX XXX XXXX"
                    type="tel"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Notes for Barber (Optional)
                  </label>
                  <Textarea
                    value={customerDetails.notes}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Any special requests or preferences..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">
                    BOOKING CONFIRMED!
                  </h3>
                  <p className="text-muted-foreground">
                    Your appointment has been booked successfully
                  </p>
                  {bookingId && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Booking ID: {bookingId.slice(0, 8)}...
                    </p>
                  )}
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {selectedDate?.toLocaleDateString("en-ZA", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Services</span>
                    <span className="font-medium text-foreground text-right">
                      {selectedServices
                        .map((id) => services.find((s) => s.id === id)?.name)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">
                      {totalDuration} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium text-foreground">
                      {customerDetails.name}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-accent">R{totalPrice}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={() => window.open(generateWhatsAppUrl(), "_blank")}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send WhatsApp Confirmation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Summary & Navigation */}
          {currentStep < 4 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {selectedServices.length > 0 && currentStep < 4 && (
                <div className="text-center order-first sm:order-none">
                  <p className="text-sm text-muted-foreground">
                    {selectedServices.length} service(s) • {totalDuration} min
                  </p>
                  <p className="font-bold text-xl text-foreground">
                    R{totalPrice}
                  </p>
                </div>
              )}

              <Button
                variant="gold"
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : currentStep === 3 ? (
                  "Confirm Booking"
                ) : (
                  "Continue"
                )}
                {!isSubmitting && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingFlow;