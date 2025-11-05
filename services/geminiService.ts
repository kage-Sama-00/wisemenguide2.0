import { GoogleGenAI, Type } from '@google/genai';
import { Answers, CareerResults } from '../types';
import { testQuestions } from '../constants/questions';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume it's set.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
  // A placeholder to avoid crashing, but API calls will fail.
  process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function formatAnswersForPrompt(answers: Answers): string {
  return testQuestions.map(q => {
    const answerValue = answers[q.id];
    const answerLabel = q.options.find(opt => opt.value === answerValue)?.label;
    return `Question: "${q.text}"\nAnswer: "${answerLabel}"`;
  }).join('\n\n');
}

export async function getCareerGuidance(answers: Answers): Promise<CareerResults> {
  const formattedAnswers = formatAnswersForPrompt(answers);
  const prompt = `
    Based on the following psychometric test answers, act as an expert career counselor.
    Analyze the user's personality, strengths, and preferences to provide a comprehensive career guide.
    The output must be a JSON object matching the provided schema.

    User's Answers:
    ${formattedAnswers}

    Generate a detailed and insightful career guide. The personality type should be a concise, descriptive label (e.g., "The Analytical Problem-Solver", "The Creative Innovator"). The roadmap should provide actionable steps. The job openings must be realistic and located in India, sourced from major job platforms popular in India like LinkedIn, Naukri, or Instahyre.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      personalityType: {
        type: Type.STRING,
        description: 'A concise and descriptive personality type based on the answers.'
      },
      recommendedDomains: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'An array of 3-4 recommended career fields or industries.'
      },
      topJobTitles: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'An array of the top 5 specific job titles suitable for the user.'
      },
      roadmap: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A step-by-step roadmap with 4-5 actionable steps for the user to start their career path.'
      },
      jobOpenings: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            company: { type: Type.STRING },
            location: { type: Type.STRING },
            url: { type: Type.STRING, description: 'A valid URL to a job posting on a platform popular in India like LinkedIn, Naukri, or Instahyre.' }
          },
          required: ['title', 'company', 'location', 'url']
        },
        description: 'An array of 3 realistic, current job openings located in India.'
      }
    },
    required: ['personalityType', 'recommendedDomains', 'topJobTitles', 'roadmap', 'jobOpenings']
  };


  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as CareerResults;
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
