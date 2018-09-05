function Build(){
	var s = this;
	    w = world;   
	s.init();
}

Build.prototype.init = function(){
	var s = this;
	w.removeAllChild();
	w.removeEventListener(LEvent.ENTER_FRAME,w.loop);
	Para.themebg.close();
	w.sceneWidth = mapPara.mapWidth;
	w.sceneHeight = mapPara.mapHeight;
	//添加背景
	s.addBackground();
	//添加音效
	s.addSounds();
	//添加边框
	s.addBorder();
	//添加角色
	s.addLeading();
	//添加赛道
	s.addTrack();
	//初始化规则
	s.setRole();
	//准备
	s.ready();
	//开启loop
	world.addEventListener(LEvent.ENTER_FRAME,s.loop);
}

Build.prototype.ready = function(){
	var readyObj = new Ready(w.LeadingObj);
}

Build.prototype.setRole = function(){
	w.role = new Roles();
}

Build.prototype.addBackground = function(){
	var s = this,
	    border = 20,
	    bitmap = new LBitmap(new LBitmapData(mapPara["map"]));
	    startLineimg = new LBitmap(new LBitmapData(datalist["startLine"],0,0,100,mapPara.startLength)),
	    startLinefilter = new LSprite();
	    startLinefilter.x = mapPara.startLinex;
	    startLinefilter.y = mapPara.startLiney;
	    startLinefilter.addBodyPolygon(border,mapPara.startLength,0,4.0,0.02,0.2,{categoryBits:8,maskBits:10,groupIndex:0});
	    startLinefilter.addChild(startLineimg);
	    
	w.addChild(bitmap);
	w.addChild(startLinefilter);
}

Build.prototype.addSounds = function(){
	var s = this,
	    bg = mapPara.bg,
	    bgimg = Para[bg];
	if(Para.complate.playing) Para.complate.close();  
	
	Para.start.play();
	Para.start.addEventListener(LEvent.SOUND_COMPLETE ,function(){bgimg.play(0.50,100)});
	
}

Build.prototype.addBorder = function(){
	var s = this;

	/**创建边框*/
	//设置边框尺寸
	var borderSize = 10;
	//顶部边框
	s.createBodyPolygon(w.sceneWidth/2,5,w.sceneWidth,borderSize,0,0,10,0.5);
	//右部边框
	s.createBodyPolygon(w.sceneWidth-5,w.sceneHeight/2,borderSize,w.sceneHeight,0,0,10,0.5);
	//底部边框
	s.createBodyPolygon(w.sceneWidth/2,w.sceneHeight-5,w.sceneWidth,borderSize,0,0,10,0.5);
	//左部边框
	s.createBodyPolygon(5,w.sceneHeight/2,borderSize,w.sceneHeight,0,0,10,0.5);
}

Build.prototype.createBodyPolygon = function(sx,sy,width,height,type,density,friction,restitution){
	var s = this, 
	    bodybox = new LSprite();
	bodybox.x = sx;
	bodybox.y = sy;
	bodybox.addBodyPolygon(width,height,type,density,friction,restitution);
	w.addChild(bodybox);
}

Build.prototype.addLeading = function(){
	
	//创建玩家对象
	w.LeadingObj = new Leading(mapPara.startx,mapPara.starty);
	w.addChild(w.LeadingObj);
}

Build.prototype.addTrack = function(){
	var s = this,
	    TrackObj = new Track();
	w.addChild(TrackObj);  
}

Build.prototype.loop = function(event){
	var s = event.target,
	    bo = s.LeadingObj.myleading.box2dBody.GetUserData(),
	    item,
	    reach,
	    currentTime,
	    minute,
	    seconds,
	    milliseconds,
	    sumseconds;
	
	s.x = LStage.width*0.5 - (bo.x + bo.getWidth()*0.5);
	s.y = LStage.height*0.5 - (bo.y + bo.getHeight()*0.5);
	
	/**处理位置*/
	if(s.x > 0){
		s.x = 0;
	}else if(s.x < LStage.width - s.sceneWidth){
		s.x = LStage.width - s.sceneWidth;
	}
	if(s.y > 0){
		s.y = 0;
	}else if(s.y < LStage.height - s.sceneHeight){
		s.y = LStage.height - s.sceneHeight;
	}
	
	s.LeadingObj.Animation(s.LeadingObj);
	
	for(key in checkPoint){
		item = checkPoint[key];
		reach = w.role.chackPoint(item,{x:bo.x,y:bo.y});
		if(reach) w.role.setCheck(key);
	}
	
	if(s.startTime&&s.currentTime){
		currentTime = new Date().getTime() - s.startTime;
		sumseconds = parseInt(currentTime/1000);
		minute = parseInt(sumseconds/60)<10?"0"+parseInt(sumseconds/60):parseInt(sumseconds/60);
		seconds = sumseconds%60<10?"0"+(sumseconds%60):sumseconds%60;
		milliseconds = parseInt(currentTime/10)%100<10?"0"+parseInt(currentTime/10)%100:parseInt(currentTime/10)%100;
		s.currentTime.text = minute +" : " + seconds + " : "+milliseconds;
		if(currentTime>mapPara.limitTime) s.role.fail();
	}
	
	LStage.box2d.synchronous();
}