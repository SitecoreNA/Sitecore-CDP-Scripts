// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'
// Thanks to Haddad

(function () {
    let page = `[[Page | string]]`;
  
    if (guest && guest.sessions) {
      for (let s = 0; s < guest.sessions.length; s++) {
        for (let ev = 0; ev < guest.sessions[s].events.length; ev++) {
          
          if (guest.sessions[s].events[ev].type === "VIEW" && guest.sessions[s].events[ev].arbitraryData.page.indexOf(viewPage) !== -1) {
            return true;
          }
        }
      }
    }
  
    return false;
  })();
  