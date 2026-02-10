import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import PlantResult from "@/components/PlantResult";
import HowItWorks from "@/components/HowItWorks";
import PlantGallery from "@/components/PlantGallery";
import Footer from "@/components/Footer";
import { identifyPlant } from "@/services/geminiApi";
import { PlantIdentificationResult, AnalysisState } from "@/types/plant";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [plantResult, setPlantResult] = useState<PlantIdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (file: File) => {
    // Reset previous error state
    setError(null);
    setAnalysisState('analyzing');
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const response = await identifyPlant(file);
      
      if (response.success && response.data) {
        setPlantResult(response.data);
        setAnalysisState('success');
        toast({
          title: "Plant Identified!",
          description: `Successfully identified: ${response.data.commonName}`,
        });
      } else {
        setError(response.error || 'Failed to identify the plant. Please try again.');
        setAnalysisState('error');
        toast({
          title: "Identification Failed",
          description: response.error || 'Unable to identify the plant.',
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      setAnalysisState('error');
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPlantResult(null);
    setAnalysisState('idle');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {analysisState === 'success' && plantResult ? (
          <PlantResult 
            plant={plantResult} 
            imageUrl={uploadedImage} 
            onReset={handleReset} 
          />
        ) : (
          <ImageUploader 
            onAnalyze={handleAnalyze} 
            isLoading={analysisState === 'analyzing'}
            error={error}
          />
        )}
        
        <HowItWorks />
        <PlantGallery />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
