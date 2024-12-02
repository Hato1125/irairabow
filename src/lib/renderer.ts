namespace IrairaLib {
  type Buffer = { value: number };

  export class Renderer {
    static readonly WIDTH: number = 5;
    static readonly HEIGHT: number = 5;

    private static _frameBuffer: Buffer = { value: 0x00 };
    private static _backBuffer: Buffer = { value: 0x00 };

    private static _readBit(buffer: Buffer, x: number, y: number): boolean {
      return (buffer.value >> (y * this.HEIGHT + x) & 0x01) === 0x01;
    }

    private static _setBit(buffer: Buffer, x: number, y: number): void {
      buffer.value = buffer.value | 1 << (y * this.HEIGHT + x);
    }

    private static _renderingBuffer(buffer: Buffer): void {
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          if (this._readBit(buffer, x, y)) {
            led.plot(x, y);
          } else {
            led.unplot(x, y);
          }
        }
      }
    }

    static clear(): void {
      this._frameBuffer.value = 0x00;
    }

    static swapBuffer(): void {
      [this._frameBuffer, this._backBuffer] = [
        this._backBuffer,
        this._frameBuffer
      ];
      this._backBuffer.value = 0x00;

      this._renderingBuffer(this._frameBuffer);
    }

    static renderPixel(x: number, y: number): void {
      if (x >= 0 && y >= 0 && x < 5 && y < 5) {
        this._setBit(this._backBuffer, x, y);
      }
    }

    static renderImage(image: number, x: number, y: number): void {
      const buffer: Buffer = {
        value: image
      };

      for (let iy = 0; iy < this.HEIGHT; iy++) {
        for (let ix = 0; ix < this.WIDTH; ix++) {
          if (this._readBit(buffer, ix, iy))
            this.renderPixel(x + ix, y + iy);
        }
      }
    }

    static renderChar(char: string, x: number, y: number): void {
      this.renderImage(IrairaLib.chars[char[0]], x, y);
    }

    static renderText(str: string, x: number, y: number): void {
      for (let i = 0; i < str.length; i++) {
        this.renderChar(str[i], x + i * this.WIDTH, y);
      }
    }
  }
}