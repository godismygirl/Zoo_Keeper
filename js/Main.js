var FPS = 30;
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
var g_GameObjectManager = null;
var g_ApplicationManager = null;
var g_ResourceManager = null;
var g_Resource = [
	{name:'titlescren', src:'resource/titlescren.png'},
	{name:'guide', src:'resource/guide.png'},
	{name:'animals', src:'resource/animals.png'},
	{name:'panels', src:'resource/panels.png'},
	{name:'rank', src:'resource/ranking.png'},
	{name:'font', src:'resource/font.png'}
]
var g_score = 22860;

window.onload = init;

function init()
{
    new GameObjectManager().startupGameObjectManager();
}