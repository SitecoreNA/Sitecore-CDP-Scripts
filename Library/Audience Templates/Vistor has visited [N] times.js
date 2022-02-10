// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

// This is confirmed to work. - CHC

(function () {
  let count = `[[N | number]]`

  if (guest.sessions && guest.sessions.length >= count) 
    return true;
  
  return false;
})();
