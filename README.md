# videoToCanvas
Easy capture from webcam to canvas

## Load

<script src="videoToCanvas.js"></script>

Yo need create a video and a canvas html elements.

  <video id="video" autoplay="true"></video>
  <canvas id="canvas" ></canvas>

Finally create instance to VideoToCanvas passing vieo and canvas id.

```js
var v2c = new VideoToCanvas("canvas", "video");
```

## Functions

```js
v2c.getVideoDevices();
```
update devices list. (It isn't necesary)

```js
v2c.webcam();
```
start webcam stream

```js
v2c.loadVideo(dataURL);
```
load and play video
	
```js  
v2c.loadImage(dataURL);
```
load image

```js
v2c.stop();
```
stop webcam/video stream

```js  
v2c.pause();
```
pause webcam/video stream after

```js
v2c.resume();
```
resume webcam/video stream after pause

```js
v2c.snap();
```
do a capture of video and paste it in canvas

```js
v2c.getImageData()
```
return a imageData of canvas

```js
v2c.getImageData(x,y,width, height) - 
```
return a imageData of canvas from (x,y) to (x+width, y+height)

```js
v2c.getBoxes(rows, cols);
```
return an array of rows*cols imageDatas of canvas

```js
v2c.showImageData(imageData);
```
show imagedata in canvas

```js
v2c.clearCanvas()
```
clear canvas

## Devices

You have three defaults devices: default, rear, front.

```js
v2c.configuration.deviceId = v2c.devices.videoDefault;
v2c.configuration.deviceId = v2c.devices.videoFront;
v2c.configuration.deviceId = v2c.devices.videoRear;
```
If you don't indicates you uses default device.

You can config more device's parameters

```js
v2c.configuration.width = 320;
v2c.configuration.height = 240;
v2c.configuration.framerate = 25;
```

## Demo

Test in this [demo](https://cubiwan.github.io/videoToCanvas/demo.html)
