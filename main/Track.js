function Track(){
	var s = this;
	base(s,LSprite,[]);
	
	s.mapData = mapData;
	
	s.init();
};
Track.TYPE = {
	Wall:"wall",
	Tree:"tree"
};
Track.ANGLE = {
	Vertical:"vertical",
	Horizental:"horizental"
};
Track.prototype.init = function(){
	var s = this;
	
	for(key in s.mapData){
		var item = s.mapData[key];
		switch(item.type){
			case "tree":
			     s.addTree(item);
			     break;
			case "wall":
			     s.addWall(item);
			     break;
		}
	}
}
Track.prototype.addTree = function(data){
	var treeObj = new LSprite();
	treeObj.addBodyCircle(data.radius,data.cx,data.cy,0);
	world.addChild(treeObj);
}

Track.prototype.addWall = function(data){
	var wallObj = new LSprite(),
	    wallBorder = 18;
	wallObj.x = data.cx;
	wallObj.y = data.cy;
	switch(data.angle){
		case "horizental":
	         wallObj.addBodyPolygon(data.length,wallBorder,0);
	         break;
	    case "vertical":
	         wallObj.addBodyPolygon(wallBorder,data.length,0);
	         break;
	};
	world.addChild(wallObj);
}

