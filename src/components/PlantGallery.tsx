const plants = [
  {
    id: 1,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    tamilName: "கற்றாழை",
    uses: ["Skin healing", "Burns treatment"],
    imageUrl: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum tenuiflorum",
    tamilName: "துளசி",
    uses: ["Respiratory health", "Stress relief"],
    imageUrl: "https://images.unsplash.com/photo-1621515378278-91fe29fce73e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    tamilName: "லாவெண்டர்",
    uses: ["Anxiety relief", "Sleep aid"],
    imageUrl: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    tamilName: "காமோமில்",
    uses: ["Digestive health", "Relaxation"],
    imageUrl: "https://images.unsplash.com/photo-1631037958943-f6c220c4703a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Peppermint",
    scientificName: "Mentha piperita",
    tamilName: "புதினா",
    uses: ["Headache relief", "Digestion"],
    imageUrl: "https://images.unsplash.com/photo-1561407958-54aa9fa49a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGVwcGVybWludHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Ginger",
    scientificName: "Zingiber officinale",
    tamilName: "இஞ்சி",
    uses: ["Nausea relief", "Anti-inflammatory"],
    imageUrl: "https://images.unsplash.com/photo-1630623093145-f606591c2546?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const PlantGallery = () => {
  return (
    <section id="plants" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Popular Medicinal Plants</h2>
          <p className="section-subtitle mt-4 mx-auto">
            Reference guide of commonly identified medicinal plants and their uses
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant, index) => (
            <article
              key={plant.id}
              className="plant-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              
              <h3 className="font-display text-xl font-semibold text-foreground">
                {plant.name}
              </h3>
              <p className="text-sm text-muted-foreground italic">
                {plant.scientificName}
              </p>
              {plant.tamilName && (
                <p className="text-sm text-primary font-medium mb-3">
                  {plant.tamilName}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-2">
                {plant.uses.map((use, useIndex) => (
                  <span key={useIndex} className="badge-medicinal text-xs">
                    {use}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantGallery;
