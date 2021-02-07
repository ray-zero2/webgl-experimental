import {
  Texture,
  TextureLoader,
  Object3D,
  LoadingManager,
} from 'three';

import { Hello } from './Hello';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface AssetParams {
  name: string,
  src: string,
}

interface Callbacks {
  onLoad: () => void;
  onProgress: (url?: string, itemsLoaded?: number, itemsTotal?: number) => void;
  onError: (url?: string) => void;
};

export interface TextureAssets { [ key: string ] : Texture };
export interface GLTFAssets { [ key: string ] : GLTF };
export interface OBJAssets { [ key: string ] : Object3D };

type LoadSrc = {
  texture: AssetParams[],
  obj: AssetParams[],
  gltf: AssetParams[]
};

export class AssetLoader {

  protected manager: LoadingManager;
  protected textures: TextureAssets;
  protected gltfData: GLTFAssets;
  protected objData: OBJAssets;

  constructor(callbacks: Partial<Callbacks>) {
    if(!window['ZERO']) window['ZERO'] = new Hello();
    this.manager = new LoadingManager();

    if(callbacks.onLoad) this.manager.onLoad = callbacks.onLoad;
    if(callbacks.onProgress) this.manager.onProgress = callbacks.onProgress;
    if(callbacks.onError) this.manager.onError = callbacks.onError;

    this.textures = {};
    this.gltfData = {};
    this.objData = {};
  }

  public getTexture(): TextureAssets {
    return this.textures;
  }

  public getGLTF(): GLTFAssets {
    return this.gltfData;
  }

  public getOBJ(): OBJAssets {
    return this.objData;
  }

  public load(data: Partial<LoadSrc>) {
    if(data.texture) this.loadTexture(data.texture);
    if(data.obj) this.loadObj(data.obj);
    if(data.gltf) this.loadGltf(data.gltf);
  }

  protected loadTexture(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new TextureLoader(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.src, texture => {
        this.textures[data.name] = texture;
      });
    });
  }

  protected loadObj(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new OBJLoader2(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.src, obj => {
        this.objData[data.name] = obj;
      });
    });
  }

  protected loadGltf(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new GLTFLoader(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.src, gltf => {
        this.gltfData[data.name] = gltf;
      });
    });
  }
}
