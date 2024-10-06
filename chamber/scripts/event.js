import { ge } from './utils.mjs'
const eventList = {
    "events": [
        { "event": "Pumpkin Festival", "date": "Oct. 18th", "place": "City Hall", "info": "To enjoy the Gourd!" },
        { "event": "Trunk-or-Treat", "date": "Oct. 31st", "place": "Main St. by City Hall", "info": "Spooky times!" },
        { "event": "Thanksgiving Parade", "date": "Nov. 21st", "place": "Main St.", "info": "Turkey Time!" },
        { "event": "Charity Potluck", "date": "Dec. 23rd", "place": "Community Center", "info": "Think of the Children" }
    ]
}
function buildEventCard(i) {
    const j = document.createElement('li');
    j.innerHTML = `
    <p><b>What: </b>${i.event}</p>
    <p><b>Where: </b>${i.place}</p>
    <p><b>When: </b>${i.date}</p>
    <p><b>Why: </b>${i.info}</p>`;
    return j;
}
(function () {
    const listings = ge('event-list');
    listings.innerHTML = ``;
    eventList.events.forEach(i => { listings.append(buildEventCard(i)); });
})()