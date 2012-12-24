function GameMenu()
{
	this.hoverOnButton = false;
	this.startupGameMenu = function()
	{
		this.startupVisualGameObject(g_ResourceManager.titlescren, 0, 910, 0, 0, 0, 0, 2);
		return this;
	}

	this.shutdownGameMenu = function()
    {
        this.shutdownVisualGameObject();
    }

	this.setImage = function(image, sx, sy, width, height, x, y)
	{
		this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
	}

	this.update = function()
	{
		switch (this.hoverOnButton)
		{
			case 'start' : 
				this.setImage(g_ResourceManager.titlescren, 44, 704, 424, 64, 44, 437)
				break
			case 'guide' :
				this.setImage(g_ResourceManager.titlescren, 40, 772, 432, 64, 40, 501)
				break
			case 'rank' :
				this.setImage(g_ResourceManager.titlescren, 90, 840, 332, 64, 90, 565)
				break
			default : 
				this.setImage(g_ResourceManager.titlescren, 0, 910, 0, 0, 0, 0)
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
				//
				break
			case 'guide' :
				g_ApplicationManager.gameGuide = new GameGuide().startupGameGuide();
				break
			case 'rank' :
				//
				break
			default : 
				//
		}
	}
}
GameMenu.prototype = new VisualGameObject;

function GameGuide()
{
	this.menu = new GameGuideMenu().startupGameGuideMenu();
	this.startupGameGuide = function(){
		this.startupVisualGameObject(g_ResourceManager.guide, 0, 0, g_ResourceManager.guide.width, g_ResourceManager.guide.height, 0, 0, 3);
		return this;
	}

	this.shutdownGameGuide = function()
	{
		this.shutdownVisualGameObject();
		this.menu.shutdownGameMenu();
	}

	this.mouseclick = function(event){
		
	}
}
GameGuide.prototype = new VisualGameObject;

function GameGuideMenu()
{
	this.startupGameGuideMenu = function()
	{
		this.startupVisualGameObject(g_ResourceManager.titlescren, 0, 908, g_ResourceManager.titlescren.width, 34, 0, 665, 4);
		return this;
	}

	this.shutdownGameGuideMenu = function()
	{
		this.shutdownVisualGameObject();
	}
}
GameGuideMenu.prototype = new VisualGameObject;