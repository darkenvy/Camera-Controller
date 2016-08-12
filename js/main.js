// aNode is the back node on the gun. The one used for position tracking
var aNodeLastX, aNodeLastY = 0,
    nodeLastDist = 10,
    gunLastPitch, gunLastYaw, gunLastRoll = 0, // currently unused
    pitch = 0, yaw = 0, roll = 0

// ---------------------- On Page Load ------------------------- //
window.onload = function() {
  picoModal("<b>Tactile VR Doom</b> is a tech demonstration that illustrates the possibilities of using the physical world to modify the VR world. This is accomplished by utilizing the back-facing camera on the phone while using Google Cardboard (a Virtual Reality viewer). For proper setup, be sure to visit <a href='https://github.com/darkenvy/Tactile-VR-Doom-Demo''>the Github Page</a>").show();
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  

  // ----------- Set Custom Colors & Initiate ColorTracker ---------//
  function setColors() {

    tracking.ColorTracker.registerColor('green', function(r,g,b) {
      if (r < 150 && 
          g > 0 && 
          b < 240 &&
          g - r > 20 && g - b > 10) {
        return true;
      }
      return false;
    })

    tracker = new tracking.ColorTracker(['green']);
    tracker['minDimension'] = 1;
    tracker['minGroupSize'] = 4;
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

        if (event.data.length == 1) {
          // If the previous location is close to the current location,
          // then it must be the same node. And we can position it.
          if (Math.abs(aNodeLastX - event.data[0].x) < nodeLastDist ) {
            aNodeLastX = event.data[0].x
            aNodeLastY = event.data[0].y
            nodeLastDist = 100 // Since this passed the first time, just open it
            positionGun(event.data[0].x, event.data[0].y)
          }
        }

        if (event.data.length >= 2) {
          if (event.data[1].y >= event.data[0].y) {
            aNodeLastX = event.data[1].x
            aNodeLastY = event.data[1].y
            nodeLastDist = event.data[1].y - (event.data[0].y + event.data[0].height)
            angleGun(event.data[1].x, event.data[1].y, event.data[0].x, event.data[0].y)
            positionGun(event.data[1].x, event.data[1].y)
          } 
          // else if (event.data[0].y > event.data[1].y) {
            // aNodeLastX = event.data[0].x
            // aNodeLastY = event.data[0].y
            // nodeLastDist = event.data[0].y - (event.data[1].y + event.data[1].height)
            // angleGun(event.data[0].x, event.data[0].y, event.data[1].x, event.data[1].y)
            // positionGun(event.data[0].x, event.data[0].y)
          // }

        }
      }

    });
  }
  function positionGun(x,y) {
    var posX = (x * 0.01) - 0.5, // Only want to adjust betweet half a meter in-game
        posY = 0-((y * 0.01) - 0.5) + 1.5, // Y is elevation in this case
        posZ = -1 // Not used. How far away from the player the gun is
        
        // currPos = document.getElementById('gun').getAttribute('position')
        // glideX = (currPos.x*0.01 -0.5) + ( posX / ((Math.abs((currPos.x*0.01 -0.5) - posX)) ) )
        // console.log(glideX);
        // glideY = currPos.y + currPos.y - posY / 10

    document.getElementById('gun').setAttribute('position', posX + ' ' + posY + ' ' + posZ)
  }
  function angleGun(x,y, x2, y2) {
    // see https://en.wikipedia.org/wiki/Aircraft_principal_axes for defenitions
    // ALERT - These divide-by numbers will change based on size of camera frame
    
    // These variables are now global so that main-aframe.js has access to it in the laser calculations
    pitch = (0-Math.abs(y - y2) * 1.4) + 15 // elevation diff - offset
    yaw = ((x - x2)*2) - (( (x-50) / 50 )*25) + 180 // left right diff + 180 degree offset
    roll = 0 // roll not needed atm

    // console.log((x/100)*60)

    // var pitch = 0-Math.abs(y - y2) / 1.1112, // elevation diff
    //     yaw = ((x - x2)*2) + 180, // left right diff + 180 degree offset
    //     roll = 0 // roll not needed atm
    
    document.getElementById('gun').setAttribute('rotation', pitch + ' ' + yaw + ' ' + roll)
  }
  // ------------------ Main initialization ----------------- //
  
  setColors();
  initCamera(); // Start the camera up now that we have the colors defined
  
  // Turn on the Color controller (seems to be required)
  // initGUIControllers(tracker);
  // tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them
};