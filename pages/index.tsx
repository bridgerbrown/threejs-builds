import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import Stats from 'three/addons/libs/stats.module.js'

export default function Home() {
  const [sphereCoords, setSphereCoords] = useState<any>([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000, );
      camera.position.setX(60);
      camera.position.setY(60);
      camera.position.setZ(0);
      camera.lookAt(0, 0, 0);
      // camera.setFocalLength(30)
      // camera.fov = 37
      // camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    window.addEventListener( 'resize', onWindowResized );

    let stats = new Stats();
    document.body.appendChild( stats.dom );

    const controls = new OrbitControls(camera, renderer.domElement);

    new RGBELoader().load( 'quarry_01_1k.hdr', function ( texture: any ) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;

      renderer.render(scene, camera);
    } );

    const centerSphereGeometry = new THREE.SphereGeometry(0, 0, 0);
    const centerSphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
    scene.add(centerSphere);

    const orbitingSpheres: any = [];
    let cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256 );
    cubeRenderTarget.texture.type = THREE.HalfFloatType;
    let cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );
    let material = new THREE.MeshStandardMaterial( {
      envMap: cubeRenderTarget.texture,
      roughness: 0.05,
      metalness: 1
    } );
    for (let i = 0; i < 3; i++) {
      const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry( 15, 8 ), material );
      orbitingSpheres.push(sphere);
      centerSphere.add(sphere);
      // Position the sphere around the center sphere
      const angle = (2 * Math.PI * i) / 3;
      sphere.position.set(15 * Math.sin(angle), 0, 15 * Math.cos(angle));
    }

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-50, 70, 0);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(20, 20, 20);
    const ambientLight = new THREE.AmbientLight(0x00000);
    scene.add(ambientLight, pointLight, directionalLight);

    function lerp(x: number, y: number, a: number): number {
      return (1 - a) * x + a * y
    }

    function scalePercent(start: number, end: number) {
      return (scrollPercent - start) / (end - start)
    }
  
    const animationScripts: { start: number; end: number; func: () => void }[] = []
      animationScripts.push({
        start: 0,
        end: 40,
        func: () => {
        // centerSphere.rotation.y += 0.002;
          const distance = 0 + window.scrollY / 25;
    
          orbitingSpheres[0].position.set(distance * Math.sin((2 * Math.PI * 0) / 3), 0, distance * Math.cos((2 * Math.PI * 0) / 3));
          orbitingSpheres[1].position.set(distance * Math.sin((2 * Math.PI * 1) / 3), 0, distance * Math.cos((2 * Math.PI * 1) / 3));
          orbitingSpheres[2].position.set(distance * Math.sin((2 * Math.PI * 2) / 3), 0, distance * Math.cos((2 * Math.PI * 2) / 3));

          camera.position.x = lerp(40, 100, scalePercent(0, 40));
          camera.position.y = lerp(40, 180, scalePercent(0, 40));
          camera.position.z = lerp(40, 40, scalePercent(0, 40));

          centerSphere.rotation.x = lerp(-4, 3, scalePercent(0, 40));
        },
      })
      animationScripts.push({
        start: 40,
        end: 101,
        func: () => {
          // centerSphere.rotation.y += 0.002;
          const stoppingDistance = 25
          let distance = (0 + window.scrollY / 25) * (1 - scalePercent(40, 101))
          if (distance < stoppingDistance) {
            distance = stoppingDistance
          }

          orbitingSpheres[0].position.set(distance * Math.sin((2 * Math.PI * 0) / 3), 0, distance * Math.cos((2 * Math.PI * 0) / 3));
          orbitingSpheres[1].position.set(distance * Math.sin((2 * Math.PI * 1) / 3), 0, distance * Math.cos((2 * Math.PI * 1) / 3));
          orbitingSpheres[2].position.set(distance * Math.sin((2 * Math.PI * 2) / 3), 0, distance * Math.cos((2 * Math.PI * 2) / 3));

          camera.position.x = lerp(80, 60, scalePercent(40, 80));
          camera.position.y = lerp(160, 50, scalePercent(40, 80));

          centerSphere.rotation.x = lerp(3, 12, scalePercent(40, 101));
        },
      })

      function playScrollAnimations() {
        animationScripts.forEach((a) => {
            if (scrollPercent >= a.start && scrollPercent < a.end) {
                a.func()
            }
        })
      }
  
      let scrollPercent = 0
    
    document.body.onscroll = () => {
        scrollPercent =
            ((document.documentElement.scrollTop || document.body.scrollTop) /
                ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                    document.documentElement.clientHeight)) *
            100
        ;(document.getElementById('scrollProgress') as HTMLDivElement).innerText =
            'Scroll Progress : ' + scrollPercent.toFixed(2)
    }

    function onWindowResized() {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function animate() {
      cubeCamera.update( renderer, scene );
      requestAnimationFrame(animate);
      playScrollAnimations()
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

  }, [])

  return (
    <main className="w-full min-h-screen">
        {/* <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script> */}

        {/* <script type="importmap">
          {
            "imports": {
              "three": "../build/three.module.js",
              "three/addons/": "./jsm/"
            }
          }
        </script> */}
      <div className='fixed z-10 w-full min-h-screen top-0 opacity-0'></div>
      <canvas id="bg" className='fixed top-0 left-0'></canvas>
        <main>

        <div id="scrollProgress" className='fixed top-1 left-1 text-sm opacity-50'></div>

        <header className='mb-[1000px]'>
          <h1>Bridger Brown</h1>
          <p>Frontend Developer</p>
        </header>
{/* 

        <blockquote>
          <p>I like making stuff and putting it on the internet</p>
        </blockquote>a */}

        <section>
          <h2>📜 Manifesto</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <section className="light">
          <h2>👩🏽‍🚀 Projects</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>🏆 Accomplishments</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <blockquote>
          <p>The best way out is always through <br/>-Robert Frost</p>
        </blockquote>

        <section className="left">
          <h2>🌮 Work History</h2>

          <h3>McDonalds</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>Burger King</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>Taco Bell</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

        </section>

        <blockquote>
          <p>Thanks for watching!</p>
        </blockquote>


      </main>
    </main>
  )
}
