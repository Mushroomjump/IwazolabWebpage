const Groq = require("groq-sdk");

const groq = new Groq((api_key = process.env.GROQ_API_KEY));

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "Explain the importance of low latency LLMs",
        },
      ],
      model: "llama3-70b-8192",
    })
    .then((chatCompletion) => {
      process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();

