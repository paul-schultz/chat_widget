// HANDLE CHATBOT FUNCTIONALITY
function updateScroll() {
  var objDiv = document.getElementById("mc");
  objDiv.scrollTop = objDiv.scrollHeight;
}

// Insert user message
function userMessage() {
  let msg = document.querySelector(".message-input").value;
  if (msg.trim() == "") {
    return false;
  }

  let newDiv = document.createElement("div");
  let text = document.createTextNode(msg);
  newDiv.appendChild(text);
  newDiv.classList.add("message", "message-user");

  document.querySelector(".messages-content").appendChild(newDiv);

  fetchBotMsg();
  document.querySelector(".message-input").value = null;
  updateScroll();
}

// Trigger userMessage on submit
document.getElementById("user-input").onsubmit = (e) => {
  e.preventDefault();
  userMessage();
};


// Insert botMessage after response is received
function botMessage(says) {
  let content = document.querySelector(".messages-content");
  if (document.querySelector(".message-input").value !== "") {
    return false;
  }

  // Insert a loading element
  let loadDiv = document.createElement("div");
  let loadtext = document.createTextNode("...");
  loadDiv.appendChild(loadtext);
  loadDiv.classList.add("message", "loading");

  // create new message
  let newDiv = document.createElement("div");
  let text = document.createTextNode(says);
  newDiv.appendChild(text);
  newDiv.classList.add("message", "message-bot");

  content.appendChild(loadDiv);
  updateScroll();

  setTimeout(function () {
    content.removeChild(loadDiv);
    content.appendChild(newDiv);
  }, 100 + Math.random() * 20 * 100);
  updateScroll();
}


function fetchBotMsg() {
  var url = "http://localhost:5000/send-msg";

  const data = new URLSearchParams();
  for (const query of new FormData(document.getElementById("user-input"))) {
    data.append(query[0], query[1]);
    console.log(query);
  }

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      botMessage(response.fulfillmentMessages[0].text.text[0]);
    })
    .catch((error) => console.error("Error h:", error));
}

// HANDLE DOM RENDERING
let chatWindow = document.getElementById('chat-window');
let loadChat = document.getElementById('load-chat');
let hideChat = document.getElementById('hide-chat');
let session = 0;

loadChat.addEventListener('click', function() {
    session += 1;    
    if (session == 1) {
        botMessage("Hi!, I'm ATCQ Brewing's FAQ chatbot. What can I help you with?");
    }
    chatWindow.classList.remove('hide');
    chatWindow.classList.add('show-smooth');
    loadChat.classList.remove('show');
    loadChat.classList.add('hide');
})

hideChat.addEventListener('click', function() {
    chatWindow.classList.remove('show-smooth');
    chatWindow.classList.add('hide-smooth');
    loadChat.classList.remove('hide');
    loadChat.classList.add('show');
})
