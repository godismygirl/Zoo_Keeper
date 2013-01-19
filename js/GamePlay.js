function GamePlay(){
	//left side single score record
	var record = {
		member : [],

		init : function(){
			for(var i=0; i<8; i++){
				record.member.push(new Scoreboard().startupScoreboard(i));	
			}
		},

		shutDown : function(){
			for(var i=0, l=record.member.length; i<l; i++){
				record.member[i].shutDownScoreboard();
			}
		}

	}

	//total score
	var score = {
		total : null,	//hold total score game font object
		text : null,	//hold the word "level" image
		level : null,	//hold current level object
		init : function(){
			g_score = 0;
			score.total = new GameFont().startupGameFont('0', 'L', 'right', 480, 20, 3);
			score.text = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 378, 504, 96, 24, 80, 240, 3);
			score.level = new GameFont().startupGameFont('1', 'S-yellow', 'left', 178, 240, 3);
		},

		updateScore : function(int){
			g_score = g_score + int;
			score.total.updateGameFont(g_score.toString());
		},

		shutDown : function(){
			score.total.shutDownGameFont();
			score.text.shutDownVisualGameObject();
			score.level.shutDownGameFont();
		}
	}

	//level up & stage change
	var upgrade = {
		init : function(){
			
		}
	}

	//top most animation looping
	var mascot = {
		background : null,
		animal : null,
		twitched : false,
		setStage : function(stageName){
			var sx, sy, w, h, x, y;
			switch (stageName) 
			{
				case 'crocodile' : 
					i = 0; sy = 0; w = 228; h = 212; x = 198; y = 35;
					break
				case 'elephant' :
					i = 1; sy = 212; w = 324; h = 196; x = 138; y = 48;
					break
				case 'giraffe' :
					i = 2; sy = 408; w = 244; h = 276; x = 196; y = 1;
					break
				case 'hippo' :
					i = 3; sy = 684; w = 292; h = 228; x = 138; y = 52;
					break
				case 'lion' :
					i = 4; sy = 912; w = 228; h = 228; x = 178; y = 6;
					break
				case 'monkey' :
					i = 5; sy = 1140; w = 164; h = 196; x = 182; y = 63;
					break
				case 'panda' :
					i = 6; sy = 1336; w = 148; h = 228; x = 238; y = 39;
					break
				default :
			}

			mascot.background.setImage(g_ResourceManager.mascotBg, 0, 280*i, 512, 278, 1);
			mascot.animal.setAnimation(g_ResourceManager.mascot, 0, sy, w, h, x, y, 2, 2);
		},

		twitch : function(){
			mascot.animal.frameCount = 4;
			mascot.twitched = true;
		},

		update : function(){
			if(mascot.twitched && mascot.animal.currentFrame === 3){
				mascot.animal.frameCount = 2;
				mascot.twitched = false;
			}
		},

		init : function(){
			mascot.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.mascotBg, 0, 0, 512, 278, 0, 0, 1);
			mascot.animal = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.mascot, 0, 0, 228, 212, 198, 35, 2, 2, 2);
			mascot.animal.update = mascot.update;
		},
		
		shutDown : function(){
			mascot.background.shutDownVisualGameObject();
			mascot.animal.shutDownAnimatedGameObject();
		}

	}

	//time count
	var timer = {
		counter : null,
		limit : 120,
		init : function(timeLimit){
			timer.counter = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 516, 4, 12, 374, 84, 301, 2);
			timer.counter.update = timer.timeTick;
			if(timeLimit){timer.limit = timeLimit}
		},

		bouns : function(dh){
			if(timer.counter.height + dh < 374){
				timer.counter.sy = timer.counter.sy - dh;
				timer.counter.y = timer.counter.y - dh;
				timer.counter.height = timer.counter.height + dh;
			}else{
				timer.counter.sy = 4;
				timer.counter.y = 301;
				timer.counter.height = 374;
			}
		},

		timeTick : function(dt, context, xScroll, yScroll){
			var dl = dt/timer.limit * 374;
			this.y = this.y + dl;
			this.sy = this.sy + dl;
			this.height = this.height - dl;
		}
	}

	//main play field
	var play = {
		background : null,
		panel : [],

		init : function(){
			play.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 0, 0, 512, 418, 0, 278, 1);
		}
	}

	//ovrall handler
	var zooKeeper = {
		init : function(){
			record.init();
			score.init();
			upgrade.init();
			mascot.init();
			timer.init();
			play.init();

			record.member[0].updateScore(15);
			record.member[0].qualify();
			score.updateScore(203);

		},

		shutDown : function(){
			g_GameObjectManager.gameObjects = [];
		}
	}

	return zooKeeper;

}

function Scoreboard(){
	this.background = null;
	this.avatar = null;
	this.font = null;
	this.score = 0;
	this.reachQuota = false;

	this.startupScoreboard = function(animalID){
		/***********************
			@param	animalID 		integer 0 : Monkey
											1 : Panda
											2 : Giraffe
											3 : Hippo
											4 : Elephant
											5 : Frog
											6 : Lion
											7 : Rabbit 
		***********************/
		this.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 2, 504, 64, 87, 0, animalID*87, 3);
		this.avatar = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, animalID*42 , 418, 42, 42, 12, animalID*87 + 8, 4);
		this.font = new GameFont().startupGameFont('00','S-yellow', 'left', 10, animalID*87 + 53, 4);

		return this;
	}

	this.updateScore = function(score){
		this.score = this.score + score;
		var str;
		if(this.score < 10){
			str = '0'+this.score.toString();
		}else{
			str = this.score.toString();
		}
		this.font.updateGameFont(str);
	}

	this.qualify = function(){
		this.reachQuota = true;
		this.background.sy = this.background.sy + 91;
		this.avatar.sy = this.avatar.sy + 42;
		for(var i=0,l=this.font.member.length; i<l; i++){
			this.font.member[i].sy = this.font.member[i].sy + 28;
		}
		this.reachQuota = true;
	}

	this.shutDownScoreboard = function(){
		this.background.shutDownVisualGameObject();
		this.avatar.shutDownVisualGameObject();
		this.font.shutDownGameFont();
	}
}