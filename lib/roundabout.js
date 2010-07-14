var Roundabout = Class.create({
  //create new roundabout
  initialize: function(element,options){
    
      //check element exists
      if(!$(element))
        throw new Error('Element does not exist: '  + element);
    
      //load in options
      this.options = Object.extend({
        shape: 'lazySusan',
        bearing: 0.0,
        tilt: 0.0,
        minZ: 100,
        maxZ: 400,
        minOpacity: 0.40,
        maxOpacity: 1.00,
        minScale: 0.40,
        maxScale: 1.00,
        duration: 600,
        btnNext: null,
        btnPrev: null,
        easing: 'sinoidal',
        clickToFocus: true,
        focusBearing: 0.0,
        debug: false,
        childSelector: 'li',
        startingChild: null,
        reflect: false,
        childInFocus: -1,
        animating:0
      },options || {});
      
      
      var period = (360.0 / $$('#' + element + " " + this.options.childSelector).length),
          startingBearing = (this.options.startingChild === null) ? this.options.bearing : this.options.startingChild * period;
    
      this.options.bearing = startingBearing;
      this.options.period = period;
      
      //set up holder
      this.element = $(element)
      .addClassName('roundabout-holder')
      .setStyle({"padding":"0px",
                 "position":"relative",
                 "z-index":this.options.minZ});
      
      //bind click events          
      if (this.options.clickToFocus === true) {
        $$('#' + element + " " + this.options.childSelector).each(function(li,i){
        	$(li).observe('click',function(e){
        	    var degrees = (this.options.reflect) ? 360 - (period*i) : period * i;
              	  degrees = this.toFloat(degrees);
              	  
                 if(!this.isInFocus(degrees)){
                  e.stop();
                  if(this.options.animating===0)
                    this.animateAngleToFocus(degrees);
                }
                return false;
            }.bind(this));
          }.bind(this));      
      }
      this.startChildren();
  },
  startChildren: function(){
	   $$('#' + this.element.id + " " + this.options.childSelector).each(function(li,i){
	
		  var degrees = (this.options.reflect===true) ? 360.0 - (this.options.period * i) : this.options.period * i;
		  
		  $(li).addClassName('roundabout-moveable-item').setStyle({'position':'absolute'});
		  $(li).roundabout = {startWidth:$(li).getWidth(),
			  				  startHeight: $(li).getHeight(),
			  				  startFontSize: parseInt($(li).getStyle('fontSize'),10),
			  				  degrees: degrees};
	  },this);
	  this.updateChildPositions();
  },
  setTilt: function(newTilt){
	  this.options.tilt = newTilt;
	  this.updateChildPositions();
  },
  setBearing: function(newBearing){
	  this.options.bearing = this.toFloat(newBearing);
	  this.updateChildPositions();
	  
	  if (Object.isFunction(arguments[1])) {
			var callback = arguments[1];
			setTimeout(function() { callback() }.bind(this), 0);
		}
  },
  adjustBearing: function(delta){
	  delta = this.toFloat(delta);
	  if(delta !== 0){
		 this.options.bearing = this.getBearing() + delta;
		 this.updateChildPositions();
	  }
  },
  adjustTilt: function(delta){
	  delta = this.toFloat(delta);
	  if(delta!==0){
		  this.options.tilt = this.toFloat(this.get('tilt') + delta);
		  this.updateChildPositions();
	  }
  },
  animateToBearing: function(bearing){
	  bearing = this.toFloat(bearing);
	  var currentTime = new Date(),
	  	  duration = (!Object.isUndefined(arguments[1])) ? arguments[1] : this.options.duration,
	  	  easing = (!Object.isUndefined(arguments[2])) ? arguments[2] : this.options.easing,
	  	  passedData = (!Object.isUndefined(arguments[3])) ? arguments[3] : null,
	  	  newBearing;
	  if(passedData === null){
		  passedData = {
				  timerStart: currentTime,
				  start: this.getBearing(),
				  totalTime: duration
		  };
	  }
	  timer = currentTime - passedData.timerStart;
	  
	  if(timer<duration){
		this.options.animating = 1;
		pos = timer/duration;
		
		newBearing = (Effect.Transitions[easing](pos)*(bearing-passedData.start)) + passedData.start;
		
		this.setBearing(newBearing,function(){this.animateToBearing(bearing,duration,easing,passedData);}.bind(this));
		
	  } else {
		  bearing = (bearing<0) ? bearing + 360 : bearing % 360;
		  this.options.animating = 0;
		  this.setBearing(bearing);
	  }
  },
  animateToDelta: function(delta){
	  var duration = arguments[1], 
		easing = arguments[2];
	  
	  delta = this.getBearing() +  this.toFloat(delta);
	  this.animateToBearing(delta,duration,easing);
  },
  animateAngleToFocus: function(target){

	var duration = arguments[1], 
		easing = arguments[2],
		delta = this.getBearing()-target;
	
	delta = (Math.abs(360.0-delta)<Math.abs(0.0-delta)) ? 360.0 - delta : 0.0 - delta;
	delta = (delta>180) ? -(360.0-delta) : delta;
	
	if(delta!==0)
		this.animateToDelta(delta,duration,easing);

  },
  updateChildPositions: function(){
	  
	  var inFocus = -1;
	  	info = {bearing: this.getBearing(),
	  			tilt: this.options.tilt,
	  			stage: {width: Math.floor(this.element.getWidth() * 0.9),
	  					height: Math.floor(this.element.getHeight()* 0.9)
	  				},
	  			animating: this.options.animating,
	  			inFocus: this.options.childInFocus,
	  			focusBearingRad: this.degToRad(this.options.focusBearing),
	  			shape:Roundabout[this.options.shape]
	  	};
	 
	  	info.midStage = {width: info.stage.width/2,
	  					height: info.stage.height/2};
	  	info.nudge = {width: info.midStage.width + info.stage.width * 0.05,
	  				height: info.midStage.height + info.stage.height * 0.05};
	  	info.zValues = {min: this.options.minZ,
	  					max: this.options.maxZ,
	  					diff: this.options.maxZ - this.options.minZ};
	  	info.opacity = {min: this.options.minOpacity,
	  					max: this.options.maxOpacity,
	  					diff: this.options.maxOpacity - this.options.minOpacity};
	  	info.scale = {min: this.options.minScale,
					max: this.options.maxScale,
  					diff: this.options.maxScale - this.options.minScale};
	  	console.log(info);
	  	$$('#' + this.element.id + " " + this.options.childSelector).each(function(li,i){
	  		if(this.updateChildPosition(li,info,i) && info.animating===0){
	  			inFocus = i;
	  			$(li).addClassName('roundabout-in-focus');
	  		} else {
	  			$(li).removeClassName('roundabout-in-focus');
	  		}
	  	},this);
	  	
	  	if(inFocus !== info.inFocus){
	  		this.triggerEvent(info.inFocus,'blur');
	  		
	  		if(inFocus !== -1)
	  			this.triggerEvent(inFocus,'focus');
	  		
	  		this.options.childInFocus = inFocus;
	  	}  				
  },
  getBearing: function(){
	  return this.options.bearing % 360;
  },
  degToRad: function(degrees){
	  return (degrees % 360.0) * Math.PI / 180.0;
  } ,
  isInFocus: function(target){
	 return (this.getBearing() % 360) === (target % 360);
  },
  triggerEvent: function(child,eventType){
	  return (child <0) ? this : $$('#' + this.element.id + " " + this.options.childSelector)[child].fire(eventType); 
  },
  toFloat: function(number){
	 number = Math.round(parseFloat(number)*1000) / 1000;
	 return parseFloat(number.toFixed(2));
  },
  updateChildPosition: function(child,info,childPos){
	var data = child.roundabout,
		out = [],
		rad = this.degToRad((360.0 - data.degrees)+info.bearing),
		factors;
	
	while(rad<0)
		rad = rad+Math.PI * 2;
		
	while(rad > Math.PI * 2)
		rad = rad - Math.PI * 2;
	
	factors = info.shape(rad,info.focusBearingRad,info.tilt);
	
	factors.scale = (factors.scale > 1) ? 1 : factors.scale;
	factors.adjustedScale = (info.scale.min + (info.scale.diff*factors.scale)).toFixed(4);
	factors.width = (factors.adjustedScale * data.startWidth).toFixed(4);
	factors.height = (factors.adjustedScale * data.startHeight).toFixed(4);
	
	$(child).setStyle(
			{'left':((factors.x * info.midStage.width + info.nudge.width) - factors.width / 2.0).toFixed(1) + 'px',
 			 'top': ((factors.y * info.midStage.height + info.nudge.height) - factors.height / 2.0).toFixed(1) + 'px',
 			 'width': factors.width + 'px',
 			 'height': factors.height + 'px',
 			 'opacity':(info.opacity.min + (info.opacity.diff * factors.scale)).toFixed(2),
 			 'zIndex': Math.round(info.zValues.min + (info.zValues.diff * factors.z)),
 			 'fontSize': (factors.adjustedScale * data.startFontSize).toFixed(2) + 'px'})
 			 .writeAttribute('current-scale',factors.adjustedScale);
	return this.isInFocus(this.options.degrees);
  }
});

Roundabout.lazySusan = function(r, a, t) {
	return {
		x: Math.sin(r + a), 
		y: (Math.sin(r + 3*Math.PI/2 + a) / 8) * t, 
		z: (Math.cos(r + a) + 1) / 2,
		scale: (Math.sin(r + Math.PI/2 + a) / 2) + 0.5
	};
};


