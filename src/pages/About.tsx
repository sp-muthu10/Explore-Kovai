import Navbar from "@/components/Navbar";
import { MapPin, Users, Compass, Info } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
          About This Project
        </h1>

        <div className="bg-card rounded-xl border p-8 shadow-sm space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Compass className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-serif font-semibold mb-2">
              Smart Tourist Guidance System for Coimbatore District
            </h2>
          </div>

          <p className="text-muted-foreground font-sans leading-relaxed">
            This project aims to help travelers easily discover places, transport options, and crowd
            information when visiting Coimbatore District, Tamil Nadu, India. Whether you're planning a
            spiritual pilgrimage, a nature trek, or a city leisure day, this guide provides all the
            information you need.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <FeatureCard
              icon={<MapPin className="w-6 h-6 text-primary" />}
              title="Discover Places"
              desc="Explore temples, waterfalls, hills, lakes and attractions"
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Crowd Insights"
              desc="Know crowd levels by time, season, and festival"
            />
            <FeatureCard
              icon={<Info className="w-6 h-6 text-primary" />}
              title="Travel Info"
              desc="Transport, facilities, and nearby attractions"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="text-center p-4">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
      {icon}
    </div>
    <h3 className="font-sans font-semibold text-sm mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground font-sans">{desc}</p>
  </div>
);

export default About;
