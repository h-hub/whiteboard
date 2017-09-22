

if(sessionStorage.getItem('username')){
		$("#login-form").remove();
		$("#welcome-message").text("Welcome "+sessionStorage.getItem('username'));
		$("#login-btn").remove();
		$("#home-btn").show();
}

function joinRoom(username){
	sessionStorage.setItem('username', username);
}

