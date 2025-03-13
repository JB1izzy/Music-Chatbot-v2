document.addEventListener("DOMContentLoaded", function () {
    const responses = {
        "What is OCR Music Technology?": "OCR Music Technology is a qualification that teaches students about recording, mixing, and music production.",
        "What topics are covered?": "Topics include MIDI, audio recording, synthesis, effects, and music production techniques.",
        "How is the exam structured?": "The exam consists of coursework and a written assessment covering technical and creative skills.",
        "What software is used?": "Software such as Logic Pro, Ableton Live, and Cubase is commonly used in OCR Music Tech."
    };

    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const suggestionsBox = document.getElementById("suggestions");

    userInput.addEventListener("input", showSuggestions);
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    function showSuggestions() {
        const input = userInput.value.toLowerCase();
        suggestionsBox.innerHTML = "";

        if (input.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        let matchedSuggestions = Object.keys(responses).filter(q => q.toLowerCase().includes(input));

        if (matchedSuggestions.length > 0) {
            suggestionsBox.style.display = "block";
            matchedSuggestions.forEach(suggestion => {
                let div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.textContent = suggestion;
                div.onclick = () => {
                    userInput.value = suggestion;
                    suggestionsBox.style.display = "none";
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    }

    function sendMessage() {
        let userText = userInput.value.trim();
        if (userText === "") return;

        displayMessage(userText, "user-message");

        let botResponse = responses[userText] || "Sorry, I don't understand that question.";
        
        // Show typing dots
        let typingDots = document.createElement("div");
        typingDots.classList.add("message", "bot-message", "typing");
        typingDots.textContent = "...";
        chatBox.appendChild(typingDots);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Wait 1s, then remove dots and start typing effect
        setTimeout(() => {
            typingDots.remove();
            typeMessage(botResponse, "bot-message");
        }, 1000);

        userInput.value = "";
        suggestionsBox.style.display = "none";
    }

    function displayMessage(text, className) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function typeMessage(text, className) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        chatBox.appendChild(messageDiv);

        let index = 0;
        function type() {
            if (index < text.length) {
                messageDiv.textContent += text.charAt(index);
                index++;
                setTimeout(type, 45);
            }
        }
        type();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
