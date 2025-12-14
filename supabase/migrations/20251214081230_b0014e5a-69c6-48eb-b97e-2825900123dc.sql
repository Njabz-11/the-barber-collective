-- Create loyalty_points table to track customer loyalty per business
CREATE TABLE public.loyalty_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  completed_bookings INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, business_id)
);

-- Create vouchers table for the loyalty rewards system
CREATE TABLE public.vouchers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  voucher_type VARCHAR(50) NOT NULL DEFAULT 'free_haircut',
  discount_value NUMERIC NOT NULL DEFAULT 0,
  is_percentage BOOLEAN NOT NULL DEFAULT false,
  is_redeemed BOOLEAN NOT NULL DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  redeemed_booking_id UUID REFERENCES public.bookings(id),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_points
CREATE POLICY "Users can view their own loyalty points"
  ON public.loyalty_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Business owners can view customer loyalty"
  ON public.loyalty_points FOR SELECT
  USING (owns_business(auth.uid(), business_id));

CREATE POLICY "System can manage loyalty points"
  ON public.loyalty_points FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for vouchers
CREATE POLICY "Users can view their own vouchers"
  ON public.vouchers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Business owners can view and update vouchers"
  ON public.vouchers FOR SELECT
  USING (owns_business(auth.uid(), business_id));

CREATE POLICY "Business owners can update vouchers for redemption"
  ON public.vouchers FOR UPDATE
  USING (owns_business(auth.uid(), business_id));

CREATE POLICY "System can create vouchers"
  ON public.vouchers FOR INSERT
  WITH CHECK (true);

-- Add deposit fields to businesses settings if not exists
-- Update the bookings table to add deposit-related fields
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deposit_paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(100),
ADD COLUMN IF NOT EXISTS grace_period_minutes INTEGER DEFAULT 15;

-- Update businesses table for deposit configuration
ALTER TABLE public.businesses
ADD COLUMN IF NOT EXISTS deposit_percentage INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS grace_period_minutes INTEGER DEFAULT 15,
ADD COLUMN IF NOT EXISTS forfeit_deposit_on_late BOOLEAN DEFAULT true;

-- Create trigger for loyalty points updated_at
CREATE TRIGGER update_loyalty_points_updated_at
  BEFORE UPDATE ON public.loyalty_points
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-increment loyalty and create voucher after 5 bookings
CREATE OR REPLACE FUNCTION public.process_completed_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_loyalty_record RECORD;
  v_voucher_code VARCHAR(20);
BEGIN
  -- Only process when booking status changes to 'completed'
  IF NEW.status = 'completed' AND OLD.status != 'completed' AND NEW.customer_id IS NOT NULL THEN
    -- Upsert loyalty points
    INSERT INTO public.loyalty_points (user_id, business_id, completed_bookings)
    VALUES (NEW.customer_id, NEW.business_id, 1)
    ON CONFLICT (user_id, business_id)
    DO UPDATE SET 
      completed_bookings = loyalty_points.completed_bookings + 1,
      updated_at = now()
    RETURNING * INTO v_loyalty_record;
    
    -- Check if customer reached 5 bookings milestone
    IF v_loyalty_record.completed_bookings % 5 = 0 THEN
      -- Generate unique voucher code
      v_voucher_code := 'FREE' || upper(substring(gen_random_uuid()::text, 1, 8));
      
      -- Create free haircut voucher
      INSERT INTO public.vouchers (
        code,
        user_id,
        business_id,
        voucher_type,
        discount_value,
        is_percentage,
        expires_at
      ) VALUES (
        v_voucher_code,
        NEW.customer_id,
        NEW.business_id,
        'free_haircut',
        100,
        true,
        now() + interval '90 days'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for completed bookings
CREATE TRIGGER on_booking_completed
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.process_completed_booking();