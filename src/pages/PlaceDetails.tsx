import { useParams, Link } from "react-router-dom";
import { touristPlaces, getCrowdDot, getCrowdBg } from "@/data/places";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Clock, MapPin, Plane, Bus, Train, Car, Users,
  Droplets, ShoppingBag, UtensilsCrossed, Navigation, Calendar
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const facilityIcons: Record<string, React.ReactNode> = {
  Parking: <Car className="w-4 h-4" />,
  Restrooms: <Users className="w-4 h-4" />,
  "Drinking water": <Droplets className="w-4 h-4" />,
  "Temple shops": <ShoppingBag className="w-4 h-4" />,
  "Food court": <UtensilsCrossed className="w-4 h-4" />,
  "Food stalls": <UtensilsCrossed className="w-4 h-4" />,
  "Food stalls during season": <UtensilsCrossed className="w-4 h-4" />,
  Restaurants: <UtensilsCrossed className="w-4 h-4" />,
  "Food counters": <UtensilsCrossed className="w-4 h-4" />,
  Shops: <ShoppingBag className="w-4 h-4" />,
};

const crowdToNum = (level?: string) => {
  if (!level) return 0;
  const l = level.toLowerCase();
  if (l.includes("extremely")) return 5;
  if (l.includes("very high")) return 4;
  if (l.includes("high")) return 3;
  if (l.includes("moderate")) return 2;
  if (l.includes("low")) return 1;
  return 0;
};

const crowdColor = (level?: string) => {
  const n = crowdToNum(level);
  if (n >= 4) return "#ef4444";
  if (n === 3) return "#f97316";
  if (n === 2) return "#eab308";
  return "#22c55e";
};

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const place = touristPlaces.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Place Not Found</h1>
          <Link to="/places"><Button className="font-sans">Back to Places</Button></Link>
        </div>
      </div>
    );
  }

  const dailyChartData = Object.entries(place.dailyCrowd)
    .filter(([, v]) => v)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      level: crowdToNum(value),
      label: value,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={place.image} alt={place.placeName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/places">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white mb-4 font-sans gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to Places
              </Button>
            </Link>
            <Badge className="bg-primary/90 text-primary-foreground mb-2 font-sans">{place.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-1">{place.placeName}</h1>
            <div className="flex items-center gap-1 text-white/80 font-sans text-sm">
              <MapPin className="w-4 h-4" /> {place.location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Section title="Overview">
              <p className="text-muted-foreground font-sans leading-relaxed">{place.description}</p>
            </Section>

            <Section title="History">
              <p className="text-muted-foreground font-sans leading-relaxed">{place.history}</p>
            </Section>

            <Section title="Cultural Story">
              <p className="text-muted-foreground font-sans leading-relaxed">{place.backstory}</p>
            </Section>

            <Section title="Speciality">
              <p className="text-muted-foreground font-sans leading-relaxed">{place.speciality}</p>
            </Section>

            {/* Crowd Chart */}
            {dailyChartData.length > 0 && (
              <Section title="Daily Crowd Pattern">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyChartData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(v) => ["", "Low", "Med", "High", "V.High", "Extreme"][v] || ""} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(value: number, name: string, props: any) => [props.payload.label, "Crowd"]} />
                      <Bar dataKey="level" radius={[6, 6, 0, 0]}>
                        {dailyChartData.map((entry, i) => (
                          <Cell key={i} fill={crowdColor(entry.label)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Section>
            )}

            {/* Crowd Info */}
            <Section title="Crowd Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CrowdCard label="Daily Crowd" items={Object.entries(place.dailyCrowd).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`)} />
                <CrowdCard label="Seasonal Crowd" items={[place.seasonalCrowd]} />
                <CrowdCard label="Festival Crowd" items={[place.festivalCrowd]} />
                <CrowdCard label="Weekend Crowd" items={[place.weekendCrowd]} />
              </div>
            </Section>

            {/* Nearby */}
            <Section title="Nearby Attractions">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {place.nearbyAttractions.map((a) => (
                  <div key={a.name} className="bg-card rounded-lg border p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-sans font-medium text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground font-sans">{a.distance}</p>
                    </div>
                    <Navigation className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visit Info */}
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-4">Visit Information</h3>
              <div className="space-y-3 font-sans text-sm">
                <InfoRow icon={<Calendar className="w-4 h-4 text-primary" />} label="Best Time" value={place.bestTime} />
                <InfoRow icon={<Clock className="w-4 h-4 text-primary" />} label="Opening" value={place.openingTime} />
                <InfoRow icon={<Clock className="w-4 h-4 text-primary" />} label="Closing" value={place.closingTime} />
                {place.entryFee && <InfoRow icon={<ShoppingBag className="w-4 h-4 text-primary" />} label="Entry Fee" value={place.entryFee} />}
              </div>
            </div>

            {/* Transport */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold">Transport</h3>
              <TransportCard icon={<Plane className="w-5 h-5" />} title="Nearest Airport" detail={place.nearestAirport} />
              <TransportCard icon={<Bus className="w-5 h-5" />} title="Bus Connectivity" detail={place.busConnectivity} />
              <TransportCard icon={<Train className="w-5 h-5" />} title="Train Availability" detail={place.trainAvailability} />
            </div>

            {/* Facilities */}
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold mb-4">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {place.facilities.map((f) => (
                  <Badge key={f} variant="secondary" className="font-sans text-xs gap-1 py-1.5 px-3">
                    {facilityIcons[f] || <MapPin className="w-3 h-3" />} {f}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl md:text-2xl font-serif font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <span className="text-muted-foreground text-xs">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const TransportCard = ({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) => (
  <div className="bg-card rounded-xl border p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
    <div>
      <p className="font-sans font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground font-sans mt-0.5">{detail}</p>
    </div>
  </div>
);

const CrowdCard = ({ label, items }: { label: string; items: string[] }) => (
  <div className="bg-card rounded-xl border p-4 shadow-sm">
    <p className="font-sans font-medium text-sm mb-2">{label}</p>
    {items.map((item, i) => (
      <p key={i} className="text-xs text-muted-foreground font-sans">
        {getCrowdDot(item)} {item}
      </p>
    ))}
  </div>
);

export default PlaceDetails;
