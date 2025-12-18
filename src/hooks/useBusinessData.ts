import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Business = Tables<'businesses'>;
type Service = Tables<'services'>;
type Barber = Tables<'barbers'>;
type BarberAvailability = Tables<'barber_availability'>;

export interface BusinessWithDetails extends Business {
  services: Service[];
  barbers: (Barber & { availability: BarberAvailability[] })[];
}

export function useBusinessData(businessId: string | undefined) {
  const [business, setBusiness] = useState<BusinessWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        
        // Fetch business
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', businessId)
          .single();

        if (businessError) throw businessError;

        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('business_id', businessId)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (servicesError) throw servicesError;

        // Fetch barbers with availability
        const { data: barbersData, error: barbersError } = await supabase
          .from('barbers')
          .select('*')
          .eq('business_id', businessId)
          .eq('is_active', true);

        if (barbersError) throw barbersError;

        // Fetch availability for all barbers
        const barberIds = barbersData?.map(b => b.id) || [];
        const { data: availabilityData } = await supabase
          .from('barber_availability')
          .select('*')
          .in('barber_id', barberIds);

        // Combine barbers with their availability
        const barbersWithAvailability = barbersData?.map(barber => ({
          ...barber,
          availability: availabilityData?.filter(a => a.barber_id === barber.id) || [],
        })) || [];

        setBusiness({
          ...businessData,
          services: servicesData || [],
          barbers: barbersWithAvailability,
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  return { business, loading, error, refetch: () => {} };
}

export function useBusinessBySlug(slug: string | undefined) {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchBusinessId = async () => {
      const { data } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .single();

      if (data) {
        setBusinessId(data.id);
      }
      setLoading(false);
    };

    fetchBusinessId();
  }, [slug]);

  const businessData = useBusinessData(businessId || undefined);

  return {
    ...businessData,
    loading: loading || businessData.loading,
  };
}

export function useAllBusinesses(filters?: {
  city?: string;
  suburb?: string;
  search?: string;
  minRating?: number;
  maxPrice?: number;
}) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('businesses')
          .select('*')
          .eq('is_approved', true)
          .eq('is_active', true);

        // Apply Kempton Park area filter
        if (filters?.city) {
          query = query.ilike('city', `%${filters.city}%`);
        }

        if (filters?.suburb) {
          query = query.ilike('suburb', `%${filters.suburb}%`);
        }

        if (filters?.search) {
          query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }

        if (filters?.minRating) {
          query = query.gte('rating', filters.minRating);
        }

        const { data, error: fetchError } = await query.order('rating', { ascending: false });

        if (fetchError) throw fetchError;

        setBusinesses(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [filters?.city, filters?.suburb, filters?.search, filters?.minRating, filters?.maxPrice]);

  return { businesses, loading, error };
}
