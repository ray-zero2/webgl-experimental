export class Utils2d {

  protected canvas: HTMLCanvasElement | null;
  protected ctx: CanvasRenderingContext2D;

  constructor (element: HTMLCanvasElement | string) {
    this.canvas = null;

    if (element instanceof HTMLCanvasElement) {
      this.canvas = element;
    } else if (Object.prototype.toString.call(element) === '[object String]') {
      const canvasElement = document.querySelector(element);
      if (canvasElement instanceof HTMLCanvasElement) {
        this.canvas = canvasElement;
      }
    }

    if(this.canvas === null) throw new Error('invalid arguments');
    this.ctx = this.canvas.getContext('2d')!;
  }


  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }

  drawRect(x, y, width, height, color) {
    if(color !=null ) {
      this.ctx.fillStyle = color;
    }

    this.ctx.fillRect(x, y, width, height);
  }

  drawRectCenter(x, y, width, height, color) {
    if(color !=null ) {
      this.ctx.fillStyle = color;
    }

    this.ctx.fillRect(x - width/2, y - height/2, width, height);
  }

  drawLine(x1, y1, x2, y2, color, width=1) {
    if(color != null) {
      this.ctx.strokeStyle = color;
    }

    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawPolygon(points, color) {
    if(Array.isArray(points) !== true || points.length < 6) return;

    if(color != null) this.ctx.fillStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0], points[1]);

    for(let i = 2; i < points.length; i +=  2){
      this.ctx.lineTo(points[i], points[i + 1]);
    }

    this.ctx.closePath();
    this.ctx.fill();
  }

  drawCircle(x, y, radius, color) {
    if (color != null ) this.ctx.fillStyle = color;

    this.ctx.beginPath();
    this.ctx.arc(x,y, radius, 0.0, Math.PI * 2.0);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawFun(x, y, radius, startRadian, endRadian, color) {
    if (color != null ) this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, radius, startRadian, endRadian);
    this.ctx.closePath();
    this.ctx.fill();
  }

   /**
     * 線分を二次ベジェ曲線で描画する
     * @param {number} x1 - 線分の始点の X 座標
     * @param {number} y1 - 線分の始点の Y 座標
     * @param {number} x2 - 線分の終点の X 座標
     * @param {number} y2 - 線分の終点の Y 座標
     * @param {number} cx - 制御点の X 座標
     * @param {number} cy - 制御点の Y 座標
     * @param {string} [color] - 線を描画する際の色
     * @param {number} [width=1] - 線幅
     */
    drawQuadraticBezier(x1, y1, x2, y2, cx, cy, color, width=1) {
      if (color != null ) this.ctx.strokeStyle = color;

      this.ctx.lineWidth = width;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.quadraticCurveTo(cx, cy, x2, y2);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    /**
     * 線分を三次ベジェ曲線で描画する
     * @param {number} x1 - 線分の始点の X 座標
     * @param {number} y1 - 線分の始点の Y 座標
     * @param {number} x2 - 線分の終点の X 座標
     * @param {number} y2 - 線分の終点の Y 座標
     * @param {number} cx1 - 始点の制御点の X 座標
     * @param {number} cy1 - 始点の制御点の Y 座標
     * @param {number} cx2 - 終点の制御点の X 座標
     * @param {number} cy2 - 終点の制御点の Y 座標
     * @param {string} [color] - 線を描画する際の色
     * @param {number} [width=1] - 線幅
     */
    drawCubicBezier(x1, y1, x2, y2, cx1, cy1, cx2, cy2, color, width=1) {
      if (color != null ) this.ctx.strokeStyle = color;

      this.ctx.lineWidth = width;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    imageLoader(path, callback) {
      const target = new Image();

      target.onload = () => {
        if(callback != null) {
          callback(target);
        }
      };

      target.src = path;
    }

    drawText(text, x, y, color, width) {
      if (color != null ) this.ctx.fillStyle = color;

      this.ctx.fillText(text, x, y, width);
    }
}
