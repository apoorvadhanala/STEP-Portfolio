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
      {center: {lat: -34.397, lng: 150.644}, zoom: 8});
}
