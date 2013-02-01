Array.prototype.remove = function(/**Number*/ from, /**Number*/ to)
{
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Array.prototype.removeObject = function(object)
{
    for (var i = 0; i < this.length; ++i)
    {
        if (this[i] === object)
        {
            this.remove(i);
            break;
        }
    }
}
/*
Array.prototype.unique = function()   
{   
    var a = {};
    for(var i=0, l=this.length; i<l; i++){   
      if(typeof a[this[i]] == "undefined"){
        a[this[i]] = 1; 
      }     
    }

    this.length = 0;

    for(var i in a){
      this[this.length] = i;
    }  
        
    return this;   
}
*/