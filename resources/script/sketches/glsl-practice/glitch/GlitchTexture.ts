import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

const MIN_DRAW_NUMBER = 2;
const MAX_DRAW_NUMBER = 4;
const GLITCH_SCALE = 0.05;

export class GlitchTexture {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public resolution: THREE.Vector2;
  public texture: THREE.Texture;
  public time: number;

  protected utils: ZERO.Utils2d;

  constructor(resolution: THREE.Vector2) {
    const canvas = document.createElement('canvas');
    this.resolution = resolution;
    canvas.width = resolution.x;
    canvas.height = resolution.y;

    this.utils = new ZERO.Utils2d(canvas);
    this.canvas = this.utils.getCanvas()!;
    this.ctx = this.utils.getContext();
    this.texture = new THREE.Texture(this.canvas);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.wrapS = THREE.MirroredRepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;
    this.time = 0;
  }

  public update(deltaTime?: number) {
    if(deltaTime) this.time += deltaTime;
    const { x, y } = this.resolution;
    this.ctx.clearRect(0, 0, x, y);
    this.draw(x, y);
    this.texture.needsUpdate = true;
  }

  public resize(resolution: THREE.Vector2) {
    this.resolution = resolution;
    this.canvas.width = resolution.x;
    this.canvas.height = resolution.y;
  }

  protected draw(x: number, y: number) {
    const iterationNumber = this.getRandomNumInRange(MIN_DRAW_NUMBER, MAX_DRAW_NUMBER);
    for(let i = 0; i < iterationNumber; i++ ){
      const positionX = x * Math.random();
      const positionY = y * Math.random();
      const width = (0.1 + Math.random() * GLITCH_SCALE) * x;
      const height = (0.1 + Math.random() * GLITCH_SCALE) * y;
      const red = Math.random() * 256;
      const green = Math.random() * 256;
      const blue = Math.random() * 256;
      const color = `rgba(${red}, ${green}, ${blue}, 1)`
      this.utils.drawRectCenter(positionX, positionY, width, height, color);
    }
  }

  protected getRandomNumInRange(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min));
  }
}
