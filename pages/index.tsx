import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x303030);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(0);
    camera.position.setX(0);
    camera.position.setY(150);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

    const centerTexture = new THREE.TextureLoader().load('mars-texture.jpg');

    const centerSphereGeometry = new THREE.SphereGeometry(1, 0, 0);
    const centerSphereMaterial = new THREE.MeshStandardMaterial({ 
      map: centerTexture,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
    scene.add(centerSphere);

    const childSphereGeometry = new THREE.SphereGeometry(14, 40, 40);
    const childSphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8C8C8C, 
      metalness: 1,
      roughness: 0.7,
      emissive: 0x000000,
    });

    const sphere1 = new THREE.Mesh( childSphereGeometry, childSphereMaterial );
    sphere1.position.set( 0, 0, 55 );
    centerSphere.add( sphere1 );

    const sphere2 = new THREE.Mesh( childSphereGeometry, childSphereMaterial );
    sphere2.position.set( 45, 0, -30 );
    centerSphere.add( sphere2 );

    const sphere3 = new THREE.Mesh( childSphereGeometry, childSphereMaterial );
    sphere3.position.set( -45, 0, -30 );
    centerSphere.add( sphere3 );

    centerSphere.rotation.x = Math.PI ;



    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-50, 70, 0);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(20, 20, 20);

    const ambientLight = new THREE.AmbientLight(0x00000);

    scene.add(ambientLight, pointLight, directionalLight);

    // function addStar() {
    //   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    //   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    //   const star = new THREE.Mesh(geometry, material);
    
    //   const [x, y, z] = Array(3)
    //     .fill()
    //     .map(() => THREE.MathUtils.randFloatSpread(100));
    
    //   star.position.set(x, y, z);
    //   scene.add(star);
    // }
    
    // Array(200).fill().forEach(addStar);

    function animate() {
      requestAnimationFrame(animate);
    
      
      // centerSphere.rotation.y += 0.02;
    
    
      renderer.render(scene, camera);
    }
    
    animate();
  }, [])



  return (
    <main className="bg-white w-full min-h-screen">
      <canvas id="bg"></canvas>
    </main>
  )
}
