import { Camera, Cpu, FileText } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Capture or Upload",
    description: "Take a photo of a medicinal plant or upload an existing image from your gallery.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our deep learning model analyzes the image to identify the plant species with high accuracy.",
  },
  {
    icon: FileText,
    title: "Get Information",
    description: "Receive detailed information about the plant's medicinal properties and traditional uses.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 gradient-subtle">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle mt-4 mx-auto">
            Three simple steps to discover the medicinal properties of any plant
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              {/* Step number */}
              <div className="relative mb-6 inline-flex">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-md">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
