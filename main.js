// Map initialization
const map = L.map('map', {
    center: [52.516278, 13.377683],
    zoom: 4
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZG9taW5pY3J1dGtvd3NraSIsImEiOiJjam83dzNkY2EwMnY3M3FwMGE3b281MjNvIn0.6gd3c6kSnu3bd8gaQdck-Q'
}).addTo(map);

// Marker initialization
for (let eventName in events) {
    let event = events[eventName];
    event.marker = L.marker([event.latitude, event.longitude]).addTo(map);
    event.marker.addEventListener('click', () => {
        // Parse event title
        let date = ' (' + (event.endYear - event.startYear === 0 ? event.endYear : event.startYear + '-' + event.endYear) + ')';
        document.getElementById('event-name').innerHTML = event.name + date;
        // Parse event description
        let eventDescription = '';
        for (let element of event.description) {
            if (element.type === 'p') {
                eventDescription += `<p>${element.text}</p>`;
            } else if (element.type === 'img') {
                eventDescription += `<figure><img src="${element.image}" alt="The image failed to load."><figcaption>${element.caption}</figcaption></figure>`;
            }
        }
        document.getElementById('event-description').innerHTML = eventDescription;
    });
}
