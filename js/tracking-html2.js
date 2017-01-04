var tracker;
var modelOffsetX = 100;
var modelOffsetY = 35;
var svgPoly = [[0,0], [1,0], [1,1], [0,1]];

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
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });

    var setModelLeft = function(leftEye) {
        // $('.left').css('left', leftEye.x + modelOffsetX + 'px');
        // $('.left').css('top', leftEye.y + modelOffsetY + 'px');
        svgPoly[0] = [leftEye.x, leftEye.y]
        svgPoly[3] = [leftEye.x, leftEye.y + (leftEye.height * 2)]
        setUserModel();
      }
    var setModelRight = function(rightEye) {
        // $('.right').css('left', rightEye.x + modelOffsetX + 'px');
        // $('.right').css('top', rightEye.y + modelOffsetY + 'px');
        svgPoly[1] = [rightEye.x, rightEye.y];
        svgPoly[2] = [rightEye.x, rightEye.y + (rightEye.height * 2)];
        setUserModel();
    }
      
    if (event.data && event.data[0] && event.data[1]) {
      if (event.data[0].x < event.data[1].x) {
        setModelLeft(event.data[0])
        setModelRight(event.data[1])
      } else if (event.data[0].x >= event.data[1].x) {
        setModelLeft(event.data[1])
        setModelRight(event.data[0])
      }
    } 
    
  });
};

function setUserModel() {
  var points = svgPoly[0].join(' ') + ',' +
               svgPoly[1].join(' ') + ',' +
               svgPoly[2].join(' ') + ',' +
               svgPoly[3].join(' ');
  $('#userModel').attr('points', points)
}




  // Color slider
  // initGUIControllers(tracker);
  // tracker.colors = ["orange", "green"] // DEBUG - initGUIControllers add 3 more colors. So we remove them
  // console.log(tracking.ColorTracker.getColor("green"));

// else if (event.data[0] && event.data.length === 1) {
    //   // This is when one cuts out. We dont know which one though
    //   // So the error handling would have to deduce it  
    //   var x = event.data[0].x,
    //       aX = parseInt($('.left').css('left')),
    //       bX = parseInt($('.right').css('left'));
    //   if (Math.abs(x - aX) < Math.abs(x - bX)) {
    //     // console.log(Math.abs(x - aX), Math.abs(x - bX));
    //     console.log('1');
    //     // setModelLeft(event.data[0]);
    //   } else if (Math.abs(x - aX) >= Math.abs(x - bX)) {
    //     console.log('2');
    //     // console.log(Math.abs(x - aX), Math.abs(x - bX));
    //     setModelRight(event.data[0]);
    //   }
    // }