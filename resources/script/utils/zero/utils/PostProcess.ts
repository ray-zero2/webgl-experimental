import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import simpleVertex from '../shader/simpleVertex.glsl';

export class PostProcess {

  public name: string;
  public time: number;

  public materials: THREE.RawShaderMaterial[];

  public writeTarget: THREE.WebGLRenderTarget;
  public readTarget: THREE.WebGLRenderTarget;

  protected renderer: THREE.WebGLRenderer;
  protected resolution: THREE.Vector2;
  protected scene: THREE.Scene;
  protected camera: THREE.Camera;
  protected mesh: THREE.Mesh;

  protected gui?: GUI;
  protected guiFolder?: any;



  constructor(renderer: THREE.WebGLRenderer,resolution: THREE.Vector2) {
    this.name = 'Post Effect';

    this.time = 0;

    this.renderer = renderer;
    this.resolution = resolution;

    this.materials = [];

    this.readTarget = new THREE.WebGLRenderTarget(resolution.x, resolution.y, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter
    });

    this.writeTarget = new THREE.WebGLRenderTarget(resolution.x, resolution.y,{
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter
    });


    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

    const plane = new THREE.PlaneBufferGeometry(2, 2);

    this.mesh = new THREE.Mesh(plane);


    this.scene.add(this.mesh);
  }

  public add(params: THREE.ShaderMaterialParameters): this {
    params.vertexShader = params.vertexShader || simpleVertex;

    params.uniforms = params.uniforms || {};
    params.uniforms.resolution = params.uniforms.resolution || { value: this.resolution };
    params.uniforms.time = params.uniforms.time || { value: this.time };
    params.uniforms.bufferTexture = params.uniforms.bufferTexture || { value: new THREE.Texture() };

    if(!params.fragmentShader) throw new Error('post process shader is not found');

    const material = new THREE.RawShaderMaterial(params);

    material.uniformsNeedUpdate = true;
    material.needsUpdate = true;
    this.materials.push(material);

    return this;
  }

  public getRenderTarget(): THREE.WebGLRenderTarget {
    return this.writeTarget;
  }

  public render(origScene: THREE.Scene, origCamera: THREE.Camera, deltaTime: number) {
    this.time += deltaTime;

    const defaultTarget = this.renderer.getRenderTarget();

    this.renderer.setRenderTarget(this.writeTarget);
    this.renderer.clear();
    this.renderer.render(origScene, origCamera);

    this.materials.forEach((material, index) => {
      this.swapTarget();

      const { texture } = this.readTarget;
      material.uniforms.bufferTexture.value = texture;
      this.mesh.material = material;

      if(index === this.materials.length - 1) {
        this.renderer.setRenderTarget(defaultTarget);
      } else {
        this.renderer.setRenderTarget(this.writeTarget);
      }

      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    });


    return this.readTarget.texture;
  }

  public resize(resolution?: THREE.Vector2) {
    if(!resolution) return;
    this.setResolution(resolution);
  }

  private setResolution(resolution: THREE.Vector2) {
    this.resolution = resolution;
    this.readTarget.setSize( this.resolution.x, this.resolution.y );
    this.writeTarget.setSize( this.resolution.x, this.resolution.y );

    this.materials.forEach(material => {
      const resolutionParam = material.uniforms?.resolution;
      if(resolutionParam) resolutionParam.value = resolution;
    });
  }

  private swapTarget() {
    const tmp = this.writeTarget;
    this.writeTarget = this.readTarget;
    this.readTarget = tmp;
  }

  public setGui(gui: GUI) {
    this.gui = gui;
    this.guiFolder = gui.addFolder(this.name);
    this.guiFolder.open();
  }
}
