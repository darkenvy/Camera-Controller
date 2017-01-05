navigator.getUserMedia({
    audio: {
      optional: [{
        sourceId: audioSource
      }]
    },
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  }, 
  function(stream) {
    window.stream = stream; // make stream available to console
    videoElement.src = window.URL.createObjectURL(stream);
    videoElement.play();
  }, 
  function(error) {console.log('navigator.getUserMedia error: ', error);});


// Get ID of last element (we are assuming this is the camera)
        // MediaStreamTrack.getSources(function(s) {
        //   rearCamera.optional.sourceId = s[3].id;
        //   alert(s[3].id + " / " + s[4].id)
        //   console.log('rearCamera id: ', rearCamera)
        // })

        // window.navigator.getUserMedia(
        //   {video:true}, 
        //   function(stream){
        //     alert(stream.id);
        //   }, 
        //   function(err){alert(err);
        // })



function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}


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


tracker['maxDimension'] = 100;
tracker['minGroupSize'] = 50;
tracker['customColor'] = "#000000";


// if (rect.color === 'custom') {rect.color = tracker.customColor;}
          // context.font = '11px Helvetica';
          // context.fillStyle = "#fff";
          // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
          // angleGun(rect.x)



==================

<img id="enemy-sprite" crossorigin="" src="https://ucarecdn.com/f11bb3e6-ceb4-427c-bcaa-351cabac37d5/">

<script id="enemies" type="text/x-nunjucks-template">
  <a-entity layout="type: circle; radius: 5" position="0 0.5 0">
    <a-animation attribute="rotation" dur="30000" easing="linear" repeat="indefinite" to="0 360 0"></a-animation>

    {% for x in range(num) %}
    <a-image class="enemy" look-at="#player" src="#enemy-sprite" transparent="true">
      <!-- Attach collision handler animations. -->
      <a-animation attribute="opacity" begin="collider-hit" dur="400" ease="linear"
                   from="1" to="0"></a-animation>
      <a-animation attribute="scale" begin="collider-hit" dur="400" ease="linear"
                   to="0 0 0"></a-animation>
    </a-image>
    {% endfor %}
  </a-entity>
</script>


================