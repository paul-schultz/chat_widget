let chatWindow = document.getElementById('chat-window');
let loadChat = document.getElementById('load-chat');
let hideChat = document.getElementById('hide-chat');

loadChat.addEventListener('click', function() {
    console.log(":)")
    chatWindow.classList.remove('hide');
    chatWindow.classList.add('show-smooth');
    loadChat.classList.remove('show');
    loadChat.classList.add('hide');
})

hideChat.addEventListener('click', function() {
    console.log(":)")
    chatWindow.classList.remove('show-smooth');
    chatWindow.classList.add('hide-smooth');
    loadChat.classList.remove('hide');
    loadChat.classList.add('show');
})