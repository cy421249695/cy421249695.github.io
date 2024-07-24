import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);

const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x444444, //高光部分的颜色
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0, 10, 0);
scene.add(mesh);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(50, width / height);

camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);

const axeHelper = new THREE.AxesHelper(200);
scene.add(axeHelper);

const pointLight = new THREE.PointLight(0xffffff,4.0);
pointLight.decay = 0.0//不随距离衰减
pointLight.position.set(400,200,200);
scene.add(pointLight);
const dirLightHelper = new THREE.PointLightHelper(pointLight, 5,0xff0000);
scene.add(dirLightHelper);
const renderer = new THREE.WebGLRenderer({
    antialias:true,
});
renderer.setSize(width,height);
renderer.render(scene,camera);

document.getElementById('webgl').appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change',function(){
    renderer.render(scene,camera);
});

window.onresize = function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
const stats = new Stats();
document.body.appendChild(stats.domElement);
function render(){
    stats.update();
    mesh.rotateX(0.01);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

const gui = new GUI()
gui.domElement.style.right = '0px';
gui.domElement.style.width = '200px';
const obj = {
    x: 30,
    y:40,
    color:0x00ffff,
