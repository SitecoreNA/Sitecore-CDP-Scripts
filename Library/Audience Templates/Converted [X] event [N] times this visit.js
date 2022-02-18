// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

// This code should work. - CHC

var targetEvent = "[[event|string]]";
var targetTimes = [[numberOfTimes|number]];

(function () {
    if (guest && guest.sessions) {
      var currentWebSession = null;
      
      guest.sessions.forEach((session) => {
        if (session.sessionType === 'WEB' && session.operatingSystem !== null && session.status === 'OPEN') {
            currentWebSession = session;
            return;
        }
      });
  
      if (currentWebSession) {
         print(currentWebSession);
         return countNumberOfViewEventsInSession(currentWebSession);
      }
      return false;
    }
  })();

function countNumberOfViewEventsInSession(session) {
 
    var actualTimes = 0;
    session.events.forEach(event => {
       if (event.type === targetEvent) {
           actualTimes++;
       } 
    });
    
    if (actualTimes >= targetTimes) {
        return true;
    }
    return false;
}
