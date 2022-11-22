(function () {
    const guest = loadLocalGuest(); //remove this line when porting code back to a decision model 
    print(guest.firstName + " " + guest.lastName);
})();

//this function exists in a decision model programmable and prints to it's native logs
//remove this function when porting code back to a decision model
function print(string) {
    console.log(string);
}

//remove this function when porting code back to a decision model
function loadLocalGuest() {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync('guest.json', 'utf8'));
}
