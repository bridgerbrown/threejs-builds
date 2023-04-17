// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import Stats from 'three/addons/libs/stats.module.js'

// export default class Scene {
//   constructor(canvasId) {
//     this.scene = undefined;
//     this.camera = undefined;
//     this.cubeCamera = undefined;
//     this.renderer = undefined;
//     // this.fov = 37;
//     this.canvasId = canvasId;
//     this.stats = undefined;
//     this.controls = undefined;
//     this.ambientLight = undefined;
//     this.pointLight = undefined;
//     this.directionalLight = undefined;
//     this.RGBELoader = undefined;
//     this.centerSphere = undefined;
//     this.orbitingSpheres = [];
//     this.scrollPercent = 0;
//   }

//   init() {
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000, );
//       this.camera.position.setX(60);
//       this.camera.position.setY(60);
//       this.camera.position.setZ(0);
//       this.camera.lookAt(0, 0, 0);
//       // camera.setFocalLength(30)
//       // camera.fov = 37
//       // camera.updateProjectionMatrix();
    
//     const canvas = document.getElementById(this.canvasId)
//     this.renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//     })
//     this.renderer.setPixelRatio(window.devicePixelRatio);
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.renderer.outputEncoding = THREE.sRGBEncoding;
//     this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     this.renderer.render(this.scene, this.camera);
//     document.body.appendChild(this.renderer.domElement);

//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//     this.stats = new Stats();
//     document.body.appendChild(this.stats.dom);

//     window.addEventListener('resize', () => this.onWindowResized() );

//     this.pointLight = new THREE.PointLight(0xffffff, 1);
//     this.pointLight.position.set(-50, 70, 0);
//     this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     this.directionalLight.position.set(20, 20, 20);
//     this.ambientLight = new THREE.AmbientLight(0x00000);
//     this.scene.add(this.ambientLight, this.pointLight, this.directionalLight);

//     this.RGBELoader = new RGBELoader()
//     .load('quarry_01_1k.hdr', function (texture) {
//       texture.mapping = THREE.EquirectangularReflectionMapping;
//       this.scene.background = texture;
//       this.scene.environment = texture;
//     } );

    
    
//     document.body.onscroll = () => {
//         //calculate the current scroll progress as a percentage
//         this.scrollPercent =
//             ((document.documentElement.scrollTop || document.body.scrollTop) /
//                 ((document.documentElement.scrollHeight ||
//                     document.body.scrollHeight) -
//                     document.documentElement.clientHeight)) *
//             100
//         ;(document.getElementById('scrollProgress')).innerText =
//             'Scroll Progress : ' + this.scrollPercent.toFixed(2)
//     }
//   }

//   animate() {
//     window.requestAnimationFrame(this.animate.bind(this));
//     // this.cubeCamera.update( this.renderer, this.scene );
//     this.render();
//     this.controls.update();
//   }

//   render() {
//       this.renderer.render(this.scene, this.camera);
//   }

//   onWindowResize() {
//       this.camera.aspect = window.innerWidth / window.innerHeight;
//       this.camera.updateProjectionMatrix();
//       this.renderer.setSize( window.innerWidth, window.innerHeight );
//   }
// }