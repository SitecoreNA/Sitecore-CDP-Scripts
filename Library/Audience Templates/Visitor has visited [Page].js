// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

(function () {
  var retval = false;
  var viewPage = '[[Page | string]]';
  
  if (guest && guest.sessions) {
    
    guest.sessions.forEach((session) => {
      if (session.sessionType === 'WEB' && session.operatingSystem !== null) {
          session.events.forEach((event) => {
              if (event.type === 'VIEW' && event.arbitraryData.page.indexOf(viewPage) !== -1){
                  retval = true;
              }
          })
      }
    });
   
    return retval;
  }
})();