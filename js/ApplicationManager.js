function ApplicationManager()
{
    /**
        Initialises this object
        @param canvasWidth      The width of the canvas
        @param canvasHeight     The height of the canvas
        @return                 A reference to the initialised object
    */
    this.startupApplicationManager = function(canvasWidth, canvasHeight)
    {
        g_ApplicationManager = this;
        this.gameMenu = new GameMenu().startupGameMenu();
        this.updateScore();
        return this;
    }

    this.updateScore = function()
    {

    }
}