document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatOutput = document.getElementById("chat-output");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const message = userInput.value;
        if (message.trim() === "") return;

        const userMessageElement = document.createElement("div");
        userMessageElement.textContent = "User: " + message;
        chatOutput.appendChild(userMessageElement);

        fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            const botMessageElement = document.createElement("div");
            botMessageElement.textContent = "Finlingo: " + data.message;
            chatOutput.appendChild(botMessageElement);
        })
        .catch(error => console.error("Error:", error));
        userInput.value = "";
    });
});
