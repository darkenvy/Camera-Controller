Tactile VR Doom Demo
===================

*Tactile VR Doom* is a tech demonstration that illustrates the possibilities of using the physical world to modify the VR world. This is accomplished by utilizing the back-facing camera on the phone while using Google Cardboard (a Virtual Reality viewer)

----------


What Does This Demo Show?
-------------

The demonstration provided is focused around the weapon-aiming mechanism. The weapon (a handgun) in-game is fired once every two seconds to demonstrate the aiming mechanism and it's potential accuracy. The gun is aimed by aiming a toy gun held by the user in the outside world. By tracking the location of two green dots on a flat space, a three dimensional object can be oriented to mimic it's phyical counterpart.


How To View The Demo
-------------
 

To use this demonstration you will require two things: Firefox on Android and green stickers on a toy gun. 

Due to limitations in mobile web browsers, most browsers do not support having the camera initialized while in VR mode. However, thanks to Firefox this is a possibility. For best results use Firefox Beta for Android. You will also ned the *Mozilla WebVR Plus* extension for the mobile browser to enable VR mode. When you are asked for which camera to use (when you start up the demo) choose the rear-facing camera.

The stickers are easy. Green stickers from 'for sale' price-tags is what I used. However, the tolerance of color is so wide that any green will do. Slap these stickers on a toy gun (at the nozzle and the eyesight) and you are set
![Photo on 8-11-16 at 4.38 PM.jpg](https://s9.postimg.org/fexgp9qrz/Photo_on_8_11_16_at_4_38_PM.jpg)(https://postimg.org/image/bvbizgo23/)

To Do List
-------------
* Add an additional colored marker to track environment (head tracking). It was implemented but removed due to jitter.
* Smooth gun tracking to follow the actual coordinates. This will remove the jitter and errors of color tracking at the slight expense of lag/delay
* Move characters in environment. Not important for the demonstration of object tracking but emulating a real game would further demonstrate the potential of augmentation.

Problems
-------------
* Only one browser on mobile supports VR Mode + Camera at the same time: Firefox (with the VR extension added)
* Due to the lack of browser support of the previous, FPS drops exponentially when the camera is open even without any calculations being performed. Further browser development may curb this problem.
* Colors are tracked in RGB instead of the more fitting HSL color space. This makes it more difficult to precisely track the correct color.