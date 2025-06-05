body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f2f2f2;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons button {
  margin-left: 10px;
  padding: 0.5em 1em;
  cursor: pointer;
}

#chat {
  max-width: 600px;
  margin: 30px auto;
  background: #fff;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

#chatMessages {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 1em;
  background: #fafafa;
}

.message {
  margin-bottom: 1em;
}

.message.user {
  text-align: left;
  color: #333;
}

.message.admin {
  text-align: right;
  color: #0055cc;
}

#chatInput {
  display: flex;
  gap: 10px;
}

#messageInput {
  flex-grow: 1;
  padding: 0.5em;
  font-size: 1em;
}

#chatInput button {
  padding: 0.5em 1em;
}
