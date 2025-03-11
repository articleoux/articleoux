# Setup Instructions for Articleoux

## Prerequisites

1. **Install Node.js and npm**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download and install the LTS version
   - Follow the installation wizard
   - Restart your computer after installation

## Installation Steps

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`, type `cmd` or `powershell`, and press Enter

2. **Navigate to the project directory**
   ```
   cd C:\Users\softa\OneDrive\Desktop\code-playground\articleoux
   ```

3. **Install dependencies**
   ```
   npm install
   ```
   This will install all the required packages listed in package.json.

4. **Run the development server**
   ```
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Alternative Setup (Using the Batch File)

1. After installing Node.js, simply double-click the `setup.bat` file in the project directory.
2. This will automatically install dependencies and start the development server.

## Troubleshooting

If you encounter any issues:

1. **Node.js not recognized**
   - Make sure Node.js is installed correctly
   - Restart your computer to ensure PATH variables are updated

2. **Package installation errors**
   - Try running `npm cache clean --force` and then `npm install` again

3. **TypeScript errors**
   - These should be resolved once all dependencies are installed
   - If errors persist, run `npm install --save-dev @types/react @types/react-dom @types/node`

4. **Clerk authentication issues**
   - Ensure the `.env.local` file contains the correct API keys
   - Check that the Clerk domain in the keys matches your application

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable React components
- `src/lib`: Utility functions and shared code
- `public`: Static assets

## Features

- Beautiful, responsive UI with a premium transparent blue theme
- User authentication with Clerk
- AI-powered article generation
- SEO optimization for generated articles
- Modern animations and transitions 