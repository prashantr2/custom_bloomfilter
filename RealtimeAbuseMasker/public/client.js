const usernameInput = document.getElementById('usernameInput');
const joinBtn = document.getElementById('joinRoom');
const usernameShow = document.getElementById('usernameShow');
const prejoinForm = document.getElementById('prejoinForm');
prejoinForm.onsubmit = (e) => e.preventDefault();

const messageInput = document.getElementById('messageInput');
const sendMsgBtn = document.getElementById('sendMsg');
const postjoinForm = document.getElementById('postjoinForm');
postjoinForm.onsubmit = (e) => e.preventDefault();
postjoinForm.style.display = 'none';

const messagesList = document.getElementById('messages');

var socket;
var username;

joinBtn.onclick = () => {
    if (usernameInput.value == '') {
        return alert('Please enter a username');
    }
    username = usernameInput.value;
    joinBtn.style.display = 'none';
    postjoinForm.style.display = 'block';
    usernameInput.style.display = 'none';
    usernameShow.innerHTML = `Joined Chat as <span style="color:blue;">${usernameInput.value}</span>`;
    socket = io(window.location.origin,{query:`loggeduser=${username}`});
    
    initaizeSocketFunctions(socket);
}

sendMsgBtn.onclick = () => {
    if (messageInput.value == '') return;
    socket.emit('msg', {
        msg: messageInput.value
    })
    messageInput.value = '';
}

function initaizeSocketFunctions(socket) {
    socket.on('newuser', (payload) => {
        msgElement = document.createElement('span');
        msgElement.innerHTML = `<span style="color:green;">${payload.msg}!</span>`
        messagesList.append(msgElement);
    })
    socket.on('msg', (payload) => {
        msgElement = document.createElement('span');
        msgElement.innerHTML = `<span style="color:${username == payload.username ? 'blue': 'black'};">${payload.username}: </span>`
        msgElement.innerHTML += payload.msg;
        messagesList.append(msgElement);
    })
}