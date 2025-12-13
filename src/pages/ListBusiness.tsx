import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Loader2,
  Check,
  Sparkles,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Online Booking',
    description: 'Let customers book 24/7 directly from your profile',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Manage your barbers, their schedules, and availability',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Track bookings, revenue, and customer insights',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    description: 'Automated booking confirmations via WhatsApp',
  },
];

const ListBusiness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    suburb: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to list your business');
      navigate('/auth');
      return;
    }
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const slug = generateSlug(formData.name) + '-' + Date.now().toString(36);
      
      const { data, error } = await supabase
        .from('businesses')
        .insert({
          owner_id: user.id,
          name: formData.name,
          slug,
          phone: formData.phone,
          whatsapp_number: formData.whatsappNumber || formData.phone,
          email: formData.email || user.email,
          address: formData.address,
          city: formData.city,
          suburb: formData.suburb,
          description: formData.description,
          is_approved: false,
          is_active: true,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Add business_owner role if not already present
      await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: 'business_owner',
        }, { onConflict: 'user_id,role' });
      
      toast.success('Business submitted for approval!');
      navigate('/business');
    } catch (error: any) {
      console.error('Error creating business:', error);
      toast.error(error.message || 'Failed to submit business');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16 space-y-4 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join 500+ Businesses</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl">
              LIST YOUR BARBERSHOP
            </h1>
            <p className="section-subtitle mx-auto">
              Reach thousands of new customers and grow your business with CLIPR
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Features */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Why list with us?</h2>
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Testimonial */}
              <div className="glass-card p-6 mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold">John Mavundla</p>
                    <p className="text-sm text-muted-foreground">Sharp Lines Barbershop</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Since joining CLIPR, my bookings have increased by 200%. The platform is easy to use and my customers love it!"
                </p>
              </div>
            </div>
            
            {/* Form */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Get Started</h2>
                  <p className="text-sm text-muted-foreground">Fill in your business details</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Sharp Lines Barbershop"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 bg-muted/50"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="082 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 pl-11 bg-muted/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="whatsapp"
                        placeholder="Same as phone"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="h-12 pl-11 bg-muted/50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="shop@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 pl-11 bg-muted/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-12 pl-11 bg-muted/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input
                      id="suburb"
                      placeholder="e.g. Kempton Park"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="h-12 bg-muted/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g. Johannesburg"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12 bg-muted/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell customers about your shop..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px] bg-muted/50 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-12 btn-glow text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Submit for Approval
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our Terms of Service and Business Partner Agreement
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListBusiness;
