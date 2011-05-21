require(["TB.min", "OT_LayoutContainer"], function() {
    require.ready(function() {      
      ( 
        // Bind toggling the display of widget to 'o' key
        $(document).keydown(function(e) {
          if (e.keyCode == 79) {
            // if ($(".opentok_widget"))
          }
        })
               
        function() {
        // Presentation binds for custom animation
        $(".opentok_widget").bind("showoff:show", function(event) {
          initOpenTok();
        })

        $(".opentok_widget").bind("showoff:next", function(event) {
          removeOpenTok();
        })

        // OpenTok stuff
        function initOpenTok() {
          var div = document.createElement('div');
          div.setAttribute('id', 'opentok');
          div.style.position = 'absolute';
          div.style.left = '0px';
          div.style.top = '0px';
          div.style.zIndex = 100;
          div.style.width = '1024px';
          div.style.height = '768px';
          div.style.margin = '0px auto';

          var container = document.createElement('div');
          var containerDivId = 'streamContainer';
          container.setAttribute('id', containerDivId);

          div.appendChild(container);

          var preso = document.getElementById('preso');
          preso.appendChild(div);

        	var apiKey = 413302; // OpenTok sample API key. Replace with your own API key.
        	var sessionId = '28757622dbf26a5a7599c2d21323765662f1d436'; // Replace with your session ID.
        	var token = 'devtoken'; // Should not be hard-coded.

        	session = TB.initSession(sessionId);

          require(["OT_Widget"], function() {
            require.ready(function() {
              console.log('Widget loaded');

        			// This class does all the video publishing and subscribing for us
        			OT_Widget.init(session, containerDivId, 1024, 768);

              session.addEventListener('sessionConnected', sessionConnectedHandler);

        			session.connect(apiKey, token);   

        			function sessionConnectedHandler(event) {
        			  console.log('Session connected');
        			  session.signal();
        			}         
            })
          })
        }

        function removeOpenTok() {
          OT_Widget.cleanup();

          var preso = document.getElementById('preso');
          var div = document.getElementById('opentok');

          preso.removeChild(div);
        }
			})();
    });
});

