var FPS = 30;
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
var g_GameObjectManager = null;
var g_ApplicationManager = null;
var g_ResourceManager = null;
var g_Resource = [
	{name:'titlescren', src:'resource/titlescren.png'},
	{name:'guide', src:'resource/guide.png'},
	{name:'animals', src:'resource/animals.png'},
	{name:'panels', src:'resource/panels.png'}
]
var g_score = 0;

window.onload = init;

function init()
{
    new GameObjectManager().startupGameObjectManager();
}