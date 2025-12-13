import { Store, Users, Calendar, DollarSign } from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { icon: Store, label: 'Total Businesses', value: '156' },
    { icon: Users, label: 'Total Users', value: '2,340' },
    { icon: Calendar, label: 'Bookings (Month)', value: '4,567' },
    { icon: DollarSign, label: 'Platform Revenue', value: 'R45,600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
