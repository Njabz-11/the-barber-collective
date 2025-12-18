import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Loader2,
  Save,
  MessageCircle,
} from 'lucide-react';

interface Props {
  business: any;
  onUpdate: () => void;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const BusinessSettings = ({ business, onUpdate }: Props) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    whatsapp_number: '',
    email: '',
    address: '',
    suburb: '',
    city: '',
    deposit_percentage: 50,
    grace_period_minutes: 15,
    forfeit_deposit_on_late: true,
  });

  const [openingHours, setOpeningHours] = useState<Record<string, any>>({});

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || '',
        description: business.description || '',
        phone: business.phone || '',
        whatsapp_number: business.whatsapp_number || '',
        email: business.email || '',
        address: business.address || '',
        suburb: business.suburb || '',
        city: business.city || '',
        deposit_percentage: business.deposit_percentage ?? 50,
        grace_period_minutes: business.grace_period_minutes ?? 15,
        forfeit_deposit_on_late: business.forfeit_deposit_on_late ?? true,
      });

      // Initialize opening hours
      const hours = business.opening_hours || {};
      const defaultHours: Record<string, any> = {};
      DAYS.forEach((day) => {
        defaultHours[day] = hours[day] || {
          open: '09:00',
          close: '18:00',
          closed: day === 'sunday',
        };
      });
      setOpeningHours(defaultHours);
    }
  }, [business]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          name: formData.name,
          description: formData.description,
          phone: formData.phone,
          whatsapp_number: formData.whatsapp_number,
          email: formData.email,
          address: formData.address,
          suburb: formData.suburb,
          city: formData.city,
          deposit_percentage: formData.deposit_percentage,
          grace_period_minutes: formData.grace_period_minutes,
          forfeit_deposit_on_late: formData.forfeit_deposit_on_late,
          opening_hours: openingHours,
        })
        .eq('id', business.id);

      if (error) throw error;

      toast.success('Settings saved successfully');
      onUpdate();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateHours = (day: string, field: string, value: any) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold mb-1">Business Settings</h2>
        <p className="text-muted-foreground text-sm">
          Update your business information and preferences
        </p>
      </div>

      {/* Basic Info */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Store className="w-5 h-5" />
          Basic Information
        </h3>

        <div className="space-y-4">
          <div>
            <Label>Business Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Label>
              <Input
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location
        </h3>

        <div className="space-y-4">
          <div>
            <Label>Street Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Suburb</Label>
              <Input
                value={formData.suburb}
                onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Opening Hours
        </h3>

        <div className="space-y-3">
          {DAYS.map((day, index) => (
            <div
              key={day}
              className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0"
            >
              <div className="w-24">
                <Switch
                  checked={!openingHours[day]?.closed}
                  onCheckedChange={(checked) => updateHours(day, 'closed', !checked)}
                />
              </div>
              <span className="w-24 font-medium">{DAY_LABELS[index]}</span>
              {!openingHours[day]?.closed ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={openingHours[day]?.open || '09:00'}
                    onChange={(e) => updateHours(day, 'open', e.target.value)}
                    className="w-28"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="time"
                    value={openingHours[day]?.close || '18:00'}
                    onChange={(e) => updateHours(day, 'close', e.target.value)}
                    className="w-28"
                  />
                </div>
              ) : (
                <span className="text-muted-foreground">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Settings */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Booking & Deposit Settings
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Deposit Percentage</Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.deposit_percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit_percentage: parseInt(e.target.value) || 0 })
                  }
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Required deposit to confirm booking
              </p>
            </div>

            <div>
              <Label>Grace Period</Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  value={formData.grace_period_minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, grace_period_minutes: parseInt(e.target.value) || 0 })
                  }
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">min</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Time allowed for late arrivals
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="font-medium">Forfeit Deposit on No-Show</p>
              <p className="text-sm text-muted-foreground">
                Automatically forfeit deposit if customer doesn't arrive
              </p>
            </div>
            <Switch
              checked={formData.forfeit_deposit_on_late}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, forfeit_deposit_on_late: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save Changes
      </Button>
    </div>
  );
};

export default BusinessSettings;
