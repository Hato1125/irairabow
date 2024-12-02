namespace IrairaLib {
  export enum CounterState {
    Play,
    Stop,
    End,
  }

  export class Counter {
    private _counter: number;
    private _begin: number;
    private _end: number;
    private _speed: number;
    private _isLoop: boolean;
    private _state: CounterState;

    constructor(
      begin: number,
      end: number,
      speed: number,
      isLoop: boolean = true
    ) {
      this._counter = 0;
      this._begin = begin;
      this._end = end;
      this._speed = speed;
      this._isLoop = isLoop;
      this._state = CounterState.Stop;
    }

    set begin(begin: number) {
      this._begin = begin;
    }

    set end(end: number) {
      this._end = end;
    }

    set speed(speed: number) {
      this._speed = speed;
    }

    set loop(isLoop: boolean) {
      this._isLoop = isLoop;
    }

    get counter(): number {
      return Math.round(this._counter);
    }

    get begin(): number {
      return this._begin;
    }

    get end(): number {
      return this._end;
    }

    get loop(): boolean {
      return this._isLoop;
    }

    get speed(): number {
      return this._speed;
    }

    get state(): CounterState {
      return this._state;
    }

    play(): void {
      if (this._counter < this._end) {
        this._state = CounterState.Play;
      }
    }

    stop(): void {
      if (this._state === CounterState.Play) {
        this._state = CounterState.Stop;
      }
    }

    reset(start: boolean = false): void {
      this._counter = this._begin;
      this._state = start
        ? CounterState.Play
        : CounterState.Stop;
    }

    update(delta: number): void {
      if(this._state === CounterState.Play) {
        this._counter += delta * this._speed;
        if(this._counter >= this._end) {
          if(this._isLoop) {
            this._counter = this._begin;
          } else {
            this._counter = this._end;
            this._state = CounterState.End;
          }
        }
      }
    }
  }
}