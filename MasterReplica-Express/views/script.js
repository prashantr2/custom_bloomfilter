document.getElementById("msgForm").addEventListener("submit", (e) => {
    sendMsg(e); 
});

function sendMsg(e) {
    e.preventDefault();
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            msg: document.getElementById('msgInput').value,
            executeOn: document.getElementById('executeOn').value,
        })
    })
}
