function GameOver(){
	var endScene = {
		background : null,
		boss : null,
		score : null,

		init : function(){
			endScene.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.end, 0, 0, 512, 696, 0, 0, 1);
			endScene.boss = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.end, 0, 700, 130, 102, 282, 458, 2, 3, 6);
			endScene.score = new GameFont().startupGameFont(g_score.toString(), 'M-yellow', 'right', 480, 154, 2);
			endScene.background.mouseclick = endScene.mouseclick;
		},

		mouseclick : function(event){
			if(event.offsetX > 148 && event.offsetX < 364 && event.offsetY > 636 &&  event.offsetY < 678 ){
				//click on exit
				g_ApplicationManager.fade(function(){
					g_ApplicationManager.endGame.shutdown();
					g_ApplicationManager.gameMenu = new GameMenu().startupGameMenu();	
				})
			}
		}

	}

	endScene.init();

	return {
		shutdown : function(){
			endScene.background.shutdownVisualGameObject();
			endScene.boss.shutdownAnimatedGameObject();
			endScene.score.shutdownGameFont();
		}
	}
}