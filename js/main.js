// MODIFIED - Need to init rearCamera ASAP
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
  function setColors(gLow, gHigh, oLow, oHigh) {
    
    // The highs and lows can be swapped. So we use ternarys to ensure
    // r1 & o1 are always the lows, and r2 & o2 are the highs

    // I know this is ridiculout
    // var gR1 = gLow.r < gHigh.r ? gLow.r : gHigh.r,
    //     gR2 = gLow.r < gHigh.r ? gHigh.r : gLow.r,
    //     gG1 = gLow.g < gHigh.g ? gLow.g : gHigh.g,
    //     gG2 = gLow.g < gHigh.g ? gHigh.g : gLow.g,
    //     gB1 = gLow.b < gHigh.b ? gLow.b : gHigh.b,
    //     gB2 = gLow.b < gHigh.b ? gHigh.b : gLow.b

    // var oR1 = oLow.r < oHigh.r ? oLow.r : oHigh.r,
    //     oR2 = oLow.r < oHigh.r ? oHigh.r : oLow.r,
    //     oG1 = oLow.g < oHigh.g ? oLow.g : oHigh.g,
    //     oG2 = oLow.g < oHigh.g ? oHigh.g : oLow.g,
    //     oB1 = oLow.b < oHigh.b ? oLow.b : oHigh.b,
    //     oB2 = oLow.b < oHigh.b ? oHigh.b : oLow.b

    // console.log(gR1, gR2, gG1, gG2, gB1, gB2,
    //             oR1, oR2, oG1, oG2, oB1, oB2)


    // tracking.ColorTracker.registerColor('orange', function(r,g,b) {
    //   if (r > oR1 && r <= oR2 &&
    //       g > oG1 && g <= oG2 &&
    //       b > oB1 && b <= oB2) {
    //     return true;
    //   }
    //   return false;
    // })

    // tracking.ColorTracker.registerColor('green', function(r,g,b) {
    //   if (r > gR1 && r <= gR2 &&
    //       g > gG1 && g <= gG2 &&
    //       b > gB1 && b <= gB2) {
    //     return true;
    //   }
    //   return false;
    // })

    tracking.ColorTracker.registerColor('orange', function(r,g,b) {
      if (r > 190 && 
          g > 60 && g < 160 && 
          b > 40 && b < 190 &&
          r - g > 75 && r - b > 75) {
        return true;
      }
      return false;
    })
    tracking.ColorTracker.registerColor('green', function(r,g,b) {
      if (r < 150 && 
          g > 150 && 
          b < 240 &&
          g > r && g > b) {
        return true;
      }
      return false;
    })
    // tracker = new tracking.ColorTracker(['orange']);
    tracker = new tracking.ColorTracker(['green', 'orange']);
    tracker['minDimension'] = 5;
    tracker['maxDimension'] = 100;
    tracker['minGroupSize'] = 50;
    // tracker['customColor'] = "#000000";

    initCamera(); // Start the camera up now that we have the colors defined
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

    // ----------------------- Do thing On Track --------------------- //
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Multi-target tracking
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
    });

  }


  


// Turn on the Color controller (seems to be required)
// initGUIControllers(tracker);
// tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them



  // -------------- Color Picking for Optimization ---------------- //

  function colorset() {
    // Set inputs from local storage
    try {
      document.getElementById('input-lo1').value = localStorage.getItem("lo1")
      document.getElementById('input-hi1').value = localStorage.getItem("hi1")
      document.getElementById('input-lo2').value = localStorage.getItem("lo2")
      document.getElementById('input-hi2').value = localStorage.getItem("hi2")
    }
    catch(err) {
      console.log('nothing in local storage', err)
    }

    // High and low color hex submissions
    document.getElementById('input-btn').addEventListener('click', function() {
      console.log('clicked')
      // set localstorage to the current values
      localStorage.setItem("lo1", document.getElementById('input-lo1').value );
      localStorage.setItem("hi1", document.getElementById('input-hi1').value );
      localStorage.setItem("lo2", document.getElementById('input-lo2').value );
      localStorage.setItem("hi2", document.getElementById('input-hi2').value );

      var lo1 = hexToRgb(document.getElementById('input-lo1').value)
      var hi1 = hexToRgb(document.getElementById('input-hi1').value)
      var lo2 = hexToRgb(document.getElementById('input-lo2').value)
      var hi2 = hexToRgb(document.getElementById('input-hi2').value)
      // console.log( hexToRgb("#0033ff") );
      console.log(lo1, hi1, lo2, hi2)
      setColors(lo1, hi1, lo2, hi2)
    })

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }
  }


  // ------------------ Main initialization ----------------- //
  colorset(); // will call setcolors() and initcamera() on its own


};