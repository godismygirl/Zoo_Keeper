function VisualGameObject()
{
    this.image = null; 
    this.sx = 0;
    this.sy = 0;
    this.width = 0;
    this.height = 0;

    /**
        Draws this element to the back buffer
        @param dt Time in seconds since the last frame
		@param context The context to draw to
		@param xScroll The global scrolling value of the x axis  
		@param yScroll The global scrolling value of the y axis  
    */
    this.draw = function(dt, context, xScroll, yScroll)
    {
        context.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.x - xScroll, this.y - yScroll, this.width, this.height);  
    }
    
    /**
        Initialises this object
        @param image The image to be displayed
		@param x The position on the X axis
        @param y The position on the Y axis
		@param z The depth
        @param sx The x coordinate where to start clipping image
        @param sy The y coordinate where to start clipping image
        @param width The width of the clipped image
        @param height The height of the clipped image
    */
    this.startupVisualGameObject = function(image, sx, sy, width, height, x, y, z)
    {
        this.startupGameObject(x, y, z);
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.width = width;
        this.height = height; 
        return this;
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
    
    this.shutdownVisualGameObject = function()
    {
        this.shutdownGameObject();
        this.image = null;
    }

}
VisualGameObject.prototype = new GameObject;