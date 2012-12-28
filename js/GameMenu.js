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
				g_ApplicationManager.gameMenu.shutdownGameMenu();
				break
			case 'rank' :
				//
				break
			default : 
		}
	}
}
GameMenu.prototype = new VisualGameObject;