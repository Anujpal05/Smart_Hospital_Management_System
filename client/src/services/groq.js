import Groq from "groq-sdk";

// ======================================================
// GROQ CLIENT
// ======================================================

const groq = new Groq({

  apiKey:
    import.meta.env
      .VITE_GROQ_API_KEY,

  dangerouslyAllowBrowser: true,
});

// ======================================================
// SYSTEM PROMPT
// ======================================================

const SYSTEM_PROMPT = `

You are an advanced AI Healthcare Assistant inside a Hospital Management System.

STRICT RULES:

1. ONLY answer:
- healthcare
- symptoms
- medical reports
- medications
- wellness
- fitness
- hospital related questions

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

6. Explain medical concepts simply.

7. Be professional and realistic.

`;

// ======================================================
// ASK GROQ
// ======================================================

export const askGroq =
  async (
    chatHistory,
    userMessage
  ) => {

    try {

      const completion =
        await groq.chat.completions.create({

          messages: [

            {
              role: "system",
              content:
                SYSTEM_PROMPT,
            },

            {
              role: "assistant",
              content:
                chatHistory,
            },

            {
              role: "user",
              content:
                userMessage,
            },
          ],

          model:
            "llama-3.3-70b-versatile",

          temperature: 0.5,

          max_tokens: 1024,
        });

      return completion
        .choices[0]
        ?.message?.content;

    } catch (error) {

      console.error(error);

      return (
        "AI healthcare assistant is temporarily unavailable."
      );
    }
  };