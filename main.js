import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer  = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10,3,16,100);
//const material = new THREE.MeshStandardMaterial({color: 0x9E4606 });
const knotTexture = new THREE.TextureLoader().load('/images/neptune.jpeg');
const material = new THREE.MeshStandardMaterial({map: knotTexture });
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100,50,70);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.5;
scene.add(pointLight, ambientLight);

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper) //gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(400).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/images/space3.jpg');
scene.background = spaceTexture;

//const raphTexture = new THREE.TextureLoader().load('raph.PNG');
//const raph = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({map: raphTexture}));
//scene.add(raph);

//raph.position.z = 30;
//raph.position.x = 2;

const earthTexture = new THREE.TextureLoader().load('/images/earth.jpeg');
const earthNormalTexture = new THREE.TextureLoader().load('earth_normal.jpeg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 16),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    //normalMap: earthNormalTexture,
  })
)

const moonTexture = new THREE.TextureLoader().load('/images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,16),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);
scene.add(earth);

earth.position.z = 90;
earth.position.setX(-20);


moon.position.z = 140;
moon.position.setX(15);
moon.position.y = -3;

//Scroll

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  //raph.rotation.y += 0.01;
  //raph.rotation.z += 0.01;

  camera.position.z = t * -0.05;
  //camera.position.x = t * -0.02;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.0005;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.005;

  //moon.rotation.x +=0.005;
  moon.rotation.y += 0.005;
  //moon.rotation.z +=0.001;

  earth.rotation.x += -0.0005;
  earth.rotation.y += 0.0005;
  //earth.rotation.z +=0.001;

  controls.update();

  renderer.render(scene,camera);
}

animate()