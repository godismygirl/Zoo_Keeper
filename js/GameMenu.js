function GameMenu()
{
	this.hoverOnButton = false;
	this.background = null;
	this.menuAnimation = null;

	this.startupGameMenu = function()
	{
		this.background =  new VisualGameObject().startupVisualGameObject(g_ResourceManager.titlescren, 0, 0, 512, 700, 0, 0, 1);
		this.menuAnimation = new MenuAnimation().startupMenuAnimation();
		this.startupVisualGameObject(g_ResourceManager.titlescren, 44, 704, 424, 64, 44, 437, 2);
		return this;
	}

	this.shutdownGameMenu = function()
    {
    	if(this.background){
    		this.background.shutdownVisualGameObject();
    	}

    	if(this.menuAnimation){
    		this.menuAnimation.shutdownMenuAnimation();
    	}

        this.shutdownVisualGameObject();
    }

	this.update = function()
	{
		switch (this.hoverOnButton)
		{
			case 'start' : 
				this.setImage(g_ResourceManager.titlescren, 44, 704, 424, 64, 44, 437);
				break
			case 'guide' :
				this.setImage(g_ResourceManager.titlescren, 40, 772, 432, 64, 40, 501);
				break
			case 'rank' :
				this.setImage(g_ResourceManager.titlescren, 90, 840, 332, 64, 90, 565);
				break
			default : 
		}
	}

	this.mousemove = function(event)
	{
		if(event.offsetX > 90 && event.offsetX < 418 && event.offsetY > 445 && event.offsetY < 625 ){
			if( event.offsetY <= 497 ){
				this.hoverOnButton = 'start';
			}else if( event.offsetY > 497 && event.offsetY < 561 ){
				this.hoverOnButton = 'guide';
			}else{
				this.hoverOnButton = 'rank';
			}
		}else{
			this.hoverOnButton = false;
		}
	}

	this.mouseclick = function(event){
		switch (this.hoverOnButton)
		{
			case 'start' : 
				g_ApplicationManager.fade(function(){
					g_ApplicationManager.gamePlay = GamePlay().init();
					g_ApplicationManager.gameMenu.shutdownGameMenu();
				}, function(){
					g_ApplicationManager.gamePlay.prepareStage();
				});
				
				break
			case 'guide' :
				g_ApplicationManager.fade(function(){
					g_ApplicationManager.gameGuide = new GameGuide().startupGameGuide();
					g_ApplicationManager.gameMenu.shutdownGameMenu();
				});	
				break
			case 'rank' :
				g_ApplicationManager.fade(function(){
					g_ApplicationManager.rank = new GameRank().startupGameRank();
					g_ApplicationManager.gameMenu.shutdownGameMenu();
				});
				break
			default : 
		}
	}
}
GameMenu.prototype = new VisualGameObject;

function MenuAnimation(){
	this.initialX = 520;
	this.initialY = 360;
	this.distance = 30;
	this.animals = [];
	this.startupMenuAnimation = function(){
		var _initialX = this.initialX; /*第一只动物的初始位置*/
		var _initialY = this.initialY;
		var _distance = this.distance; /*动物间隔距离*/
		var _animals = this.animals;
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 0, 116, 87, _initialX, _initialY - 87, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 87, 130, 102, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 102, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 189, 178, 70, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 70, 2, 10) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 259, 66, 104, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 104, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 363, 98, 90, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 90, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 453, 52, 102, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 102, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 555, 66, 102, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 102, 2, 8) );
		this.animals.push( new Animal().startupAnimal(g_ResourceManager.animals, 0, 657, 98, 160, _animals[_animals.length - 1].x + _animals[_animals.length - 1].width + _distance, _initialY - 160, 2, 16) );
		return this;
	}

	this.shutdownMenuAnimation = function(){
		for(var i = 0, l = this.animals.length; i < l; i++){
			this.animals[i].shutdownAnimal();
		}
	}
} 

function Animal(){
	this.speed = 50;
	this.queueLength = 1044;
	this.startupAnimal = function(image, sx, sy, width, height, x, y, z, frameCount)
	{
		this.startupAnimatedGameObject(image, sx, sy, width, height, x, y, z, frameCount, frameCount);
		return this;
	}

	this.update = function(dt, context, xScroll, yScroll)
	{
		this.x = this.x - this.speed * dt;
		if(this.x + this.width < 0)
		{
			this.x = this.x + this.queueLength;
		}
	}

	this.shutdownAnimal = function()
	{
		this.shutdownAnimatedGameObject();
	}
}
Animal.prototype = new AnimatedGameObject;