function GameObjectManager()
{
    this.gameObjects = new Array();
    this.lastFrame = new Date().getTime();
    this.xScroll = 0;
    this.yScroll = 0;
    this.canvas = null;
    this.context2D = null;
    this.backBuffer = null;
    this.backBufferContext2D = null;
    this.canvasSupported = false;
    this.resourcesLoaded = false;
	this.loadingScreenCol = 0;
	this.loadingScreenColDirection = 1;
	this.loadingScreenColSpeed = 255;

    this.startupGameObjectManager = function()
    {
        g_GameObjectManager = this;

        document.onclick = function(event){g_GameObjectManager.mouseclick(event);}
        document.onmouseover = function(event){g_GameObjectManager.mouseover(event);}
        document.onmouseout = function(event){g_GameObjectManager.mouseout(event);}
        document.onkeydown = function(event){g_GameObjectManager.keyDown(event);}
        document.onkeyup = function(event){g_GameObjectManager.keyUp(event);}

        this.canvas = document.getElementById('canvas');

        if (this.canvas.getContext)
        {
            this.canvasSupported = true;
            this.context2D = this.canvas.getContext('2d');
            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.backBufferContext2D = this.backBuffer.getContext('2d');
        }

        new ResourceManager().startupResourceManager(g_Resource);

        setInterval(function(){g_GameObjectManager.draw();}, SECONDS_BETWEEN_FRAMES);
        
        return this;        
    }
    
    this.draw = function ()
    {
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;

        if (!this.resourcesLoaded)
        {
            var numLoaded = 0;
            for (i = 0; i < g_ResourceManager.imageProperties.length; ++i)
            {
                if (g_ResourceManager[g_ResourceManager.imageProperties[i]].complete)
                    ++numLoaded;
            }

            if ( numLoaded == g_ResourceManager.imageProperties.length )
            {
                new ApplicationManager().startupApplicationManager(this.canvas.width, this.canvas.height);
                this.resourcesLoaded = true;
            }
			else
			{
				this.loadingScreenCol += this.loadingScreenColDirection * this.loadingScreenColSpeed * dt;
				if (this.loadingScreenCol > 255)
				{
					this.loadingScreenCol = 255;
					this.loadingScreenColDirection = -1;
				}
				else if (this.loadingScreenCol < 0)
				{
					this.loadingScreenCol = 0;
					this.loadingScreenColDirection = 1;	
				}
				this.context2D.fillStyle = "rgb(" + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + ")";
				this.context2D.fillRect (0, 0, this.canvas.width, this.canvas.height);
			}
        }
        
        // clear the drawing contexts
        if (this.canvasSupported && this.resourcesLoaded)
        {
            this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
            this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
            // first update all the game objects
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x].update)
                {
                    this.gameObjects[x].update(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
                }
            }

            // then draw the game objects
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x].draw)
                {
                    this.gameObjects[x].draw(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
                }
            }

            this.context2D.drawImage(this.backBuffer, 0, 0);
        }        
    };
    
    /**
        Adds a new GameObject to the gameObjects collection
        @param gameObject The object to add
    */
    this.addGameObject = function(gameObject)
    {
        this.gameObjects.push(gameObject);
        this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;})
    };
    
    /**
        Removes a GameObject from the gameObjects collection
        @param gameObject The object to remove
    */
    this.removeGameObject = function(gameObject)
    {
        this.gameObjects.removeObject(gameObject);
    }

    this.mouseclick = function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].mouseclick)
            {
                this.gameObjects[x].mouseclick(event);
            }
        }
    }

    this.mouseover = function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].mouseover)
            {
                this.gameObjects[x].mouseover(event);
            }
        }
    }

    this.mouseout = function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].mouseout)
            {
                this.gameObjects[x].mouseout(event);
            }
        }
    }

    this.keyDown = function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].keyDown)
            {
                this.gameObjects[x].keyDown(event);
            }
        }
    }

    this.keyUp = function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].keyUp)
            {
                this.gameObjects[x].keyUp(event);
            }
        }
    }
}