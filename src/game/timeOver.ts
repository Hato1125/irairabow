namespace Irairabow.Scene {
  export class TimeOver extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(
      IrairaLib.Renderer.WIDTH * -1,
      Irairabow.TIME_OVER_TEXT.length
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
        IrairaLib.Renderer.renderText(Irairabow.TIME_OVER_TEXT, -this.counter.counter, 0);
      } else {
        IrairaLib.Renderer.renderImage(Irairabow.Emoji.BAD, 0, 0);
      }
    }
  }
}