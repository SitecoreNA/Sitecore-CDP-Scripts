// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

(function () {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day = "[[Day|enum(Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday)}Sunday]]";
    
    const d = new Date();
    let today = weekdays[d.getDay()];
  
    if(day == today){
        return true;
    }
    return false;
  })();
  