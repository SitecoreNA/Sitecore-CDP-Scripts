function getMostRecentWebSession(guest) {
    var sessions = guest.sessions;
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionType === 'WEB' && sessions[i].operatingSystem != null) {
            return sessions[i];
        }
    }
    return null;
}


function getCurrentWebSession(guest) {
    var sessions = guest.sessions;
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionType === 'WEB' && sessions[i].operatingSystem != null && sessions[i].status === 'OPEN') {
            return sessions[i];
        }
    }
    return null;
}


function getDataExtensionWithName(guest, extensionName) {
    var toReturn = null;
    guest.dataExtensions.forEach(function (dataExtension) {
        if (dataExtension.name === extensionName) {
            toReturn = dataExtension;
        }
    });
    return toReturn;
}

function getDataExtensionValue(dataExtension, dataExtensionKey) {
    if (dataExtension != null) {
        return dataExtension.values[dataExtensionKey];
    }
    return null;
}


function getDataExtensionValue(guest, dataExtensionName, dataExtensionKey) {
    var dataExtension = getDataExtensionWithName(guest, dataExtensionName,);
    if (dataExtension != null) {
        return dataExtension.values[dataExtensionKey];
    }
    return null;
}

function getMapFromDataExtension(dataExtension) {
    return dataExtension.values;
}


function getFirstEventOfType(session, eventType) {
    var events = session.events;
    for (var i = 0; i < events.length; i++) {
        if (events[i].type === eventType) {
            return events[i];
        }
    }
    return null;
}

function sessionContainsEventOfType(session, eventType) {
    var events = session.events;
    for (var i = 0; i < events.length; i++) {
        if (events[i].type === eventType) {
            return true;
        }
    }
    return false;
}

function getNumberOfEventsInSession(session, eventType) {
    var numberOfEvents = 0;
    for (var i = 0; i < session.events.length; i++) {
        var event = session.events[i];
        if (event.type === eventType) {
            numberOfEvents++;
        }
    }
    return numberOfEvents;
}


//TODO
function getTotalNumberOfEvents(guest) {
    return 0;
}


// for a Guest
// get all the events of type 'eventType'
// across all sessions + devices etc.
function getAllEventsOfType(guest, eventType) {
    return [];
}

function getAllEventsOfType(session, eventType) {
    var eventsOfType = [];
    for (var i = 0; i < session.events.length; i++) {
        var event = session.events[i];
        if (event.type === eventType) {
            eventsOfType.push(event);
        }
    }
    return eventsOfType;
}


function getMostRecentAbandonedSession(guest) {
    var sessions = guest.sessions;
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionType === 'WEB' && sessions[i].operatingSystem != null && sessions[i].cartType === "ABANDONED") {
            return sessions[i];
        }
    }
}