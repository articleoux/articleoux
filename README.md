# Articleoux - AI-Powered SEO Article Generator

Articleoux is a modern SaaS application that generates high-quality, SEO-optimized articles based on user-provided titles. Built with Next.js, Tailwind CSS, and Clerk for authentication, it leverages the power of Google's Gemini AI to create engaging content.

![Articleoux Screenshot](public/screenshot.png)

## Features

- **AI-Powered Article Generation**: Create comprehensive, SEO-optimized articles with just a title
- **Location-Based Content**: Personalize articles with city and country information
- **Custom Keywords**: Use auto-generated keywords or provide your own
- **Structured Content**: Articles follow a professional blogger format with introduction, sections, FAQs, and conclusion
- **HTML Download**: Download articles as HTML files for easy publishing
- **User Authentication**: Secure access with Clerk authentication
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Animations**: Smooth transitions and loading states

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Authentication**: Clerk
- **AI**: Google Gemini API (via @google/generative-ai)
- **Styling**: Tailwind CSS with custom animations

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/articleoux.git
cd articleoux
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
# Google Generative AI API Key
GOOGLE_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Sign In/Sign Up**: Use Clerk authentication to create an account or sign in
2. **Navigate to Generate**: Go to the "Generate Article" page
3. **Enter Article Details**:
   - Title (required)
   - City (optional)
   - Country (optional)
   - Custom Keywords (optional)
4. **Generate Article**: Click the "Generate Article" button
5. **Review and Download**: Review the generated article and download it as an HTML file

## Project Structure

- `src/app`: Next.js app router pages
  - `src/app/page.tsx`: Home page
  - `src/app/generate/page.tsx`: Article generation page
  - `src/app/api/generate/route.ts`: API route for article generation
  - `src/app/api/download/route.ts`: API route for article download
- `src/components`: Reusable React components
  - `src/components/ui/Header.tsx`: Navigation header
  - `src/components/ui/Footer.tsx`: Page footer
- `public`: Static assets

## Key Files

### Core Functionality
- `src/app/generate/page.tsx`: The main article generation interface
- `src/app/api/generate/route.ts`: Backend API for article generation using Gemini AI
- `src/app/api/download/route.ts`: Backend API for downloading articles as HTML

### UI Components
- `src/components/ui/Header.tsx`: Navigation and authentication
- `src/components/ui/Footer.tsx`: Footer with links and information

### Configuration
- `.env.local`: Environment variables (API keys)
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration

## Customization

### Changing the Article Format

To modify the article generation format, edit the prompt in `src/app/api/generate/route.ts`:

```typescript
// Function to generate an article based on the title, keywords, city and country
async function generateArticle(title: string, keywords: string, city: string = "New York", country: string = "USA") {
  const prompt = `
    Consider yourself an experienced blogger living in ${city}, ${country}. Write a 2000+ word article titled "${title}."
    
    // ... modify the structure and requirements here
  `;
  
  // ... rest of the function
}
```

### Styling

The application uses Tailwind CSS for styling. You can customize the look and feel by modifying:

- `src/app/globals.css`: Global CSS styles
- `tailwind.config.js`: Tailwind configuration including colors and themes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.dev/)
- [Google Gemini AI](https://ai.google.dev/)
- [Framer Motion](https://www.framer.com/motion/)