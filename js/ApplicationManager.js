function ApplicationManager()
{
    this.gameMenu = null;
    this.senceFade = null;
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
        this.senceFade = {};
        g_GameObjectManager.addGameObject(this.senceFade);
        return this;
    }

    this.fade = function(onDirChangeHandler, onFadeEndHandler){
        var direction = 1;
        var dirChange = false;

        if(this.senceFade){
            this.senceFade.update = function(dt, context, xScroll, yScroll){
                context.globalAlpha = context.globalAlpha - direction*0.02;

                if( !dirChange && context.globalAlpha < 0.02){
                    //console.log('change direction')
                    context.globalAlpha = 0;
                    direction = -1;
                    dirChange = true;
                    if(onDirChangeHandler){
                        onDirChangeHandler();
                    }
                }

                if(dirChange && context.globalAlpha > 0.98){
                    //console.log('fade complete')
                    context.globalAlpha = 1;
                    this.update = null;
                    if(onFadeEndHandler){
                        onFadeEndHandler();
                    }
                    
                }

            }
        }
        
    }

    this.shutdownFade = function(){
        g_GameObjectManager.removeGameObject(this.senceFade);
    }

    this.nextStage = function(){
        this.gamePlay.nextStage();
    }

}