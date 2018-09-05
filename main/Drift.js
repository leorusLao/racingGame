
function Drift(){
	var s = this;
	s.shape = new LShape();
	s.init(s);
}

Drift.prototype.init = function(s){
	world.addChild(s.shape);
}

Drift.prototype.add = function(wheelA,wheelB,speedx,speedy){
	
	var s = this;
	s.shape.graphics.drawLine(3,"#000000",[wheelA.x,wheelA.y,wheelA.x+speedx,wheelA.y+speedy]);
	s.shape.graphics.drawLine(3,"#000000",[wheelB.x,wheelB.y,wheelB.x+speedx,wheelB.y+speedy]);
	
	if(Para.drift&&!Para.drift.playing){
		Para.drift.play();
	}
	
}

Drift.prototype.close = function(){
	if(Para.drift&&Para.drift.playing)
	   Para.drift.close();
}
