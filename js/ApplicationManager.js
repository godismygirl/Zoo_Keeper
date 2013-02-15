function ApplicationManager()
{
    this.gameMenu = null;
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
        this.sceneFade = {};
        g_GameObjectManager.addGameObject(this.sceneFade);
        return this;
    }

    this.fade = function(onDirChangeHandler, onFadeEndHandler){
        var direction = 1;
        var dirChange = false;

        this.sceneFade.update = function(dt, context, xScroll, yScroll){
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

    this.shutdownFade = function(){
        g_GameObjectManager.removeGameObject(this.sceneFade);
    }

    this.nextStage = function(){
        this.gamePlay.nextStage();
    }

}