// backend/groqChat.js

"use strict";
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function main(message) {
    const chatCompletion = await getGroqChatCompletion(message);
    return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(message) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message
            }
        ],
        model: "llama3-8b-8192"
    });
}

module.exports = {
    main
};
