const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function fetchMentalHealthQuestions() {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: {
            text: "Generate 5 high-quality mental health assessment questions to evaluate emotional well-being, stress levels, social engagement, sleep quality, and cognitive state.",
          },
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    return data?.candidates?.[0]?.output?.split("\n") || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export async function analyzeMentalHealth(answers: string[]) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: {
            text: `Analyze the following mental health responses and provide insights:
              ${answers.join("\n")}
              Based on these answers, determine if the user is experiencing stress, anxiety, depression, or is in a good mental state. Suggest remedies and actions if necessary.`,
          },
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    return data?.candidates?.[0]?.output || "Unable to analyze results.";
  } catch (error) {
    console.error("Error analyzing mental health:", error);
    return "An error occurred while analyzing your responses.";
  }
}
