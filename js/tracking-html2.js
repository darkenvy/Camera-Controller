var tracker;
var rawPoly = [[0,0], [1,0], [1,1], [0,1]];
var currTilt = 0;
var currHorizontal = 0;
// 64 - 320
// $('#camToggle').click(function(){
//   $('#video').toggleClass('display', 'none');
// })

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  tracking.ColorTracker.registerColor('green', function(r,g,b) {
    if (r < 190 && 
        g > 60 && g < 190 &&
        g/b > 1.5 &&
        g > r && g > b) {
      return true;
    }
    return false;
  })
  tracker = new tracking.ColorTracker(['green']);
  tracker['minDimension'] = 5;
  tracker['minGroupSize'] = 100;
  // tracker['maxDimension'] = 25;
  // tracker['customColor'] = "#000000";
  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {rect.color = tracker.customColor;}
      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });

    var setModel = function(leftEye, rightEye) {
      // -------- Tilt Calculation -------- //
      var leftArea = leftEye.width * leftEye.height,
          rightArea = rightEye.width * rightEye.height;
      
      var tilt = rightArea / leftArea;
      tilt = tilt > 1 ? leftArea / rightArea : tilt;
      tilt = 1 - tilt;
      var lr = rightArea / leftArea > 1 ? true : false;
      
      var transformTilt = lr ? (tilt * 90) : 0-(tilt * 90);
      transformTilt = transformTilt.toFixed(1);

      var tiltSpeed = parseInt(Math.abs(currTilt - transformTilt) / 5);
      if (Math.abs(currTilt - transformTilt) > 3 && currTilt < transformTilt) currTilt += tiltSpeed;
      if (Math.abs(currTilt - transformTilt) > 3 && currTilt > transformTilt) currTilt -= tiltSpeed;

      // -------- Horizontal Calculation -------- //

      var eyeCenter = (leftEye.x + rightEye.x) / 2;

      var horizontalSpeed = parseInt(Math.abs(currHorizontal - eyeCenter) / 2.5);
      if (Math.abs(currHorizontal - eyeCenter) > 2 && currHorizontal < eyeCenter) currHorizontal += horizontalSpeed;
      if (Math.abs(currHorizontal - eyeCenter) > 2 && currHorizontal > eyeCenter) currHorizontal -= horizontalSpeed;
      
      // -------- Set Properties -------- //
      $('#tiltModel').attr('transform', 
        "translate(" + currHorizontal + ",50) " + 
        "rotate(" + currTilt + " 75 50)");

      $('.debug')[0].innerHTML = currTilt + '<br>' + transformTilt + '<br>' + horizontalSpeed;
    }

    
    // A secure way to set data points. This also flips the [0] / [1] axis
    if (event.data && event.data[0] && event.data[1]) {
      if (event.data[0].x < event.data[1].x) {
        setModel(event.data[0], event.data[1])
        // setUserModel();
      } else if (event.data[0].x >= event.data[1].x) {
        setModel(event.data[1], event.data[0])
        // setUserModel();
      }
    } 

    
  });
};

// function setUserModel() {
  // var points = rawPoly[0].join(' ') + ',' +
  //              rawPoly[1].join(' ') + ',' +
  //              rawPoly[2].join(' ') + ',' +
  //              rawPoly[3].join(' ');
  // $('#userModel').attr('points', points);

  // var offset = 4;
  // var yaw = Math.abs(rawPoly[3][1] - rawPoly[0][1]) -
            // Math.abs(rawPoly[2][1] - rawPoly[1][1])
  // var distance = ( Math.abs(rawPoly[0][0] - rawPoly[1][0]) ) / 100 + offset;
  // $('.debug')[0].innerText = yaw;
  // $('#camera').attr('position', '0 1.8 ' + distance);
// }