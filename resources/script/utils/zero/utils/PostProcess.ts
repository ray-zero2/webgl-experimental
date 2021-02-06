import * as THREE from 'three';

import Pane from 'tweakpane';

import simpleVertex from '../shader/simpleVertex.glsl';

interface RenderTargetIndex {
  read: number;
  write: number;
}

export abstract class PostProcess {

  public name: string;
  public time: number;

  public materials: THREE.RawShaderMaterial[];

  protected renderTargets: [
    THREE.WebGLRenderTarget,
    THREE.WebGLRenderTarget
  ];
  protected renderTargetIndex: RenderTargetIndex;
  protected renderer: THREE.WebGLRenderer;
  protected resolution: THREE.Vector2;
  protected pixelRatio: number;
  protected scene: THREE.Scene;
  protected camera: THREE.Camera;
  protected mesh: THREE.Mesh;

  protected pane?: Pane;
  protected guiFolder?: any;

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2, targetOption?: THREE.WebGLRenderTargetOptions) {
    this.name = 'Post Effect';
    this.time = 0;
    this.renderer = renderer;
    this.resolution = resolution;
    this.pixelRatio = renderer.getPixelRatio();
    this.renderTargets = [
      new THREE.WebGLRenderTarget(resolution.x * this.pixelRatio, resolution.y * this.pixelRatio, targetOption),
      new THREE.WebGLRenderTarget(resolution.x * this.pixelRatio, resolution.y * this.pixelRatio, targetOption)
    ];
    this.renderTargetIndex = {
      write: 0,
      read: 1,
    };
    this.materials = [];
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

    this.materials.push(new THREE.RawShaderMaterial(params));
    return this;
  }

  public render(origScene: THREE.Scene, origCamera: THREE.Camera, deltaTime: number) {
    this.time += deltaTime;

    const defaultTarget = this.renderer.getRenderTarget();
    const indices = this.renderTargetIndex;
    this.renderer.setRenderTarget(this.renderTargets[indices.write]);
    this.renderer.clear();
    this.renderer.render(origScene, origCamera);
    this.swapTargetIndex();

    this.materials.forEach((material, index) => {
      const { texture } = this.renderTargets[indices.read];
      material.uniforms.bufferTexture.value = texture;
      material.uniforms.time.value = this.time;
      this.mesh.material = material;

      if(index === this.materials.length - 1) {
        this.renderer.setRenderTarget(defaultTarget);
      } else {
        this.renderer.setRenderTarget(this.renderTargets[indices.write]);
      }

      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      this.swapTargetIndex();
    });
  }

  public resize(resolution?: THREE.Vector2) {
    if(!resolution) return;
    this.setResolution(resolution);
  }

  public setGui(pane: Pane) {
    this.pane = pane;
    this.pane.addFolder({
      title: this.name,
      expanded: true
    })
  }

  private setResolution(resolution: THREE.Vector2) {
    this.resolution = resolution.clone();

    const x = resolution.x * this.pixelRatio;
    const y = resolution.y * this.pixelRatio;

    this.renderTargets.forEach(target => {
      target.setSize( x, y );
    })

    this.materials.forEach(material => {
      const resolutionParam = material.uniforms?.resolution;
      if(resolutionParam) resolutionParam.value = this.resolution.multiplyScalar(this.pixelRatio);
    });
  }

  private swapTargetIndex() {
    const indices = this.renderTargetIndex;
    indices.write = (indices.write + 1) % 2;
    indices.read = (indices.read + 1) % 2;
  }
}
