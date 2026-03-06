import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Mountain, Droplets, TreePine, Landmark, Fish, Gamepad2, ChevronRight, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { touristPlaces, categories, suggestedRoutes } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-western-ghats.jpg";

const categoryIcons: Record<string, React.ReactNode> = {
  Temple: <Landmark className="w-5 h-5" />,
  Nature: <TreePine className="w-5 h-5" />,
  Waterfall: <Droplets className="w-5 h-5" />,
  Lake: <Fish className="w-5 h-5" />,
  Museum: <Landmark className="w-5 h-5" />,
  Wildlife: <Mountain className="w-5 h-5" />,
  Entertainment: <Gamepad2 className="w-5 h-5" />,
  Spiritual: <Star className="w-5 h-5" />,
  Shopping: <Gamepad2 className="w-5 h-5" />,
  Heritage: <Landmark className="w-5 h-5" />,
};

const stats = [
  { label: "Tourist Places", value: 21, icon: "📍" },
  { label: "Temples", value: 4, icon: "🏛" },
  { label: "Nature Spots", value: 8, icon: "🌄" },
  { label: "Waterfalls", value: 3, icon: "💧" },
  { label: "Entertainment", value: 6, icon: "🎢" },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPlaces = touristPlaces.filter((p) => p.featured);

  const filteredPlaces = useMemo(() => {
    let filtered = touristPlaces;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.placeName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    return filtered;
  }, [search, selectedCategory]);

  const showResults = search.length > 0 || selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Western Ghats landscape near Coimbatore"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Explore Coimbatore
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-sans font-light">
            Discover temples, waterfalls, hills, lakes and attractions across Coimbatore district
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search places, categories, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 rounded-full text-base shadow-xl bg-card border-0 font-sans"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Category Filters */}
        <section className="py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full font-sans"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className="rounded-full font-sans gap-1.5"
              >
                {categoryIcons[cat]}
                {cat}
              </Button>
            ))}
          </div>
        </section>

        {/* Search results */}
        {showResults && (
          <section className="pb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "Place" : "Places"} Found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlaces.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
            {filteredPlaces.length === 0 && (
              <p className="text-center text-muted-foreground py-12 font-sans">No places found matching your search.</p>
            )}
          </section>
        )}

        {/* Stats */}
        {!showResults && (
          <>
            <section className="py-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
                Coimbatore Tourism Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-card rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl mb-2 block">{s.icon}</span>
                    <div className="text-3xl font-bold text-primary font-sans">{s.value}</div>
                    <div className="text-sm text-muted-foreground font-sans mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured */}
            <section className="py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Top Attractions</h2>
                <Link to="/places">
                  <Button variant="ghost" className="font-sans gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPlaces.map((p) => (
                  <PlaceCard key={p.id} place={p} />
                ))}
              </div>
            </section>

            {/* Suggested Routes */}
            <section className="py-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
                Suggested Tourist Routes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedRoutes.map((route) => (
                  <div
                    key={route.name}
                    className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <span className="text-3xl mb-3 block">{route.icon}</span>
                    <h3 className="font-serif text-xl font-semibold mb-2">{route.name}</h3>
                    <p className="text-sm text-muted-foreground font-sans mb-4">{route.description}</p>
                    <div className="flex flex-wrap items-center gap-1">
                      {route.places.map((place, i) => (
                        <span key={place} className="flex items-center gap-1 text-sm font-sans">
                          <Badge variant="secondary" className="text-xs">{place}</Badge>
                          {i < route.places.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg">Coimbatore Tourist Guide</span>
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            Smart Tourist Guidance System for Coimbatore District, Tamil Nadu, India
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
