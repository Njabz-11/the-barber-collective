import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import SalonProfile from "./pages/SalonProfile";
import BookingFlow from "./pages/BookingFlow";
import CustomerDashboard from "./pages/CustomerDashboard";
import Auth from "./pages/Auth";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ListBusiness from "./pages/ListBusiness";
import BarberProfile from "./pages/BarberProfile";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/services" element={<Services />} />
            <Route path="/salon/:slug" element={<SalonProfile />} />
            <Route path="/salon/:slug/book" element={<BookingFlow />} />
            <Route path="/barber/:id" element={<BarberProfile />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/business/*" element={<BusinessDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/list-business" element={<ListBusiness />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
