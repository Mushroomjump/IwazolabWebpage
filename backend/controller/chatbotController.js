const { main } = require("./groqChat");

async function handleChatRequest(req, res) {
  const message = req.body.message;
  try {
    const response = await main(message);
    res.json({ message: response });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { handleChatRequest };
