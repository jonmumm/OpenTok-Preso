!SLIDE architecture

![architecture](../img/architecture/Slide1.jpg)

	@@@ javascript
	// Init and connect to session
	var session = TB.initSession(sessionId);
	session.connect(apiKey, token);

!SLIDE architecture

![architecture](../img/architecture/Slide2.jpg)

	@@@ javascript
	// Publish webcam stream to session
	session.publish(replacementDivId);
	
!SLIDE architecture

![architecture](../img/architecture/Slide3.jpg)

	@@@ javascript
	// Listen for stream created event
	session.addEventListener('streamCreated', 
		streamCreatedHandler);
	
!SLIDE architecture smaller

![architecture](../img/architecture/Slide4.jpg)

	@@@ javascript
	// Subscribe to all new streams
	function streamCreatedHandler(event) {
		for (var i = 0; i < event.streams.length; i++) {
			session.subscribe(event.streams[i], divId + i);
		}
	}