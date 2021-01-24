import * as THREE from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface AssetParams {
  path: string,
  name: string
}

interface Callbacks {
  onLoad: () => void;
  onProgress: (url?: string, itemsLoaded?: number, itemsTotal?: number) => void;
  onError: (url?: string) => void;
};

type LoadSrc = {
  texture: AssetParams[],
  obj: AssetParams[],
  gltf: AssetParams[]
};

export class AssetLoader {

  public manager: THREE.LoadingManager;
  public textures: { [ key: string ] : THREE.Texture }
  public gltfData: { [ key: string ] : GLTF }
  public objData: { [ key: string ] : THREE.Object3D }

  constructor(callbacks: Partial<Callbacks>) {
    this.manager = new THREE.LoadingManager();

    if(callbacks.onLoad) this.manager.onLoad = callbacks.onLoad;
    if(callbacks.onProgress) this.manager.onProgress = callbacks.onProgress;
    if(callbacks.onError) this.manager.onError = callbacks.onError;

    this.textures = {};
    this.gltfData = {};
    this.objData = {};
  }

  public load(data: Partial<LoadSrc>) {
    if(data.texture) this.loadTexture(data.texture);
    if(data.obj) this.loadObj(data.obj);
    if(data.gltf) this.loadGltf(data.gltf);
  }

  private loadTexture(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new THREE.TextureLoader(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.path, texture => {
        this.textures[data.name] = texture;
      });
    });
  }

  private loadObj(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new OBJLoader2(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.path, obj => {
        this.objData[data.name] = obj;
      });
    });
  }

  private loadGltf(dataArray: AssetParams[]) {
    dataArray.forEach(data => {
      const loader = new GLTFLoader(this.manager);
      loader.crossOrigin = 'use-credentials';
      loader.load(data.path, gltf => {
        this.gltfData[data.name] = gltf;
      });
    });
  }
}
