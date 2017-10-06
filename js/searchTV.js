// - Define a Lodash template
// var resultsTemplate = null;
var namesTemplate = _.template('\
  <% shows.forEach( function( show ){ %>\
    <div> Name: <%= show.name %> </div>\
    <img src="<%= show.realImage %>">\
    <div> Summary: <%= show.summary %> </div>\
  <% }); %>\
');

// - Render the results to the DOM
function renderResults( data ) {
  // render the first result item's name to the result list
  var resultsList = $('.results-list');

  // extract the shows out of the data array
  var shows = [];
  data.forEach( function( item ) {

    // handle the null image
    var image = _.get( item, 'show.image.medium', '' );
    item.show.realImage = image;
    shows.push( item.show );
  });
  var outputHTML = namesTemplate({ shows: shows });

  resultsList.html(outputHTML);
}

// - Execute a search with user input to the TVMaze API
function executeSearch( searchQuery ) {
  //   - Using jQuery AJAX to execute the web request
  $.ajax({
    method: 'GET',
    url: 'http://api.tvmaze.com/search/shows?q=' + searchQuery,
    success: function( data ) {
      // alert( JSON.stringify(data, null, 2) );
      renderResults( data );
    }
  });
}

function main() {
  // declare variables
  var $searchBtn = $('.search-btn');  
  var $searchInput = $('.search-input');  

  // setup events
  $searchBtn.on('click', function() {
    // get the value of the input
    var searchQuery = $searchInput.val();

    // pass it to the API
    executeSearch( searchQuery );

  });
}

$(document).ready( main );
