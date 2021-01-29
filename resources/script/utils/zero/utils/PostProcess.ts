import * as THREE from 'three';

import simpleVertex from '../shader/simpleVertex.glsl';

export class PostProcess {

  public name: string;
  public time: number;

  public materials: THREE.RawShaderMaterial[];

  // public rendererTargetArray: THREE.RenderTarget[];
  public writeTarget: THREE.WebGLRenderTarget;
  public readTarget: THREE.WebGLRenderTarget;

  protected renderer: THREE.WebGLRenderer;
  protected resolution: THREE.Vector2;
  protected scene: THREE.Scene;
  protected camera: THREE.Camera;
  protected mesh: THREE.Mesh;



  constructor(renderer: THREE.WebGLRenderer,resolution: THREE.Vector2) {
    this.name = 'Post Effect';

    this.time = 0;

    this.renderer = renderer;
    this.resolution = resolution;

    this.materials = [];

    this.readTarget = new THREE.WebGLRenderTarget(resolution.x, resolution.y)
    this.writeTarget = new THREE.WebGLRenderTarget(resolution.x, resolution.y)

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
    params.uniforms.bufferTexture = params.uniforms.bufferTexture || { value: new THREE.Texture() };

    if(!params.fragmentShader) throw new Error('post process shader is not found');

    const material = new THREE.RawShaderMaterial(params);
    this.materials.push(material);

    return this;
  }

  public getRenderTarget(): THREE.WebGLRenderTarget {
    return this.writeTarget;
  }

  public update(deltaTime: number) {
    this.time += deltaTime;
    const defaultTarget = this.renderer.getRenderTarget;

    const lastIndex = this.materials.length - 1;

    this.materials.forEach((material, index) => {
      this.renderer.setRenderTarget(this.writeTarget);
      this.mesh.material = material;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);



    });

    this.renderer.setRenderTarget(defaultTarget);
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
}
