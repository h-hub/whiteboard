	var socket = io();

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
		setTimeout(function() {
		    socket.emit('drawing', {data: lc.getSnapshot(['shapes']), username: username_g} );
		}, (200));
		
	}

	socket.on('drawing', function(data){
		lc.loadSnapshot(data);
	});

	function invite(){
		
	}
