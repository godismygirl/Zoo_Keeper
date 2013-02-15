function GameGuide()
{
	this.guidePage = 0;
	this.menu = null;

	this.startupGameGuide = function(){
		this.startupVisualGameObject(g_ResourceManager.guide, 0, 0, 2048, 696, 0, 0, 2);
		this.menu = new VisualGameObject().startupVisualGameObject(g_ResourceManager.titlescren, 0, 908, g_ResourceManager.titlescren.width, 34, 0, 646, 4);
		this.guidePage = 1;
		return this;
	}

	this.shutdownGameGuide = function()
	{
		this.menu.shutdownVisualGameObject();
		this.shutdownVisualGameObject();	
	}

	this.slideLeft = function(dt, context, xScroll, yScroll){
		var speed = 800;
		if( this.x + dt*speed < -(this.guidePage - 1) * 512 ){
			this.x = this.x + dt*speed;
		}else{
			this.x = -(this.guidePage - 1) * 512;
			this.update = null;
		}
	},

	this.slideRight = function(dt, context, xScroll, yScroll){
		var speed = 800;
		if( this.x - dt*speed > -(this.guidePage - 1) * 512 ){
			this.x = this.x - dt*speed;
		}else{
			this.x = -(this.guidePage - 1) * 512;
			this.update = null;
		}
	},

	this.mouseclick = function(event)
	{
		if( event.offsetX > 192 && event.offsetX < 320 && event.offsetY > 646 && event.offsetY < 676 ){
			//exit button hit
			g_ApplicationManager.fade(function(){
				g_ApplicationManager.gameGuide.shutdownGameGuide();
				g_ApplicationManager.gameMenu = new GameMenu().startupGameMenu();
			})	
		}

		if( event.offsetX > 32 && event.offsetX < 96 &&  event.offsetY > 650 && event.offsetY < 676 ){
			//prev button hit
			if(this.guidePage > 1){ 
				this.guidePage --;
				this.menu.sy = this.guidePage === 1? 908:942;
				this.update = this.slideLeft;
			}

		}

		if( event.offsetX > 416 && event.offsetX < 480 &&  event.offsetY > 650 && event.offsetY < 676 ){
			//next button hit
			if(this.guidePage < 4){ 
				this.guidePage ++; 
				this.menu.sy = this.guidePage === 4? 976:942;
				this.update = this.slideRight;
			}
		}
	}
}
GameGuide.prototype = new VisualGameObject;
/*
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
*/