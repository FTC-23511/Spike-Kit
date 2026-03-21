import { TrendingUp, Users, Clock, Heart, MapPin, Camera } from "lucide-react";
import impactRiseSchool from "@/assets/impact-rise-school.png";
import impactLegoRobotics from "@/assets/impact-lego-robotics.jpg";
import packagingRiseKits from "@/assets/packaging-rise-kits.webp";
import impactStudentsGroup from "@/assets/impact-students-group.jpg";
import impactTeamVisit from "@/assets/impact-team-visit.jpg";
import impactTeaching from "@/assets/impact-teaching.png";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: TrendingUp, value: "12+", label: "Kits Donated", description: "And counting" },
  { icon: Users, value: "2", label: "Schools Helped", description: "Around the world" },
  { icon: Clock, value: "2", label: "Countries Impacted", description: "USA & India" },
  { icon: Heart, value: "50+", label: "Students Reached", description: "With access to STEM Education" },
];

const schools = [
  {
    name: "French Immersion School of Washington",
    location: "Bellevue, WA, USA",
    lat: 47.6101, lng: -122.2015,
    description: "Received SPIKE Prime kits to launch their first robotics program.",
  },
  {
    name: "The Rise School",
    location: "Samiyandipudhur, Tamil Nadu, India",
    lat: 9.9252, lng: 77.5474,
    description: "Bringing hands-on STEM education to students in rural Tamil Nadu.",
  },
];

const galleryPhotos = [
  { caption: "Students at French Immersion School building with SPIKE Prime", src: impactLegoRobotics },
  { caption: "The Rise School students exploring robotics for the first time", src: impactRiseSchool },
  { caption: "Kit preparation and quality check before shipping", src: packagingRiseKits },
  { caption: "Unboxing day at a partner school", src: impactTeamVisit },
  { caption: "Students presenting their SPIKE Prime projects", src: impactTeaching },
  { caption: "Seattle Solvers team packaging donations", src: impactStudentsGroup },
];

const ImpactMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapLoaded) return;
    const loadMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const map = L.map(mapRef.current!, { scrollWheelZoom: false }).setView([30, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const icon = L.divIcon({
        className: "custom-pin",
        html: `<div style="width:24px;height:24px;background:hsl(51,100%,47%);border:3px solid hsl(50,100%,36%);border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24], iconAnchor: [12, 12],
      });
      schools.forEach((school) => {
        L.marker([school.lat, school.lng], { icon })
          .addTo(map)
          .bindPopup(`<div style="font-family:sans-serif;"><strong>${school.name}</strong><br/><span style="color:#666;">${school.location}</span><br/><small>${school.description}</small></div>`);
      });
      setMapLoaded(true);
    };
    loadMap();
  }, [mapLoaded]);

  return (
    <div ref={mapRef} className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl sm:rounded-xl md:rounded-2xl border-2 border-spike-border shadow-card overflow-hidden" />
  );
};

const OurImpact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spike-light via-spike-cream to-spike-light">
      <main className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
              Our Impact
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
              Together, we're making STEM education accessible to students who need it most.
              Here's what we've accomplished so far.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mb-10 sm:mb-14 md:mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="bg-spike-light/90 backdrop-blur-sm border-2 border-spike-border rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-button border border-spike-border sm:border-2 flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-4">
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-foreground" />
                </div>
                <div className="font-display font-bold text-base sm:text-xl md:text-4xl text-foreground mb-0 md:mb-1">{stat.value}</div>
                <div className="font-display font-semibold text-[8px] sm:text-xs md:text-base text-foreground mb-0 md:mb-1">{stat.label}</div>
                <div className="text-[7px] sm:text-[10px] md:text-sm text-muted-foreground hidden sm:block">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-20">
            <div className="bg-spike-cream border-2 border-spike-border rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 lg:p-12 shadow-elevated">
              <blockquote className="text-[11px] sm:text-sm md:text-xl lg:text-2xl text-foreground text-center leading-relaxed mb-2 sm:mb-3 md:mb-6">
                "The SPIKE Prime kits we received transformed our robotics program.
                Students who never showed interest in STEM are now staying after school
                to build and code. This donation changed lives."
              </blockquote>
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-gradient-button border-2 border-spike-border flex items-center justify-center">
                  <span className="font-display font-bold text-[8px] sm:text-xs md:text-base text-foreground">MS</span>
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-[10px] sm:text-xs md:text-base text-foreground">Maria Santos</div>
                  <div className="text-[8px] sm:text-[10px] md:text-sm text-muted-foreground">STEM Teacher, Lincoln Elementary</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="mb-10 sm:mb-14 md:mb-20">
            <div className="text-center mb-4 sm:mb-6 md:mb-10">
              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 sm:mb-3 md:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 inline-block mr-1 sm:mr-2 text-spike-gold" />
                Schools We've Impacted
              </h2>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
                Click on the pins to learn more about each school receiving SPIKE Prime kits.
              </p>
            </div>
            <ImpactMap />

            {/* School cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              {schools.map((school, index) => (
                <div key={index} className="bg-spike-light/80 border-2 border-spike-border rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6 shadow-card">
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-button border-2 border-spike-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-[10px] sm:text-xs md:text-lg text-foreground mb-0.5 md:mb-1">{school.name}</h3>
                      <p className="text-[8px] sm:text-[10px] md:text-sm text-muted-foreground mb-0.5 md:mb-2">{school.location}</p>
                      <p className="text-[9px] sm:text-[10px] md:text-sm text-muted-foreground leading-relaxed hidden sm:block">{school.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-10 sm:mb-14 md:mb-20">
            <div className="text-center mb-4 sm:mb-6 md:mb-10">
              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 sm:mb-3 md:mb-4">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 inline-block mr-1 sm:mr-2 text-spike-gold" />
                Photo Gallery
              </h2>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
                Moments from our impact around the world.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-1.5 sm:gap-2 md:gap-4">
              {galleryPhotos.map((photo, index) => (
                <div key={index} className="aspect-[4/3] bg-spike-cream border-2 border-spike-border rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-2 sm:mb-3 md:mb-4">
              Help Us Grow Our Impact
            </h2>
            <p className="text-[11px] sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-xl mx-auto">
              Every donated kit means another classroom gets access to world-class STEM education.
            </p>
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
              <Button asChild variant="hero" size="default" className="text-[10px] sm:text-xs md:text-base">
                <Link to="/donate">Donate Kits</Link>
              </Button>
              <Button asChild variant="outline" size="default" className="text-[10px] sm:text-xs md:text-base">
                <Link to="/donate-funds">Donate Funds</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurImpact;
