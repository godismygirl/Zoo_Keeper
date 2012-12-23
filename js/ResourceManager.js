function ResourceManager()
{
    this.imageProperties = null;
	/**
        Initialises this object
		@param images	An array of objects with the name and src properties
        @return 		A reference to the initialised object
    */
    this.startupResourceManager = function(images)
    {
		g_ResourceManager = this;

        this.imageProperties = new Array();

        for ( var i = 0; i < images.length; i++ )
		{
			var thisImage = new Image;
			this[images[i].name] = thisImage;
			this.imageProperties.push(images[i].name);
			thisImage.src = images[i].src;
		}

        return this;
    }
}