function GameGuide()
{
	this.guidePage = 0;
	this.menu = null;

	this.startupGameGuide = function(){
		this.startupVisualGameObject(g_ResourceManager.guide, 0, 0, 512, 696, 0, 0, 2);
		this.menu = new GameGuideMenu().startupGameGuideMenu();
		this.guidePage = 1;
		return this;
	}

	this.shutdownGameGuide = function()
	{
		if(this.menu){
			this.menu.shutdownGameGuideMenu();
		}
		this.shutdownVisualGameObject();	
	}

	this.update = function(){
		this.setImage(g_ResourceManager.guide, (this.guidePage - 1)*512, 0, 512, 696, 0, 0, 3);

		switch (this.guidePage){
			case 1 :
				this.menu.state = 1
				break
			case 2 :
				this.menu.state = 2
				break
			case 3 :
				this.menu.state = 2
				break
			case 4 :
				this.menu.state = 3
				break
			default : 
		}
		this.menu.update();
	}

	this.mouseclick = function(event)
	{
		if( event.offsetX > 192 && event.offsetX < 320 && event.offsetY > 646 && event.offsetY < 676 ){
			//exit button hit
			g_ApplicationManager.gameMenu = new GameMenu().startupGameMenu();
			this.shutdownGameGuide();
		}

		if( event.offsetX > 32 && event.offsetX < 96 &&  event.offsetY > 650 && event.offsetY < 676 ){
			//prev button hit
			if(this.guidePage > 1){ this.guidePage --; }
		}

		if( event.offsetX > 416 && event.offsetX < 480 &&  event.offsetY > 650 && event.offsetY < 676 ){
			//next button hit
			if(this.guidePage < 4){ this.guidePage ++; }
		}
	}
}
GameGuide.prototype = new VisualGameObject;

function GameGuideMenu()
{
	this.state = 0;
	this.startupGameGuideMenu = function()
	{
		this.startupVisualGameObject(g_ResourceManager.titlescren, 0, 908, g_ResourceManager.titlescren.width, 34, 0, 646, 4);
		this.state = 1;
		return this;
	}

	this.update = function()
	{
		this.setImage(g_ResourceManager.titlescren, 0, 908 + (this.state - 1)*34, g_ResourceManager.titlescren.width, 34, 0, 646, 4);
	}

	this.shutdownGameGuideMenu = function()
	{
		this.shutdownVisualGameObject();
	}
}
GameGuideMenu.prototype = new VisualGameObject;