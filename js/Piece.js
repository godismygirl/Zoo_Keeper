function Piece(){
	this.row = null;
	this.col = null;
	this.id = null;
	this.startupPiece = function(x, y){
		var i = Math.floor(Math.random()*8 + 1);;
		xPosition = 119 + y*46;
		yPosition = 226 - x*46;
		this.row = x;
		this.col = y;
		this.id = i; 
		this.startupVisualGameObject(g_ResourceManager.panels, 0, (i-1)*46, 46, 46, xPosition, yPosition, 2);
		return this;
	}

	this.refresh = function(row, col){
		var i = Math.floor(Math.random()*8 + 1);
		this.sx = 0;
		this.sy = (i-1)*46;
		this.x = 119 + col*46;
		this.y = 626 - row*46;
		this.row = row;
		this.col = col;
		this.id = i;

		this.currentFrame = null;
		this.frameWidth = null;
		this.frameCount = null;
		this.timeBetweenFrames = null;
		this.timeSinceLastFrame = null;
		this.update = null;
		return this;
	}

	this.shutdownPiece = function(){
		this.shutdownVisualGameObject();
	}

	this.wink = function(){
		this.currentFrame = 0;
		this.frameWidth = this.width;
		this.frameCount = 2;
		this.timeBetweenFrames = 0.5;
		this.timeSinceLastFrame = this.timeBetweenFrames;
		this.update = this.animate;
	}

	this.winkOff = function(){
		this.currentFrame = null;
		this.frameWidth = null;
		this.frameCount = null;
		this.timeBetweenFrames = null;
		this.timeSinceLastFrame = null;
		this.sx = 0;
		this.update = null;
	}

	this.huff = function(){
		this.sx = 92;
	}
	
	this.animate = function(dt, context, xScroll, yScroll){
        this.sx = this.frameWidth * this.currentFrame;

        this.timeSinceLastFrame -= dt;
        if (this.timeSinceLastFrame <= 0)
        {
           this.timeSinceLastFrame = this.timeBetweenFrames;
           ++this.currentFrame;
           this.currentFrame %= this.frameCount;
        }
    
	}
}
Piece.prototype = new VisualGameObject;