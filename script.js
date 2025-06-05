const ADMIN_PASSWORD = "1234";
let isAdmin = false;
let currentEditProduct = "";
let chatMessages = [];

function openRegisterModal() {
  showModal("registerModal");
}

function openAdminModal() {
  showModal("adminModal");
}

function checkAdminPassword() {
  const password = document.getElementById("adminPassword").value;
  if (password === ADMIN_PASSWORD) {
    isAdmin = true;
    document.getElementById("adminPanel").classList.remove("hidden");
    document.querySelectorAll(".edit-btn").forEach(btn => btn.style.display = "inline-block");
    closeModals();
    updateAdminChat();
  } else {
    alert("Неверный пароль");
  }
}

function openProductModal(productId) {
  const card = document.getElementById("product-" + productId);
  document.getElementById("productModalTitle").textContent = card.querySelector(".product-title").textContent;
  document.getElementById("productModalDesc").textContent = card.querySelector(".product-description").textContent;
  document.getElementById("productModalPrice").textContent = card.querySelector(".product-price").textContent;
  showModal("productModal");
}

function editProduct(productId) {
  if (!isAdmin) return;

  currentEditProduct = productId;
  const card = document.getElementById("product-" + productId);
  document.getElementById("editTitle").value = card.querySelector(".product-title").textContent;
  document.getElementById("editDesc").value = card.querySelector(".product-description").textContent;
  document.getElementById("editPrice").value = card.querySelector(".product-price").textContent.replace("Цена: ", "").replace(" сомон", "");
  showModal("editModal");
}

function saveEdit() {
  const card = document.getElementById("product-" + currentEditProduct);
  card.querySelector(".product-title").textContent = document.getElementById("editTitle").value;
  card.querySelector(".product-description").textContent = document.getElementById("editDesc").value;
  card.querySelector(".product-price").textContent = "Цена: " + document.getElementById("editPrice").value + " сомон";
  closeModals();
}

function sendMessage() {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (message !== "") {
    chatMessages.push({ sender: "user", text: message });
    input.value = "";
    updateChat();
    if (isAdmin) updateAdminChat();
  }
}

function updateChat() {
  const box = document.getElementById("chatBox");
  box.innerHTML = "";
  chatMessages.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg.sender === "admin" ? "👨‍💼 " + msg.text : "🧑 " + msg.text;
    box.appendChild(p);
  });
}

function updateAdminChat() {
  const box = document.getElementById("adminChatBox");
  box.innerHTML = "";
  chatMessages.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg.sender === "user" ? "🧑 " + msg.text : "👨‍💼 " + msg.text;
    box.appendChild(p);
  });

  // Админ может ответить
  const replyInput = document.createElement("input");
  replyInput.placeholder = "Ответить пользователю...";
  const replyBtn = document.createElement("button");
  replyBtn.textContent = "Отправить";
  replyBtn.onclick = () => {
    if (replyInput.value.trim() !== "") {
      chatMessages.push({ sender: "admin", text: replyInput.value.trim() });
      replyInput.value = "";
      updateAdminChat();
      updateChat();
    }
  };
  box.appendChild(replyInput);
  box.appendChild(replyBtn);
}

function showModal(id) {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById(id).style.display = "block";
}

function closeModals() {
  document.getElementById("modalOverlay").style.display = "none";
  document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}
