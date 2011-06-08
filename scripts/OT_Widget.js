var OT_Widget = function() {
	var session;
	
	var divId;
	
	var count = 0;

	//--------------------------------------
	//  OPENTOK EVENT HANDLERS
	//--------------------------------------
	var sessionConnectedHandler = function (event) {
	    // Publish my stream to the session
		publishStream();			

		// Subscribe to all streams currently in the Session
		subscribeToStreams(event.streams);
		
		OT_LayoutContainer.layout();
	}

	var streamCreatedHandler = function (event) {
		// Subscribe to the newly created streams
		subscribeToStreams(event.streams);
		
		OT_LayoutContainer.layout();
	}

	var streamDestroyedHandler = function (event) {	
		// Get all destroyed streams		
		for (var i = 0; i < event.streams.length; i++) {
			// For each stream get the subscriber to that stream
			var subscribers = session.getSubscribersForStream(event.streams[i]);
			for (var j = 0; j < subscribers.length; j++) {
				// Then remove each stream
				OT_LayoutContainer.removeStream(subscribers[j].id);
				count--;
			}
		}

		// Re-layout the container without the removed streams
		OT_LayoutContainer.layout();
	}

	/*
	If you un-comment the call to TB.addEventListener("exception", exceptionHandler) above, OpenTok calls the
	exceptionHandler() method when exception events occur. You can modify this method to further process exception events.
	If you un-comment the call to TB.setLogLevel(), above, OpenTok automatically displays exception event messages.
	*/
	var exceptionHandler = function (event) {
		alert("Exception: " + event.code + "::" + event.message);
	}

	//--------------------------------------
	//  HELPER METHODS
	//--------------------------------------
	var publishStream = function () {
		// Make up an id for our publisher
		var divId = 'opentok_publisher';

		// Pass in TRUE since this is a publisher
		OT_LayoutContainer.addStream(divId, true);

		var publisher = session.publish(divId);
	}

	var subscribeToStreams = function (streams) {
		// For each stream
		for (var i = 0; i < streams.length; i++) {
		  if (count >= 8) break;
		  		  
			// Check if this is the stream that I am publishing, and if so do not subscribe.
			if (streams[i].connection.connectionId != session.connection.connectionId) {
				// Make a unique div id for this stream
				var divId = 'stream_' + streams[i].streamId;

				// Pass in FALSE since this is a subscriber
				OT_LayoutContainer.addStream(divId, false);
				count++;	

				session.subscribe(streams[i], divId);			
			}
		}
	}

	return {
		init: function(_session, _divId, width, height) {
		  session = _session;
		  divId = _divId;

			if (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS) {
				alert("You don't have the minimum requirements to run this application."
					  + "Please upgrade to the latest version of Flash.");
			} else {

				// Add event listeners to the session
				session.addEventListener('sessionConnected', sessionConnectedHandler);
				session.addEventListener('streamCreated', streamCreatedHandler);
				session.addEventListener('streamDestroyed', streamDestroyedHandler);

				// Initialize the layout container
				OT_LayoutContainer.init(divId, width, height); 
			}	
		},
		
		cleanup: function() {

		  // Remove all child divs from the page
		  var div = document.getElementById(divId);
		  if (div.hasChildNodes()) {
		    while (div.childNodes.length >= 1) {
		      div.removeChild(div.firstChild);
		    }
		  }
		  
		  session.removeEventListener('streamDestroyed', streamDestroyedHandler);
		  session.disconnect();
		}
	};
}();
