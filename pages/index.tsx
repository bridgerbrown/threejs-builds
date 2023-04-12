import { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x4A302B);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(40);
    camera.position.setX(-2);

    renderer.render(scene, camera);

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const sphere = new THREE.Mesh(geometry, material);

    const geometry2 = new THREE.SphereGeometry(3, 40, 40);
    const material2 = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.z = 20;
    sphere2.position.x = -10;

    const geometry3 = new THREE.SphereGeometry(4, 40, 40);
    const material3 = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const sphere3 = new THREE.Mesh(geometry3, material3);
    sphere3.position.z = 0;
    sphere3.position.x = 20;
    sphere3.position.y = 0;

    const geometry4 = new THREE.SphereGeometry(3, 40, 40);
    const material4 = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const sphere4 = new THREE.Mesh(geometry4, material4);
    sphere4.position.z = 2;
    sphere4.position.x = -20;
    sphere4.position.y = 0;

    scene.add(sphere, sphere2, sphere3, sphere4);

    sphere.add(sphere2, sphere3, sphere4);
    sphere.rotation.x = Math.PI / 5;


    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10, 10, 10);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    function animate() {
      requestAnimationFrame(animate);
    
      sphere.rotation.y += 0.012;
      // sphere.rotation.x += 0.01;

    
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
