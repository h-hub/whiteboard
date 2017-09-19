	var socket = io();
	var drawingRoom;
	socket.emit('join', {username: sessionStorage.getItem('username')});

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
		    socket.emit('drawing', {data: lc.getSnapshot(['shapes']), username: "drawingRoom"} );
		}, (200));
		
	}

	socket.on('drawing', function(data){
		console.log(data)
		lc.loadSnapshot(data);
	});

	socket.on('new_msg', function(data){
		if(data.invite){
			var btn = "<button onclick='accept()'>Accept</button>";
			$("#acceptBtn").append(btn);
			console.log(data);
		}
	});


	function getUserDetails(){
		document.getElementById("username").textContent = "Hi "+ sessionStorage.getItem('username');
	}

	function invite(){
		drawingRoom = sessionStorage.getItem('username').concat(document.getElementById("patner").value);
		socket.emit('joindrawing', {username :  "drawingRoom"});
		socket.emit('new_msg', {invite: true, name: document.getElementById("patner").value});
	}

	function accept(){
		drawingRoom = sessionStorage.getItem('username').concat(document.getElementById("patner").value);
		socket.emit('joindrawing', {username : "drawingRoom" });
	}