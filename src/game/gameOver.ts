namespace Irairabow.Scene {
  export class GameOver extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(
      IrairaLib.Renderer.WIDTH * -1,
      Irairabow.GAME_OVER_TEXT.length
        * IrairaLib.Renderer.WIDTH
        + IrairaLib.Renderer.WIDTH,
      10
    );

    constructor() {
      super();
    }

    onLoad(): void {
      this.counter.reset();
      this.counter.play();
    }

    onUpdate(): void {
      if (input.buttonIsPressed(Button.A)) {
        IrairaLib.SceneManager.change('title');
      }

      this.counter.update(DELTA_TIME);
    }

    onRender(): void {
      IrairaLib.Renderer.renderText(Irairabow.GAME_OVER_TEXT, -this.counter.counter, 0);
    }
  }
}