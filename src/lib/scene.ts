namespace IrairaLib {
  export class Scene {
    constructor() {
    }

    onLoad(): void {
    }

    onUnLoad(): void {
    }

    onUpdate(): void {
    }

    onRender(): void {
    }
  }

  export class SceneManager {
    private static _sceneName: string = '';
    private static _sceneList: {
      [key: string]: Scene
    } = {};

    static regist(name: string, scene: Scene): void {
      if (!this._sceneList[name]) {
        this._sceneList[name] = scene;
        if (this._sceneName.length <= 0) {
          this.change(name);
        }
      }
    }

    static remove(name: string): void {
      if (this._sceneList[name]) {
        delete this._sceneList[name];
      }
    }

    static change(name: string): void {
      if (this._sceneList[name]) {
        if (this._sceneName.length > 0) {
          this._sceneList[this._sceneName].onUnLoad();
        }
        this._sceneName = name;
        this._sceneList[this._sceneName].onLoad();
      }
    }

    static update(): void {
      if (this._sceneList[this._sceneName]) {
        this._sceneList[this._sceneName].onUpdate();
      }
    }

    static render(): void {
      if (this._sceneList[this._sceneName]) {
        this._sceneList[this._sceneName].onRender();
      }
    }
  }
}