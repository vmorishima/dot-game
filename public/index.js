$( document ).ready(function() {
  var score = 0;
  var speed = 10000;
  var gameActive = false;
  var interval;
  var colors = ['#071E22', '#1D7874', '#679289', '#EE2E31'];
  
  $( "#startbutton" ).click(function() {
    if (!gameActive) {
      // if game is not active, activate it
      gameActive = true;
      $( this ).text("PAUSE");
      interval = setInterval(function() {
        createCircle();
      }, 400);
    } else {
      // if game is active, deactivate it
      gameActive = false;
      $( this ).text("START");
      clearInterval(interval);
      $( '.circle' ).remove();
    }
  });
  
  var updateScore = function(points) {
    score += points;
    $( ".score-text" ).text(score);
  }
  
  var calcPoints = function(size) {
    return Math.ceil(100/size);
  }
  
  var changeSpeed = function() {
    speed = 10000 / speedSlider.getValue();
    
    $( '.circle' ).stop()
      .animate({
      bottom: '0px'
    }, speed, 'linear', function() {
      $( this ).remove();
    });
  }
  
  var speedSlider = $("input.slider").slider()
    .on('slideStop', changeSpeed)
    .data('slider');

  var createCircle = function() {
    var width = $( ".game-box" ).innerWidth();
    var size = Math.floor(Math.random() * 90) + 10;
    var pos = Math.floor(Math.random() * (width - size));
    var color = colors[Math.floor(Math.random() * colors.length)];
    var elem = $("<div></div>").css({
      "background-color": color,
      "height": size,
      "width": size,
      "left": pos
    }).addClass("circle")
    .click(function() {
      var points = calcPoints(size);
      updateScore(points);
      $( this ).remove();
    }).appendTo(".game-box")
    .show().animate({
      bottom: '0px'
    }, speed, 'linear', function() {
      $( this ).remove()
  });
   };
 })