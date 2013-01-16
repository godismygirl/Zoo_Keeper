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
	{name:'font', src:'resource/font.png'},
	{name:'main', src:'resource/main.png'},
	{name:'mascot', src:'resource/mascot.png'},
	{name:'mascotBg', src:'resource/mascot_bg.png'},
]
var g_score = 7000;

window.onload = init;

function init()
{
    new GameObjectManager().startupGameObjectManager();
}