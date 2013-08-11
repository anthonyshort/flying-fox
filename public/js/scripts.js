var startButton = document.querySelector('.js-get-location');
var logEl = document.querySelector('.log');

function calculateDistance(a_lat, a_lon, b_lat, b_lon) {
  var R = 6371; // km
  return Math.acos(Math.sin(a_lat)*Math.sin(b_lat) +
                   Math.cos(a_lat)*Math.cos(b_lat) *
                   Math.cos(b_lon-a_lon)) * R;
}

function log(msg) {
  logEl.innerHTML = logEl.innerHTML + "\n" + msg;
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

startButton.addEventListener('click', function(event){
  // show page 2
  fly(function(err, distance){
    if(err) log(err.message);
    log(distance);
  });
});

/**
 * Start the throw
 * @return {void}
 */
function fly(callback){
  log("Flying!");
  getLocation(function(err, startPosition){
    if(err) return callback(err);
    log('Got starting  position');
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