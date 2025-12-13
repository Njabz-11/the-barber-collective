-- Create role enum for the platform
CREATE TYPE public.app_role AS ENUM ('platform_admin', 'business_owner', 'barber', 'customer');

-- Create user roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create businesses table
CREATE TABLE public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    phone TEXT,
    whatsapp_number TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    suburb TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    logo_url TEXT,
    cover_image_url TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    opening_hours JSONB DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{"deposit_required": false, "deposit_percentage": 0, "cancellation_policy": "24 hours"}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create barbers table
CREATE TABLE public.barbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    specialties TEXT[],
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    portfolio_images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service categories table
CREATE TABLE public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create barber availability table
CREATE TABLE public.barber_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barber_id UUID REFERENCES public.barbers(id) ON DELETE CASCADE NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true
);

-- Create bookings table
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    barber_id UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_notes TEXT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'paid', 'refunded')),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create booking services junction table
CREATE TABLE public.booking_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    service_price DECIMAL(10, 2) NOT NULL,
    service_duration INTEGER NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    barber_id UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    images TEXT[],
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coupons table
CREATE TABLE public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table (for POS)
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery images table
CREATE TABLE public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    barber_id UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved businesses table
CREATE TABLE public.saved_businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, business_id)
);

-- Create saved barbers table
CREATE TABLE public.saved_barbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    barber_id UUID REFERENCES public.barbers(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, barber_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client notes table (CRM)
CREATE TABLE public.client_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    note TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barber_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user owns a business
CREATE OR REPLACE FUNCTION public.owns_business(_user_id UUID, _business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.businesses
    WHERE id = _business_id
      AND owner_id = _user_id
  )
$$;

-- Handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  
  -- Default role is customer
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'customer');
  
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update timestamps function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_barbers_updated_at BEFORE UPDATE ON public.barbers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS POLICIES

-- Profiles: Users can view all profiles, update their own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User roles: Only platform admins can view all, users can view their own
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Platform admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'platform_admin'));
CREATE POLICY "Platform admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'platform_admin'));

-- Businesses: Public read for approved, owners can manage their own
CREATE POLICY "Approved businesses are viewable by everyone" ON public.businesses FOR SELECT USING (is_approved = true AND is_active = true);
CREATE POLICY "Owners can view their own business" ON public.businesses FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Platform admins can view all businesses" ON public.businesses FOR SELECT USING (public.has_role(auth.uid(), 'platform_admin'));
CREATE POLICY "Users can create businesses" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their business" ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Platform admins can update any business" ON public.businesses FOR UPDATE USING (public.has_role(auth.uid(), 'platform_admin'));

-- Barbers: Public read for active barbers of approved businesses
CREATE POLICY "Active barbers are viewable" ON public.barbers FOR SELECT USING (is_active = true);
CREATE POLICY "Business owners can manage their barbers" ON public.barbers FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Service categories: Public read
CREATE POLICY "Service categories are viewable by everyone" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Business owners can manage their categories" ON public.service_categories FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Services: Public read for active services
CREATE POLICY "Active services are viewable" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Business owners can manage their services" ON public.services FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Barber availability: Public read
CREATE POLICY "Barber availability is viewable" ON public.barber_availability FOR SELECT USING (true);
CREATE POLICY "Business owners can manage barber availability" ON public.barber_availability FOR ALL USING (
  EXISTS (SELECT 1 FROM public.barbers b WHERE b.id = barber_id AND public.owns_business(auth.uid(), b.business_id))
);

-- Bookings: Customers see their own, business owners see their business bookings
CREATE POLICY "Customers can view their bookings" ON public.bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Business owners can view their bookings" ON public.bookings FOR SELECT USING (public.owns_business(auth.uid(), business_id));
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can update their bookings" ON public.bookings FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Business owners can update bookings" ON public.bookings FOR UPDATE USING (public.owns_business(auth.uid(), business_id));

-- Booking services: Same as bookings
CREATE POLICY "Booking services viewable with booking" ON public.booking_services FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND (b.customer_id = auth.uid() OR public.owns_business(auth.uid(), b.business_id)))
);
CREATE POLICY "Anyone can add booking services" ON public.booking_services FOR INSERT WITH CHECK (true);

-- Reviews: Public read, customers can create
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Customers can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Business owners can moderate reviews" ON public.reviews FOR UPDATE USING (public.owns_business(auth.uid(), business_id));

-- Coupons: Business owners can manage
CREATE POLICY "Active coupons are viewable" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Business owners can manage coupons" ON public.coupons FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Products: Public read, business owners manage
CREATE POLICY "Active products are viewable" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Business owners can manage products" ON public.products FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Gallery images: Public read
CREATE POLICY "Gallery images are viewable" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Business owners can manage gallery" ON public.gallery_images FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Saved businesses/barbers: Users manage their own
CREATE POLICY "Users can view their saved businesses" ON public.saved_businesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their saved businesses" ON public.saved_businesses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their saved barbers" ON public.saved_barbers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their saved barbers" ON public.saved_barbers FOR ALL USING (auth.uid() = user_id);

-- Notifications: Users see their own
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Business owners can view business notifications" ON public.notifications FOR SELECT USING (public.owns_business(auth.uid(), business_id));

-- Client notes: Business owners only
CREATE POLICY "Business owners can view client notes" ON public.client_notes FOR SELECT USING (public.owns_business(auth.uid(), business_id));
CREATE POLICY "Business owners can manage client notes" ON public.client_notes FOR ALL USING (public.owns_business(auth.uid(), business_id));

-- Create indexes for performance
CREATE INDEX idx_businesses_slug ON public.businesses(slug);
CREATE INDEX idx_businesses_suburb ON public.businesses(suburb);
CREATE INDEX idx_businesses_city ON public.businesses(city);
CREATE INDEX idx_businesses_approved ON public.businesses(is_approved, is_active);
CREATE INDEX idx_bookings_business ON public.bookings(business_id, booking_date);
CREATE INDEX idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX idx_bookings_barber ON public.bookings(barber_id, booking_date);
CREATE INDEX idx_services_business ON public.services(business_id);
CREATE INDEX idx_barbers_business ON public.barbers(business_id);
CREATE INDEX idx_reviews_business ON public.reviews(business_id);