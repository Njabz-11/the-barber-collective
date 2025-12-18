import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, addMinutes, parse, isAfter, isBefore, startOfDay, addDays } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
  barberId?: string;
}

interface BookingCheck {
  booking_date: string;
  start_time: string;
  end_time: string;
  barber_id: string | null;
}

export function useAvailability(
  businessId: string | undefined,
  barberId: string | null | undefined,
  date: Date | undefined,
  durationMinutes: number
) {
  const [existingBookings, setExistingBookings] = useState<BookingCheck[]>([]);
  const [barberAvailability, setBarberAvailability] = useState<any[]>([]);
  const [businessHours, setBusinessHours] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing bookings for the selected date
  useEffect(() => {
    if (!businessId || !date) return;

    const fetchBookings = async () => {
      setLoading(true);
      const dateStr = format(date, 'yyyy-MM-dd');

      let query = supabase
        .from('bookings')
        .select('booking_date, start_time, end_time, barber_id')
        .eq('business_id', businessId)
        .eq('booking_date', dateStr)
        .in('status', ['pending', 'confirmed']);

      if (barberId && barberId !== 'auto') {
        query = query.eq('barber_id', barberId);
      }

      const { data } = await query;
      setExistingBookings(data || []);
      setLoading(false);
    };

    fetchBookings();
  }, [businessId, barberId, date]);

  // Fetch barber availability settings
  useEffect(() => {
    if (!barberId || barberId === 'auto') {
      setBarberAvailability([]);
      return;
    }

    const fetchAvailability = async () => {
      const { data } = await supabase
        .from('barber_availability')
        .select('*')
        .eq('barber_id', barberId);

      setBarberAvailability(data || []);
    };

    fetchAvailability();
  }, [barberId]);

  // Fetch business opening hours
  useEffect(() => {
    if (!businessId) return;

    const fetchBusinessHours = async () => {
      const { data } = await supabase
        .from('businesses')
        .select('opening_hours')
        .eq('id', businessId)
        .single();

      setBusinessHours(data?.opening_hours);
    };

    fetchBusinessHours();
  }, [businessId]);

  // Calculate available time slots
  const availableSlots = useMemo((): TimeSlot[] => {
    if (!date) return [];

    const dayOfWeek = date.getDay();
    const slots: TimeSlot[] = [];
    
    // Default business hours (if not configured)
    const defaultStartHour = 9;
    const defaultEndHour = 18;
    const slotInterval = 30; // minutes

    // Get opening hours for this day
    let startHour = defaultStartHour;
    let endHour = defaultEndHour;

    if (businessHours) {
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayHours = businessHours[dayNames[dayOfWeek]];
      if (dayHours) {
        if (dayHours.closed) {
          return []; // Business closed on this day
        }
        if (dayHours.open) {
          startHour = parseInt(dayHours.open.split(':')[0]);
        }
        if (dayHours.close) {
          endHour = parseInt(dayHours.close.split(':')[0]);
        }
      }
    }

    // Check barber availability for this day
    if (barberId && barberId !== 'auto' && barberAvailability.length > 0) {
      const barberDay = barberAvailability.find(a => a.day_of_week === dayOfWeek);
      if (!barberDay || !barberDay.is_available) {
        return []; // Barber not available this day
      }
      // Override with barber's hours
      startHour = parseInt(barberDay.start_time.split(':')[0]);
      endHour = parseInt(barberDay.end_time.split(':')[0]);
    }

    // Generate slots
    const now = new Date();
    const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotInterval) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Skip if it's today and the time has passed
        if (isToday) {
          const slotTime = parse(timeStr, 'HH:mm', date);
          if (isBefore(slotTime, now)) {
            continue;
          }
        }

        // Check if slot + duration fits before closing
        const slotEndTime = addMinutes(parse(timeStr, 'HH:mm', date), durationMinutes);
        const closeTime = parse(`${endHour}:00`, 'HH:mm', date);
        if (isAfter(slotEndTime, closeTime)) {
          continue;
        }

        // Check for conflicts with existing bookings
        const hasConflict = existingBookings.some(booking => {
          const bookingStart = parse(booking.start_time, 'HH:mm:ss', date);
          const bookingEnd = parse(booking.end_time, 'HH:mm:ss', date);
          const slotStart = parse(timeStr, 'HH:mm', date);
          const slotEnd = addMinutes(slotStart, durationMinutes);

          // Check for overlap
          return (
            (isBefore(slotStart, bookingEnd) && isAfter(slotEnd, bookingStart)) ||
            (format(slotStart, 'HH:mm') === format(bookingStart, 'HH:mm'))
          );
        });

        slots.push({
          time: timeStr,
          available: !hasConflict,
        });
      }
    }

    return slots;
  }, [date, existingBookings, barberAvailability, businessHours, durationMinutes, barberId]);

  return {
    availableSlots,
    loading,
    existingBookings,
  };
}

export function getNextAvailableDates(days: number = 14): Date[] {
  const dates: Date[] = [];
  const today = startOfDay(new Date());
  
  for (let i = 0; i < days; i++) {
    const date = addDays(today, i);
    // Skip Sundays by default
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  
  return dates;
}
