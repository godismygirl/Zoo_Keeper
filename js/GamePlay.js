function GamePlay(){
	//left side single score record
	var record = {
		init : function(){

		},

		shutDown : function(){

		}

	}

	//total score
	var score = {
		init : function(){
			
		}
	}

	//level up & stage change
	var level = {
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
		init : function(){

		}
	}

	//main play field
	var play = {
		init : function(){
			
		}
	}

	//ovrall handler
	var zooKeeper = {
		init : function(){
			record.init();
			score.init();
			level.init();
			mascot.init();
			timer.init();
			play.init();
		}
	}

	return zooKeeper;

}