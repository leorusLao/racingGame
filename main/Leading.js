

function Leading(sx,sy){
	  var s = this;
	  base(s,LSprite,[]);
	  
	  s.sx = sx;
	  s.sy = sy;
	  
	  s.carImg = new LBitmap(new LBitmapData(datalist["car"],0,0,50,35)); 
	  s.speedDial = new LBitmap(new LBitmapData(datalist["speedDial"],0,0,250,250));
	  s.speedDial.scaleX = 0.6;
	  s.speedDial.scaleY = 0.6;
	  s.speedDial.x = 830;
	  s.speedDial.y = 430;
	  
	  s.finger = new LBitmap(new LBitmapData(datalist["finger"],0,0,250,250));
	  s.finger.scaleX = 0.4;
	  s.finger.scaleY = 0.4;
	  s.finger.x = 856;
	  s.finger.y = 453;
	  
	  s.force = 900;
	  
	  s.moveVec = new LStage.box2d.b2Vec2();
	  
	  s.limit = [16,37,38,39,40];
	  
	  s.turn = 0;
	  
	  s.driftObg = new Drift();
	  
	  s.operation = {};
	  
	  LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,function(e){
	  	  if(s.limit.indexOf(e.keyCode)>=0){
		     s.operation[e.keyCode] = true;
		  } 
	  })
	  
	  LEvent.addEventListener(window,LKeyboardEvent.KEY_UP,function(e){
	  	  delete s.operation[e.keyCode];
	  })
	  
	  s.init();
}

Leading.prototype.Animation = function(s){
	var speedx = s.myleading.box2dBody.GetLinearVelocity().x,
	    speedy = s.myleading.box2dBody.GetLinearVelocity().y,
	    speed = Math.sqrt(speedx*speedx+speedy*speedy);
	
	
	if(38 in s.operation){
		s.moveVec.x = s.force*Math.cos(s.myleading.rotate);
		s.moveVec.y = s.force*Math.sin(s.myleading.rotate);
	}
	if(40 in s.operation){
		s.moveVec.x = -s.force*Math.cos(s.myleading.rotate);
		s.moveVec.y = -s.force*Math.sin(s.myleading.rotate);
	}
	if(37 in s.operation) {
		s.myleading.setRotate(s.myleading.rotate-0.1);
		s.turn++;
	}
	if(39 in s.operation) {
		s.myleading.setRotate(s.myleading.rotate+0.1);
		s.turn++;
	}
	if(!(38 in s.operation)&&!(40 in s.operation)){
		s.moveVec.SetZero();
	}
	if(!(37 in s.operation)&&!(39 in s.operation)) s.turn = 0;
	
	if(s.turn>5&&speed>10){
		s.drift(s,speedx,speedy);
	}else if(speed!==0){
		s.driftObg.close();
	}
	
	//给车体施加牵引力
	s.myleading.box2dBody.ApplyForce(s.moveVec,s.myleading.box2dBody.GetWorldCenter());
	
	s.finger.rotate = speed*10;
}

Leading.prototype.drift = function(s,speedx,speedy){
	s.driftObg.add(s.myWheelA,s.myWheelB,speedx,speedy);
}

Leading.prototype.init = function(){
	var s = this,
	    sx = s.sx,
	    sy = s.sy,
	    wheelR = 5,
	    myLeading = new LSprite(),
	    myWheelA = new LSprite(),
	    myWheelB = new LSprite();
	    
	//车辆主体    
	myLeading.x = sx;
	myLeading.y = sy;
	myLeading.addChild(s.carImg);
	myLeading.addBodyPolygon(50,35,1,10.0,0.02,0.2);
	world.addChild(myLeading);
	
	myLeading.prototype = new LStage.box2d.b2ContactFilter();
	
	//车轮A
	myWheelA.x = sx-20;
	myWheelA.y = sy;
	myWheelA.addBodyCircle(wheelR,wheelR,wheelR,1);
	world.addChild(myWheelA);
	
	//车轮B
	myWheelB.x = sx-20;
	myWheelB.y = sy-10;
	myWheelB.addBodyCircle(wheelR,wheelR,wheelR,1);
	world.addChild(myWheelB);
	
	//设置关节
	LStage.box2d.setWeldJoint(myLeading.box2dBody,myWheelA.box2dBody);
	LStage.box2d.setWeldJoint(myLeading.box2dBody,myWheelB.box2dBody);
	
	//设置主体
	s.myleading = myLeading; 
	//车轮
	s.myWheelA = myWheelA;
	s.myWheelB = myWheelB;
	
	dataLayer.addChild(s.speedDial);
	dataLayer.addChild(s.finger);
	
	//移动阻尼
	s.myleading.box2dBody.SetLinearDamping(2);
	//转动惯量阻尼
	s.myleading.box2dBody.SetAngularDamping(10);
}
