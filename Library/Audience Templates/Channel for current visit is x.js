// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'
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
        return true;
      }
      return false;
    }
  })();