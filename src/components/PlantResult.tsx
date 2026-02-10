import { Check, AlertCircle, Beaker, Heart, Leaf, BookOpen, Scissors, FlaskConical, ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import { PlantIdentificationResult } from "@/types/plant";

interface PlantResultProps {
  plant: PlantIdentificationResult;
  imageUrl: string | null;
  onReset: () => void;
}

const ConfidenceBadge = ({ confidence }: { confidence: number }) => {
  const color =
    confidence >= 80
      ? "bg-green-100 text-green-700 border-green-200"
      : confidence >= 50
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-red-100 text-red-700 border-red-200";

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${color}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${confidence >= 80 ? 'bg-green-400' : confidence >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${confidence >= 80 ? 'bg-green-500' : confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
      </span>
      {confidence}% confidence
    </span>
  );
};

const SectionCard = ({
  icon: Icon,
  title,
  children,
  variant = "default",
  delay = "0s",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning";
  delay?: string;
}) => (
  <div
    className="bg-card rounded-2xl border border-border/60 p-5 animate-fade-in-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-2.5 mb-4">
      <div className={`p-2 rounded-xl ${variant === "warning" ? "bg-orange-50 text-orange-500" : "bg-accent text-primary"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">{title}</h3>
    </div>
    {children}
  </div>
);

const PlantResult = ({ plant, imageUrl, onReset }: PlantResultProps) => {
  const hasTamilName =
    plant.tamilName && plant.tamilName !== "Not available" && plant.tamilName !== "N/A";

  return (
    <section id="identify" className="py-16 md:py-20 bg-background">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back / Reset */}
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Identify another plant
        </button>

        {/* ── Hero Card ── */}
        <div className="rounded-3xl overflow-hidden border border-border/60 bg-card shadow-lg animate-fade-in-up">
          <div className="grid md:grid-cols-5">
            {/* Image column (2/5) */}
            <div className="md:col-span-2 relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={plant.commonName}
                  className="w-full h-64 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-64 md:h-full bg-muted flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-muted-foreground/40" />
                </div>
              )}
              {/* Overlay gradient on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
            </div>

            {/* Info column (3/5) */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Check className="h-3.5 w-3.5" />
                  Identified
                </div>
                <ConfidenceBadge confidence={plant.confidence} />
              </div>

              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                  {plant.commonName}
                </h1>
                <p className="text-base text-muted-foreground italic mt-1">
                  {plant.scientificName}
                </p>
                {hasTamilName && (
                  <p className="text-sm text-primary font-medium mt-1.5">
                    Tamil: {plant.tamilName}
                  </p>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 md:line-clamp-none">
                {plant.description}
              </p>

              {/* Quick tags row */}
              {plant.partsUsed.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {plant.partsUsed.map((part, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
                    >
                      <Scissors className="h-3 w-3" />
                      {part}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Detail Cards Grid ── */}
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {/* Medicinal Uses */}
          {plant.medicinalUses.length > 0 && (
            <SectionCard icon={Heart} title="Medicinal Uses" delay="0.1s">
              <ul className="space-y-2.5">
                {plant.medicinalUses.map((use, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Preparation Methods */}
          {plant.preparationMethods.length > 0 && (
            <SectionCard icon={FlaskConical} title="Preparation" delay="0.15s">
              <ul className="space-y-3">
                {plant.preparationMethods.map((method, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Active Compounds */}
          {plant.activeCompounds.length > 0 && (
            <SectionCard icon={Beaker} title="Active Compounds" delay="0.2s">
              <div className="flex flex-wrap gap-2">
                {plant.activeCompounds.map((compound, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent text-accent-foreground border border-border/40"
                  >
                    {compound}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Traditional Use */}
          {plant.traditionalUse && plant.traditionalUse !== "N/A" && (
            <SectionCard icon={BookOpen} title="Traditional Use" delay="0.25s">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {plant.traditionalUse}
              </p>
            </SectionCard>
          )}
        </div>

        {/* ── Safety Notes — Full-width warning bar ── */}
        {plant.safetyNotes.length > 0 && (
          <div
            className="mt-5 rounded-2xl border border-orange-200 bg-orange-50/60 p-5 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-500">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-orange-700 tracking-wide uppercase">
                Safety & Precautions
              </h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {plant.safetyNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-800/80 leading-relaxed">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Disclaimer ── */}
        <p className="mt-6 text-center text-xs text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <strong>Disclaimer:</strong> This information is for educational purposes only.
          Always consult a qualified healthcare professional before using any plant for medicinal purposes.
        </p>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button variant="hero" size="lg" onClick={onReset}>
            Identify Another Plant
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlantResult;
