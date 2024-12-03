namespace Irairabow.Scene {
  export class GameOver extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(
      IrairaLib.Renderer.WIDTH * -1,
      Irairabow.GAME_OVER_TEXT.length
        * IrairaLib.Renderer.WIDTH
        + IrairaLib.Renderer.WIDTH,
      10,
      false
    );

    constructor() {
      super();
    }

    onLoad(): void {
      control.inBackground(() => {
        for (let note of Irairabow.Song.GAMEOVER) {
          music.playTone(note[0], note[1]);
        }
      });

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
        IrairaLib.Renderer.renderText(Irairabow.GAME_OVER_TEXT, -this.counter.counter, 0);
      } else {
        IrairaLib.Renderer.renderImage(Irairabow.Emoji.BAD, 0, 0);
      }
    }
  }
}