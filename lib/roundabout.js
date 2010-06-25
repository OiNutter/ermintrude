var Roundabout = Class.create({
  //create new roundabout
  initialize: function(element,options){
    
      //check element exists
      if(!$(element))
        throw new Error('Element does not exist: '  + element);
    
      //load in options
      this.options = Object.Extend({
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
        easing: 'swing',
        clickToFocus: false,
        focusBearing: 0.0,
        debug: false,
        childSelector: 'li',
        startingChild: null,
        reflect: false
      },options || {});
      
      
      var period = (360.0 / $$('#' + element + " " + this.options.childSelector).length),
          startingBearing = (this.options.startingChild === null) ? this.options.bearing : this.options.startingChild * period;
    
      
      //set up holder
      $(element)
      .addClassName('roundabout-holder')
      .setStyle({"padding":"0px",
                 "position":"relative",
                 "z-index":this.options.minZ});
      
      //bind click events          
      if (this.options.clickToFocus === true) {
        $$('#' + element + " " + this.options.childSelector).each(function(li,i){
          li.observe('click',function(e){
              var degrees = (this.options.reflect) ? 360 - (period*i) : period * i;
                if(!this.isInFocus($(element),degrees)){
                  e.stop();
                  if(this.animating===0)
                    ref.animateAngleToFocus(degrees);
                }
                return false;
            }.bind(this));
          }).bind(this);
        
    }
  }  
});


