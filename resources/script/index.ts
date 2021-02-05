
const getPageId = (): string => {
  const pageId = document.body.dataset.id;
  if(!pageId) throw new Error('pageId is not defined');
  return pageId
}

const getCanvas = (): HTMLCanvasElement => {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
  if(!canvas) throw new Error('canvas element is not found');
  return canvas;
}

const getModule = (pageId: string) => {
  const initModule = (() => {
    switch (pageId) {
      // add sketch modules
        case 'gradation': return import(/* webpackChunkName: 'gradation' */`./sketches/gradation/Init`);
        case 'frameBuffer-01': return import(/* webpackChunkName: 'frameBuffer-01' */`./sketches/glsl-practice/frameBuffer-01/Init`);
        case 'frameBuffer-02': return import(/* webpackChunkName: 'frameBuffer-02' */`./sketches/glsl-practice/frameBuffer-02/Init`);
        case 'glitch': return import(/* webpackChunkName: 'glitch' */`./sketches/glsl-practice/glitch/Init`);
        default:
          throw new Error(`${pageId} Init Module is not found`);
      }
  })();

  return initModule;
}

const isTopPage = (pageId: string): boolean => {
  return pageId === 'index';
}


const index = () => {

  const pageId = getPageId();
  console.log({ pageId });

  if(isTopPage(pageId)) return;

  const canvas = getCanvas();

  // Todo: 一時的にanyにする。何か良い方法がないか探す。
  const initModule = getModule(pageId) as any;

  initModule.then(modules => {
    const Init = modules.Init;
    new Init(canvas);
  }).catch(error => {throw new Error(error)});

}

index();
