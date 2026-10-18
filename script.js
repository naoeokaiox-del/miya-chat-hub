const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// URL exata do seu backend no Render
const API_URL = "https://yimiya.onrender.com";

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const messageText = userInput.value.trim();
  if (!messageText) return;

  // 1. Mostrar a mensagem do usuário na tela
  appendMessage(messageText, 'user-message');
  userInput.value = '';

  // Bloquear o botão enquanto aguarda
  sendBtn.disabled = true;

  // 2. Mostrar balão temporário de "Digitando..."
  const loadingMessage = appendMessage("Miya está digitando...", 'bot-message');

  try {
    // 3. Enviar para o Render
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    });

    const data = await response.json();

    // 4. Substituir o texto de carregamento pela resposta da IA
    if (data && data.response) {
      loadingMessage.textContent = data.response;
    } else if (data && data.message) {
      loadingMessage.textContent = data.message;
    } else {
      loadingMessage.textContent = "Não consegui processar a resposta.";
    }

  } catch (error) {
    console.error("Erro na comunicação:", error);
    loadingMessage.textContent = "Erro ao conectar com a Miya. Verifique se o servidor no Render está ativo.";
  } finally {
    sendBtn.disabled = false;
    scrollToBottom();
  }
});

function appendMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', className);
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  scrollToBottom();
  return messageDiv;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}