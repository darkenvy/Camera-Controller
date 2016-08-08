// ------------------ Immediate Functions ---------------------- //
// Need to init rearCamera ASAP
var rearCam;
(function rearCamera() {
  console.log('inside rear camera')
  MediaStreamTrack.getSources(function(s) {
    // MODIFIED - Manually specified 1 as the rear camera for the S7. Should default to normal for desktop testing
    rearCam = s[1].id;
  })
})()





// ---------------------- On Page Load ------------------------- //
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  // document.getElementById('video').setAttribute('style', "z-index: 1"); // Old code from old demo
  




  // ----------- Set Custom Colors & Initiate ColorTracker ---------//
  function setColors() {
    tracking.ColorTracker.registerColor('orange', function(r,g,b) {
      if (r > 160 && 
          g > 60 && g < 190 && 
          b > 40 && b < 190 &&
          r - g > 100 && r - b > 100) {
        return true;
      }
      return false;
    })
    tracking.ColorTracker.registerColor('green', function(r,g,b) {
      if (r < 150 && 
          g > 100 && 
          b < 240 &&
          g - r > 25 && g > b) {
        return true;
      }
      return false;
    })
    tracker = new tracking.ColorTracker(['green', 'orange']);
    tracker['minDimension'] = 5;
    tracker['maxDimension'] = 100;
    tracker['minGroupSize'] = 50;
    // tracker['customColor'] = "#000000";
  }




  // ---------------------- Initiate Camera ------------------------ //

  // Initiate camera after a timeout. This is so we can grab the rear camera in time.
  // Should set this to run inside the return function of that rear camera grab fucntion
  // PS: The rear camera grab is done inside tracking.js . I know, its dirty. Will fix
  
  // setTimeout(function() {
  //   tracking.track('#video', tracker, { camera: true });
  // }, 1000)
  
  function initCamera() {
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Multi-target tracking
      event.data.forEach(function(rect) {
        if (rect.color === 'custom') {rect.color = tracker.customColor;}
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        // angleGun(rect.x)
      });

      if (event.data.length >= 2) {
        // Set vars equal to first two color results
        var color1 = event.data[0].color,
            color2 = event.data[1].color

        // Test to ensure that the 2 colors are only one of each.
        // ie: not 'green green' or 'orange orange'. aka: false positives
        if (color1 === 'orange' && color2 === 'green') {
          angleGun(event.data[1].x, event.data[1].y, event.data[0].x, event.data[0].y)
        } else if (color1 === 'green' && color2 === 'orange') {
          angleGun(event.data[0].x, event.data[0].y, event.data[1].x, event.data[1].y)
          // Green needs to be first in the execution of angleGun. 
          // Green determines positioning
        }

      }

    });
  }

  function angleGun(x,y, x2, y2) {
    // see https://en.wikipedia.org/wiki/Aircraft_principal_axes for defenitions
    // ALERT - These divide-by numbers will change based on size of camera frame
    var pitch = Math.abs(y - y2) / 2.67, // elevation diff
        yaw = (x - x2) / 2, // left right diff
        roll = 0, // roll not needed atm
        posX = (x / 320) - 0.5, // Only want to adjust betweet half a meter in-game
        posY = 0-((y / 240) - 0.5) + 1, // Y is elevation in this case
        posZ = -1 // 


    document.getElementById('gun').setAttribute('rotation', pitch + ' ' + yaw + ' ' + roll)
    document.getElementById('gun').setAttribute('position', posX + ' ' + posY + ' ' + posZ)
  }
  // ------------------ Main initialization ----------------- //
  // colorset(); // will call setcolors() and initcamera() on its own
  setColors();
  initCamera(); // Start the camera up now that we have the colors defined


  // Turn on the Color controller (seems to be required)
  // initGUIControllers(tracker);
  // tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them


};