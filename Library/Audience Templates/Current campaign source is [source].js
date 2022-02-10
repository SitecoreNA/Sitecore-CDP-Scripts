// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

(function () {
    var currentWebSession = getCurrentWebSession(guest);
    if (currentWebSession) {
      return getUTMCampaign(currentWebSession);
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
  
  function getUTMCampaign(session) {
      if (session.utmAttributes && session.utmAttributes.source && session.utmAttributes.source== "[[UTM Source|string]]") {
          return true;
      }
      
      return false;
  }
  
  