// Конфиг Firebase — замени на свой из консоли Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxp5XkvT0h9_vGv8jqxzUUyWay0Do7Nm0",
  authDomain: "mstorechat-279a6.firebaseapp.com",
  databaseURL: "https://mstorechat-279a6-default-rtdb.firebaseio.com",
  projectId: "mstorechat-279a6",
  storageBucket: "mstorechat-279a6.appspot.com",
  messagingSenderId: "914998119302",
  appId: "1:914998119302:web:e0369f5e43efa3c8c8ba07",
  measurementId: "G-ZN1BGV7QY0"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let role = ""; // 'user' или 'admin'

// Элементы DOM
const btnUser = document.getElementById("btnUser");
const btnAdmin = document.getElementById("btnAdmin");
const chatArea = document.getElementById("chatArea");
const chatMessages = document.getElementById("chatMessages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

// Выбор роли пользователя
btnUser.onclick = () => startChat("user");
btnAdmin.onclick = () => startChat("admin");

function startChat(selectedRole) {
  role = selectedRole;
  btnUser.style.display = "none";
  btnAdmin.style.display = "none";
  chatArea.classList.remove("hidden");
  loadMessages();
}

// Загрузка и отображение сообщений из Firebase
function loadMessages() {
  const messagesRef = db.ref("messages");

  messagesRef.off(); // отключаем старые слушатели если есть

  messagesRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    displayMessage(msg);
  });

  // Автоскролл вниз
  messagesRef.on("value", () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

// Вывод сообщения в чат
function displayMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(msg.sender === "admin" ? "admin" : "user");
  div.textContent = msg.text;
  chatMessages.appendChild(div);
}

// Отправка сообщения
messageForm.onsubmit = (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  const newMsg = {
    sender: role,
    text,
    timestamp: Date.now()
  };

  db.ref("messages").push(newMsg)
    .then(() => {
      messageInput.value = "";
    })
    .catch(err => {
      alert("Ошибка при отправке: " + err.message);
    });
};
