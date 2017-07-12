function VideoToCanvas(canvasId, videoId){
	this.canvas;
	this.context;
	this.video;
	this.stream;
	this.videoId = videoId;
	this.canvasId = canvasId;
	this.devices = {};
	this.devices.videoFront = {facingMode: "user", deviceId: ""};
	this.devices.videoRear = {facingMode: "environment", deviceId: ""};
	this.devices.videoDefault = {deviceId: "default"};
	this.devices.videoinputsId = [];
	this.devices.videoinputsLabel = [];
	this.configuration = {};
	this.configuration.deviceId = {deviceId: "default"};
	this.configuration.width = 320;
	this.configuration.height = 240;
	this.configuration.framerate = 25;
	this.isPlayin = false;

	var that = this;

	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	this.canvas = document.getElementById(this.canvasId);
	this.context = this.canvas.getContext('2d');
	this.video = document.getElementById(this.videoId);

	this.getVideoDevices = function(){
		navigator.mediaDevices.enumerateDevices().then(function(devices){
			for(var i = 0; i < devices.length; ++i){
				if(devices[i].kind === 'videoinput'){
						that.devices.videoinputsId.push({deviceId: devices[i].deviceId});
						that.devices.videoinputsLabel.push(devices[i].label);
						console.log(devices[i].label);
				}
			}

		}).catch(function(e){console.log("Error accesing devices: "+e);})
	}

	//Start video/webcam stream
	this.play = function(){
		var device = {};
		device.video = {};
		device.video = this.configuration.deviceId;
		device.video.width = this.configuration.width;
		device.video.height = this.configuration.height;
		device.framerate = this.configuration.framerate;

		navigator.mediaDevices.getUserMedia(device).then(
			function(stream) {
				var src = window.URL.createObjectURL(stream);
				that.video.src = src;
				that.stream = stream;
				that.isPlaying = true;
			}
		).catch(
				function(e) {
					console.log("Video error: "+e);
				}
		);
	};

	//Stop webcam/video stream
	this.stop = function () {
		this.isPlaying = false;
		this.video.pause();
		this.video.currentTime = 0;
		if(this.stream)
			this.stream.getTracks()[0].stop();
	};

	//Capture one frame and copy this to canvas
	this.snap = function() {
		this.canvas.width = this.video.videoWidth;
		this.canvas.height = this.video.videoHeight;
		this.context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
	};

	//Clear canvas
	this.clearImage = function(){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	//Load video
	this.loadVideo =  function (dataURL) {
		this.video.src = dataURL;
	};

	//Load image
	this.loadImage =  function (dataURL) {
		this.image = new Image();
		this.image.canvas = this.canvas;
		this.image.onload = fit;
		this.image.src = dataURL;
	};

	//adjust width and height of canvas for show image loaded whit loadImage function
	function fit(){
		this.canvas.width = this.width;
		this.canvas.height =  this.height;
		this.canvas.getContext('2d').drawImage(this, 0, 0);
	};

	//return a imageData from canvas
	//getImageData() - return canvas
	//getImageData(x,y,width, height) - return canvas from (x,y) to (x+width, y +height)
	this.getImageData =  function(x, y, width, height){
		x = x || 0;
		y = y || 0;
		width = width || this.canvas.width;
		height = height || this.canvas.height;
		return this.context.getImageData(x, y, width, height);
	}

	//return an imageData array whit the canvas separated in rows*cols boxes
	this.getBoxes = function(rows, cols){
	 var boxes = [];
	 var boxWidth = Math.floor(this.canvas.width/rows);
	 var boxHeight = Math.floor(this.canvas.height/cols);

	 for(var row = 0; row < rows; ++row){
		 for(var col = 0; col < cols; ++col) {
				 boxes.push(this.getImageData(col*boxWidth, row*boxHeight, boxWidth, boxHeight));
		 }
	 }
	 return boxes;
 };

	//paste imageData in canvas
	this.showImageData = function(imageData){
		var showImage = this.context.createImageData(imageData.width, imageData.height);
		showImage.data.set(imageData.data)
		this.context.putImageData(showImage, 0, 0);
	}

}
