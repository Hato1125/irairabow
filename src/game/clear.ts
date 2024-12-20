namespace Irairabow.Scene {
  export class Clear extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(
      IrairaLib.Renderer.WIDTH * -1,
      Irairabow.CLEAR_TEXT.length
        * IrairaLib.Renderer.WIDTH
        + IrairaLib.Renderer.WIDTH,
      10,
      false
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
      if (this.counter.state !== IrairaLib.CounterState.End) {
        IrairaLib.Renderer.renderText(Irairabow.CLEAR_TEXT, -this.counter.counter, 0);
      } else {
        IrairaLib.Renderer.renderImage(Irairabow.Emoji.HAPPY, 0, 0);
      }
    }
  }
}