import { Calendar, Users, DollarSign, Star } from 'lucide-react';

interface Props {
  business: any;
}

const DashboardOverview = ({ business }: Props) => {
  const stats = [
    { icon: Calendar, label: 'Bookings Today', value: '12', change: '+3' },
    { icon: Users, label: 'Total Customers', value: '234', change: '+18' },
    { icon: DollarSign, label: 'Revenue (Month)', value: 'R12,450', change: '+15%' },
    { icon: Star, label: 'Average Rating', value: business?.rating || '0', change: '' },
  ];

  return (
    <div className="space-y-6">
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
          </div>
        ))}
      </div>
      
      {!business?.is_approved && (
        <div className="glass-card p-6 border-primary/30 bg-primary/5">
          <h3 className="font-bold mb-2">Pending Approval</h3>
          <p className="text-muted-foreground text-sm">
            Your business is under review. You'll be notified once it's approved.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
