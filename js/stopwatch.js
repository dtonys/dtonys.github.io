$(document).ready(function() {

  // declare variables
  var $count = $('.count');
  var $countCs = $('.count-cs');
  var $startStopBtn = $('.startstop-btn');
  var $resetBtn = $('.reset-btn');

  var count = 0;
  var countCentiSeconds = 0;
  var seconds = null;
  var centisecondsLastTwo = null;

  var isRunning = false;
  var intervalRef = null;


  // functions
  function stopCounter() {
    clearInterval( intervalRef );
    isRunning = false;
    $startStopBtn.html('Start');
  }

  function startCounter() {
    // start the timer
    intervalRef = setInterval(function() {
      // increment count
      countCentiSeconds = countCentiSeconds + 1;

      // extract numbers we want to display
      seconds = Math.floor( countCentiSeconds / 100 );
      centisecondsLastTwo = countCentiSeconds % 100;

      // write to DOM
      $count.html( seconds );
      $countCs.html( centisecondsLastTwo );

    }, 10);
    isRunning = true;
    $startStopBtn.html('Stop');
  }


  // setup events
  $startStopBtn.on('click', function() {
    if ( isRunning === true ) {
      stopCounter();
    }
    else {
      startCounter();
    }
  });

  $resetBtn.on('click', function() {
    // zero the timer
    countCentiSeconds = 0;

    // extract numbers we want to display
    seconds = Math.floor( countCentiSeconds / 100 );
    centisecondsLastTwo = countCentiSeconds % 100;

    // stop the timer
    stopCounter();
    // write to DOM
    $count.html( seconds );
    $countCs.html( centisecondsLastTwo );
  });

});