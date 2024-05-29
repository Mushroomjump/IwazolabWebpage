const express = require('express');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');

const app = express();
const port = process.env.PORT || 3000;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ],
            model: "llama3-8b-8192"
        });
        const botMessage = chatCompletion.choices[0]?.message?.content || "No response";
        res.json({ message: botMessage });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
