namespace Irairabow.Scene {
  const GameState = {
    Start: 1,
    Play: 2,
  };

  type GameState = (typeof GameState)[keyof typeof GameState];

  export class Game extends IrairaLib.Scene {
    counter: IrairaLib.Counter = new IrairaLib.Counter(0, 0, 0, true);
    timer: IrairaLib.Counter = new IrairaLib.Counter(0, 25, 1, false);

    textAnimeCounter: number = 0;
    timeCounter: number = 0;
    renderText: string = '';
    state: GameState = GameState.Start;

    constructor() {
      super();
    }

    onLoad(): void {
      this.counter.begin = IrairaLib.Renderer.WIDTH * -1;
      this.counter.end = Irairabow.START_TEXT.length * IrairaLib.Renderer.WIDTH + 15;
      this.counter.speed = 13.5;
      this.counter.reset();
      this.counter.play();

      this.textAnimeCounter = -IrairaLib.Renderer.WIDTH;
      this.timeCounter = 0;
      this.renderText = Irairabow.START_TEXT;
      this.state = GameState.Start;
    }

    onUpdate(): void {
      this.counter.update(DELTA_TIME);

      switch (this.state) {
        case GameState.Start:
          if (this.counter.counter >= this.counter.end) {
            this.state = GameState.Play;
            this.timer.reset();
            this.timer.play();
          }
          break;
        case GameState.Play:
          this.timer.update(DELTA_TIME);
          this.counter.end = (this.timer.end - this.timer.counter).toString().length * IrairaLib.Renderer.WIDTH + 5;
          this.counter.speed = ((this.timer.end - this.timer.counter) >= 10 ? 20 : 15);

          if(this.timer.counter >= this.timer.end)
            IrairaLib.SceneManager.change('timeOver');
          if (input.pinIsPressed(TouchPin.P0))
            IrairaLib.SceneManager.change('clear');
          if (input.pinIsPressed(TouchPin.P1))
            IrairaLib.SceneManager.change('gameOver');
          break;
      }
    }

    onRender(): void {
      switch (this.state) {
        case GameState.Start:
          IrairaLib.Renderer.renderText(
            Irairabow.START_TEXT,
            -this.counter.counter,
            0
          );
          break;
        case GameState.Play:
          IrairaLib.Renderer.renderText(
            (this.timer.end - this.timer.counter).toString(),
            -this.counter.counter,
            0
          );
          break
      }
    }
  }
}