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