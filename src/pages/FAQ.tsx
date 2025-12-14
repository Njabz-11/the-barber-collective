import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    category: "Booking",
    questions: [
      {
        q: "How do I book an appointment?",
        a: "Simply search for a salon or barber near you, select your desired services, choose a barber (or let us auto-assign one), pick your preferred date and time, enter your details, and confirm your booking by paying the required deposit."
      },
      {
        q: "Can I book for someone else?",
        a: "Yes, you can book on behalf of someone else. Just enter their name and contact details during the booking process. The confirmation will be sent to the phone number provided."
      },
      {
        q: "How far in advance can I book?",
        a: "You can book appointments up to 30 days in advance, subject to the salon's availability. We recommend booking at least 24-48 hours ahead for popular time slots."
      },
      {
        q: "Can I request a specific barber?",
        a: "Absolutely! During the booking process, you can select your preferred barber from the available team members, or choose 'No Preference' to be assigned the first available professional."
      }
    ]
  },
  {
    category: "Payments & Deposits",
    questions: [
      {
        q: "Why do I need to pay a deposit?",
        a: "The 50% deposit secures your booking and protects businesses from no-shows. Your deposit is deducted from the final service price when you pay at the salon."
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept PayPal for secure deposit payments. The remaining balance can be paid at the salon using cash, card, or mobile payment methods accepted by the business."
      },
      {
        q: "Is my deposit refundable?",
        a: "Yes, deposits are fully refundable if you cancel at least 24 hours before your appointment. Cancellations within 24 hours may result in partial or full deposit forfeiture depending on the salon's policy."
      },
      {
        q: "What happens to my deposit if I'm late?",
        a: "Each business has a grace period (typically 15 minutes). If you arrive after this period, the business may forfeit your deposit. We recommend arriving 5-10 minutes early."
      }
    ]
  },
  {
    category: "Cancellations & Changes",
    questions: [
      {
        q: "How do I cancel my booking?",
        a: "You can cancel through your customer dashboard or by contacting the salon directly via WhatsApp. For refund eligibility, cancel at least 24 hours before your appointment."
      },
      {
        q: "Can I reschedule my appointment?",
        a: "Yes, rescheduling is free if done at least 24 hours before your original appointment. Simply cancel your current booking and make a new one, or contact the salon to arrange a new time."
      },
      {
        q: "What if the salon cancels on me?",
        a: "If a salon cancels your appointment, you'll receive a full refund of your deposit within 5-7 business days. We apologize for any inconvenience this may cause."
      },
      {
        q: "What happens if I don't show up?",
        a: "No-shows result in full forfeiture of your deposit. If you can't make your appointment, please cancel as early as possible to allow others to book the slot."
      }
    ]
  },
  {
    category: "Loyalty & Rewards",
    questions: [
      {
        q: "How does the loyalty program work?",
        a: "Every completed booking at a participating salon earns you progress towards rewards. After 5 completed bookings at the same business, you receive a voucher for one FREE haircut!"
      },
      {
        q: "How long are vouchers valid?",
        a: "Loyalty vouchers are valid for 90 days from the date of issue. Make sure to use them before they expire!"
      },
      {
        q: "Can I use my voucher at any salon?",
        a: "Vouchers are specific to the business where you earned them. They cannot be transferred or used at other salons."
      },
      {
        q: "Where can I see my loyalty progress?",
        a: "Your loyalty progress and available vouchers are visible in your customer dashboard under 'My Rewards'."
      }
    ]
  },
  {
    category: "Account & Privacy",
    questions: [
      {
        q: "Do I need an account to book?",
        a: "While you can browse without an account, creating one allows you to track bookings, earn loyalty points, save favorite salons, and access exclusive deals."
      },
      {
        q: "How is my personal data protected?",
        a: "We take privacy seriously. Your data is encrypted, never sold to third parties, and only shared with salons for booking purposes. Read our full Privacy Policy for details."
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can request account deletion through your settings or by contacting our support. Note that this will erase all booking history and loyalty progress."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-muted-foreground mb-8">
              Find answers to common questions about Clipr
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="pl-12"
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredFaq.map((category) => (
              <div key={category.category}>
                <h2 className="font-display text-xl text-accent mb-4">
                  {category.category.toUpperCase()}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((item, index) => {
                    const key = `${category.category}-${index}`;
                    const isExpanded = expandedItems.has(key);
                    
                    return (
                      <div
                        key={key}
                        className="bg-card border border-border rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-medium text-foreground pr-4">
                            {item.q}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFaq.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No questions found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
