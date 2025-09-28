import { GoogleGenAI } from '@google/genai';

const { GOOGLE_API_KEY } = process.env;
if (!GOOGLE_API_KEY) { throw new Error('❌GOOGLE_API_KEY environment variable is not set.'); }

export const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
