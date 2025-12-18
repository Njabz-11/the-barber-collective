import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Booking = Tables<'bookings'>;
type BookingService = Tables<'booking_services'>;

export interface BookingWithServices extends Booking {
  booking_services: BookingService[];
  business?: {
    name: string;
    slug: string;
    logo_url: string | null;
  };
  barber?: {
    name: string;
    avatar_url: string | null;
  };
}

export function useCustomerBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithServices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('bookings')
          .select(`
            *,
            booking_services(*),
            businesses:business_id(name, slug, logo_url),
            barbers:barber_id(name, avatar_url)
          `)
          .eq('customer_id', user.id)
          .order('booking_date', { ascending: false });

        if (fetchError) throw fetchError;

        // Transform the data
        const transformedBookings = (data || []).map(booking => ({
          ...booking,
          business: booking.businesses,
          barber: booking.barbers,
        }));

        setBookings(transformedBookings);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const cancelBooking = async (bookingId: string, reason?: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason,
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (!error) {
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId
            ? { ...b, status: 'cancelled', cancellation_reason: reason }
            : b
        )
      );
    }

    return { error };
  };

  return { bookings, loading, error, cancelBooking };
}

export function useBusinessBookings(businessId: string | undefined) {
  const [bookings, setBookings] = useState<BookingWithServices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookings = async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          booking_services(*),
          barbers:barber_id(name, avatar_url)
        `)
        .eq('business_id', businessId)
        .order('booking_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (fetchError) throw fetchError;

      const transformedBookings = (data || []).map(booking => ({
        ...booking,
        barber: booking.barbers,
      }));

      setBookings(transformedBookings);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [businessId]);

  const updateBookingStatus = async (
    bookingId: string,
    status: 'confirmed' | 'cancelled' | 'completed' | 'no_show',
    reason?: string
  ) => {
    const updates: any = { status };
    if (status === 'cancelled') {
      updates.cancellation_reason = reason;
      updates.cancelled_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId);

    if (!error) {
      await fetchBookings();
    }

    return { error };
  };

  return { bookings, loading, error, updateBookingStatus, refetch: fetchBookings };
}

export function useTodaysBookings(businessId: string | undefined) {
  const [bookings, setBookings] = useState<BookingWithServices[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    const fetchTodaysBookings = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data } = await supabase
        .from('bookings')
        .select(`
          *,
          booking_services(*),
          barbers:barber_id(name, avatar_url)
        `)
        .eq('business_id', businessId)
        .eq('booking_date', today)
        .in('status', ['pending', 'confirmed'])
        .order('start_time', { ascending: true });

      setBookings(
        (data || []).map(b => ({
          ...b,
          barber: b.barbers,
        }))
      );
      setLoading(false);
    };

    fetchTodaysBookings();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('todays-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `business_id=eq.${businessId}`,
        },
        () => {
          fetchTodaysBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [businessId]);

  return { bookings, loading };
}
