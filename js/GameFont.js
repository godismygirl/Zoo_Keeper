function GameFont(){
	this.member = [];
	this.shadow = null;
	this.type = null;
	this.rightAlign = false;

	this.startupGameFont = function(string, type, align, x, y, z)
	{
		/**
			@param string		the number to display
			@param type			the type of the number to display( 'M-white', 'M-yellow', 'S-white', 'S-yellow', 'L', 'XL' )
			@param x 			the position on the axis
			@param align 		text align method ('left' or 'right')
			@param y        	The position on the Y axis
        	@param z        	The z order of the element
		*/
		this.type = type;
		this.rightAlign = align === 'right'? true:false;

		var _positionX;
		
		for(var i=0, l=string.length; i<l; i++){
			_isLastWord = i === l-1? true:false; 
			
			switch (type) {
				case 'M-yellow' :
					if(this.rightAlign){
						_positionX = x - (l-i)*26;
					}else{
						_positionX = x + i*26;
					}
					break
				case 'M-white' :
					if(this.rightAlign){
						_positionX = x - (l-i)*26;
					}else{
						_positionX = x + i*26;
					}
					break
				case 'S-yellow' :
					if(this.rightAlign){
						_positionX = x - (l-i)*22;
					}else{
						_positionX = x + i*22;
					}
					break
				case 'S-white' :
					if(this.rightAlign){
						_positionX = x - (l-i)*22;
					}else{
						_positionX = x + i*22;
					}
					break
				case 'L' :
					if(this.rightAlign){
						_positionX = x - (l-i)*40;
					}else{
						_positionX = x + i*40;
					}
					break
				case 'XL' :
					if(this.rightAlign){
						_positionX = x - (l-i)*40;
					}else{
						_positionX = x + i*40;
					}
					break
				default :		
			}
			this.genFontObject(string[i], type, _positionX, y, z, _isLastWord);
		}
		//append shadow if needed
		if(this.type === 'M-yellow' || this.type === 'M-white' ){
			this.shadow = new VisualGameObject().startupVisualGameObject(g_ResourceManager.font, 28, 2, 2, 32, this.member[string.length - 1].x + this.member[string.length - 1].width, this.member[string.length - 1].y, this.member[string.length - 1].zOrder)
		}
		//reverse font array
		this.member.reverse();

		return this;
	}

	this.shutdownGameFont = function(){
		for(var i=0, l=this.member.length; i<l; i++){
			this.member[i].shutdownVisualGameObject();
		}
		if(this.shadow){
			this.shadow.shutdownVisualGameObject();
		}
	}

	this.updateGameFont = function(string){
		var _string = string.split("").reverse();
		var ceil = this.member.length;
		var get_sx, positionX; 

		switch (this.type) 
		{
			case 'M-yellow' :
				get_sx = function(int){
					return 2 + int*32
				};
				break
			case 'M-white' :
				get_sx = function(int){
					return 2 + int*32
				};
				break
			case 'S-yellow' :
				get_sx = function(int){
					return 2 + int*26
				};
				break
			case 'S-white' :
				get_sx = function(int){
					return 2 + int*26
				};
				break
			case 'L' :
				get_sx = function(int){
					return int*40
				};
				break
			case 'XL' :
				get_sx = function(int){
					return 2 + int*52
				};
				break
			default :
		}

		if(_string.length > this.member.length)
		{

			for(var i=0, l=_string.length; i<l; i++)
			{
				if(i<ceil){
					this.member[i].sx = get_sx(_string[i]);
				}else{
					positionX = this.rightAlign? (this.member[i-1].x - this.member[i - 1].width) : (this.member[i - 1].x + this.member[i - 1].width);
					this.member.push(new VisualGameObject().startupVisualGameObject(g_ResourceManager.font, get_sx(_string[i]), this.member[0].sy, this.member[0].width, this.member[0].height, positionX, this.member[0].y, this.member[0].zOrder))
				}
			}

		}else{

			for(var i=0, l=_string.length; i<l; i++){
				this.member[i].sx = get_sx(_string[i]);
			}
		}
	}

	this.genFontObject = function(word, type, x, y, z, isLastWord){
		var _sx,_sy,_w,_h;
		var _multiplier = parseInt(word);

		switch (type) {
			case 'M-yellow' :
				_sx = 2 + _multiplier*32;
				_sy = 2;
				_w = 26;
				_h = 32;
				break
			case 'M-white' :
				_sx = 2 + _multiplier*32;
				_sy = 38;
				_w = 26;
				_h = 32;
				break
			case 'S-yellow' :
				_sx = 2 + _multiplier*26;
				_sy = 74;
				_w = 22;
				_h = 24;
				break
			case 'S-white' :
				_sx = 2 + _multiplier*26;
				_sy = 102;
				_w = 22;
				_h = 24;
				break
			case 'L' :
				_sx = _multiplier*40;
				_sy = 128;
				_w = 40;
				_h = 50;
				break
			case 'XL' :
				_sx = 2 + _multiplier*52;
				_sy = 180;
				_w = 48;
				_h = 64;
				break
			default :
		}

		this.member.push(new VisualGameObject().startupVisualGameObject(g_ResourceManager.font, _sx, _sy, _w, _h, x, y, z));

	}
}