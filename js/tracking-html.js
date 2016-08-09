// var tracker;
// window.onload = function() {
//   var video = document.getElementById('video');
//   var canvas = document.getElementById('canvas');
//   var context = canvas.getContext('2d');
  
//   tracking.ColorTracker.registerColor('orange', function(r,g,b) {
//     if (r > 190 && g > 60 && g < 130 && b > 40 && b < 100) {
//       return true;
//     }
//     return false;
//   })
//   tracking.ColorTracker.registerColor('green', function(r,g,b) {
//     if (r < 100 && g > 150 && b < 200) {
//       return true;
//     }
//     return false;
//   })
//   tracker = new tracking.ColorTracker(['green']);
//   // tracker = new tracking.ColorTracker(["cyan", "magenta", "yellow"]);
//   tracker['minDimension'] = 5;
//   tracker['maxDimension'] = 25;
//   tracker['minGroupSize'] = 100;
//   // tracker['customColor'] = "#000000";



//   tracking.track('#video', tracker, { camera: true });

//   tracker.on('track', function(event) {
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     event.data.forEach(function(rect) {
//       if (rect.color === 'custom') {
//         rect.color = tracker.customColor;
//       }

//       context.strokeStyle = rect.color;
//       context.strokeRect(rect.x, rect.y, rect.width, rect.height);
//       context.font = '11px Helvetica';
//       context.fillStyle = "#fff";
//       context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
//       context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
//     });
//   });

//   // Color slider
//   // initGUIControllers(tracker);
//   tracker.colors = ["green", "orange"] // DEBUG - initGUIControllers add 3 more colors. So we remove them
//   // console.log(tracking.ColorTracker.getColor("green"));
  



//   // -------------- Color Picking for Optimization ---------------- //

//   // Set inputs from local storage
//   // try {
//   //   document.getElementById('input-lo1').value = localStorage.getItem("lo1")
//   //   document.getElementById('input-hi1').value = localStorage.getItem("hi1")
//   //   document.getElementById('input-lo2').value = localStorage.getItem("lo2")
//   //   document.getElementById('input-hi2').value = localStorage.getItem("hi2")
//   // }
//   // catch(err) {
//   //   console.log('nothing in local storage', err)
//   // }

//   // // High and low color hex submissions
//   // document.getElementById('input-btn').addEventListener('click', function() {
//   //   // set localstorage to the current values
//   //   localStorage.setItem("lo1", document.getElementById('input-lo1').value );
//   //   localStorage.setItem("hi1", document.getElementById('input-hi1').value );
//   //   localStorage.setItem("lo2", document.getElementById('input-lo2').value );
//   //   localStorage.setItem("hi2", document.getElementById('input-hi2').value );

//   //   var lo1 = hexToRgb(document.getElementById('input-lo1').value)
//   //   var hi1 = hexToRgb(document.getElementById('input-lo2').value)
//   //   var lo2 = hexToRgb(document.getElementById('input-hi1').value)
//   //   var hi2 = hexToRgb(document.getElementById('input-hi2').value)
//   //   // console.log( hexToRgb("#0033ff") );
//   //   console.log(lo1, hi1, lo2, hi2)
//   // })

//   // function hexToRgb(hex) {
//   //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   //   return result ? {
//   //       r: parseInt(result[1], 16),
//   //       g: parseInt(result[2], 16),
//   //       b: parseInt(result[3], 16)
//   //   } : null;
//   // }

  


// };

