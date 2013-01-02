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
        this.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.titlescren, 0, 0, 512, 700, 0, 0, 1);
        this.gameMenu = new GameMenu().startupGameMenu();
        this.menuAnimation = new MenuAnimation().startupMenuAnimation();
        //new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.animals, 0, 0, 116, 87, 300, 300, 2, 8, 8)
        this.updateScore();
        return this;
    }

    this.updateScore = function()
    {

    }
}