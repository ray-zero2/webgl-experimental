import * as THREE from 'three';
import { TextureAssets } from '../../../utils/zero';

import peVert from './shaders/postEffect.vert';
import peFrag from './shaders/postEffect.frag';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module';


export class PostEffect {

  public name: string;
  public time: number;
  // public renderTarget: THREE.WebGLRenderTarget;

  protected resolution: THREE.Vector2;
  protected scene: THREE.Scene;
  protected camera: THREE.Camera;
  // protected plane: THREE.PlaneBufferGeometry;
  protected mesh: THREE.Mesh;
  protected shaderParams: { [ key: string ] : number | boolean };


  protected gui?: GUI;

  constructor(resolution: THREE.Vector2, shader?: any) {
    this.name = 'Post Effect';
    this.time = 0;
    this.resolution = resolution;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

    this.shaderParams = {
      brightness: 1,
      isFxaa: true
    }

    const plane = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: {
          value: this.resolution,
        },
        frameTexture: {
          value: new THREE.Texture()
        },
        brightness: {
          value: this.shaderParams.brightness
        },
        time: {
          value: 0
        },
        isFxaa: {
          value: this.shaderParams.isFxaa
        }
      },
      vertexShader: peVert,
      fragmentShader: peFrag,
    })

    this.mesh = new THREE.Mesh(plane, material);

    this.scene.add(this.mesh);
  }

  // public update(texture: THREE.Texture, deltaTime: number) {
  public render(renderer: THREE.WebGLRenderer, deltaTime: number, textures: TextureAssets) {
    this.time += deltaTime;
    const uniforms = (this.mesh.material as THREE.RawShaderMaterial).uniforms;
    uniforms.frameTexture.value = textures.frame;
    uniforms.time.value = this.time;
    renderer.setRenderTarget(null);
    renderer.render(this.scene, this.camera);
  }

  public resize(resolution: THREE.Vector2) {
    this.resolution = resolution;
    const uniforms = (this.mesh.material as THREE.RawShaderMaterial).uniforms;
    uniforms.resolution.value = this.resolution;
  }

  public setGui(gui: GUI) {
    this.gui = gui;
    const cubeFolder = gui.addFolder(this.name);
    const uniforms = (this.mesh.material as THREE.RawShaderMaterial).uniforms;
    cubeFolder.add(uniforms.brightness, 'value', 0, 1, 0.01).name('brightness');
    cubeFolder.add(uniforms.isFxaa, 'value').name('use FXAA');
    cubeFolder.open();
  }

}
