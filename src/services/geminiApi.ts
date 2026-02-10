import { PlantIdentificationResult, ApiResponse } from '@/types/plant';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

/**
 * Structured prompt for plant identification
 * Designed to maximize accuracy and provide comprehensive medicinal information
 */
const PLANT_IDENTIFICATION_PROMPT = `You are an expert botanist and herbalist specializing in medicinal plants. Analyze the provided image and identify the plant.

IMPORTANT INSTRUCTIONS:
1. Carefully examine the plant's leaves, flowers, stems, and any visible features
2. If you can confidently identify the plant, provide detailed medicinal information
3. If the image is unclear or doesn't show a plant, indicate that in your response
4. Focus on accuracy - if uncertain, express lower confidence rather than guessing
5. Provide information relevant to medical/herbal use cases

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks, just pure JSON):
{
  "commonName": "Common English name of the plant",
  "scientificName": "Scientific botanical name (genus species)",
  "tamilName": "Tamil name of the plant (if known, otherwise 'Not available')",
  "description": "A comprehensive 2-3 sentence description of the plant including its appearance, habitat, and general characteristics",
  "medicinalUses": [
    "Primary medicinal use 1",
    "Primary medicinal use 2",
    "Primary medicinal use 3",
    "Add more uses as relevant"
  ],
  "partsUsed": [
    "List each part of the plant used medicinally (e.g., 'Leaves', 'Root', 'Bark', 'Seeds', 'Flowers', 'Whole plant')"
  ],
  "preparationMethods": [
    "Method 1: How to prepare (e.g., 'Decoction: Boil leaves in water for 10 minutes')",
    "Method 2: Another preparation method",
    "Add more methods as relevant"
  ],
  "activeCompounds": [
    "List active chemical compounds found in the plant"
  ],
  "safetyNotes": [
    "Important safety warning 1",
    "Contraindication or precaution 2",
    "Add more warnings as relevant"
  ],
  "traditionalUse": "A paragraph describing the historical and traditional use of this plant in various cultures and healing systems like Ayurveda, Traditional Chinese Medicine, or folk medicine",
  "confidence": 85
}

The confidence score should be between 0-100, reflecting how certain you are about the identification:
- 90-100: Very confident, clear image of a well-known plant
- 70-89: Confident, good match with minor uncertainties
- 50-69: Moderately confident, some features match
- Below 50: Uncertain, image quality issues or rare plant

If the image does not contain a plant or is unrecognizable, respond with:
{
  "commonName": "Unable to identify",
  "scientificName": "N/A",
  "tamilName": "N/A",
  "description": "The image does not appear to contain a recognizable plant, or the image quality is insufficient for accurate identification.",
  "medicinalUses": [],
  "partsUsed": [],
  "preparationMethods": [],
  "activeCompounds": [],
  "safetyNotes": ["Please upload a clear image of a medicinal plant for identification."],
  "traditionalUse": "N/A",
  "confidence": 0
}`;

/**
 * Convert a file to base64 string
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Get the MIME type from a file
 */
function getMimeType(file: File): string {
  return file.type || 'image/jpeg';
}

/**
 * Parse Gemini response and extract JSON
 */
function parseGeminiResponse(responseText: string): PlantIdentificationResult {
  // Try to extract JSON from the response
  let jsonString = responseText.trim();
  
  // Remove markdown code blocks if present
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.slice(7);
  } else if (jsonString.startsWith('```')) {
    jsonString = jsonString.slice(3);
  }
  
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.slice(0, -3);
  }
  
  jsonString = jsonString.trim();
  
  const parsed = JSON.parse(jsonString);
  
  // Validate and transform the response
  return {
    commonName: parsed.commonName || 'Unknown Plant',
    scientificName: parsed.scientificName || 'Unknown',
    tamilName: parsed.tamilName || 'Not available',
    description: parsed.description || 'No description available.',
    medicinalUses: Array.isArray(parsed.medicinalUses) ? parsed.medicinalUses : [],
    partsUsed: Array.isArray(parsed.partsUsed) ? parsed.partsUsed : [],
    preparationMethods: Array.isArray(parsed.preparationMethods) ? parsed.preparationMethods : [],
    activeCompounds: Array.isArray(parsed.activeCompounds) ? parsed.activeCompounds : [],
    safetyNotes: Array.isArray(parsed.safetyNotes) ? parsed.safetyNotes : [],
    traditionalUse: parsed.traditionalUse || 'No traditional use information available.',
    confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
  };
}

/**
 * Identify a plant from an image using Google's Gemini API
 */
export async function identifyPlant(imageFile: File): Promise<ApiResponse<PlantIdentificationResult>> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      success: false,
      error: 'Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.',
    };
  }

  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    const mimeType = getMimeType(imageFile);

    // Prepare the request payload
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: PLANT_IDENTIFICATION_PROMPT,
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4, // Lower temperature for more consistent, factual responses
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ],
    };

    // Make the API request
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();
    
    // Extract the text content from the response
    const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      return {
        success: false,
        error: 'No response received from the AI model. Please try again.',
      };
    }

    // Parse the JSON response
    const plantData = parseGeminiResponse(textContent);
    
    return {
      success: true,
      data: plantData,
    };

  } catch (error) {
    console.error('Plant identification error:', error);
    
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: 'Failed to parse AI response. Please try again with a clearer image.',
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Validate an image file for upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Please upload a JPG, PNG, or WebP image.`,
    };
  }
  
  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_SIZE_MB}MB limit. Please upload a smaller image.`,
    };
  }
  
  return { valid: true };
}
