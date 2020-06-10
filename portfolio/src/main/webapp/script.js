// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random quote to the page.
 */
function addRandomQuote() {
  const quotes =
      ['Courage is not the absence of fear but rather the knowledge that something else is more important.',
      'We never purposely make mistakes; we only call them that in hindsight.',
      'Always be kinder than you feel.', 'Never assume it is a weakness having too much love to give.'];

  // Pick a random quote.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

function getComment() {
  console.log('Getting all commments.');

  fetch('/data?maxComment=' + document.getElementById('quantity').value)
    .then(response => response.json())
    .then((quotes) => {
      document.getElementById('quote-container').innerHTML = quotes;
      const quotesListElement = document.getElementById('quote-container');
      quotesListElement.innerHTML = '';
      for(var i = 0; i < quotes.length; i++) {
        quotesListElement.appendChild(createListElement(quotes[i]));
    };
  });
}

function deleteComment() {
  console.log('Deleting a comment.');

  const responsePromise = fetch(new Request('/delete-data', {method: 'POST'}));
  responsePromise.then(getComment());

}

/** Creates an <li> element containing text. */
function createListElement(task) {
  const liElement = document.createElement('li');
  liElement.innerText = task.commentString;
  return liElement;
}

/** Creates a map and adds it to the page. */
function createMap() {
  const map = new google.maps.Map(
    document.getElementById('map'),
    {center: {lat: 33.7610, lng: -84.3880}, 
    zoom: 12.5, mapTypeId: "roadmap", 
    //tilt: 45,
    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
          });
  const ponceCity = new google.maps.Marker({
    position: {lat: 33.7726, lng: -84.3655},
    map: map,
    title: 'Ponce City Market'
  });
  const krogStreet = new google.maps.Marker({
    position: {lat: 33.7569, lng: -84.3642},
    map: map,
    title: 'Krog Street Market'
  });
  const atlanticStation = new google.maps.Marker({
    position: {lat: 33.7913, lng: -84.3987},
    map: map,
    title: 'Atlantic Station'
  });
  const aquarium = new google.maps.Marker({
    position: {lat: 33.7634 , lng: -84.3951},
    map: map,
    title: 'Georgia Aquarium'
  });

}
