function AnimatedGameObject()
{

    this.currentFrame = 0;
    this.frameWidth = 0;
    this.timeBetweenFrames = 0;
    this.timeSinceLastFrame = 0;
    this.frameCount = 0;

    /**
        Initialises this object
        @param image The image to be displayed
		@param x The position on the X axis
        @param y The position on the Y axis
		@param z The depth
        @param frameCount The number of animation frames in the image
        @param fps The frames per second to animate this object at
    */
    this.startupAnimatedGameObject = function(image, sx, sy, width, height, x, y, z, frameCount, fps)
    {
        if (frameCount <= 0) throw "framecount can not be <= 0";
        if (fps <= 0) throw "fps can not be <= 0"

        this.startupVisualGameObject(image, sx, sy, width, height, x, y, z);
        this.currentFrame = 0;
        this.frameWidth = width;
        this.frameCount = frameCount;
        this.timeBetweenFrames = 1/fps;
        this.timeSinceLastFrame = this.timeBetweenFrames;
        
        return this;
    }

    this.shutdownAnimatedGameObject = function()
    {
        this.shutdownVisualGameObject();       
    }

    this.setAnimation = function(image, sx, sy, width, height, x, y, frameCount, fps)
    {
        if (frameCount <= 0) throw "framecount can not be <= 0";
        if (fps <= 0) throw "fps can not be <= 0";
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.frameWidth = width;
        this.frameCount = frameCount;
        this.timeBetweenFrames = 1/fps;
        this.timeSinceLastFrame = this.timeBetweenFrames;
        console.log('sx: '+this.sx+'/sy: '+ this.sy+'/x: '+ this.x+'/y: '+ this.y+'/width: '+ this.width+'/height: '+this.height);
    }

    /**
        Draws this element to the back buffer
        @param dt Time in seconds since the last frame
		@param context The context to draw to
		@param xScroll The global scrolling value of the x axis
		@param yScroll The global scrolling value of the y axis
    */

    this.draw = function(dt, context, xScroll, yScroll)
    {
        var sourceX = this.frameWidth * this.currentFrame;
        context.drawImage(this.image, sourceX, this.sy, this.width, this.height, this.x - xScroll, this.y - yScroll, this.width, this.height);

        this.timeSinceLastFrame -= dt;
        if (this.timeSinceLastFrame <= 0)
        {
           this.timeSinceLastFrame = this.timeBetweenFrames;
           ++this.currentFrame;
           this.currentFrame %= this.frameCount;
        }
    }

}

AnimatedGameObject.prototype = new VisualGameObject;