import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 gradient-subtle" />
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Plant Identification</span>
          </div>
          
          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight animate-fade-in-up text-balance">
            Discover the Healing Power of{" "}
            <span className="text-primary">Medicinal Plants</span>
          </h1>
          
          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up text-balance" style={{ animationDelay: "0.1s" }}>
            Upload an image of any plant and instantly identify its species, 
            medicinal properties, and traditional uses backed by AI analysis.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" onClick={() => scrollToSection('identify')}>
              Start Identifying
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl" onClick={() => scrollToSection('plants')}>
              View Plant Library
            </Button>
          </div>
          
          {/* Features highlight instead of fake stats */}
          {/* <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-center sm:text-left">
              <div className="text-lg font-semibold text-foreground">Instant Results</div>
              <div className="text-sm text-muted-foreground mt-1">Get identification in seconds</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg font-semibold text-foreground">Detailed Info</div>
              <div className="text-sm text-muted-foreground mt-1">Medicinal uses & preparation</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg font-semibold text-foreground">Tamil Names</div>
              <div className="text-sm text-muted-foreground mt-1">Local language support</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
