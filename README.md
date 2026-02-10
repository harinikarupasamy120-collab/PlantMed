# PlantMed - AI-Powered Medicinal Plant Identification

A modern web application that identifies medicinal plants using AI and provides comprehensive information about their medicinal properties, traditional uses, and safety guidelines.

## Features

- **AI-Powered Plant Identification**: Upload an image of any plant and get instant identification powered by Google's Gemini AI
- **Comprehensive Information**: Get detailed medicinal information including:
  - Common and scientific names
  - Tamil names
  - Medicinal uses
  - Parts used
  - Preparation methods
  - Active compounds
  - Safety notes and precautions
  - Traditional uses
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI Integration**: Google Gemini API
- **State Management**: React Query

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd herbal-sight-finder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to the `.env` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Click "Start Identifying" or scroll to the upload section
2. Upload a clear photo of a medicinal plant
3. Click "Identify This Plant" to analyze
4. View detailed information about the identified plant

## Project Structure

```
src/
├── components/      # React components
│   ├── ui/         # shadcn/ui components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ImageUploader.tsx
│   ├── PlantResult.tsx
│   ├── PlantGallery.tsx
│   ├── HowItWorks.tsx
│   └── Footer.tsx
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── services/       # API services
│   └── geminiApi.ts
├── types/          # TypeScript type definitions
│   └── plant.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for plant identification |

## Disclaimer

This application is for educational purposes only. Always consult a qualified healthcare professional before using any plant for medicinal purposes.

## License

MIT License
