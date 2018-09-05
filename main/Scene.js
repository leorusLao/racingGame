function Scene(){
	var s = this;
	s.init();
}

Scene.prototype = {
	
	init: function(){
		var w = world;
		w.removeAllChild();
		w.x = 0;
		w.y = 0;
		if(dataLayer) dataLayer.removeAllChild();
		if(Para.complate&&Para.complate.playing) Para.complate.close();
		if(Para.themebg&&!Para.themebg.playing) Para.themebg.play(0,100);
	},
	//初始场景
	initScene: function(){
		var w = world,
		    s = this;
		s.init();    
		s.addbg();
		//oprate
		var startBtn = s.addButton([20,"开始游戏",10,6,"#ffffff","#4ae3a0"],[0,0,"start"]);
		var oprateBtn = s.addButton([20,"操作说明",10,6,"#ffffff","#4ae3a0"],[0,40,"explain"]);
		var aboutBtn = s.addButton([20,"关于",30,6,"#ffffff","#4ae3a0"],[0,80,"about"]);
		//show
		var oprate = s.createRect(1,"rgba(21,132,164,.5)",[0, 0, 100, 110],true,"rgba(21,132,164,.5)");
		oprate.x = 450;
		oprate.y = 200;
		oprate.width = 100;
		oprate.height = 200;
		oprate.addChild(startBtn);
		oprate.addChild(oprateBtn);
		oprate.addChild(aboutBtn);
		oprate.addEventListener(LMouseEvent.MOUSE_DOWN,s.oprate);
		w.addChild(oprate);
	},
	
	
	oprate: function(e){
		var w = world;
		switch(e.target.name){
			case "explain":
			     w.sceneObj.explain();
			     break;
			case "about":
			     w.sceneObj.about();
			     break;
			case "start":
			     w.sceneObj.start();
			     break;
			case "level":
			     w.sceneObj.level(e.target.level);
			     break;
			case "build":
			     w.sceneObj.levelBuild();
			     break;
			case "return":
			     w.sceneObj.initScene();
			     break;
		}
	},
	
	level: function(l){
		var s = this;
	    mapPara = window["mapPara"+l];
	    checkPoint = window["checkPoint"+l];
	    mapData = window["mapData"+l];
	    mapPara["map"] = datalist["map"+l];
	    s.levelMessage();
	},
	
	levelMessage: function(){
		var w = world,
		    s = this,
		    textarr = [];
		s.init();    
		s.addbg();
		var levelMessage = s.panel("start");
		textarr = [
		    s.addText(16,"地图：",50,50,"lightgray"),
		    s.addText(16,"圈数：",50,80,"lightgray"),
		    s.addText(16,"限定时间：",50,110,"lightgray"),
		    s.addText(16,mapPara.name,100,50,"lightgray"),
		    s.addText(16,mapPara.num,100,80,"lightgray"),
		    s.addText(16,mapPara.time,130,110,"lightgray"),
		    s.addButton([15,"开始",10,8,"#ffffff","#4ae3a0"],[350,0,"build"],[1,"rgba(21,132,164,.5)",[0, 0, 50, 30],true,"rgba(0,0,0,1)"])
		];
		for(k in textarr) levelMessage.addChild(textarr[k]);
		w.addChild(levelMessage);
	},
	
	levelBuild: function(){
		this.init();
		world.buildObj = new Build(); 	
	},
	
	start: function(){
		var w = world,
		    s = this,
		    i = 1,
		    H = 1,
		    index = 0;
		s.init();    
		s.addbg(); 
		var start = s.panel();
		
		for(;i<=levelNum;i++){
			if(i%7==0){
				H++;
				index = 1;
			}else{
				index++;
			}
			var level =  s.addButton([15,i,10,8,"#ffffff","#4ae3a0"],[index*50,H*50,"level"],[1,"rgba(21,132,164,.5)",[0, 0, 30, 30],true,"rgba(0,0,0,1)"]);
			level.level = 100 + i;
			start.addChild(level);
		}
		w.addChild(start);
	},
	
	explain: function(){
		var w = world,
		    s = this;
		s.init();    
		s.addbg(); 
		var explain = s.panel();
		var explainText = s.addText(16,"操作说明：↑ 键为前进，↓ 为后退，← 为左转，→ 为右转。",50,50,"#ffffff");
		explainText.setWordWrap(true,25);
		explainText.width = 300; 
		explain.addChild(explainText);
		w.addChild(explain);
	},
	
	about: function(){
		var w = world,
		    s = this;
		s.init();    
		s.addbg(); 
		var about = s.panel();
		var aboutText = s.addText(16,"感谢lufy大哥的lufylegend游戏引擎和优化了box2dweb的各路大哥",50,50,"#ffffff");
		aboutText.setWordWrap(true,25);
		aboutText.width = 300; 
		about.addChild(aboutText);
		w.addChild(about);
	},
	
	panel: function(r,rt,pc){
		var s = this,
		    re = r==null?"return":r,
		    rtext = rt==null?"返回":rt,
		    mpc = pc==null?"rgba(21,132,164,.5)":pc,
		    panel = s.createRect(1,"rgba(21,132,164,.5)",[0, 0, 400, 300],true,mpc);
		panel.x = 300;
		panel.y = 150;
		panel.width = 400;
		panel.height = 300;
		var returnBtn =  s.addButton([15,rtext,10,8,"#ffffff","#4ae3a0"],[350,270,re],[1,"rgba(21,132,164,.5)",[0, 0, 50, 30],true,"rgba(0,0,0,1)"]);
		panel.addChild(returnBtn);
		panel.addEventListener(LMouseEvent.MOUSE_DOWN,s.oprate)
		return panel;
	},
	
	addbg: function(){
		var w = world,
	    bitmap = new LBitmap(new LBitmapData(datalist["carbg"]));
	    bitmap.scaleX = 0.5;
	    bitmap.scaleY = 0.5;
	
	    w.addChild(bitmap); 
	},
	
	createRect: function(b,bc,p,f,fc){
		var obj = new LSprite();
		obj.graphics.drawRect(b,bc,p,f,fc);
		return obj;
	},
	
	addButton: function(ts,bs,rs){
		var s = this;
		var up = rs ? s.createRect(rs[0],rs[1],rs[2],rs[3],rs[4]) : s.createRect(1,"rgba(21,132,164,.5)",[0, 0, 100, 30],true,"rgba(0,0,0,1)");
		var txt = s.addText(ts[0],ts[1],ts[2],ts[3],ts[4]);
	    up.addChild(txt);
	    
	    var down = rs ? s.createRect(rs[0],rs[1],rs[2],rs[3],rs[4]) : s.createRect(1,"rgba(21,132,164,.5)",[0, 0, 100, 30],true,"rgba(0,0,0,1)");
	    var txt1 = s.addText(ts[0],ts[1],ts[2],ts[3],ts[5]);
	    down.addChild(txt1)
	
	    var btn = new LButton(up,down);
	    btn.x = bs[0];
	    btn.y = bs[1];
	    btn.name = bs[2];
        return btn;
	},
	
    addText: function(size,text,x,y,c,ib,b,bc){
    	var txt = new LTextField();
    	txt.size = size;
	    txt.text = text;
	    txt.x = x;
	    txt.y = y;
	    txt.color = c;
	    txt.stroke = ib==null?false:ib;
	    txt.lineWidth = b==null?1:b;
	    txt.lineColor = bc==null?"#000000":bc;
	    return txt;
    }
}
