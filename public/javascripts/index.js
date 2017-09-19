

function joinRoom(username){
	sessionStorage.setItem('username', username);
	window.open("http://localhost:3000/home");
}

