export class Hello {
  private message: string;

  constructor() {
    this.message = 'ZERO v0.0.1'

    const ua = navigator.userAgent.toLowerCase();
    const isChrome = /chrome/.test(ua);

    if(isChrome) {
      this.showHello();
    } else {
      this.showNormal();
    }

  }

  protected showHello() {
    console.log( `%c${this.message}`, 'padding: 0 3px; background-color: #A100FF; color: white; font-size:10px' );
  }

  protected showNormal() {
    console.log(`${this.message}`);
  }
}
