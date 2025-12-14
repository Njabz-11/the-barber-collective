import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center">
            PRIVACY POLICY
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground text-sm">
              Last updated: December 2024
            </p>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">1. INTRODUCTION</h2>
              <p className="text-muted-foreground leading-relaxed">
                Clipr ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. By using Clipr, you consent to the practices described herein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">2. INFORMATION WE COLLECT</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.1 Personal Information</h3>
                  <p>• Name, email address, and phone number</p>
                  <p>• Account credentials</p>
                  <p>• Profile photo (optional)</p>
                  <p>• Booking history and preferences</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.2 Payment Information</h3>
                  <p>• Payment method details (processed securely via PayPal)</p>
                  <p>• Transaction history</p>
                  <p>• Billing address</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.3 Automatically Collected Data</h3>
                  <p>• Device information (type, operating system)</p>
                  <p>• IP address and location data</p>
                  <p>• Browser type and version</p>
                  <p>• Usage patterns and analytics</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">3. HOW WE USE YOUR INFORMATION</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>3.1. To provide and maintain our services</p>
                <p>3.2. To process bookings and payments</p>
                <p>3.3. To communicate with you about your account and bookings</p>
                <p>3.4. To send promotional materials (with your consent)</p>
                <p>3.5. To improve our platform and user experience</p>
                <p>3.6. To prevent fraud and ensure platform security</p>
                <p>3.7. To comply with legal obligations</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">4. INFORMATION SHARING</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.1 With Service Providers</h3>
                  <p>We share your booking details (name, phone, appointment time) with the businesses you book with.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.2 With Payment Processors</h3>
                  <p>Payment information is shared with PayPal for secure transaction processing.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.3 Legal Requirements</h3>
                  <p>We may disclose information when required by law or to protect our rights.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.4 We Do NOT</h3>
                  <p>• Sell your personal data to third parties</p>
                  <p>• Share your data for unrelated marketing purposes</p>
                  <p>• Transfer data internationally without appropriate safeguards</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">5. COOKIES AND TRACKING</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>5.1. We use cookies to enhance your experience and analyze platform usage.</p>
                <p>5.2. Essential cookies are necessary for platform functionality.</p>
                <p>5.3. Analytics cookies help us understand how you use Clipr.</p>
                <p>5.4. You can control cookie preferences through your browser settings.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">6. DATA SECURITY</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>6.1. We use industry-standard encryption (SSL/TLS) for data transmission.</p>
                <p>6.2. Payment data is processed by PCI-DSS compliant providers.</p>
                <p>6.3. Access to personal data is restricted to authorized personnel.</p>
                <p>6.4. We regularly review and update our security measures.</p>
                <p>6.5. Despite our efforts, no method of transmission over the internet is 100% secure.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">7. YOUR RIGHTS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>You have the right to:</p>
                <p>• Access your personal data</p>
                <p>• Correct inaccurate information</p>
                <p>• Request deletion of your data</p>
                <p>• Object to processing of your data</p>
                <p>• Withdraw consent at any time</p>
                <p>• Request data portability</p>
                <p>• Lodge a complaint with a supervisory authority</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">8. DATA RETENTION</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>8.1. We retain personal data as long as your account is active.</p>
                <p>8.2. Booking history is retained for 7 years for legal and accounting purposes.</p>
                <p>8.3. Upon account deletion, personal data is removed within 30 days.</p>
                <p>8.4. Some data may be retained longer if required by law.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">9. THIRD-PARTY INTEGRATIONS</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>9.1. PayPal: Payment processing (subject to PayPal's privacy policy)</p>
                <p>9.2. WhatsApp: Business communication (subject to WhatsApp's privacy policy)</p>
                <p>9.3. Google Analytics: Usage analytics (subject to Google's privacy policy)</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">10. CHILDREN'S PRIVACY</h2>
              <p className="text-muted-foreground leading-relaxed">
                Clipr is not intended for children under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">11. CHANGES TO THIS POLICY</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification. Your continued use of Clipr after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-accent">12. CONTACT US</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related questions or to exercise your rights, contact us at:<br />
                Email: privacy@clipr.co.za<br />
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

export default PrivacyPolicy;
