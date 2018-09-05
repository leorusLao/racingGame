function Ready(leading){
	var s = this;
	s.Leading = leading;
	s.init(s);
}

Ready.prototype.init = function(s){
	s.Leading.limit = [];
	s.countdown = new LTextField();
	s.countdown.text = 4;
	s.countdown.size = 60;
	s.countdown.alpha = 0;
	s.countdown.color = "#eeb552";
	s.countdown.stroke = true;
    s.countdown.lineWidth = 1;
	s.countdown.lineColor = "#000000";
	s.countdown.x = (LStage.width-s.countdown.getWidth())*0.5;
	s.countdown.y = (LStage.height-s.countdown.getHeight())*0.5;
	addChild(s.countdown);
	countDown();
	function countDown(){
		if(s.countdown.text>1){
		  s.countdown.text--;
	   }else if(s.countdown.text == "Go"){
		  return;
	    }else{
	      s.countdown.text = "Go";
	      s.Leading.limit = [16,37,38,39,40];
	      world.startTime = new Date().getTime();
	    }
	    return LTweenLite.to(s.countdown,0.5,{
			delay:0, 
			alpha:1,
			onComplete: function(){
				LTweenLite.to(s.countdown,0.5,{
					delay:0,
			        alpha:0,
			        onComplete: countDown
				})
			}
		});
	}
}

