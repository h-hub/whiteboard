var socket = io();

function joinRoom(username){
		socket.emit('join', {username: username});
		window.open("home");
	}