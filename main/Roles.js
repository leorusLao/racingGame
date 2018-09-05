function Roles(){
	var s = this;
	s.init(s);
}

Roles.prototype.init = function(s){
	s.num = 1;
	if(checkPoint[1].check) checkPoint[1].check = false;
	s.initRole();
}

Roles.prototype.initRole = function(){
	var s = this,
	    w = world,
	    textarr = [];
	    
	textarr = [
	    w.sceneObj.addText(17,"圈  数",830,50,"#ffffff",true,1,"#000000"),
	    w.sceneObj.addText(17,"时  间",830,80,"#ffffff",true,1,"#000000"),
	    w.sceneObj.addText(17,"当  前",830,110,"#ffffff",true,1,"#000000"),
	    w.circleNum = w.sceneObj.addText(17,s.num+" / "+mapPara.num,890,50,"#e5c775",true,1,"#000000"),
	    w.fixTime = w.sceneObj.addText(17,mapPara.time,890,80,"#e5c775",true,1,"#000000"),
	    w.currentTime = w.sceneObj.addText(17,"00 : 00 : 00",890,110,"#e5c775",true,1,"#000000")
	];
	for(k in textarr) dataLayer.addChild(textarr[k]);
}

Roles.prototype.chackPoint = function(i,p){
	var l = i.length/2+10,
	    b = 15;
	if(i.angle){
		if(
			(p.x>i.cx-l&&p.x<i.cx+l)
			&&
			(p.y>i.cy-b&&p.y<i.cy+b)
		)return true;
	}else{
		if(
			(p.x>i.cx-b&&p.x<i.cx+b)
			&&
			(p.y>i.cy-l&&p.y<i.cy+l)
		)return true;
	}
	return false;
}

Roles.prototype.setCheck = function(k){
	var s = this,
	    w = world;
	if(k==1){
		checkPoint[k].check = true;
	}else{
		if(checkPoint[1].check){
			checkPoint[1].check = false;
			s.num++;
			w.circleNum.text = s.num > mapPara.num ? mapPara.num+" / "+mapPara.num : s.num+" / "+mapPara.num;
			s.checkComplate(s);
		}
	}
}

Roles.prototype.checkComplate = function(s){
	if(s.num>mapPara.num){
		s.complate(s);
	}else if(s.num==mapPara.num){
		s.last(s);
	}
}

Roles.prototype.last = function(s){
	if(Para.last&&!Para.last.playing)
	    Para.last.play();
	s.write(s,"最后一圈",2,"#eb5e5e");
}

Roles.prototype.complate = function(s){
	var bg = mapPara.bg;
	if(Para.complate&&!Para.complate.playing)
	    Para.complate.play();
	Para[bg].close();        
	world.LeadingObj.limit = [];
	world.LeadingObj.operation = {};
	s.showTime("完  成");
}

Roles.prototype.fail = function(){
	var s = this,
	    bg = mapPara.bg;
	if(Para.fail&&!Para.fail.playing);
	    Para.fail.play();
	Para[bg].close();    
	s.showTime("失  败");
}

Roles.prototype.write = function(s,text,l,c,cb){
	s.Text = new LTextField();
	s.Text.text = text;
	s.Text.size = 50;
	s.Text.alpha = 0;
	s.Text.color = c;
	s.Text.x = (LStage.width-s.Text.getWidth())*0.5;
	s.Text.y = (LStage.height-s.Text.getHeight())*0.5;
	addChild(s.Text);
	LTweenLite.to(s.Text,0.5,{
			delay:0, 
			alpha:1,
			onComplete: function(){
				LTweenLite.to(s.Text,l,{
					delay:0,
			        alpha:0,
			        onComplete: cb==null?null:cb
			})
		}
	}); 
}

Roles.prototype.showTime = function(type){
	var w = world,
	    mark = w.sceneObj.panel("start",null,"rgba(0,0,0,.7)"),
	    textarr = [];
	
	w.removeEventListener(LEvent.ENTER_FRAME,w.buildObj.loop);
	    
	textarr = [
	    w.sceneObj.addText(20,"成  绩",50,50,"#ffffff",true,1,"#000000"),
	    w.sceneObj.addText(20,w.currentTime.text,120,50,"#ffffff",true,1,"#000000"),
	    w.sceneObj.addText(50,type,145,120,"#eeb552",true,1,"#000000"),
	    w.sceneObj.addButton([15,"重来",10,8,"#ffffff","#4ae3a0"],[300,270,"build"],[1,"rgba(21,132,164,.5)",[0, 0, 50, 30],true,"rgba(0,0,0,1)"])
	];
	for(k in textarr) mark.addChild(textarr[k]);
	dataLayer.addChild(mark);
	delete w.startTime;
}
