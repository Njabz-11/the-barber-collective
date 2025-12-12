import { LucideIcon } from "lucide-react";

interface ServiceIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const ServiceIcon = ({ icon: Icon, label, onClick }: ServiceIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-4 group"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:shadow-gold transition-all duration-300">
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </button>
  );
};

export default ServiceIcon;
