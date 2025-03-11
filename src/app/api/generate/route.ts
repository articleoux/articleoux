import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API with the API key from environment variables
const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model name directly - using one of the available models from the list
const MODEL_NAME = "models/gemini-1.5-flash"; // This is one of the available models

console.log(`Using API key: ${apiKey ? "API key is set" : "API key is missing"}`);
console.log(`Using model: ${MODEL_NAME}`);

// Function to generate keywords based on the title and location
async function generateKeywords(title: string, city: string = "New York", country: string = "USA") {
  const prompt = `
    As an SEO expert, generate a list of 10-15 relevant keywords and phrases for an article with the title: "${title}" that would be relevant for readers in ${city}, ${country}.
    
    The keywords should:
    1. Include a mix of short-tail and long-tail keywords
    2. Be relevant to the topic and location (${city}, ${country})
    3. Have search volume potential in the target location
    4. Include some question-based keywords if applicable
    5. Consider local search intent for ${city} and ${country}
    
    Format the response as a comma-separated list of keywords.
    Keep it concise and focused on the most relevant keywords only.
  `;
  
  try {
    console.log(`Generating keywords using model: ${MODEL_NAME}`);
    console.log(`Location for keywords: ${city}, ${country}`);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 512, // Reduced for faster response
    };
    
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });
    
    const response = result.response;
    const text = response.text();
    
    console.log(`Keywords generated successfully: ${text.substring(0, 100)}...`);
    return text.trim();
  } catch (error) {
    console.error('Error generating keywords:', error);
    throw new Error(`Failed to generate keywords: ${error}`);
  }
}

// Function to generate a shorter article based on the title, keywords, city and country
async function generateArticle(title: string, keywords: string, city: string = "New York", country: string = "USA") {
  const prompt = `
    Consider yourself an experienced blogger living in ${city}, ${country}. Write a concise article titled "${title}."

    Keywords:
    ${keywords}

    Structure:
    Introduction: Capture attention with a brief engaging opening related to the topic.
    Main Points: Cover 2-3 key aspects of the topic with clear explanations.
    Conclusion: Summarize key takeaways and offer a brief call to action.

    Additional Notes:
    - Use a casual, conversational tone throughout the article.
    - Emphasize your experience and expertise as a blogger from ${city}, ${country}.
    - Write in a clear, concise style that is easy to read and understand.
    - Format the article in proper HTML with h1, h2 tags, paragraph tags, and other HTML formatting
    - Make sure the h1 tag contains the exact title of the article
    - Keep the article between 500-800 words for this initial version.
  `;
  
  try {
    console.log(`Generating article using model: ${MODEL_NAME}`);
    console.log(`Location: ${city}, ${country}`);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048, // Reduced for faster response
    };
    
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });
    
    const response = result.response;
    const text = response.text();
    
    console.log(`Article generated successfully (${text.length} characters)`);
    return text.trim();
  } catch (error) {
    console.error('Error generating article:', error);
    throw new Error(`Failed to generate article: ${error}`);
  }
}

// Handle POST requests to generate an article
export async function POST(request: NextRequest) {
  try {
    // Parse the request body safely
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { title, city, country, customKeywords } = requestData;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Set default values for city and country if not provided
    const locationCity = city || "New York";
    const locationCountry = country || "USA";
    
    console.log(`Generating article for title: "${title}"`);
    console.log(`Location: ${locationCity}, ${locationCountry}`);
    console.log(`Custom keywords: ${customKeywords ? 'Provided' : 'Not provided'}`);
    
    // Check if API key is configured
    if (!apiKey) {
      console.error('Gemini API key is not configured');
      return NextResponse.json(
        { error: 'API key is not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }
    
    // Generate keywords if not provided
    let keywords = customKeywords;
    try {
      if (!keywords) {
        keywords = await generateKeywords(title, locationCity, locationCountry);
        console.log(`Generated keywords: ${keywords}`);
      } else {
        console.log(`Using custom keywords: ${keywords}`);
      }
    } catch (keywordError: any) {
      console.error('Error generating keywords:', keywordError);
      return NextResponse.json(
        { error: `Failed to generate keywords: ${keywordError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
    
    // Generate article
    try {
      const article = await generateArticle(title, keywords, locationCity, locationCountry);
      console.log(`Article generation complete`);
      
      return NextResponse.json({
        title,
        keywords,
        article
      });
    } catch (articleError: any) {
      console.error('Error generating article:', articleError);
      return NextResponse.json(
        { error: `Failed to generate article: ${articleError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating the article' },
      { status: 500 }
    );
  }
} 