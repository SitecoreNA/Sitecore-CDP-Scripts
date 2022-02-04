// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'
(function () {
  var currentWebSession = getCurrentWebSession(guest);
  var numOfPageViews = getNumberOfViewEventsInSession(currentWebSession,"[[page|string]]");
  var numOfTimes = "[[numberOfTimes|number]]";
  if(numOfPageViews >= numOfTimes){
      return {};
  }
  return false;
})();

function getCurrentWebSession(guest) {
    var sessions = guest.sessions;
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionType === 'WEB' && sessions[i].operatingSystem != null && sessions[i].status === 'OPEN') {
            return sessions[i];
        }
    }
    return null;
}

function getNumberOfViewEventsInSession(session, viewPage) {
    var numberOfEvents = 0;
    for (var i = 0; i < session.events.length; i++) {
        var event = session.events[i];
        if (event.type === "VIEW" &&  event.arbitraryData.page.indexOf(viewPage) !== -1) {
            numberOfEvents++;
        }
    }
    return numberOfEvents;
}