import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Service = Tables<'services'>;
type ServiceCategory = Tables<'service_categories'>;

export interface ServiceWithCategory extends Service {
  category?: ServiceCategory | null;
}

export function useServices(businessId: string | undefined) {
  const [services, setServices] = useState<ServiceWithCategory[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch services with categories
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select(`
          *,
          service_categories:category_id(*)
        `)
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

      if (servicesError) throw servicesError;

      // Fetch all categories
      const { data: categoriesData } = await supabase
        .from('service_categories')
        .select('*')
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

      setServices(
        (servicesData || []).map(s => ({
          ...s,
          category: s.service_categories,
        }))
      );
      setCategories(categoriesData || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [businessId]);

  const createService = async (service: Omit<TablesInsert<'services'>, 'business_id'>) => {
    if (!businessId) return { error: new Error('No business ID') };

    const { data, error } = await supabase
      .from('services')
      .insert({ ...service, business_id: businessId })
      .select()
      .single();

    if (!error) {
      await fetchServices();
    }

    return { data, error };
  };

  const updateService = async (id: string, updates: TablesUpdate<'services'>) => {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error) {
      await fetchServices();
    }

    return { data, error };
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      setServices(prev => prev.filter(s => s.id !== id));
    }

    return { error };
  };

  const toggleServiceActive = async (id: string, isActive: boolean) => {
    return updateService(id, { is_active: isActive });
  };

  // Category management
  const createCategory = async (name: string) => {
    if (!businessId) return { error: new Error('No business ID') };

    const maxOrder = Math.max(0, ...categories.map(c => c.display_order || 0));

    const { data, error } = await supabase
      .from('service_categories')
      .insert({
        business_id: businessId,
        name,
        display_order: maxOrder + 1,
      })
      .select()
      .single();

    if (!error && data) {
      setCategories(prev => [...prev, data]);
    }

    return { data, error };
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('service_categories')
      .delete()
      .eq('id', id);

    if (!error) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }

    return { error };
  };

  return {
    services,
    categories,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    toggleServiceActive,
    createCategory,
    deleteCategory,
    refetch: fetchServices,
  };
}
