	var socket = io();
	var drawingRoom;

	socket.emit('join', {username: sessionStorage.getItem('username')});
	if(sessionStorage.getItem('drawingRoom')){
		socket.emit('joindrawing', { username :  sessionStorage.getItem('drawingRoom') });
		$("#accept_btn").remove();
	}



    var lc = LC.init(
      	document.getElementsByClassName('my-drawing')[0],
		{imageURLPrefix: '/literallycanvas-0.4.14/img', onInit: onInitLc});
    var drawing = false;

    function onInitLc(lc){
	    console.log("initialized with", lc.canvas);
		lc.canvas.addEventListener('mouseup', onMouseUp, false);
    }

    // limit the number of events per second
	function throttle(callback, delay) {
		var previousCall = new Date().getTime();
		return function() {
			var time = new Date().getTime();

			if ((time - previousCall) >= delay) {
				previousCall = time;
				callback.apply(null, arguments);
			}
		};
	}

	function onMouseUp(e){
		drawingRoom = sessionStorage.getItem('username').concat(document.getElementById("patner").value);
		setTimeout(function() {
		    socket.emit('drawing', {data: lc.getSnapshot(['shapes']), username: sessionStorage.getItem('drawingRoom') } );
		}, (200));
		
	}

	socket.on('drawing', function(data){
		console.log(data)
		lc.loadSnapshot(data);
	});

	socket.on('new_msg', function(data){
		if(data.invite){
			var btn = "<button is='accept_btn' onclick='accept()'>Accept</button>";
			$("#acceptBtn").append(btn);
			console.log(data);
		}
		sessionStorage.setItem('drawingRoom', data.room);
	});


	function getUserDetails(){
		document.getElementById("username").textContent = "Hi "+ sessionStorage.getItem('username');
	}

	function invite(){
		drawingRoom = sessionStorage.getItem('username').concat(document.getElementById("patner").value);
		sessionStorage.setItem('partnerName', document.getElementById("patner").value);
		sessionStorage.setItem('drawingRoom', drawingRoom);

		socket.emit('joindrawing', { username :  drawingRoom });
		socket.emit('new_msg', {invite: true, name: sessionStorage.getItem('partnerName'), room: drawingRoom });
	}

	function accept(){
		socket.emit('joindrawing', {username : sessionStorage.getItem('drawingRoom') });
	}