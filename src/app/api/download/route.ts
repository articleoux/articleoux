import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Create a temporary directory for storing downloaded files
const DOWNLOAD_DIR = path.join(os.tmpdir(), 'articleoux-downloads');

// Ensure the download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Handle POST requests to create and save the article as an HTML file
export async function POST(request: NextRequest) {
  try {
    const { title, article } = await request.json();
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article content is required' },
        { status: 400 }
      );
    }
    
    // Generate a unique filename based on the title and timestamp
    const timestamp = Date.now();
    const safeTitle = title ? title.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'article';
    const filename = `${safeTitle}_${timestamp}.html`;
    const filePath = path.join(DOWNLOAD_DIR, filename);
    
    // Create HTML content with basic styling - matching the format from app.py
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'Generated Article'}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        h2 { color: #444; margin-top: 30px; }
        h3 { color: #555; }
        p { margin-bottom: 15px; }
        ul, ol { margin-bottom: 15px; }
    </style>
</head>
<body>
    ${article}
</body>
</html>
    `;
    
    // Write the HTML content to the file
    fs.writeFileSync(filePath, htmlContent);
    
    console.log(`File saved at: ${filePath}`);
    
    return NextResponse.json({
      success: true,
      filename,
      filePath
    });
  } catch (error: any) {
    console.error('Error in download API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while creating the download file' },
      { status: 500 }
    );
  }
}

// Handle GET requests to retrieve the downloaded file
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DOWNLOAD_DIR, filename);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Read the file content
    const fileContent = fs.readFileSync(filePath);
    
    // Return the file content with appropriate headers
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error('Error serving download file:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while serving the download file' },
      { status: 500 }
    );
  }
} 