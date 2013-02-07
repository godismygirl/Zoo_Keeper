function StageChange(){
	this.multi = null;
	this.quota = null;
	this.level = null;
	this.currentLevel = null;

	this.speed = 600;
	this.pauseDuration = 1;
	this.timePass = 0;

	this.startupStageChange = function(level, levelStage){
		var _x;
		if(level*3 + levelStage - 1 > 9){
			_x = 630;
		}else{
			_x = 650;
		}
		this.startupVisualGameObject(g_ResourceManager.main, 70, 572, 360, 150, 523, 400, 6);
		this.multi = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 378, 534, 34, 34, _x, 490, 7);
		this.quota = new GameFont().startupGameFont( (level * 3 + levelStage - 1).toString(), 'L', 'left', _x+45, 476, 7 );

		this.level = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 340, 422, 176, 64, -240, 354, 7);
		this.currentLevel = new GameFont().startupGameFont(level.toString(), 'XL', 'left', -55, 354, 6);

		this.update = this.slideIn;	
		
		return this;
	}

	this.reset = function(level, levelStage){
		var _x;
		if(level*3 + levelStage - 1 > 9){
			_x = 630;
		}else{
			_x = 650;
		}
		this.x = 523;
		this.multi.x = _x;
		this.quota.x = _x+45;
		this.quota.updateGameFont( (level * 3 + levelStage - 1).toString() );
		this.level.x = -240;
		this.currentLevel.x = -55;
		this.currentLevel.updateGameFont( level.toString() );
		this.update = this.slideIn;
	}

	this.slideIn = function(dt, context, xScroll, yScroll){
		var bgSlideEnd = false;
		var hdSlideEnd = false;
		//background moving
		if(this.quota.member.length === 1){

			if(this.x - this.speed * dt > 123){
				this.x = this.x - this.speed * dt;
				this.multi.x = this.multi.x - this.speed * dt;
				this.quota.member[0].x = this.quota.member[0].x - this.speed * dt;
			}else{
				bgSlideEnd = true;
				this.x = 123;
				this.multi.x = 250;
				this.quota.member[0].x = 295;
			}

		}else{

			if(this.x - this.speed * dt > 123){
				this.x = this.x - this.speed * dt;
				this.multi.x = this.multi.x - this.speed * dt;
				this.quota.member[0].x = this.quota.member[0].x - this.speed * dt;
				this.quota.member[1].x = this.quota.member[1].x - this.speed * dt;

			}else{
				bgSlideEnd = true;
				this.x = 123;
				this.multi.x = 230;
				this.quota.member[0].x = 275;
				this.quota.member[1].x = 315;
			}
		}

		//title moving
		if(this.currentLevel.member.length === 1){

			if(this.level.x + this.speed * dt < 186){
				this.level.x = this.level.x + this.speed * dt;
				this.currentLevel.member[0].x = this.currentLevel.member[0].x + this.speed * dt;
			}else{
				hdSlideEnd = true;
				this.level.x = 186;
				this.currentLevel.member[0].x = 371;
			}

		}else{

			if(this.level.x + this.speed * dt < 165){
				this.level.x = this.level.x + this.speed * dt;
				this.currentLevel.member[0].x = this.currentLevel.member[0].x + this.speed * dt;
				this.currentLevel.member[1].x = this.currentLevel.member[1].x + this.speed * dt;
			}else{
				hdSlideEnd = true;
				this.level.x = 165;
				this.currentLevel.member[0].x = 392;
				this.currentLevel.member[1].x = 350;
			}

		}
		
		if(bgSlideEnd && hdSlideEnd){
			this.timePass = 0;
			this.update = this.pause;
		}
	}

	this.pause = function(dt, context, xScroll, yScroll){
		this.timePass = this.timePass + dt;
		if(this.timePass > this.pauseDuration){
			this.update = this.slideOut;
		}
	}

	this.slideOut = function(dt, context, xScroll, yScroll){
		var bgSlideEnd = false;
		var hdSlideEnd = false;
		//background slideout
		if(this.x - this.speed * dt > -370){

			this.x = this.x - this.speed * dt;
			this.multi.x = this.multi.x - this.speed * dt;

			if(this.quota.member.length === 1){
				this.quota.member[0].x = this.quota.member[0].x - this.speed * dt;
			}else{
				this.quota.member[0].x = this.quota.member[0].x - this.speed * dt;
				this.quota.member[1].x = this.quota.member[1].x - this.speed * dt;
			}
		}else{
			bgSlideEnd = true;
		}

		//title slideout
		if(this.level.x + this.speed * dt < 520){
			this.level.x = this.level.x + this.speed * dt;

			if(this.currentLevel.member.length === 1){
				this.currentLevel.member[0].x = this.currentLevel.member[0].x + this.speed * dt;
			}else{
				this.currentLevel.member[0].x = this.currentLevel.member[0].x + this.speed * dt;
				this.currentLevel.member[1].x = this.currentLevel.member[1].x + this.speed * dt;
			}
			
		}else{
			hdSlideEnd = true;
		}

		if( bgSlideEnd && hdSlideEnd ){
			this.update = null;
			//init next stage
			g_ApplicationManager.gamePlay.setStage();
		}

	}

	this.shutdownStageChange = function(){
		this.multi.shutdownVisualGameObject();
		this.currentLevel.shutdownGameFont();
		this.quota.shutdownGameFont();
		this.level.shutdownVisualGameObject();
		this.shutdownVisualGameObject();
	}
}
StageChange.prototype = new VisualGameObject;