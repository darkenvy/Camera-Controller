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