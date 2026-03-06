import { Link } from "react-router-dom";
import { TouristPlace, getCrowdDot } from "@/data/places";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceCardProps {
  place: TouristPlace;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const mainCrowd = place.weekendCrowd || "Moderate";

  return (
    <Link to={`/places/${place.id}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.image}
            alt={place.placeName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground font-sans text-xs">
            {place.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {place.placeName}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{place.location}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {place.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-medium">
              {getCrowdDot(mainCrowd)} {mainCrowd} crowd
            </span>
            <Button variant="ghost" size="sm" className="text-primary font-sans text-xs gap-1 p-0 h-auto">
              <Eye className="w-3.5 h-3.5" /> View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
