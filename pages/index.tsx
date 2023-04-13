import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(70);
    camera.position.setX(-2);
    camera.position.setY(-1);

    renderer.render(scene, camera);

    const sphere1Texture = new THREE.TextureLoader().load('mars-texture.jpg');

    const geometry = new THREE.SphereGeometry(1, 0, 0);
    const material = new THREE.MeshStandardMaterial({ 
      map: sphere1Texture,
    });
    const sphere = new THREE.Mesh(geometry, material);

    const geometry2 = new THREE.SphereGeometry(14, 40, 40);
    const material2 = new THREE.MeshStandardMaterial({ color: 0x8C8C8C });
    const sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.z = -20;
    sphere2.position.x = -33;
    sphere2.position.y = 0;

    const geometry3 = new THREE.SphereGeometry(14, 40, 40);
    const material3 = new THREE.MeshStandardMaterial({ color: 0x8C8C8C });
    const sphere3 = new THREE.Mesh(geometry3, material3);
    sphere3.position.z = 33;
    sphere3.position.x = 0;
    sphere3.position.y = 0;

    const geometry4 = new THREE.SphereGeometry(14, 40, 40);
    const material4 = new THREE.MeshStandardMaterial({ color: 0x8C8C8C});
    const sphere4 = new THREE.Mesh(geometry4, material4);
    sphere4.position.z = -20;
    sphere4.position.x = 33;
    sphere4.position.y = 0;

    scene.add(sphere, sphere2, sphere3, sphere4);

    sphere.add(sphere2, sphere3, sphere4);
    sphere.rotation.x = Math.PI / 5;
    sphere.rotation.y = Math.PI / 5;


    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 70);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(pointLight);

    function animate() {
      requestAnimationFrame(animate);
    
      sphere.rotation.y += 0.005;
      sphere2.rotation.x += 0.01;
  
      // controls.update();
    
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
