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

var map;

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

// Marker information for Atlanta locations
const landmarks = [
  {
    name: 'Ponce City Market',
    lat: 33.7726, 
    long: -84.3655,
    description: "Ponce City Market breathes new life into the historic Sears, Roebuck" + 
    "& Co. building in Atlanta. The classic structure, which is the area’s largest adaptive reuse project, " +
    "has been reinvented as a vibrant community hub housing the Central Food Hall, various shops, flats and offices, " + 
    "all while pointing back to the roots of its inception. The market infuses vigor and excitement into this historically-signiﬁcant structure, " + 
    "located in one of Atlanta’s most cherished neighborhoods."
  },
  {
      name: 'Krog Street Market',
      lat: 33.7569,
      long: -84.3642,
      description: "Krog Street Market is a 9-acre mixed-use development in Atlanta, located along the BeltLine trail " + 
      "at Edgewood Avenue in Inman Park which opened in Summer 2014. The complex is centered on a 12,000-square-foot, west " + 
      "coast-style market and restaurants, and also includes up to 300 apartments."
  },
  {
      name: 'Atlantic Station',
      lat: 33.7913,
      long: -84.3987,
      description: "Atlantic Station is an upscale commercial and residential area. At its heart is the open-air Atlantic " + 
  "Station mall, with popular fashion and home decor stores. Cultural institutions include the Millennium Gate Museum, with temporary " + 
  "art exhibitions, and the Robert C. Williams Paper Museum. Near the Georgia Institute of Technology campus, old-school diners serve breakfast and burgers."
  },
  {
      name: 'Georgia Aquarium',
      lat: 33.7634,
      long: -84.3951,
      description: "Georgia Aquarium is a public aquarium in Atlanta, Georgia, United States. Georgia Aquarium is home to hundreds of species " + 
  "and thousands of animals across its seven major galleries, all of which reside in more than 10 million US gallons of fresh and salt water."
  },
];

/** Creates a map and adds it to the page. */
function createMap() {
  console.log("Creating map");

  map = new google.maps.Map(
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
   for(var i = 0; i < landmarks.length; i++) {
     var landmark = landmarks[i];
     addLandmarkMarkers(landmark, map);
  }
}

function addLandmarkMarkers(landmark, map){
    console.log("Adding marker");

    const marker = new google.maps.Marker({
            position: {lat: landmark.lat, lng: landmark.long},
            map: map,
            title: landmark.name,
            draggable: true,
            animation: google.maps.Animation.BOUNCE
        });
    const infoWindow = new google.maps.InfoWindow({content: landmark.description});
    marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Genre');
  data.addColumn('number', 'Time');
        data.addRows([
          ['Country',25],
          ['Bollywood',10],
          ['Pop',30],
          ['Rap',8],
          ['Classical',27]
        ]);

  const options = {
    'width':700,
    'height':600,
    pieHole: 0.4,
    colors: ['#E082AA','#E0BEF7', '#F7F2BE','#82E0D7', '#CDECE8']
  };

  const chart = new google.visualization.PieChart(
    document.getElementById('chart-container'));
  chart.draw(data, options);
}


