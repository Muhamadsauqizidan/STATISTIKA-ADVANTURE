import React, { useState, useEffect, useRef } from 'react';
import { Box, Layers, RotateCcw, Sliders, Sparkles, Plus, Trash2 } from 'lucide-react';
import * as THREE from 'three';

const VisualizationLabPage = () => {
  const [viewMode, setViewMode] = useState('3D'); // '2D' atau '3D'
  const [chartType, setChartType] = useState('bar'); // 'bar', 'pie', 'line'
  
  // Data interaktif yang dapat diubah siswa
  const [chartData, setChartData] = useState([
    { label: 'Senin', value: 25, color: '#6366F1' },
    { label: 'Selasa', value: 40, color: '#8B5CF6' },
    { label: 'Rabu', value: 35, color: '#06B6D4' },
    { label: 'Kamis', value: 50, color: '#10B981' },
    { label: 'Jumat', value: 30, color: '#F59E0B' },
  ]);

  const mountRef = useRef(null);

  // Kalkulasi Ukuran Pemusatan Real-time
  const values = chartData.map(d => Number(d.value) || 0);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = values.length ? (sum / values.length).toFixed(1) : 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 
    ? sorted[mid] 
    : sorted.length ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1) : 0;

  // Modus
  const freqMap = {};
  values.forEach(v => { freqMap[v] = (freqMap[v] || 0) + 1; });
  let maxFreq = 0;
  let modeVal = 'Tidak ada';
  for (let k in freqMap) {
    if (freqMap[k] > maxFreq && freqMap[k] > 1) {
      maxFreq = freqMap[k];
      modeVal = k;
    }
  }

  // Update nilai
  const handleValueChange = (index, newVal) => {
    const updated = [...chartData];
    updated[index].value = Math.max(0, Math.min(100, Number(newVal) || 0));
    setChartData(updated);
  };

  // Render 3D Canvas
  useEffect(() => {
    if (viewMode !== '3D' || !mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7, 12);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Pencahayaan
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x818cf8, 1.8);
    dir.position.set(5, 12, 8);
    scene.add(dir);

    // Group 3D
    const group = new THREE.Group();
    scene.add(group);

    // Alas Grid
    const baseGeo = new THREE.CylinderGeometry(5.5, 5.5, 0.2, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.1;
    group.add(baseMesh);

    // Bangun Objek Berdasarkan Chart Type
    const meshes = [];
    if (chartType === 'bar') {
      const maxVal = Math.max(...chartData.map(d => d.value), 10);
      const spacing = 1.4;
      const startX = -((chartData.length - 1) * spacing) / 2;

      chartData.forEach((item, i) => {
        const h = (item.value / maxVal) * 4.5 + 0.2;
        const geo = new THREE.BoxGeometry(0.9, h, 0.9);
        geo.translate(0, h / 2, 0);

        const hexColor = parseInt(item.color.replace('#', '0x'));
        const mat = new THREE.MeshStandardMaterial({
          color: hexColor,
          roughness: 0.3,
          metalness: 0.2
        });
        const bar = new THREE.Mesh(geo, mat);
        bar.position.set(startX + i * spacing, 0, 0);
        group.add(bar);
        meshes.push(bar);
      });
    } else if (chartType === 'pie') {
      // 3D Pie / Donut
      const total = chartData.reduce((acc, cur) => acc + cur.value, 0) || 1;
      let startAngle = 0;

      chartData.forEach((item) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        if (sliceAngle > 0.05) {
          const shape = new THREE.Shape();
          shape.moveTo(0, 0);
          shape.arc(0, 0, 3.2, startAngle, startAngle + sliceAngle, false);
          shape.lineTo(0, 0);

          const extrudeSettings = { depth: 0.8, bevelEnabled: false };
          const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const hexColor = parseInt(item.color.replace('#', '0x'));
          const mat = new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.4 });
          const sliceMesh = new THREE.Mesh(geo, mat);
          sliceMesh.rotation.x = Math.PI / 2;
          sliceMesh.position.y = 0.4;
          group.add(sliceMesh);
          meshes.push(sliceMesh);
        }
        startAngle += sliceAngle;
      });
    } else {
      // Line Chart 3D
      const maxVal = Math.max(...chartData.map(d => d.value), 10);
      const spacing = 1.4;
      const startX = -((chartData.length - 1) * spacing) / 2;
      const points = [];

      chartData.forEach((item, i) => {
        const y = (item.value / maxVal) * 4 + 0.2;
        const x = startX + i * spacing;
        points.push(new THREE.Vector3(x, y, 0));

        // Sphere node
        const sphereGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.5 });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(x, y, 0);
        group.add(sphere);
        meshes.push(sphere);
      });

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3 });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tubeMesh);
      meshes.push(tubeMesh);
    }

    // Touch & Pointer Orbit
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let reqId;

    const onPointerDown = (e) => {
      isDragging = true;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: cx, y: cy };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - prevMouse.x;
      const dy = cy - prevMouse.y;
      group.rotation.y += dx * 0.01;
      group.rotation.x = Math.max(-0.2, Math.min(0.7, group.rotation.x + dy * 0.01));
      prevMouse = { x: cx, y: cy };
    };

    const onPointerUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      baseGeo.dispose();
      baseMat.dispose();
      meshes.forEach(m => {
        if (m.geometry) m.geometry.dispose();
        if (m.material) m.material.dispose();
      });
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [viewMode, chartType, chartData]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
            Eksplorasi Interaktif
          </span>
          <h2 className="text-xl font-black text-white">Laboratorium Visualisasi 🧪</h2>
        </div>

        {/* 2D / 3D Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('2D')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
              viewMode === '2D' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setViewMode('3D')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
              viewMode === '3D' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
            }`}
          >
            3D
          </button>
        </div>
      </div>

      {/* Chart Type Selector Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'bar', label: '📊 Batang' },
          { id: 'pie', label: '🥧 Lingkaran' },
          { id: 'line', label: '📈 Garis' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setChartType(t.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
              chartType === t.id
                ? 'bg-slate-800 border-cyan-500 text-cyan-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Visual Canvas Area */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-4 mb-4 shadow-xl overflow-hidden">
        {viewMode === '3D' ? (
          <div className="relative w-full h-64 flex items-center justify-center">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 text-[10px] text-slate-400 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              Sentuh & putar grafik 3D
            </div>
          </div>
        ) : (
          /* 2D Fallback View */
          <div className="w-full h-64 flex flex-col justify-end p-2">
            <div className="flex items-end justify-around gap-2 h-48 border-b border-slate-700 pb-2">
              {chartData.map((d, i) => {
                const max = Math.max(...chartData.map(c => c.value), 10);
                const pct = Math.round((d.value / max) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-300">{d.value}</span>
                    <div
                      className="w-full max-w-[28px] rounded-t-lg transition-all duration-300"
                      style={{ height: `${pct}%`, backgroundColor: d.color }}
                    />
                    <span className="text-[10px] text-slate-400 truncate w-full text-center mt-1">{d.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">Mode 2D Analitis (Ortogonal)</p>
          </div>
        )}
      </div>

      {/* Real-time Statistics Calculator Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/30 mb-5">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles size={13} className="text-amber-400" />
          <span>Kalkulasi Otomatis Ukuran Pemusatan:</span>
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-800/80 text-center border border-slate-700/60">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Mean</p>
            <p className="text-base font-black text-cyan-400">{mean}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 text-center border border-slate-700/60">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Median</p>
            <p className="text-base font-black text-indigo-400">{median}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 text-center border border-slate-700/60">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Modus</p>
            <p className="text-base font-black text-emerald-400">{modeVal}</p>
          </div>
        </div>
      </div>

      {/* Live Data Editor Controls */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Ubah Data Secara Langsung (Slider):
        </h4>
        <div className="space-y-2.5">
          {chartData.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-xs font-bold text-white w-14 shrink-0">{item.label}</span>
              <input
                type="range"
                min="0"
                max="80"
                value={item.value}
                onChange={(e) => handleValueChange(idx, e.target.value)}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-cyan-300 w-8 text-right shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizationLabPage;
