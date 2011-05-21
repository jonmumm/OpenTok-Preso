!SLIDE larger

## It's simple ##

!SLIDE small

	@@@ javascript
	// Get an OpenTok session
	var session;
	session = TB.initSession(sessionId);
	
	
	// Set up event handler
	session.addEventListener('sessionConnected', 
		sessionConnectedHandler);
	
	
	// Connect to session	
	session.connect(apiKey, token);
	
	
	function sessionConnectedHandler(event) {
		// Publish video stream
		session.publish(myDivId);
	}