# Articleoux File Guide

This document provides a guide to the files in the Articleoux project, indicating which are essential for the application's functionality and which are not.

## Essential Files (Keep These)

### Core Application Files
- `src/app/page.tsx` - Home page
- `src/app/generate/page.tsx` - Article generation page
- `src/app/about/page.tsx` - About page
- `src/app/contact/page.tsx` - Contact page
- `src/app/layout.tsx` - Root layout component

### API Routes
- `src/app/api/generate/route.ts` - API for article generation using Gemini AI
- `src/app/api/download/route.ts` - API for downloading articles as HTML

### UI Components
- `src/components/ui/Header.tsx` - Navigation header
- `src/components/ui/Footer.tsx` - Page footer

### Configuration Files
- `.env.local` - Environment variables (API keys)
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies

### Styling
- `src/app/globals.css` - Global CSS styles

### Documentation
- `README.md` - Project documentation
- `FILE_GUIDE.md` - This file guide

## Non-Essential Files (Can Be Removed)

### Test Files
- `test-gemini.js` - Test file for Gemini API (used for debugging)

### Legacy Files
- `app.py` - Original Flask application (reference only)
- `gemini_service.py` - Original Python service for Gemini API (reference only)
- `templates/` - Original Flask templates (reference only)
- `debug_app.py` - Debug version of Flask app (reference only)

### Temporary Files
- `.next/` - Next.js build directory (automatically generated)
- `node_modules/` - Node.js dependencies (automatically generated)
- `*.log` - Log files

## File Structure

The main application structure is as follows:

```
articleoux/
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── public/                   # Static assets
└── src/
    ├── app/
    │   ├── page.tsx          # Home page
    │   ├── layout.tsx        # Root layout
    │   ├── globals.css       # Global styles
    │   ├── generate/
    │   │   └── page.tsx      # Article generation page
    │   ├── about/
    │   │   └── page.tsx      # About page
    │   ├── contact/
    │   │   └── page.tsx      # Contact page
    │   └── api/
    │       ├── generate/
    │       │   └── route.ts  # Article generation API
    │       └── download/
    │           └── route.ts  # Article download API
    └── components/
        └── ui/
            ├── Header.tsx    # Navigation header
            └── Footer.tsx    # Page footer
```

## Notes on Specific Files

### `src/app/api/generate/route.ts`
This is the core file for article generation. It contains the logic for connecting to the Gemini API, generating keywords, and creating articles based on the provided title, city, and country.

### `src/app/generate/page.tsx`
This is the main user interface for article generation. It includes the form for entering the article title, city, country, and custom keywords, as well as the logic for displaying the generated article and downloading it.

### `src/app/api/download/route.ts`
This file handles the downloading of generated articles as HTML files. It creates a properly formatted HTML file with the article content and serves it for download.

### `.env.local`
This file contains the API keys for the Gemini API and Clerk authentication. Make sure to keep this file secure and never commit it to version control. 