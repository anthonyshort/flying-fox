var status = document.querySelector('.js-status');
var moving = false;
var start;
var stop;

function page(n) {
  document.body.classList.add('page-' + n);
}

function isMoving(motion) {
  return true;
}

function showSuccess(start, end) {
  document.body.classList.add('.page-success');

}

function showDistance() {

}

function distance(a_lat, a_lon, b_lat, b_lon) {
  var R = 6371; // km
  return Math.acos(Math.sin(a_lat)*Math.sin(b_lat) +
                   Math.cos(a_lat)*Math.cos(b_lat) *
                   Math.cos(b_lon-a_lon)) * R;
}

document.querySelector('.js-get-location').addEventListener('click', function(event){
  status.innerHTML = "Loading...";
  event.preventDefault();


  navigator.geolocation.getCurrentPosition(function(startPosition){

    window.addEventListener('devicemotion', function onMotion(motion){
      if( isMoving(motion) ) {
        moving = true
      }
      else if(moving === true) {
        navigator.geolocation.getCurrentPosition(function(endPosition){
          stop = endPosition;
          window.removeEventListener('devicemotion', onMotion);
          showSuccess(startPosition, endPosition);
        });
      }
    });

  }, function(err){
    status.innerHTML = err.message;
  });
});



/*

1. Press start, log location
2. Check accel for motion - devicemotion event
3. Check accel for motion stop
4. log location
5. Get distance between locations
6. ...
7. Profit!

 */