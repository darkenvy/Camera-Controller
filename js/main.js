// ------------------ Immediate Functions ---------------------- //
// Need to init rearCamera ASAP
// var rearCam;
// (function rearCamera() {
//   console.log('inside rear camera')
//   MediaStreamTrack.getSources(function(s) {
//     // MODIFIED - Manually specified 1 as the rear camera for the S7. Should default to normal for desktop testing
//     rearCam = s[1].id;
//   })
// })()





// ---------------------- On Page Load ------------------------- //
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  // document.getElementById('video').setAttribute('style', "z-index: 1"); // Old code from old demo
  




  // ----------- Set Custom Colors & Initiate ColorTracker ---------//
  function setColors() {
    // tracking.ColorTracker.registerColor('orange', function(r,g,b) {
    //   if (r > 120 && 
    //       g > 40 && g < 190 && 
    //       b > 40 && b < 180 &&
    //       r - g > 80) {
    //     return true;
    //   }
    //   return false;
    // })
    tracking.ColorTracker.registerColor('green', function(r,g,b) {
      if (r < 150 && 
          g > 100 && 
          b < 240 &&
          g - r > 25 && g > b) {
        return true;
      }
      return false;
    })
    // tracker = new tracking.ColorTracker([]);
    // tracker = new tracking.ColorTracker(['green', 'orange']);
    tracker = new tracking.ColorTracker(['green']);
    tracker['minDimension'] = 1;
    tracker['maxDimension'] = 100;
    // tracker['minGroupSize'] = 50;
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
    var isReady = true;
    setInterval(function() {
      isReady = true;
    }, 10)

    tracker.on('track', function(event) {
      if (isReady) {
        isReady = false;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Multi-target tracking
        event.data.forEach(function(rect) {

          // if (rect.color === 'custom') {rect.color = tracker.customColor;}
          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // context.font = '11px Helvetica';
          // context.fillStyle = "#fff";
          // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
          // angleGun(rect.x)
        });

        // if (event.data.length >= 1) {
        //   if (event.data[0].color === 'green') {
        //     positionGun(event.data[0].x, event.data[0].y)
        //   } else if (event.data.length >= 2 && event.data[1].color === 'green') {
            // positionGun(event.data[1].x, event.data[1].y)
        //   }
        // }
        if (event.data.length >= 2) {
          if (event.data[0].y > event.data[1].y) {
            angleGun(event.data[0].x, event.data[0].y, event.data[1].x, event.data[1].y)
            positionGun(event.data[0].x, event.data[0].y)
          } else if (event.data[1].y >= event.data[0].y) {
            angleGun(event.data[1].x, event.data[1].y, event.data[0].x, event.data[0].y)
            positionGun(event.data[1].x, event.data[1].y)
          }

        }
      }

    });
  }
  function positionGun(x,y) {
    var posX = (x * 0.01) - 0.5, // Only want to adjust betweet half a meter in-game
        posY = 0-((y * 0.01) - 0.5) + 1, // Y is elevation in this case
        posZ = -1 // 

    document.getElementById('gun').setAttribute('position', posX + ' ' + posY + ' ' + posZ)
  }
  function angleGun(x,y, x2, y2) {
    // see https://en.wikipedia.org/wiki/Aircraft_principal_axes for defenitions
    // ALERT - These divide-by numbers will change based on size of camera frame
    var pitch = Math.abs(y - y2) / 1.1112, // elevation diff
        yaw = (x - x2), // left right diff
        roll = 0 // roll not needed atm

    document.getElementById('gun').setAttribute('rotation', pitch + ' ' + yaw + ' ' + roll)
  }
  // ------------------ Main initialization ----------------- //
  // colorset(); // will call setcolors() and initcamera() on its own
  
  setColors();
  initCamera(); // Start the camera up now that we have the colors defined
  // setTimeout(function() {document.getElementById('video').setAttribute('style', 'display: none');}, 2000)
  
  // setInterval(function() {
  //   // setColors();
  //   initCamera();
  // }, 5000)

  // Turn on the Color controller (seems to be required)
  // initGUIControllers(tracker);
  // tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them


};