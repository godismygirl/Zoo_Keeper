function Scoreboard(){
	this.background = null;
	this.avatar = null;
	this.font = null;

	this.id = 0;
	this.quota = 0;
	this.score = 0;

	this.startupScoreboard = function(animalID, quota){
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
		this.id = animalID;
		this.quota = quota;

		this.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 2, 504, 64, 87, 0, animalID*87, 4);
		this.avatar = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, animalID*42 , 418, 42, 42, 12, animalID*87 + 8, 5);
		this.font = new GameFont().startupGameFont('00','S-yellow', 'left', 10, animalID*87 + 53, 5);

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

		if(this.score >= this.quota){
			this.qualify();
		}
	}

	this.qualify = function(){
		this.background.sy = this.background.sy + 91;
		this.avatar.sy = this.avatar.sy + 42;
		for(var i=0,l=this.font.member.length; i<l; i++){
			this.font.member[i].sy = this.font.member[i].sy + 28;
		}
	}

	this.reset = function(cap){
		this.quota = cap;
		this.score = 0;

		this.background.sy = 504;
		this.avatar.sy = animalID*42;
		for(var i=0,l=this.font.member.length; i<l; i++){
			this.font.member[i].sx = 2;
			this.font.member[i].sy = 74;
		}
	}

	this.shutdownScoreboard = function(){
		this.background.shutdownVisualGameObject();
		this.avatar.shutdownVisualGameObject();
		this.font.shutdownGameFont();
	}
}