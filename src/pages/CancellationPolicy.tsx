import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Clock, XCircle, CheckCircle, RefreshCw } from "lucide-react";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center">
            CANCELLATION POLICY
          </h1>
          
          <div className="space-y-8">
            {/* Quick Reference Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="font-display text-lg text-green-400">FREE CANCELLATION</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Cancel 24+ hours before your appointment for a full deposit refund.
                </p>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  <h3 className="font-display text-lg text-yellow-400">LATE CANCELLATION</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Cancel within 24 hours and forfeit 50% of your deposit.
                </p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="font-display text-lg text-red-400">NO-SHOW</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Failure to attend your appointment forfeits the entire deposit.
                </p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-6 h-6 text-blue-500" />
                  <h3 className="font-display text-lg text-blue-400">RESCHEDULING</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Free rescheduling with 24+ hours notice. Your deposit transfers to the new date.
                </p>
              </div>
            </div>

            {/* Detailed Policy */}
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">DEPOSIT REQUIREMENTS</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">50% Deposit Required:</strong> All bookings require a 50% deposit of the total service price to secure your appointment slot. This deposit is deducted from your final payment at the time of service.
                  </p>
                  <p>
                    <strong className="text-foreground">Booking Confirmation:</strong> Your appointment is NOT confirmed until the deposit is successfully processed. Unpaid slots remain available to other customers.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">CANCELLATION TIMEFRAMES</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-foreground">24+ Hours Before Appointment</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Full deposit refund. No penalty. Refunds are processed within 5-7 business days.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-foreground">12-24 Hours Before Appointment</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      50% of deposit refunded. 50% retained by the business to cover lost booking opportunity.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-foreground">Less Than 12 Hours Before</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      25% of deposit refunded. 75% retained by the business.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-foreground">No-Show</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      100% deposit forfeiture. The business retains the full deposit amount.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  LATE ARRIVAL POLICY
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">Grace Period:</strong> Each business sets a grace period (typically 15 minutes). This information is displayed on the business profile.
                  </p>
                  <p>
                    <strong className="text-foreground">Within Grace Period:</strong> Arrive within the grace period, and your appointment proceeds as scheduled, though the service may be shortened.
                  </p>
                  <p>
                    <strong className="text-foreground">After Grace Period:</strong> Arriving after the grace period may result in:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Automatic appointment cancellation</li>
                    <li>Full deposit forfeiture</li>
                    <li>Requirement to rebook and pay a new deposit</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">Business Discretion:</strong> The business may choose to accommodate late arrivals based on their schedule. This is at their sole discretion.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">RESCHEDULING POLICY</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">Free Rescheduling:</strong> You may reschedule your appointment at no additional cost if you provide at least 24 hours' notice.
                  </p>
                  <p>
                    <strong className="text-foreground">Deposit Transfer:</strong> Your original deposit will be applied to your new booking date.
                  </p>
                  <p>
                    <strong className="text-foreground">Price Adjustments:</strong> If the new booking has a higher total, you'll need to pay an additional deposit. If lower, the difference remains as credit.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">BUSINESS CANCELLATIONS</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    If a business cancels your appointment:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>You receive a full deposit refund within 5-7 business days</li>
                    <li>Priority rebooking assistance is offered</li>
                    <li>If cancellation is frequent, the business may be reviewed</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">REFUND PROCESSING</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong className="text-foreground">Processing Time:</strong> Refunds are processed within 5-7 business days to your original payment method.
                  </p>
                  <p>
                    <strong className="text-foreground">PayPal Refunds:</strong> Refunded deposits will appear in your PayPal account or original payment source.
                  </p>
                  <p>
                    <strong className="text-foreground">Disputes:</strong> For refund disputes, contact our support team within 7 days of the scheduled appointment.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">HOW TO CANCEL</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <ol className="list-decimal list-inside pl-4 space-y-2">
                    <li>Log in to your Clipr account</li>
                    <li>Go to "My Bookings" in your dashboard</li>
                    <li>Select the booking you wish to cancel</li>
                    <li>Click "Cancel Booking" and confirm</li>
                    <li>Receive confirmation via email/WhatsApp</li>
                  </ol>
                  <p className="mt-4">
                    Alternatively, contact the business directly via WhatsApp to discuss cancellation.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-xl text-accent">CONTACT US</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about our cancellation policy or assistance with your booking:<br />
                  Email: support@clipr.co.za<br />
                  WhatsApp: +27 11 123 4567
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationPolicy;
