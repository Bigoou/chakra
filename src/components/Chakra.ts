import * as THREE from 'three';
import GSAP from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class ScrollStage {

   
    private geometry!: THREE.IcosahedronGeometry;
    private material!: THREE.ShaderMaterial;
    private mesh!: THREE.Mesh;

    private mouse: { x: number, y: number };
    private settings: any;

    constructor(private element: HTMLElement) {
        console.log('ScrollStage');
        
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });

        this.canvas = this.renderer.domElement;

        this.camera = new THREE.PerspectiveCamera( 
            75, 
            this.viewport.width / this.viewport.height, 
            .1, 
            10
        );

        this.clock = new THREE.Clock();

        this.mouse = {
            x: 0,
            y: 0
        }

        this.settings = {
            // vertex
            uFrequency: {
                start: 0,
                end: 0
            },
            uAmplitude: {
                start: 0,
                end: 0
            },
            uDensity: {
                start: 0,
                end: 0
            },
            uStrength: {
                start: 0,
                end: 0
            },
            // fragment
            uDeepPurple: {  // max 1
                start: 0,
                end: 0
            },
            uOpacity: {  // max 1
                start: 1,
                end: 1
            }
        }

        this.init();
    }

    private viewport: { width: number, height: number };
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private canvas: HTMLCanvasElement;
    private camera: THREE.PerspectiveCamera;
    private clock: THREE.Clock;

    private init() {
        this.addCanvas();
        this.addCamera();
        this.addEventListeners();
        this.addMesh();
        this.onResize();
        this.update();
    }

    addMesh() {
        this.geometry = new THREE.IcosahedronGeometry(1, 64);
    
        this.material = new THREE.ShaderMaterial({
          wireframe: true,
          blending: THREE.AdditiveBlending,
          transparent: true,
          vertexShader,
          fragmentShader,
          uniforms: {
            uFrequency: { value: 4 },
            uAmplitude: { value: 0 },
            uDensity: { value: 0 },
            uStrength: { value: 0 },
            uDeepPurple: { value: 0.5 },
            uOpacity: { value: 1 },
            uTime: { value: 0 },
          },
        });
    
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
      }

      private addCanvas() {
        console.log('addCanvas');
    
        this.canvas.classList.add('webgl');
    
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.mixBlendMode = 'screen';
        this.canvas.style.zIndex = '1';
    
        this.element.appendChild(this.canvas);
    }
    

    private addCamera() {
        this.camera.position.set(0, 0, 2.5);
        this.scene.add(this.camera);
    }

    private addEventListeners() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMouseMove.bind(this))
    }

    private onResize = () => {
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.camera.aspect = this.viewport.width / this.viewport.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.viewport.width, this.viewport.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        if (this.viewport.width < this.viewport.height) {
            this.mesh.scale.set(.75, .75, .75);
          } else {
            this.mesh.scale.set(1, 1, 1);
          }
    }

    private update() {
        const elapsedTime = this.clock.getElapsedTime();
        this.material.uniforms.uTime.value = elapsedTime;
        this.mesh.rotation.y = elapsedTime * .05;
        this.render();

        window.requestAnimationFrame(this.update.bind(this));
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    onMouseMove(event : any) {
        // play with it!
        // enable / disable / change x, y, multiplier …
    
        this.mouse.x = Number((Number(event.clientX) / Number(this.viewport.width)).toFixed(2)) * 4
        this.mouse.y = Number((Number(event.clientY) / Number(this.viewport.height)).toFixed(2)) * 2

    
        GSAP.to(this.mesh.material.uniforms.uFrequency, { value: this.mouse.x / 1.5})
        GSAP.to(this.mesh.material.uniforms.uAmplitude, { value: this.mouse.x / 1.5 })
        GSAP.to(this.mesh.material.uniforms.uDensity, { value: this.mouse.y / 1.5 })
        GSAP.to(this.mesh.material.uniforms.uStrength, { value: this.mouse.y / 1.5 })
        // GSAP.to(this.mesh.material.uniforms.uDeepPurple, { value: this.mouse.x })
        // GSAP.to(this.mesh.material.uniforms.uOpacity, { value: this.mouse.y })
    
        console.info(`X: ${this.mouse.x}  |  Y: ${this.mouse.y}`)
      }



    cleanup() {
        window.removeEventListener('resize', this.onResize);
    }
}
