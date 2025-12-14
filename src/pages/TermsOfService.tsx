import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center">
            TERMS OF SERVICE
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground text-sm">
              Last updated: December 2024
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">1. ACCEPTANCE OF TERMS</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Clipr ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform. Clipr reserves the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">2. PLATFORM DESCRIPTION</h2>
              <p className="text-muted-foreground leading-relaxed">
                Clipr is a marketplace platform connecting customers with barbershops and hair salons in South Africa. We facilitate booking, deposits, and communication between parties but are not the service provider. All grooming services are provided by independent businesses listed on the Platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">3. USER ACCOUNTS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>3.1. You must provide accurate, current, and complete information when creating an account.</p>
                <p>3.2. You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p>3.3. You must be at least 18 years old or have parental consent to use the Platform.</p>
                <p>3.4. One person may not maintain multiple accounts.</p>
                <p>3.5. We reserve the right to suspend or terminate accounts that violate these terms.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">4. BOOKINGS AND DEPOSITS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>4.1. A 50% deposit is required to confirm all bookings on the Platform.</p>
                <p>4.2. Bookings are NOT confirmed until the deposit is successfully processed.</p>
                <p>4.3. Deposits are deducted from the final service price at the time of service.</p>
                <p>4.4. Unpaid slots remain available to other customers.</p>
                <p>4.5. Clipr is not responsible for disputes regarding service quality between customers and businesses.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">5. CANCELLATION AND REFUNDS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>5.1. Cancellations made 24+ hours before the appointment qualify for a full deposit refund.</p>
                <p>5.2. Cancellations within 24 hours may result in partial or full forfeiture of the deposit.</p>
                <p>5.3. No-shows forfeit the entire deposit.</p>
                <p>5.4. Refunds are processed within 5-7 business days.</p>
                <p>5.5. Businesses may have additional cancellation policies displayed on their profiles.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">6. LATE ARRIVALS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>6.1. Each business sets a grace period (typically 15 minutes) for late arrivals.</p>
                <p>6.2. Arriving after the grace period may result in deposit forfeiture.</p>
                <p>6.3. Businesses have discretion to accommodate late arrivals based on their schedule.</p>
                <p>6.4. Clipr is not responsible for decisions made by businesses regarding late arrivals.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">7. BUSINESS RESPONSIBILITIES</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>7.1. Businesses are independent contractors, not employees of Clipr.</p>
                <p>7.2. Businesses are responsible for the quality and safety of their services.</p>
                <p>7.3. Businesses must maintain accurate pricing, availability, and service information.</p>
                <p>7.4. Businesses must comply with all applicable laws and regulations.</p>
                <p>7.5. Clipr reserves the right to remove businesses that violate platform standards.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">8. LIMITATION OF LIABILITY</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>8.1. Clipr is a marketplace platform and not a party to transactions between customers and businesses.</p>
                <p>8.2. We are not liable for injuries, damages, or losses resulting from services provided by businesses.</p>
                <p>8.3. Our liability is limited to the amount of fees paid to Clipr in the 12 months preceding any claim.</p>
                <p>8.4. We do not guarantee the availability, quality, or accuracy of services listed on the Platform.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">9. DISPUTE RESOLUTION</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>9.1. Disputes between customers and businesses should first be addressed directly between parties.</p>
                <p>9.2. Clipr may assist in mediation but is not obligated to resolve disputes.</p>
                <p>9.3. Any legal disputes with Clipr shall be governed by South African law.</p>
                <p>9.4. Legal proceedings shall be conducted in the courts of Johannesburg, Gauteng.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">10. INTELLECTUAL PROPERTY</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>10.1. All content, trademarks, and materials on the Platform are owned by Clipr.</p>
                <p>10.2. Users may not copy, reproduce, or distribute Platform content without permission.</p>
                <p>10.3. User-generated content remains the property of the user but grants Clipr a license to use it.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">11. PROHIBITED CONDUCT</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>Users may not:</p>
                <p>• Use the Platform for any unlawful purpose</p>
                <p>• Harass, abuse, or harm other users or businesses</p>
                <p>• Provide false information or impersonate others</p>
                <p>• Attempt to circumvent Platform fees or security measures</p>
                <p>• Scrape, copy, or automate access to Platform data</p>
                <p>• Post false reviews or manipulate ratings</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">12. CONTACT INFORMATION</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, contact us at:<br />
                Email: legal@clipr.co.za<br />
                Address: Johannesburg, South Africa
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
