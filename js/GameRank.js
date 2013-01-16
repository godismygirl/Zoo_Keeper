function GameRank()
{
	//array to hold game font objcet from place 1 ~ 9
	this.rank = []; 

	this.startupGameRank = function()
	{
		//generate rank screen background
		this.startupVisualGameObject(g_ResourceManager.rank, 0, 0, g_ResourceManager.rank.width, g_ResourceManager.rank.height, 0, 0, 1);

		//generate default scores in display
		var userScoreSet = false;

		for(var i=0; i<9; i++){
			var score = (12000 - i*1000).toString();
			var positionX = score.length < 5? 356:330; 
			var positionY = 124 + i*52;

			if(!userScoreSet && parseInt(score) <= g_score){
				this.rank.push(new GameFont().startupGameFont(g_score.toString(), 'white', positionX, positionY, 2));
				userScoreSet = true;
			}else{
				this.rank.push(new GameFont().startupGameFont(score, 'yellow', positionX, positionY, 2));
			}
			
		}

		return this;
	}

	this.mouseclick = function(event)
	{
		if(event.offsetX > 146 && event.offsetX < 362 && event.offsetY > 615 && event.offsetY < 658){
			//hover on exit
			g_ApplicationManager.gameMenu = new GameMenu().startupGameMenu();
			this.shutdownGameRank();
		}
	}

	this.shutdownGameRank = function()
	{
		for(var i=0, l=this.rank.length; i<l; i++){
			this.rank[i].shutdownGameFont();
		}
		this.shutdownVisualGameObject();
	}
}
GameRank.prototype = new VisualGameObject;

function GameFont(){
	this.font = [];
	this.places = 0;

	this.startupGameFont = function(string, color, x, y, z)
	{
		/**
			@param string		the number to display
			@param color		the color of the number to display( 'white', 'yellow' )
			@param x 			the position on the axis
			@param y        	The position on the Y axis
        	@param z        	The z order of the element
		*/
		this.places = string.length;
		for(var i=0, l=string.length; i<l; i++){
			var _isLastWord = i === l-1? true:false; 
			var _positionX = x + i*26;
			this.genFontObject(string[i], color, _positionX, y, z, _isLastWord);
		}

		return this;
	}

	this.shutdownGameFont = function(){
		for(var i=0, l=this.font.length; i<l; i++){
			this.font[i].shutdownVisualGameObject();
		}
	}

	this.genFontObject = function(word, color, x, y, z, isLastWord){
		var _sy = color === 'white'? 38:2;
		var _width = isLastWord? 28:26;
		var _sx = 0;

		switch (word){
			case '0' :
				_sx = 2
				break
			case '1' :
				_sx = 34
				break
			case '2' :
				_sx = 66
				break
			case '3' :
				_sx = 98
				break
			case '4' :
				_sx = 130
				break
			case '5' :
				_sx = 162
				break
			case '6' :
				_sx = 194
				break
			case '7' :
				_sx = 226
				break
			case '8' :
				_sx = 258
				break
			case '9' :
				_sx = 290
				break
			default :
		}

		this.font.push(new VisualGameObject().startupVisualGameObject(g_ResourceManager.font, _sx, _sy, _width, 32, x, y, z));
	}
}