function Piece(){
	this.explodingOffset = 0;
	this.row = null;
	this.col = null;
	this.startupPiece = function(x, y){
		var i = parseInt(8*Math.random());
		xPosition = 119 + y*46;
		yPosition = 304 + x*46;
		this.row = x;
		this.col = y;
		this.startupVisualGameObject(g_ResourceManager.panels, 0, i*46, 46, 46, xPosition, yPosition, 2);
		return this;
	}

	this.explodeCheck = function(){
		
	}

	this.shutDownPiece = function(){
		this.shutDownVisualGameObject();
	}

	this.explode = function(){
		this.currentFrame = 0;
		this.frameWidth = this.width;
		this.frameCount = 4;
		this.timeBetweenFrames = 0.125;
		this.timeSinceLastFrame = this.timeBetweenFrames;
		this.explodingOffset = 138;
		this.draw = this.animate;
	}

	this.mouseclick = function(event){

	}

	this.wink = function(){
		this.currentFrame = 0;
		this.frameWidth = this.width;
		this.frameCount = 2;
		this.timeBetweenFrames = 0.5;
		this.timeSinceLastFrame = this.timeBetweenFrames;
		this.draw = this.animate;
	}
	
	this.animate = function(dt, context, xScroll, yScroll){
		var sourceX = this.frameWidth * this.currentFrame + this.explodingOffset;
        context.drawImage(this.image, sourceX, this.sy, this.width, this.height, this.x - xScroll, this.y - yScroll, this.width, this.height);

        this.timeSinceLastFrame -= dt;
        if (this.timeSinceLastFrame <= 0)
        {
           this.timeSinceLastFrame = this.timeBetweenFrames;
           ++this.currentFrame;
           //animate explode once
           if(this.explodingOffset && this.currentFrame === 4){
	        	this.draw = null;
	        	this.explodingOffset = 0;
	        }

           this.currentFrame %= this.frameCount;
        }
    
	}
}
Piece.prototype = new VisualGameObject;