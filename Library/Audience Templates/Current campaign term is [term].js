// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

var utmterm = '[[UTM Term|string]]';

(function () {
    if (guest && guest.sessions) {
      var currentWebSession = null;
      
      guest.sessions.forEach((session) => {
        if (session.channel === '[[Channel|string|WEB]]' && session.operatingSystem !== null && session.status === "OPEN") {
          currentWebSession = session;
          return true;
        }
      });
  
      if (currentWebSession) {
         print(currentWebSession);
         return getUTMCampaign(currentWebSession);
      }
      return false;
    }
  })();

function getUTMCampaign(session) {
    print(session);
    
    // this should do it as the utm attributes should be on the session.
    if (session.utmAttributes && session.utmAttributes.source && session.utmAttributes.term === utmterm) {
        return true;
    }
    var retval = false;
    // We can also iterate through the view events.
    session.events.forEach(event => {
       if (event.type === 'VIEW') {
           if (event.arbitraryData && event.arbitraryData.utm_source && event.arbitraryData.utm_term === utmterm) {
           print (event.arbitraryData);
           retval = true;
           }
       } 
    });
    
    return retval;
}
