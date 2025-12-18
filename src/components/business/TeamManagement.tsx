import { useState } from 'react';
import { useTeam } from '@/hooks/useTeam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  User,
  Clock,
  Loader2,
  Star,
} from 'lucide-react';

interface Props {
  businessId: string;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TeamManagement = ({ businessId }: Props) => {
  const {
    barbers,
    loading,
    createBarber,
    updateBarber,
    deleteBarber,
    toggleBarberActive,
    updateAvailability,
  } = useTeam(businessId);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialties: '',
    avatar_url: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      specialties: '',
      avatar_url: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);

    try {
      const specialtiesArray = formData.specialties
        ? formData.specialties.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      if (editingBarber) {
        const { error } = await updateBarber(editingBarber.id, {
          name: formData.name,
          bio: formData.bio || null,
          specialties: specialtiesArray.length > 0 ? specialtiesArray : null,
          avatar_url: formData.avatar_url || null,
        });

        if (error) throw error;
        toast.success('Team member updated');
        setIsEditDialogOpen(false);
      } else {
        const { error } = await createBarber({
          name: formData.name,
          bio: formData.bio || null,
          specialties: specialtiesArray.length > 0 ? specialtiesArray : null,
          avatar_url: formData.avatar_url || null,
        });

        if (error) throw error;
        toast.success('Team member added');
        setIsAddDialogOpen(false);
      }
      resetForm();
      setEditingBarber(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (barber: any) => {
    setEditingBarber(barber);
    setFormData({
      name: barber.name,
      bio: barber.bio || '',
      specialties: (barber.specialties || []).join(', '),
      avatar_url: barber.avatar_url || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    const { error } = await deleteBarber(id);
    if (error) {
      toast.error('Failed to remove team member');
    } else {
      toast.success('Team member removed');
    }
  };

  const handleAvailabilityChange = async (
    barberId: string,
    dayOfWeek: number,
    field: 'is_available' | 'start_time' | 'end_time',
    value: boolean | string
  ) => {
    const { error } = await updateAvailability(barberId, dayOfWeek, { [field]: value });
    if (error) {
      toast.error('Failed to update availability');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const BarberForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Full name"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Brief description..."
          rows={2}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Specialties</label>
        <Input
          value={formData.specialties}
          onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
          placeholder="e.g. Fades, Beard Styling, Braids (comma separated)"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Avatar URL</label>
        <Input
          value={formData.avatar_url}
          onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
            setEditingBarber(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {editingBarber ? 'Update' : 'Add'} Member
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Team Management</h2>
          <p className="text-muted-foreground text-sm">
            Manage your barbers and their schedules
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <BarberForm />
          </DialogContent>
        </Dialog>
      </div>

      {barbers.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-xl">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            No team members yet. Add your first barber to get started.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {barbers.map((barber) => (
            <AccordionItem key={barber.id} value={barber.id} className="glass-card border-none">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                  <Switch
                    checked={barber.is_active ?? true}
                    onCheckedChange={(checked) => {
                      toggleBarberActive(barber.id, checked);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Avatar>
                    <AvatarImage src={barber.avatar_url || undefined} />
                    <AvatarFallback>
                      {barber.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-1">
                    <p className={`font-medium ${!barber.is_active && 'text-muted-foreground'}`}>
                      {barber.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(barber.specialties || []).join(', ') || 'No specialties'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    {barber.rating || '0'}
                    <span className="text-xs">({barber.review_count || 0})</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {barber.bio && (
                    <p className="text-sm text-muted-foreground">{barber.bio}</p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(barber)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(barber.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                      Remove
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Working Hours
                    </h4>
                    <div className="space-y-2">
                      {DAYS.map((day, index) => {
                        const availability = barber.availability.find(
                          (a) => a.day_of_week === index
                        );
                        return (
                          <div
                            key={day}
                            className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0"
                          >
                            <div className="w-24">
                              <Switch
                                checked={availability?.is_available ?? false}
                                onCheckedChange={(checked) =>
                                  handleAvailabilityChange(barber.id, index, 'is_available', checked)
                                }
                              />
                            </div>
                            <span className="w-24 text-sm">{day}</span>
                            {availability?.is_available ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Input
                                  type="time"
                                  value={availability.start_time?.slice(0, 5) || '09:00'}
                                  onChange={(e) =>
                                    handleAvailabilityChange(
                                      barber.id,
                                      index,
                                      'start_time',
                                      e.target.value
                                    )
                                  }
                                  className="w-28"
                                />
                                <span className="text-muted-foreground">to</span>
                                <Input
                                  type="time"
                                  value={availability.end_time?.slice(0, 5) || '18:00'}
                                  onChange={(e) =>
                                    handleAvailabilityChange(
                                      barber.id,
                                      index,
                                      'end_time',
                                      e.target.value
                                    )
                                  }
                                  className="w-28"
                                />
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Off</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <BarberForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
