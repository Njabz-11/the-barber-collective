import { useState, useMemo } from 'react';
import { useBusinessBookings } from '@/hooks/useBookings';
import { useTeam } from '@/hooks/useTeam';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format, parseISO, isToday, isTomorrow, addDays, startOfWeek, endOfWeek } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  businessId: string;
}

const BookingsCalendar = ({ businessId }: Props) => {
  const { bookings, loading, updateBookingStatus, refetch } = useBusinessBookings(businessId);
  const { barbers } = useTeam(businessId);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBarber, setSelectedBarber] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Filter bookings by selected date and barber
  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    if (viewMode === 'day') {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      filtered = filtered.filter((b) => b.booking_date === dateStr);
    } else {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
      filtered = filtered.filter((b) => {
        const bookingDate = parseISO(b.booking_date);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      });
    }

    if (selectedBarber !== 'all') {
      filtered = filtered.filter((b) => b.barber_id === selectedBarber);
    }

    return filtered.sort((a, b) => {
      if (a.booking_date !== b.booking_date) {
        return a.booking_date.localeCompare(b.booking_date);
      }
      return a.start_time.localeCompare(b.start_time);
    });
  }, [bookings, selectedDate, selectedBarber, viewMode]);

  const handleStatusUpdate = async (bookingId: string, status: 'confirmed' | 'cancelled' | 'completed' | 'no_show') => {
    const { error } = await updateBookingStatus(bookingId, status);
    if (error) {
      toast.error('Failed to update booking status');
    } else {
      toast.success(`Booking ${status}`);
      setSelectedBooking(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-amber-500/20 text-amber-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      case 'completed':
        return 'bg-blue-500/20 text-blue-500';
      case 'no_show':
        return 'bg-gray-500/20 text-gray-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Bookings Calendar</h2>
          <p className="text-muted-foreground text-sm">
            Manage appointments and schedules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedBarber} onValueChange={setSelectedBarber}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All barbers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Barbers</SelectItem>
              {barbers.map((barber) => (
                <SelectItem key={barber.id} value={barber.id}>
                  {barber.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg overflow-hidden border border-border">
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('day')}
              className="rounded-none"
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
              className="rounded-none"
            >
              Week
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px,1fr] gap-6">
        {/* Calendar Sidebar */}
        <div className="glass-card p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="w-full"
          />
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedDate(addDays(selectedDate, -1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-semibold text-lg">{getDateLabel(selectedDate)}</h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
              Today
            </Button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-secondary/30 rounded-xl">
              <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bookings for this {viewMode}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass-card p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-lg font-bold">{booking.start_time.slice(0, 5)}</p>
                        <p className="text-xs text-muted-foreground">
                          - {booking.end_time.slice(0, 5)}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">{booking.customer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.booking_services
                            ?.map((s: any) => s.service_name)
                            .join(', ')}
                        </p>
                        {booking.barber && (
                          <p className="text-xs text-muted-foreground mt-1">
                            with {booking.barber.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status || 'pending')}>
                        {booking.status}
                      </Badge>
                      <p className="text-sm font-bold mt-1">R{booking.total_amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(selectedBooking.status || 'pending')}>
                  {selectedBooking.status}
                </Badge>
                <span className="text-lg font-bold">R{selectedBooking.total_amount}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span>{selectedBooking.customer_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <a href={`tel:${selectedBooking.customer_phone}`} className="text-primary hover:underline">
                    {selectedBooking.customer_phone}
                  </a>
                </div>
                {selectedBooking.customer_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>{selectedBooking.customer_email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {format(parseISO(selectedBooking.booking_date), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {selectedBooking.start_time.slice(0, 5)} - {selectedBooking.end_time.slice(0, 5)}
                  </span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-2">Services</p>
                {selectedBooking.booking_services?.map((service: any) => (
                  <div key={service.id} className="flex justify-between text-sm">
                    <span>{service.service_name}</span>
                    <span>R{service.service_price}</span>
                  </div>
                ))}
              </div>

              {selectedBooking.customer_notes && (
                <div className="bg-amber-500/10 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Customer Notes
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.customer_notes}</p>
                </div>
              )}

              {selectedBooking.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'confirmed')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'cancelled')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}

              {selectedBooking.status === 'confirmed' && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'completed')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Completed
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'no_show')}
                  >
                    No Show
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsCalendar;
