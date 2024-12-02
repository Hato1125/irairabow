namespace Irairabow.Scene {
  export class Title extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(
      IrairaLib.Renderer.WIDTH * -1,
      Irairabow.TITLE_TEXT.length
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
      if(input.buttonIsPressed(Button.A)) {
        IrairaLib.SceneManager.change('game');
      }

      this.counter.update(DELTA_TIME);
    }

    onRender(): void {
      IrairaLib.Renderer.renderText(Irairabow.TITLE_TEXT, this.counter.counter * -1, 0);
    }
  }
}