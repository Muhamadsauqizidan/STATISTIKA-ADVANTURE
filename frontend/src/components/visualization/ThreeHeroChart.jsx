import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeHeroChart = () => {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Deteksi WebGL
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 240;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x818cf8, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2, 20);
    pointLight.position.set(-5, 5, 3);
    scene.add(pointLight);

    // 3. 3D Bar Group (Pilar Data 3D)
    const barGroup = new THREE.Group();
    scene.add(barGroup);

    // Grid alas lingkaran lembut
    const baseGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.2, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.2,
      roughness: 0.8
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.1;
    barGroup.add(baseMesh);

    // Cincin bercahaya
    const ringGeo = new THREE.RingGeometry(4.4, 4.6, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.02;
    barGroup.add(ringMesh);

    // Data batang (Tinggi representasi statistika)
    const dataValues = [1.8, 3.2, 4.5, 2.7, 3.8];
    const colors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xf59e0b];
    const bars = [];

    const spacing = 1.2;
    const startX = -((dataValues.length - 1) * spacing) / 2;

    dataValues.forEach((val, i) => {
      const geo = new THREE.BoxGeometry(0.8, val, 0.8);
      // Geser titik pivot ke bagian dasar
      geo.translate(0, val / 2, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.3,
        roughness: 0.3,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.15
      });

      const bar = new THREE.Mesh(geo, mat);
      bar.position.set(startX + i * spacing, 0, 0);
      barGroup.add(bar);
      bars.push(bar);
    });

    // 4. Animasi & Interaksi Drag Sentuh
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let reqId;

    const onPointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      barGroup.rotation.y += deltaX * 0.01;
      barGroup.rotation.x = Math.max(-0.2, Math.min(0.6, barGroup.rotation.x + deltaY * 0.01));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotasi otomatis lembut saat tidak disentuh
      if (!isDragging) {
        barGroup.rotation.y += 0.008;
      }

      // Animasi gelombang kecil pada batang data
      bars.forEach((bar, idx) => {
        const wave = Math.sin(elapsedTime * 2 + idx * 0.8) * 0.08;
        bar.scale.y = 1 + wave;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup saat unmount (NFR Memory Leak Free)
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      // Dispose Geometries & Materials
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      bars.forEach(b => {
        b.geometry.dispose();
        b.material.dispose();
      });
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-56 flex flex-col items-center justify-center bg-game-card rounded-2xl p-4 border border-game-elevated">
        <div className="flex items-end gap-3 h-28 mb-3">
          <div className="w-6 h-14 bg-game-primary rounded-t-lg"></div>
          <div className="w-6 h-24 bg-game-secondary rounded-t-lg"></div>
          <div className="w-6 h-28 bg-game-accent rounded-t-lg"></div>
          <div className="w-6 h-18 bg-game-success rounded-t-lg"></div>
          <div className="w-6 h-20 bg-game-warning rounded-t-lg"></div>
        </div>
        <p className="text-xs text-game-muted font-medium">Visualisasi 2D Statistika Interaktif</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 sm:h-72 flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 pointer-events-none text-[11px] text-game-muted flex items-center gap-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block"></span>
        <span>Sentuh & geser untuk memutar grafik 3D</span>
      </div>
    </div>
  );
};

export default ThreeHeroChart;
