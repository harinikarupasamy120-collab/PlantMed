/**
 * Plant identification result from AI analysis
 */
export interface PlantIdentificationResult {
  /** Common name of the plant */
  commonName: string;
  /** Scientific (botanical) name */
  scientificName: string;
  /** Tamil name of the plant */
  tamilName: string;
  /** Brief description about the plant */
  description: string;
  /** Medical/medicinal uses of the plant */
  medicinalUses: string[];
  /** Parts of the plant used medicinally */
  partsUsed: string[];
  /** How to prepare the plant for medicinal use */
  preparationMethods: string[];
  /** Active compounds/principles in the plant */
  activeCompounds: string[];
  /** Safety notes and warnings */
  safetyNotes: string[];
  /** Traditional/historical use of the plant */
  traditionalUse: string;
  /** Confidence score of the identification (0-100) */
  confidence: number;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Analysis state for the UI
 */
export type AnalysisState = 'idle' | 'analyzing' | 'success' | 'error';

/**
 * File validation result
 */
export interface FileValidation {
  valid: boolean;
  error?: string;
}
