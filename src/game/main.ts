/// <reference path="../lib/char.ts" />
/// <reference path="../lib/renderer.ts" />
/// <reference path="../lib/counter.ts" />
/// <reference path="../lib/scene.ts" />

/// <reference path="./text.ts" />
/// <reference path="./title.ts" />
/// <reference path="./game.ts" />
/// <reference path="./clear.ts" />
/// <reference path="./gameOver.ts" />
/// <reference path="./timeOver.ts" />

const LIMIT_FPS = 30;
const DELTA_TIME = 1 / LIMIT_FPS;

IrairaLib.SceneManager.regist('title', new Irairabow.Scene.Title());
IrairaLib.SceneManager.regist('game', new Irairabow.Scene.Game());
IrairaLib.SceneManager.regist('clear', new Irairabow.Scene.Clear());
IrairaLib.SceneManager.regist('timeOver', new Irairabow.Scene.TimeOver());
IrairaLib.SceneManager.regist('gameOver', new Irairabow.Scene.GameOver());

while (true) {
  IrairaLib.Renderer.clear();
  IrairaLib.SceneManager.update();
  IrairaLib.SceneManager.render();
  IrairaLib.Renderer.swapBuffer();

  basic.pause(DELTA_TIME * 1000);
}