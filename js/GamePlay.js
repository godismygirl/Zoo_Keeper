function GamePlay(){
	//left side single score record
	var record = {
		member : [],

		init : function(cap){
			for(var i=0; i<8; i++){
				record.member.push(new Scoreboard().startupScoreboard(i, cap));	
			}
		},

		reset : function(cap){
			//cap : 	new quota
			for(var i=0; i<8; i++){
				record.member[i].reset(cap);	
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
		stage : null,

		transition : function(level, levelStage){
			/*******************
				@param level : 			current difficult level
				@param levelStage : 	current stage in current difficult level( total 3 stages in each difficult level )
				@param speed : 			animation speed ( pxiels / second )
			********************/
			if(upgrade.stage){
				upgrade.stage.shutDownStageChange();
			}
			upgrade.stage = new StageChange().startupStageChange(level, levelStage);
			upgrade.stage.animate();
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
			timer.counter = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 516, 4, 12, 374, 84, 301, 4);
			if(timeLimit){timer.limit = timeLimit}
		},

		countdown : function(){
			timer.counter.update = timer.timeTick;
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

		reset : function(limit){
			timer.limit = limit;
			timer.counter.y = 301;
			timer.counter.sy = 4;
			timer.counter.height = 374;
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
		field : null,
		picker : null,
		panel : [8],
		toCheck : [],
		toExplode : [],

		selected : false, // hold selected piece row, col index  "selected:{row: int, col:int}"


		init : function(){
			play.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 0, 0, 512, 418, 0, 278, 3);
			play.field = new VisualGameObject().startupVisualGameObject(g_ResourceManager.main, 0, 724, 368, 368, 119, 304, 1);
			play.picker = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.panels, 0, 416, 58, 58, 520, 400, 4, 2, 4)

			var xPosition, yPosition;
			for(var i=0; i<8; i++){
				play.panel[i] = [];
				for(var j=0; j<8; j++){
					xPosition = 119 + j*46;
					yPosition = 304 + i*46;
					play.panel[i].push(new Piece().startupPiece(i, j)) 
				}
			}

			play.field.mouseclick = play.pieceClick;
		},

		pieceClick : function(event){

			var rowIndex = Math.floor( (event.offsetY - play.field.y) / 46);
			var colIndex = Math.floor( (event.offsetX - play.field.x) / 46);
			
			if( rowIndex >= 0 && rowIndex < 8 && colIndex >= 0 && colIndex <8){

				if(!play.selected){
					
					play.pickerOn(rowIndex, colIndex);
					//piece wink on click
					play.panel[rowIndex][colIndex].wink();

				}else if( !(rowIndex === play.selected.row && colIndex === play.selected.col) ){

					play.panel[play.selected.row][play.selected.col].winkOff();
					if(Math.abs(rowIndex - play.selected.row) + Math.abs(colIndex - play.selected.col) > 1){
						//not adjacent					
						play.pickerOn(rowIndex, colIndex);
						play.panel[rowIndex][colIndex].wink();
					}else{
						//adjacent
						play.swap(rowIndex, colIndex);
					}

				}

			}

		},

		swap : function(row, col, reverse){
			/************************************************************************
				@param row : 		row index of target piece to change position
				@param col : 		col index of target piece to change position
				@param reverse : 	if reverse animation ( boolean )
			*************************************************************************/
			var speed = 200;

			var starter = play.panel[play.selected.row][play.selected.col];
			var ender = play.panel[row][col];

			var starterX = starter.x;
			var starterY = starter.y;
			var enderX = ender.x;
			var enderY = ender.y;

			var direction;
			var originDirection;
			
			
			if(play.selected.row !== row){
				direction = starter.y - enderY < 0? 1 : -1;
				originDirection = direction;

				play.field.update = function(dt, context, xScroll, yScroll){

					starter.y = starter.y + speed*dt*direction;
					ender.y = ender.y - speed*dt*direction;

					if( (starter.y - starterY)*originDirection < 0 ){
						starter.y = starterY;
						ender.y = enderY;
						play.field.update = null;
					}

					if( (starter.y - enderY)*originDirection > 0 ){
						if(!reverse){
							//fix position
							starter.y = enderY;
							ender.y = starterY;
							//stop animation
							play.field.update = null;
							//change piece position in panel
							play.panel[play.selected.row][play.selected.col] = ender; 
							play.panel[row][col] = starter;
							//push in check array
							play.toCheck.push([play.selected.row, play.selected.col]);
							play.toCheck.push([row, col]);
							play.pieceCheck();
						}else{
							//fix position
							starter.y = enderY;
							ender.y = starterY;
							//change piece position in panel
							play.panel[play.selected.row][play.selected.col] = ender; 
							play.panel[row][col] = starter;
							//stop animation
							play.field.update = null;
							//turn off picker
							play.pickerOff();
						}
						
					}
				}
			}

			if(play.selected.col !== col){
				direction = starter.x - enderX < 0? 1 : -1;
				originDirection = direction;

				play.field.update = function(dt, context, xScroll, yScroll){
				
					starter.x = starter.x + speed*dt*direction;
					ender.x = ender.x -speed*dt*direction;

					if( (starter.x - starterX)*originDirection < 0 ){
						starter.x = starterX;
						ender.x = enderX;
						play.field.update = null;
					}

					if( (starter.x - enderX)*originDirection > 0 ){
						if(!reverse){
							//fix position
							starter.x = enderX;
							ender.x = starterX;
							//stop animation
							play.field.update = null;
							//change piece position in panel
							play.panel[play.selected.row][play.selected.col] = ender; 
							play.panel[row][col] = starter;
							//push in check array
							play.toCheck.push([play.selected.row, play.selected.col]);
							play.toCheck.push([row, col]);
							play.pieceCheck()
						}else{
							//fix position
							starter.x = enderX;
							ender.x = starterX;
							//change piece position in panel
							play.panel[play.selected.row][play.selected.col] = ender; 
							play.panel[row][col] = starter;
							//stop animation
							play.field.update = null;
							//turn off picker
							play.pickerOff();
						}
					}
				}
			}
	
		},

		pieceCheck : function(){
			
			for(var i=0, l=play.toCheck.length; i<l; i++){

				var verticalCheckResult = [];
				var horizontalCheckResult = [];
				var rowIndex = play.toCheck[i][0];
				var colIndex = play.toCheck[i][1];

				//vertical check
				if(rowIndex > 0 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex - 1][colIndex].id){
					verticalCheckResult.push({r:rowIndex - 1, c:colIndex});
					if(rowIndex > 1 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex - 2][colIndex].id){
						verticalCheckResult.push({r:rowIndex - 2, c:colIndex});
					}
				}

				if(rowIndex < 7 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex + 1][colIndex].id){
					verticalCheckResult.push({r:rowIndex + 1, c:colIndex});
					if(rowIndex < 6 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex + 2][colIndex].id){
						verticalCheckResult.push({r:rowIndex + 2, c:colIndex});
					}
				}

				//horizontal check
				if(colIndex > 0 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex][colIndex - 1].id){
					horizontalCheckResult.push({r:rowIndex, c:colIndex - 1});
					if(colIndex > 1 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex][colIndex - 2].id){
						horizontalCheckResult.push({r:rowIndex, c:colIndex - 2});
					}
				}

				if(colIndex < 7 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex][colIndex + 1].id){
					horizontalCheckResult.push({r:rowIndex, c:colIndex + 1});
					if(colIndex < 6 && play.panel[rowIndex][colIndex].id === play.panel[rowIndex][colIndex + 2].id){
						horizontalCheckResult.push({r:rowIndex, c:colIndex + 2});
					}
				}

				if( !(verticalCheckResult.length < 2 && horizontalCheckResult.length < 2)){
					//console.log('boom')
					if(verticalCheckResult.length >= 2){
						play.toExplode = play.toExplode.concat(verticalCheckResult);
					}
					if(horizontalCheckResult.length >= 2){
						play.toExplode = play.toExplode.concat(horizontalCheckResult);
					}
					play.toExplode.push({r:rowIndex, c:colIndex});
				}

			}

			if(play.toExplode.length > 0){
				play.pieceExplode();
			}else{
				play.swap(play.toCheck[1][0], play.toCheck[1][1], true);
			}
			//clear toCheck array
			play.toCheck = [];
		},

		pieceExplode : function(){
			for(var i=0, l=play.toExplode.length; i<l; i++){
				play.panel[ play.toExplode[i].r ][ play.toExplode[i].c ].explode();
			}
			play.toExplode = [];
			play.pickerOff();
		},

		shuffle : function(){

		},

		pickerOn : function(row, col){
			play.picker.x = play.panel[row][col].x - 6;
			play.picker.y = play.panel[row][col].y - 6;
			play.selected = {
				"row" : row,
				"col" : col
			}
		},

		pickerOff : function(){
			play.picker.x = 520;
			play.selected = false;
		}
	}

	//ovrall handler
	var zooKeeper = {
		level : 1,
		currentLevelStage : 1,

		init : function(){
			//custom event binding

			record.init(zooKeeper.level * 3 + zooKeeper.currentLevelStage -1);
			score.init();
			mascot.init();
			timer.init();
			play.init();

			upgrade.transition(zooKeeper.level, zooKeeper.currentLevelStage);

			record.member[0].updateScore(15);
			score.updateScore(203);

			return zooKeeper;
		},

		nextStage : function(){
			if(zooKeeper.currentLevelStage < 3){
				zooKeeper.currentLevelStage ++;
			}else{
				zooKeeper.currentLevelStage = 1;
				zooKeeper.level ++;
			}
			record.reset(zooKeeper.level * 3 + zooKeeper.currentLevelStage -1);
			upgrade.transition(zooKeeper.level, zooKeeper.currentLevelStage);
			timer.reset(timer.limit - 5 * zooKeeper.level);
		},

		setStage : function(){
			//callback after stage change animation, start counting, init animals .etc 
			timer.countdown();
			play.shuffle();

		},

		shutDown : function(){
			g_GameObjectManager.gameObjects = [];
		}
	}

	return zooKeeper;

}