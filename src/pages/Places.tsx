import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { touristPlaces, categories } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import Navbar from "@/components/Navbar";

const crowdLevels = ["Low", "Moderate", "High", "Very High"];
const seasons = ["Winter (Oct–Feb)", "Summer (Mar–Jun)", "Monsoon (Jul–Sep)"];

const Places = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = touristPlaces;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.placeName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedCrowd) {
      result = result.filter((p) => p.weekendCrowd.toLowerCase().includes(selectedCrowd.toLowerCase()));
    }
    return result;
  }, [search, selectedCategory, selectedCrowd]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Tourist Places</h1>
        <p className="text-muted-foreground font-sans mb-8">
          Explore all {touristPlaces.length} tourist destinations in Coimbatore District
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 font-sans"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div>
            <span className="text-sm font-sans font-medium text-muted-foreground mb-2 block">Category</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full font-sans text-xs"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className="rounded-full font-sans text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-sans font-medium text-muted-foreground mb-2 block">Crowd Level</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCrowd === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCrowd(null)}
                className="rounded-full font-sans text-xs"
              >
                All
              </Button>
              {crowdLevels.map((level) => (
                <Button
                  key={level}
                  variant={selectedCrowd === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCrowd(selectedCrowd === level ? null : level)}
                  className="rounded-full font-sans text-xs"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-sans mb-4">
          Showing {filtered.length} of {touristPlaces.length} places
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-sans text-lg">No places match your filters.</p>
            <Button
              variant="outline"
              className="mt-4 font-sans"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
                setSelectedCrowd(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
