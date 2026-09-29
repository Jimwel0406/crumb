"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/cupcake.glb";

// Camera framing. FIT is the fraction of the canvas height the cupcake fills;
// slightly under 1 leaves a little breathing room at the top before the
// negative bottom margin lets the base bleed past the hero edge.
const FOV = 30;
const FIT = 0.9;

// Kick the fetch off as soon as this module loads, so the model is usually
// ready by the time the hero scrolls into view.
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_URL);
}

function Cupcake({ still }) {
  const { scene } = useGLTF(MODEL_URL);
  const spin = useRef(null);
  const float = useRef(null);

  // Clone so React Strict Mode double-mounting cannot mutating-share GPU
  // resources between instances.
  const model = useMemo(() => {
    const m = scene.clone(true);
    // The baked GLB ships at roughness 0.9, which reads flat without an
    // environment. Soften it slightly so the icing catches a sheen.
    m.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((mat) => {
        if ("roughness" in mat) mat.roughness = 0.72;
        if ("metalness" in mat) mat.metalness = 0.0;
        mat.envMapIntensity = 1.0;
        mat.needsUpdate = true;
      });
    });
    return m;
  }, [scene]);

  // Normalise to a 1-unit tall object sitting on y=0 to y=1 so the camera
  // maths below is predictable regardless of what the exporter produced.
  const norm = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const centre = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(centre);
    const s = 1 / size.y;
    return {
      scale: s,
      offset: [-centre.x * s, -box.min.y * s, -centre.z * s],
      aspect: size.x * s / (size.y * s),
    };
  }, [model]);

  useFrame((state) => {
    if (still) return;
    const t = state.clock.elapsedTime;
    if (spin.current) spin.current.rotation.y = Math.sin(t * 0.32) * 0.34;
    if (float.current) float.current.position.y = Math.sin(t * 0.62) * 0.012;
  });

  return (
    // outermost group is the float bob; the inner one spins
    <group ref={float}>
      <group ref={spin} position={[0, -0.5, 0]}>
        <group scale={norm.scale} position={norm.offset}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  );
}

// Fit the 1-unit-tall model in frame for a given fov, with `fit` as the
// fraction of the viewport it should occupy. Returns camera z distance.
function fitDistance(fov, fit) {
  const vFov = (fov * Math.PI) / 180;
  return 0.5 / (Math.tan(vFov / 2) * fit) + 0.5;
}

export default function HeroCupcake() {
  const wrapRef = useRef(null);
  const [live, setLive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // still render it, just without the idle motion
      setStill(true);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLive(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "240px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero__canvas" ref={wrapRef} aria-hidden="true">
      {live && (
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, fitDistance(FOV, FIT)], fov: FOV }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl, camera }) => {
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.NeutralToneMapping;
              gl.toneMappingExposure = 1.15;
              camera.lookAt(0, 0, 0);
            }}
          >
            {/* In-scene IBL (no external HDR fetch) — gives the PBR material
                soft, even light and a specular catch so it reads as lit. */}
            <Environment resolution={256} frames={1}>
              <Lightformer form="rect" intensity={2.6} position={[0, 3, 2.2]} scale={[8, 8, 1]} />
              <Lightformer form="rect" intensity={1.5} position={[-3, 1.4, 1.5]} scale={[5, 5, 1]} />
              <Lightformer form="rect" intensity={1.1} position={[3, 1.1, -1]} scale={[5, 5, 1]} />
              <Lightformer form="ring" intensity={2.2} position={[0, 3.4, -2]} scale={3} />
            </Environment>

            <ambientLight intensity={0.45} />
            <hemisphereLight intensity={0.5} groundColor="#f7e5d6" />
            <directionalLight position={[2.4, 3.6, 2.8]} intensity={1.5} />
            <directionalLight
              position={[-2.6, 1.2, -1.8]}
              intensity={0.35}
              color="#ffd9e6"
            />
            <Cupcake still={still} />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
