
function Main(){
	var s = this;
	base(s,LSprite,[]);

	/**设置场景大小*/
	s.sceneWidth = 1000;
	s.sceneHeight = 600;
}

Main.prototype.init = function(){
	var s = this;
	s.initSound();
	s.addEventListener(LEvent.ENTER_FRAME,s.loop);
	s.sceneObj = new Scene();
	s.sceneObj.initScene();
}

Main.prototype.initSound = function(){
	new Sounds();
}

Main.prototype.loop = function(){
	if(Para.themebg&&!Para.themebg.playing){
		Para.themebg.play(0,100);
	}
}
