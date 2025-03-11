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
  `;
  
  try {
    console.log(`Generating keywords using model: ${MODEL_NAME}`);
    console.log(`Location for keywords: ${city}, ${country}`);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
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

// Function to generate an article based on the title, keywords, city and country
async function generateArticle(title: string, keywords: string, city: string = "New York", country: string = "USA") {
  const prompt = `
    Consider yourself an experienced blogger living in ${city}, ${country}. Write a 2000+ word article titled "${title}."

    Keywords:
    ${keywords}

    Structure:
    Introduction: Capture attention with a personal anecdote or engaging story related to the topic.
    Section 1: Provide a comprehensive overview of the topic, including definitions, history, and significance.
    Section 2: Discuss the latest trends and developments related to the topic, incorporating insights from recent government updates and news sources.
    Section 3: Address common FAQs about the topic, using a Q&A format with clear and concise answers.
    Section 4: Share expert tips and advice for readers based on your experience as a blogger.
    Conclusion: Summarize key takeaways and offer a call to action, inviting readers to engage further with the topic.

    Additional Notes:
    - Use a casual, conversational tone throughout the article.
    - Emphasize your experience and expertise as a blogger from ${city}, ${country}.
    - Cite credible sources and data to support your claims.
    - Write in a clear, concise, and engaging style that is easy to read and understand.
    - Include 3-5 internal links using the format <a href="#">keyword anchor text</a>
    - Format the article in proper HTML with h1, h2, h3 tags, paragraph tags, and other HTML formatting
    - Make sure the h1 tag contains the exact title of the article
    - Use proper semantic HTML structure with sections, lists, and emphasis where appropriate
    - Start the article with an h1 tag containing the title, followed by the introduction.
    - Format the article in clean, valid HTML with proper indentation and structure.
    - Include suggestions for image placements using HTML comments like <!-- Suggested image: [description] -->
  `;
  
  try {
    console.log(`Generating article using model: ${MODEL_NAME}`);
    console.log(`Location: ${city}, ${country}`);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
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
    const { title, city, country, customKeywords } = await request.json();
    
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
    
    // Generate keywords if not provided
    let keywords = customKeywords;
    if (!keywords) {
      keywords = await generateKeywords(title, locationCity, locationCountry);
      console.log(`Generated keywords: ${keywords}`);
    } else {
      console.log(`Using custom keywords: ${keywords}`);
    }
    
    // Generate article
    const article = await generateArticle(title, keywords, locationCity, locationCountry);
    console.log(`Article generation complete`);
    
    return NextResponse.json({
      title,
      keywords,
      article
    });
  } catch (error: any) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating the article' },
      { status: 500 }
    );
  }
} 