import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Barber = Tables<'barbers'>;
type BarberAvailability = Tables<'barber_availability'>;

export interface BarberWithAvailability extends Barber {
  availability: BarberAvailability[];
}

const DEFAULT_AVAILABILITY = [
  { day_of_week: 1, start_time: '09:00', end_time: '18:00', is_available: true }, // Monday
  { day_of_week: 2, start_time: '09:00', end_time: '18:00', is_available: true },
  { day_of_week: 3, start_time: '09:00', end_time: '18:00', is_available: true },
  { day_of_week: 4, start_time: '09:00', end_time: '18:00', is_available: true },
  { day_of_week: 5, start_time: '09:00', end_time: '18:00', is_available: true },
  { day_of_week: 6, start_time: '09:00', end_time: '14:00', is_available: true }, // Saturday
  { day_of_week: 0, start_time: '09:00', end_time: '14:00', is_available: false }, // Sunday
];

export function useTeam(businessId: string | undefined) {
  const [barbers, setBarbers] = useState<BarberWithAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBarbers = async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data: barbersData, error: barbersError } = await supabase
        .from('barbers')
        .select('*')
        .eq('business_id', businessId)
        .order('name');

      if (barbersError) throw barbersError;

      // Fetch availability for all barbers
      const barberIds = (barbersData || []).map(b => b.id);
      const { data: availabilityData } = await supabase
        .from('barber_availability')
        .select('*')
        .in('barber_id', barberIds);

      setBarbers(
        (barbersData || []).map(barber => ({
          ...barber,
          availability: (availabilityData || []).filter(a => a.barber_id === barber.id),
        }))
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, [businessId]);

  const createBarber = async (
    barber: Omit<TablesInsert<'barbers'>, 'business_id'>
  ) => {
    if (!businessId) return { error: new Error('No business ID') };

    const { data, error } = await supabase
      .from('barbers')
      .insert({ ...barber, business_id: businessId })
      .select()
      .single();

    if (!error && data) {
      // Create default availability
      const availabilityInserts = DEFAULT_AVAILABILITY.map(a => ({
        ...a,
        barber_id: data.id,
      }));

      await supabase.from('barber_availability').insert(availabilityInserts);
      await fetchBarbers();
    }

    return { data, error };
  };

  const updateBarber = async (id: string, updates: TablesUpdate<'barbers'>) => {
    const { data, error } = await supabase
      .from('barbers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error) {
      await fetchBarbers();
    }

    return { data, error };
  };

  const deleteBarber = async (id: string) => {
    // First delete availability
    await supabase.from('barber_availability').delete().eq('barber_id', id);

    const { error } = await supabase.from('barbers').delete().eq('id', id);

    if (!error) {
      setBarbers(prev => prev.filter(b => b.id !== id));
    }

    return { error };
  };

  const toggleBarberActive = async (id: string, isActive: boolean) => {
    return updateBarber(id, { is_active: isActive });
  };

  const updateAvailability = async (
    barberId: string,
    dayOfWeek: number,
    updates: Partial<{
      start_time: string;
      end_time: string;
      is_available: boolean;
    }>
  ) => {
    const { error } = await supabase
      .from('barber_availability')
      .update(updates)
      .eq('barber_id', barberId)
      .eq('day_of_week', dayOfWeek);

    if (!error) {
      await fetchBarbers();
    }

    return { error };
  };

  return {
    barbers,
    loading,
    error,
    createBarber,
    updateBarber,
    deleteBarber,
    toggleBarberActive,
    updateAvailability,
    refetch: fetchBarbers,
  };
}
