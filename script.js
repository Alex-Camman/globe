let scene, camera, renderer, globe, pointLight, ambientLight, atmosphere, imageMesh, particleSystem;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true, // Enable antialiasing for smooth edges
    powerPreference: "high-performance", // Prioritize high-performance rendering
    maxAnisotropy: 16, // Increase texture quality
    alpha: true, // Enable transparency for realistic lighting effects
  });
  
  renderer.setClearColor(0x000000, 1); // Set background color to black for contrast
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Adjust pixel ratio for high-resolution displays
  renderer.shadowMap.enabled = true; // Enable shadow mapping for realistic lighting
  renderer.shadowMap.type = THREE.PCFShadowMap; // Use high-quality PCF shadows
  document.body.appendChild(renderer.domElement);
  

// Globe with Earth Texture
const textureLoader = new THREE.TextureLoader();
const globeTexture = textureLoader.load(`/home/fedora/A_Realistic_Design-Cube_1/DALL·E 2023-11-24 17.15.24 - a detailed and realistic Earth texture map, showing continents, oceans, and natural colors from a satellite view, suitable for wrapping onto a sphere.png`); // Make sure this path is correct
const material = new THREE.MeshPhongMaterial({
  map: globeTexture,
  shininess: 0.5,
  specular: 0xffffff,
  metalness: 0.2
});
const geometry = new THREE.SphereGeometry(2, 64, 64);
globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add a slow rotation to the globe for a realistic effect
const globeRotation = new THREE.AnimationMixer(globe);
const globeRotationClip = globeRotation.clipAction(new THREE.AnimationClip([], [], []));
globeRotationClip.setDuration(30); // Adjust duration for desired rotation speed
globeRotationClip.play();

// Neon Light
const neonLight = new THREE.PointLight(0xff0000, 2, 100);
neonLight.position.set(5, 5, 5);
neonLight.intensity = 0.5; // Adjust intensity for desired neon glow
scene.add(neonLight);

// Add a flickering effect to the neon light
const neonLightFlicker = new THREE.AnimationMixer(neonLight);
const neonLightFlickerClip = neonLightFlicker.clipAction(new THREE.AnimationClip([], [], []));
neonLightFlickerClip.play();
neonLightFlicker.addEventListener('loop', () => {
  neonLight.intensity = Math.random() + 0.5; // Randomize intensity for flickering effect
});


    // Ambient Light
    ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Atmosphere Effect
    const atmosphereMaterial = new THREE.ShaderMaterial({
        // Add custom shaders for a glowing effect
        uniforms: {
            // Uniforms for shaders like color and intensity
        },
        vertexShader: ``, // Add the vertex shader code
        fragmentShader: ``, // Add the fragment shader code
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const atmosphereGeometry = new THREE.SphereGeometry(2.05, 50, 50);
    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Image of Orville
    const orvilleTexture = textureLoader.load('orville.jpeg'); // Make sure this path is correct
    const imageMaterial = new THREE.MeshBasicMaterial({ map: orvilleTexture, transparent: true, opacity: 0.7 });
    const imageGeometry = new THREE.PlaneGeometry(3, 3);
    imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.set(0, 0, 2);
    scene.add(imageMesh);

    import * as THREE from 'three';
    import OrbitControls from 'three/examples/jsm/controls/OrbitControls.js';
    import { GUI } from 'dat.gui.js';
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Set camera position and background color
    camera.position.set(5, 5, 5);
    renderer.setClearColor(0x333333, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create a sphere geometry for the globe
    const globeGeometry = new THREE.SphereGeometry(3, 128, 128);
    
    // Load Earth texture and create globe material
    const textureLoader = new THREE.TextureLoader();
    const globeTexture = textureLoader.load('earth_texture.png');
    const globeMaterial = new THREE.MeshPhongMaterial({ map: globeTexture });
    
    // Create the globe mesh and add it to the scene
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Add a point light to illuminate the globe
    const pointLight = new THREE.PointLight(0xff0000, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create an atmosphere geometry and material
    const atmosphereGeometry = new THREE.SphereGeometry(3.1, 128, 128);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowStrength: { value: 0.5 },
        // Add custom shaders for vertex and fragment shaders
      },
      vertexShader: `
        varying vec3 vNormal;
    
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
    
        uniform float glowStrength;
    
        varying vec3 vNormal;
    
        void main() {
          float glow = 0.5 + 0.5 * sin(vNormal.y * 10.0) * glowStrength;
          gl_FragColor = vec4(glow, glow, glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    // Create the atmosphere mesh and add it to the scene
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    

// ... other code omitted for brevity ...

function animate() {
    requestAnimationFrame(animate);
  
    let elapsedTime = clock.getElapsedTime();
  
    // Pulsating Glow Animation
    glowStrength = Math.sin(elapsedTime) * 0.5 + 0.5; // This creates a pulsating effect
    atmosphereMaterial.uniforms.glowStrength.value = glowStrength;
  
    // Rotate the globe and atmosphere
    globe.rotation.y += 0.005;
    atmosphere.rotation.y += 0.005;
  
    // Twinkling Particle System Animation
    let particleCount = particleGeometry.vertices.length;
    for (let i = 0; i < particleCount; i++) {
      let particle = particleGeometry.vertices[i];
      particle.y += Math.random() * 0.01 - 0.005; // Add vertical movement for twinkling effect
    }
    particleGeometry.verticesNeedUpdate = true; // Update particle positions
  
    renderer.render(scene, camera);
  }
  

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
