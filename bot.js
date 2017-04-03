var request = require('request');

exports.askBot = function(socket, data) {
    console.log(data);
    var promise = new Promise(function(resolve, reject) {

	//Lets configure and request
	request({
	    url: 'http://localhost:2001/BOTeo/reply', //URL to hit
	    body: JSON.stringify({username: socket.username, message: data, vars: {name: socket.username}}),
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
		'Custom-Header': 'Custom Value'
	    }
	}, function(error, response, body){
	    if(error) {
		console.log(error);
	    } else {
		//console.log(response.statusCode, body);
		

		msg = JSON.parse(body).reply;
		if (msg != "Let's change the subject.") {
		    botname = "bot";
	
		    socket.emit('new message', {
			username: botname,
			message: msg
		    });
		    socket.broadcast.emit('new message', {
			username: botname,
			message: msg
		    });
		}
		resolve("Stuff worked!");
		
	    }
	});
    })
}
