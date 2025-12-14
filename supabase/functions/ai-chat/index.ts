import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const systemPrompt = `You are a helpful customer support assistant for Clipr, South Africa's premier barber and salon booking platform. You help customers with:

1. **Booking Questions**: How to book, select services, choose barbers, pick dates/times
2. **Deposit Rules**: 
   - A 50% deposit is required to secure any booking
   - Bookings are NOT confirmed until deposit is paid
   - If deposit isn't paid, the slot remains available
   - Deposits are deducted from the final service price
3. **Cancellation Policy**:
   - Free cancellation up to 24 hours before appointment
   - Cancellations within 24 hours forfeit 50% of deposit
   - No-shows forfeit the entire deposit
   - Rescheduling is free with 24+ hours notice
4. **Late Arrival Policy**:
   - Grace period of 15 minutes (configurable by business)
   - Arriving after grace period may result in deposit forfeiture
   - Business has discretion to accommodate late arrivals
5. **Refund Policy**:
   - Deposits are refundable only for cancellations made 24+ hours ahead
   - Service issues should be reported within 24 hours
   - Refunds processed within 5-7 business days
6. **Loyalty Program**:
   - Earn points with every completed booking
   - After 5 bookings at the same business, receive a FREE haircut voucher
   - Vouchers valid for 90 days
   - One voucher per visit

Be friendly, concise, and helpful. If you don't know something specific, direct them to contact the business directly via WhatsApp.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI Chat request:", message);

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Lovable AI error:", error);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request. Please try again.";

    console.log("AI response generated successfully");

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in AI chat:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
