import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const personalities = [
  "Minimalist - Focus on clean, simple design with plenty of white space and subtle animations",
  "Bold - Use vibrant colors, large typography, and dramatic effects",
  "Professional - Clean corporate style with neutral colors and structured layouts",
  "Playful - Fun, colorful design with whimsical elements and bouncy animations",
  "Futuristic - Sleek, modern design with neon accents and high-tech aesthetics"
];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
    }

    const client = new OpenAI({
      apiKey: groqApiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    // Create prompts for all personalities
    const prompts = personalities.map(personality => `Create a well-structured, modern web application:

Instructions:
1. Base functionality: ${prompt}
2. Design personality: ${personality}

Technical Requirements:
- Create a single HTML file with clean, indented code structure
- Organize the code in this order:
  1. <!DOCTYPE html> and meta tags
  2. <title> and other head elements
  3. Framework CSS and JS imports
  4. Custom CSS styles in a <style> tag
  5. HTML body with semantic markup
  6. JavaScript in a <script> tag at the end of body
- Use proper HTML5 semantic elements
- Include clear spacing between sections
- Add descriptive comments for each major component
- Ensure responsive design with mobile-first approach
- Use modern ES6+ JavaScript features
- Keep the code modular and well-organized
- Ensure all interactive elements have proper styling states (hover, active, etc.)
- Implement the framework-specific best practices and components

Additional Notes:
- The code must be complete and immediately runnable
- All custom CSS and JavaScript should be included inline
- Code must work properly when rendered in an iframe
- Focus on clean, maintainable code structure
- Return ONLY the HTML file content without any explanations

Format the code with proper indentation and spacing for readability.`;

    // Create all LLM calls in parallel
    const responses = await Promise.all(
      prompts.map(prompt => 
        client.chat.completions.create({
          model: 'llama-3.2-1b-preview',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 4096,
        })
      )
    );

    // Extract codes from all responses
    const codes = responses.map(response => response.choices[0].message.content);

    return NextResponse.json({ codes });
  } 
  catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    );
  }
}
