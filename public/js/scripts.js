function calculateDistance(a_lat, a_lon, b_lat, b_lon) {
  var R = 6371; // km
  return Math.acos(Math.sin(a_lat)*Math.sin(b_lat) +
                   Math.cos(a_lat)*Math.cos(b_lat) *
                   Math.cos(b_lon-a_lon)) * R;
}

function getLocation(fn){
  navigator.geolocation.getCurrentPosition(function(position){
    fn(null, position);
  }, function(err){
    fn(err);
  },{
    enableHighAccuracy: true
  });
}

/**
 * Start the throw
 * @return {void}
 */
function fly(callback){
  getLocation(function(err, startPosition){
    if(err) return callback(err);

    // --
    document.querySelector('.Loading').setAttribute('hidden', true);
    document.querySelector('.Flying').removeAttribute('hidden');
    // --

    setTimeout(function(){
      getLocation(function(err, endPosition){
        if(err) return callback(err);
        var distance = calculateDistance(
          startPosition.coords.latitude,
          startPosition.coords.longitude,
          endPosition.coords.latitude,
          endPosition.coords.longitude
        );
        callback(null, distance);
      });
    }, 5000);
  });
};

// ---------------

var startButton = document.querySelector('.js-get-location');
var agreeButton = document.querySelector('.Waiver_Agree');
var tryAgainButton = document.querySelector('.ReturnButton');

function flipper() {
  document.querySelector('.flipbox').toggle();
}

agreeButton.addEventListener('click', function(){
  startButton.removeAttribute('disabled');
});

tryAgainButton.addEventListener('click', function(){
  flipper();
  document.querySelector('.Results').setAttribute('hidden', true);
});

startButton.addEventListener('click', function(event){
  flipper();
  fly(function(err, distance){
    document.querySelector('.js-distance').innerHTML = distance;
    document.querySelector('.Flying').setAttribute('hidden', true);
    document.querySelector('.Results').removeAttribute('hidden');
  });
});

