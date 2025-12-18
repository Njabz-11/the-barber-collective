import { useTodaysBookings } from '@/hooks/useBookings';
import { Calendar, Users, DollarSign, Star, Clock, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  business: any;
}

const DashboardOverview = ({ business }: Props) => {
  const { bookings: todaysBookings, loading } = useTodaysBookings(business?.id);

  const todaysRevenue = todaysBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  const stats = [
    { 
      icon: Calendar, 
      label: 'Bookings Today', 
      value: loading ? '...' : todaysBookings.length.toString(), 
      change: '' 
    },
    { 
      icon: DollarSign, 
      label: "Today's Revenue", 
      value: loading ? '...' : `R${todaysRevenue}`, 
      change: '' 
    },
    { 
      icon: Star, 
      label: 'Average Rating', 
      value: business?.rating?.toFixed(1) || '0.0', 
      change: `${business?.review_count || 0} reviews` 
    },
    { 
      icon: TrendingUp, 
      label: 'Status', 
      value: business?.is_approved ? 'Active' : 'Pending', 
      change: business?.is_approved ? 'Accepting bookings' : 'Awaiting approval' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            {stat.change && (
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pending Approval Notice */}
      {!business?.is_approved && (
        <div className="glass-card p-6 border-primary/30 bg-primary/5">
          <h3 className="font-bold mb-2">Pending Approval</h3>
          <p className="text-muted-foreground text-sm">
            Your business is under review. You'll be notified once it's approved and visible to customers.
          </p>
        </div>
      )}

      {/* Today's Schedule */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Schedule
          </h3>
          <span className="text-sm text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d')}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : todaysBookings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No bookings scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysBookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[50px]">
                    <p className="font-bold">{booking.start_time.slice(0, 5)}</p>
                  </div>
                  <div>
                    <p className="font-medium">{booking.customer_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.booking_services?.map((s: any) => s.service_name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-sm font-bold mt-1">R{booking.total_amount}</p>
                </div>
              </div>
            ))}
            {todaysBookings.length > 5 && (
              <p className="text-center text-sm text-muted-foreground">
                +{todaysBookings.length - 5} more bookings
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="glass-card p-6">
        <h3 className="font-bold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <p className="font-medium">View Calendar</p>
            <p className="text-sm text-muted-foreground">Manage bookings</p>
          </button>
          <button className="p-4 text-left bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
            <Users className="w-6 h-6 text-primary mb-2" />
            <p className="font-medium">Team Settings</p>
            <p className="text-sm text-muted-foreground">Manage barbers</p>
          </button>
          <button className="p-4 text-left bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
            <DollarSign className="w-6 h-6 text-primary mb-2" />
            <p className="font-medium">Services & Pricing</p>
            <p className="text-sm text-muted-foreground">Edit your menu</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
