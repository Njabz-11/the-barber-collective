import { Star, Heart, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SalonCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  distance?: string;
  location: string;
  isOpen?: boolean;
}

const SalonCard = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  priceFrom,
  distance,
  location,
  isOpen = true,
}: SalonCardProps) => {
  return (
    <div className="group card-premium overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-accent transition-colors" />
        </button>
        {isOpen && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-green-500/90 text-card rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            Open Now
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{location}</span>
          {distance && (
            <>
              <span className="text-border">•</span>
              <span>{distance}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <p className="text-sm">
            <span className="text-muted-foreground">From </span>
            <span className="font-semibold text-foreground">R{priceFrom}</span>
          </p>
          <div className="flex gap-2">
            <Link to={`/salon/${id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <Link to={`/salon/${id}/book`}>
              <Button variant="gold" size="sm">
                Book
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
