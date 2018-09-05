init(45, "myGame", 1000, 600, gameInit);
var world,
    levelNum = 9,
	backLayer,
	loadingLayer,
	dataLayer,
	datalist = {},
	Para = {},
	mapPara = {},
	checkPoint = [],
	mapData = [],
	JS_FILE_PATH = "./main/",
	LEVEL_FILE_PATH = "./data/",
	LEVEL_MAP_PATH = "./levelMap/",
	loadData = [{
		path: JS_FILE_PATH + "Main.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Scene.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Ready.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Leading.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Sounds.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Track.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Drift.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Build.js",
		type: "js"
	}, {
		path: JS_FILE_PATH + "Roles.js",
		type: "js"
	}, {
		name: "car",
		path: "./images/car.png",
		type: "png"
	}, {
		name: "startLine",
		path: "./images/startLine.png",
		type: "png"
	}, {
		name: "speedDial",
		path: "./images/speedDial.png",
		type: "png"
	}, {
		name: "finger",
		path: "./images/finger.png",
		type: "png"
	}, {
		name: "carbg",
		path: "./images/carbg.jpg",
		type: "jpg"
	}, {
		name: "themebg",
		path: "./sounds/themebg.mp3"
	}, {
		name: "citybg",
		path: "./sounds/citybg.mp3"
	}, {
		name: "forestbg",
		path: "./sounds/forestbg.mp3"
	}, {
		name: "drift",
		path: "./sounds/drift.mp3"
	}, {
		name: "start",
		path: "./sounds/start.mp3"
	}, {
		name: "last",
		path: "./sounds/last.mp3"
	}, {
		name: "complate",
		path: "./sounds/complate.mp3"
	}, {
		name: "fail",
		path: "./sounds/fail.mp3"
	}, {
		name: "level101",
		path: LEVEL_FILE_PATH + "level101.js",
		type: "js"
	}, {
		name: "map101",
		path: LEVEL_MAP_PATH + "level101.png",
		type: "png"
	}];

function gameInit() {
	LGlobal.setDebug(true);
	LStage.box2d = new LBox2d([0, 0]);
	backLayer = new LSprite();
	addChild(backLayer);

	if(LStage.canTouch == true) {
		document.body.style.margin = "0px";
		document.body.style.padding = "0px";
		LStage.stageScale = LStageScaleMode.SHOW_ALL;
		LSystem.screen(LStage.FULL_SCREEN);
	}

	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);

	LLoadManage.load(
		loadData,
		function(progress) {
			loadingLayer.setProgress(progress);
		},
		function(result) {
			datalist = result;
			backLayer.removeChild(loadingLayer);
			world = new Main();
			addChild(world);
			world.init();
			dataLayer = new LSprite();
			addChild(dataLayer);
		}
	);
}