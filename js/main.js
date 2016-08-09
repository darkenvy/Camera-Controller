// ---------------------- On Page Load ------------------------- //
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  

  // ----------- Set Custom Colors & Initiate ColorTracker ---------//
  function setColors() {

    tracking.ColorTracker.registerColor('green', function(r,g,b) {
      if (r < 150 && 
          g > 100 && 
          b < 240 &&
          g - r > 25 && g > b) {
        return true;
      }
      return false;
    })

    tracker = new tracking.ColorTracker(['green']);
    tracker['minDimension'] = 1;
  }




  // ---------------------- Initiate Camera ------------------------ //
  
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
          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });

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
  
  setColors();
  initCamera(); // Start the camera up now that we have the colors defined
  
  // Turn on the Color controller (seems to be required)
  // initGUIControllers(tracker);
  // tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them
};