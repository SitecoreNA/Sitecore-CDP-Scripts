(function () {
    var currentWebSession = getCurrentWebSession(guest);
    if (currentWebSession) {
        var numOfPageViews = getNumberOfViewEventsInSession(currentWebSession);
        var numOfTimes = "[[X | number]]";
        if(numOfPageViews >= numOfTimes){
            return {};
        }
    }
    return false;
  })();
  
  function getCurrentWebSession(guest) {
      var sessions = guest.sessions;
      for (var i = 0; i < sessions.length; i++) {
          if (sessions[i].sessionType === 'WEB' && sessions[i].operatingSystem !== null && sessions[i].status === 'OPEN') {
              return sessions[i];
          }
      }
      return null;
  }
  
  function getNumberOfViewEventsInSession(session) {
      var numberOfEvents = 0;
      for (var i = 0; i < session.events.length; i++) {
          var event = session.events[i];
          if (event.type === "VIEW") {
              numberOfEvents++;
          }
      }
      return numberOfEvents;
  }