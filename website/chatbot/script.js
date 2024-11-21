document.addEventListener("DOMContentLoaded", () => {
  //Important DOM elements
  const sendButton = document.querySelector(".send-button");
  const inputSpace = document.querySelector(".input-area input");
  const chatBox = document.querySelector("#chat-box");
  const newChatButton = document.querySelector("#start-new-chat");
  const previousChatsTab = document.querySelector("#previous-chats");

  // Stores chat history
  const chatHistory = {};

  // Sends message
  sendButton.addEventListener("click", () => {
    const message = inputSpace.value.trim();
    if (!message) return;

    // Create and append user's message
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    inputSpace.value = "";

    // Generates and displays a response
    chatBotResponse();
  });

  // Sends ending messages
  inputSpace.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });

  // Starts a new chat and saves the current one
  newChatButton.addEventListener("click", () => {
    const chatId = `chat-${Date.now()}`;
    chatHistory[chatId] = chatBox.innerHTML;

    // Creates a button to access previous chats
    const chatButton = document.createElement("button");
    chatButton.className = "chat-button";
    chatButton.textContent = `Chat ${Object.keys(chatHistory).length}`;
    chatButton.dataset.chatId = chatId;

    // Rename past chats
    chatButton.addEventListener("dblclick", () => enableRename(chatButton));

    // Restore chat past chats
    chatButton.addEventListener("click", () => restoreChat(chatId));
    previousChatsTab.appendChild(chatButton);

    // Clears the current chat box
    chatBox.innerHTML = "";
  });

  // Chatbot response
  function chatBotResponse() {
    setTimeout(() => {
      const botReply = document.createElement("div");
      botReply.className = "chatbot-response";
      botReply.textContent = "Please check back in the spring, for the answer to your query";
      chatBox.appendChild(botReply);

      // Ensure the latest message is visible
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }

  // Restores a previous chat
  function restoreChat(chatId) {
    const savedChat = chatHistory[chatId];
    if (savedChat) {
      chatBox.innerHTML = savedChat;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // Enable renaming a chat button
  function enableRename(button) {
    const currentName = button.textContent;
    const newName = document.createElement("input");
    newName.type = "text";
    newName.value = currentName;
    newName.className = "rename-input";

    button.replaceWith(newName);
    newName.focus();

    // Handle saving the new name
    newName.addEventListener("blur", () => saveNewname(newName, button));
    newName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveNewname(newName, button);
      }
    });
  }

  // Save the new name for a chat button
  function saveNewname(input, button) {
    const newName = input.value.trim();
    if (newName) {
      button.textContent = newName;
    }

    input.replaceWith(button);
  }
});
