function Sounds(){
	var s = this;
	s.url = "./sounds/";
	s.init();
}

Sounds.list = [
    {name:"themebg"},
    {name:"citybg"},
    {name:"forestbg"},
    {name:"drift"},
    {name:"start"},
    {name:"last"},
    {name:"complate"},
    {name:"fail"}
]

Sounds.prototype.init = function(){
	var s = this;
	
	for(key in Sounds.list){
		item = Sounds.list[key];
		s.createSound(item);
	}
}

Sounds.prototype.createSound = function(item){
	var s = this,
	    sound = new LSound();
	
	//加载对应的音乐文件
	sound.load(datalist[item.name]);
	//文件加载完成后执行
	Para[item.name] = sound;
}
