import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  DollarSign,
  Loader2,
  FolderPlus,
} from 'lucide-react';

interface Props {
  businessId: string;
}

const ServicesEditor = ({ businessId }: Props) => {
  const {
    services,
    categories,
    loading,
    createService,
    updateService,
    deleteService,
    toggleServiceActive,
    createCategory,
  } = useServices(businessId);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '30',
    category_id: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '30',
      category_id: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Name and price are required');
      return;
    }

    setSaving(true);

    try {
      if (editingService) {
        const { error } = await updateService(editingService.id, {
          name: formData.name,
          description: formData.description || null,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          category_id: formData.category_id || null,
        });

        if (error) throw error;
        toast.success('Service updated');
        setIsEditDialogOpen(false);
      } else {
        const { error } = await createService({
          name: formData.name,
          description: formData.description || null,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          category_id: formData.category_id || null,
        });

        if (error) throw error;
        toast.success('Service created');
        setIsAddDialogOpen(false);
      }
      resetForm();
      setEditingService(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      duration: service.duration.toString(),
      category_id: service.category_id || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await deleteService(id);
    if (error) {
      toast.error('Failed to delete service');
    } else {
      toast.success('Service deleted');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    const { error } = await createCategory(newCategoryName.trim());
    if (error) {
      toast.error('Failed to create category');
    } else {
      toast.success('Category created');
      setNewCategoryName('');
      setIsCategoryDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Group services by category
  const servicesByCategory = services.reduce((acc: any, service) => {
    const categoryName = service.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {});

  const ServiceForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Service Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Skin Fade"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the service..."
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Price (R) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              min="0"
              step="1"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="100"
              className="pl-9"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Duration (min) *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              min="5"
              step="5"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="30"
              className="pl-9"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Category</label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Category</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
            setEditingService(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {editingService ? 'Update' : 'Create'} Service
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Services & Pricing</h2>
          <p className="text-muted-foreground text-sm">
            Manage your service menu and prices
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Haircuts, Beard, Braids"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Create Category</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
              </DialogHeader>
              <ServiceForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-xl">
          <p className="text-muted-foreground mb-4">
            No services yet. Add your first service to get started.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(servicesByCategory).map(([categoryName, categoryServices]: [string, any]) => (
            <div key={categoryName} className="glass-card p-4">
              <h3 className="font-semibold mb-3 text-accent">{categoryName}</h3>
              <div className="space-y-2">
                {categoryServices.map((service: any) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Switch
                        checked={service.is_active}
                        onCheckedChange={(checked) =>
                          toggleServiceActive(service.id, checked)
                        }
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${!service.is_active && 'text-muted-foreground'}`}>
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">R{service.price}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(service)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <ServiceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesEditor;
