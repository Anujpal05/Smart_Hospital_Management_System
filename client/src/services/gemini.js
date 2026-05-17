import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env
      .VITE_GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
   model: "gemini-2.0-flash",
  });

// ======================================================
// SYSTEM PROMPT
// ======================================================

const SYSTEM_PROMPT = `

You are an advanced AI Healthcare Assistant inside a Hospital Management System.

STRICT RULES:

1. ONLY answer healthcare, hospital, medical, fitness, medication, reports, symptoms, wellness, diet, or diagnostic related questions.

2. NEVER answer:
- coding
- programming
- politics
- movies
- hacking
- illegal activities
- unrelated general knowledge

3. If user asks unrelated questions:
Reply:
"I am a healthcare AI assistant and can only help with medical or hospital related questions."

4. Never claim to replace doctors.

5. For serious symptoms:
Always recommend immediate doctor consultation.

6. Explain medical concepts in very simple language.

7. Keep responses professional, safe, and realistic.

`;

export const askGemini = async (
  chatHistory,
  userMessage
) => {

  try {

    const prompt = `
${SYSTEM_PROMPT}

Chat History:
${chatHistory}

User:
${userMessage}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    return response.text();

  } catch (error) {

    console.error(error);

    return (
      "AI assistant is temporarily unavailable."
    );
  }
};