import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Image,
  Tag,
  BarChart3,
  Settings,
  Menu,
  X,
  ArrowLeft,
  MessageCircle,
  Bell,
  Plus,
} from 'lucide-react';

// Dashboard Components
import DashboardOverview from '@/components/business/DashboardOverview';
import BookingsCalendar from '@/components/business/BookingsCalendar';
import TeamManagement from '@/components/business/TeamManagement';
import ServicesEditor from '@/components/business/ServicesEditor';
import GalleryManager from '@/components/business/GalleryManager';
import PromotionsManager from '@/components/business/PromotionsManager';
import AnalyticsDashboard from '@/components/business/AnalyticsDashboard';
import BusinessSettings from '@/components/business/BusinessSettings';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/business' },
  { icon: Calendar, label: 'Bookings', path: '/business/bookings' },
  { icon: Users, label: 'Team', path: '/business/team' },
  { icon: Scissors, label: 'Services', path: '/business/services' },
  { icon: Image, label: 'Gallery', path: '/business/gallery' },
  { icon: Tag, label: 'Promotions', path: '/business/promotions' },
  { icon: BarChart3, label: 'Analytics', path: '/business/analytics' },
  { icon: Settings, label: 'Settings', path: '/business/settings' },
];

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasRole, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBusiness();
    }
  }, [user]);

  const fetchBusiness = async () => {
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', user?.id)
      .maybeSingle();
    
    if (data) {
      setBusiness(data);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">No Business Found</h1>
          <p className="text-muted-foreground">
            You haven't listed a business yet. Get started by adding your barbershop or salon.
          </p>
          <Link to="/list-business">
            <Button className="btn-glow">
              <Plus className="w-5 h-5 mr-2" />
              List Your Business
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === '/business') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl">CLIPR</span>
          </Link>
        </div>
        
        {/* Business Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-bold text-primary">{business.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{business.name}</p>
              <p className="text-xs text-muted-foreground">
                {business.is_approved ? 'Active' : 'Pending Approval'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* Back to Home */}
        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl">CLIPR</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card/50 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg truncate">
              {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Routes>
            <Route index element={<DashboardOverview business={business} />} />
            <Route path="bookings" element={<BookingsCalendar businessId={business.id} />} />
            <Route path="team" element={<TeamManagement businessId={business.id} />} />
            <Route path="services" element={<ServicesEditor businessId={business.id} />} />
            <Route path="gallery" element={<GalleryManager businessId={business.id} />} />
            <Route path="promotions" element={<PromotionsManager businessId={business.id} />} />
            <Route path="analytics" element={<AnalyticsDashboard businessId={business.id} />} />
            <Route path="settings" element={<BusinessSettings business={business} onUpdate={fetchBusiness} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default BusinessDashboard;
