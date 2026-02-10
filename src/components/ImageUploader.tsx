import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { validateImageFile } from "@/services/geminiApi";

interface ImageUploaderProps {
  onAnalyze: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
}

const ImageUploader = ({ onAnalyze, isLoading, error }: ImageUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFile = (file: File) => {
    // Validate file type and size
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setSelectedFile(file);
    };
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the image file. Please try again.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <section id="identify" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Identify Your Plant</h2>
          <p className="section-subtitle mt-4 mx-auto">
            Upload a clear photo of a medicinal plant to discover its identity and healing properties
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Analysis Failed</p>
                <p className="text-sm text-destructive/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {preview ? (
            <div className="relative rounded-2xl overflow-hidden shadow-lg animate-scale-in">
              <img
                src={preview}
                alt="Plant preview"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              <button
                onClick={clearPreview}
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/90 hover:bg-background transition-colors disabled:opacity-50"
                aria-label="Remove image"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                  onClick={handleAnalyzeClick}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing plant...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-5 w-5" />
                      Identify This Plant
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`upload-zone ${dragActive ? "dragging" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              <div className="flex flex-col items-center py-8">
                <div className="mb-6 p-4 rounded-2xl bg-accent">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Drop your plant image here
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  or click to browse from your device
                </p>
                
                <Button variant="default" size="lg">
                  <ImageIcon className="h-5 w-5" />
                  Choose Image
                </Button>
                
                <p className="mt-6 text-xs text-muted-foreground">
                  Supports JPG, PNG, WEBP • Max 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageUploader;
