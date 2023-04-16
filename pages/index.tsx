import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Home() {
  const [sphereCoords, setSphereCoords] = useState<any>([]);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x303030);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setX(80);
    camera.position.setY(80);
    camera.position.setZ(0);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    const controls = new OrbitControls(camera, renderer.domElement);

    const centerTexture = new THREE.TextureLoader().load('mars-texture.jpg');

    // Center Object

    const centerSphereGeometry = new THREE.SphereGeometry(1, 0, 0);
    const centerSphereMaterial = new THREE.MeshStandardMaterial({ 
      map: centerTexture,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
    scene.add(centerSphere);

    const childSphereGeometry = new THREE.SphereGeometry(20, 40, 40);
    const childSphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8C8C8C, 
      metalness: 1,
      roughness: 0.7,
      emissive: 0x000000,
    });

    // Spheres Orbitting

      // Orbitting Math
      let sphere1Coords
      let sphere2Coords
      let sphere3Coords;

      const orbitingSpheres: any = [];
      for (let i = 0; i < 3; i++) {
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(12, 32, 32), new THREE.MeshStandardMaterial({
          color: 0xFF1000, 
          metalness: 1,
          roughness: 0.7,
          emissive: 0x000000,
        }));
        orbitingSpheres.push(sphere);
        centerSphere.add(sphere);

        // Position the sphere around the center sphere
        const angle = (2 * Math.PI * i) / 3;
        sphere.position.set(15 * Math.sin(angle), 0, 15 * Math.cos(angle));
      }

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-50, 70, 0);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(20, 20, 20);

    const ambientLight = new THREE.AmbientLight(0x00000);

    scene.add(ambientLight, pointLight, directionalLight);

    // Animation
    
    function lerp(x: number, y: number, a: number): number {
      return (1 - a) * x + a * y
    }

    function scalePercent(start: number, end: number) {
      return (scrollPercent - start) / (end - start)
    }
  
    const animationScripts: { start: number; end: number; func: () => void }[] = []

    // animation that opens the 3 spheres positions
      animationScripts.push({
        start: 0,
        end: 40,
        func: () => {
          const angle1 = (2 * Math.PI) / 9;
          const angle2 = angle1 + (2 * Math.PI) / 3;
          const angle3 = angle2 + (2 * Math.PI) / 3;
    
          const distance = 15 + window.scrollY / 50;
    
          orbitingSpheres[0].position.set(distance * Math.sin((2 * Math.PI * 0) / 3), 0, distance * Math.cos((2 * Math.PI * 0) / 3));
          orbitingSpheres[1].position.set(distance * Math.sin((2 * Math.PI * 1) / 3), 0, distance * Math.cos((2 * Math.PI * 1) / 3));
          orbitingSpheres[2].position.set(distance * Math.sin((2 * Math.PI * 2) / 3), 0, distance * Math.cos((2 * Math.PI * 2) / 3));

          camera.position.x = lerp(80, 0, scalePercent(0, 40));
          camera.position.y = lerp(80, 150, scalePercent(0, 40));
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
        //calculate the current scroll progress as a percentage
        scrollPercent =
            ((document.documentElement.scrollTop || document.body.scrollTop) /
                ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                    document.documentElement.clientHeight)) *
            100
        ;(document.getElementById('scrollProgress') as HTMLDivElement).innerText =
            'Scroll Progress : ' + scrollPercent.toFixed(2)
    }

    function animate() {
      requestAnimationFrame(animate);
    
      playScrollAnimations()
      
      centerSphere.rotation.y += 0.005;
    
      controls.update();

      renderer.render(scene, camera);
    }
    
    animate();

  }, [])



  return (
    <main className="bg-white w-full min-h-screen">
      <canvas id="bg"></canvas>
        <main>

        <div id="scrollProgress" className='fixed'></div>

        <header>
          <h1>Bridger Brown</h1>
          <p>Frontend Developer</p>
        </header>


        <blockquote>
          <p>I like making stuff and putting it on the internet</p>
        </blockquote>

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
