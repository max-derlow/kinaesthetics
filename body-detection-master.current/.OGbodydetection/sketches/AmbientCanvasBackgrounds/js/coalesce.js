'use strict';

const cParticleCount = 100;
let particleCount = 700; // ADJUST: add higher particle count depending on intensity of twist
const particlePropCount = 9;
let particlePropsLength = particleCount * particlePropCount;
const baseTTL = 100;
const rangeTTL = 500;
const cBaseSpeed = 0.1;
let baseSpeed = 3;
const rangeSpeed = 1;
const baseSize = 50;
const rangeSize = 0;
const baseHue = 0;
const rangeHue = 1;
const noiseSteps = 2;
const xOff = 0.0025;
const yOff = 0.005;
const zOff = 0.0005;
const backgroundColor = 'hsla(60,50%,3%,1)';

let speedModifier = 0;
let sizeModifier = 0;
let hueModifier = 0;
let xPosModifier = 0;
let yPosModifier = 0;
let xMidpointModifier = 0;
let yMidpointModifier = 0;
let lineWidthModifier = 0;

let container;
let canvas;
let ctx;
let center;
let gradient;
let tick;
let particleProps;
let positions;
let velocities;
let lifeSpans;
let speeds;
let sizes;
let hues;

function setup() {
	createCanvas();
    resize();
    initParticles();
	draw();
}

function initParticles() {
  tick = 0;
  particleProps = new Float32Array(particlePropsLength);

  let i;
  
  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i);
  }
}

function initParticle(i) {
  let theta, x, y, vx, vy, life, ttl, speed, size, hue;

  x = rand(canvas.a.width);
  y = rand(canvas.a.height);
  theta = angle(x, y, center[0], center[1]);
  vx = cos(theta) * 6;
  vy = sin(theta) * 6;
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  size = baseSize + rand(rangeSize);
  hue = baseHue + rand(rangeHue);

  particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
}

function drawParticles() {
  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i);
  }
}

//...........................................................................
//.....AAAAA.....DDDDDDDDD........JJJJ..UUUU...UUUU...SSSSSSS....TTTTTTTTTT..
//.....AAAAA.....DDDDDDDDDD.......JJJJ..UUUU...UUUU..SSSSSSSSS...TTTTTTTTTT..
//....AAAAAA.....DDDDDDDDDDD......JJJJ..UUUU...UUUU..SSSSSSSSSS..TTTTTTTTTT..
//....AAAAAAA....DDDD...DDDD......JJJJ..UUUU...UUUU.USSSS..SSSS.....TTTT.....
//...AAAAAAAA....DDDD....DDDD.....JJJJ..UUUU...UUUU.USSSS...........TTTT.....
//...AAAAAAAA....DDDD....DDDD.....JJJJ..UUUU...UUUU..SSSSSSS........TTTT.....
//...AAAA.AAAA...DDDD....DDDD.....JJJJ..UUUU...UUUU...SSSSSSSSS.....TTTT.....
//..AAAAAAAAAA...DDDD....DDDD.....JJJJ..UUUU...UUUU.....SSSSSSS.....TTTT.....
//..AAAAAAAAAAA..DDDD....DDDDJJJJ.JJJJ..UUUU...UUUU........SSSSS....TTTT.....
//..AAAAAAAAAAA..DDDD...DDDDDJJJJ.JJJJ..UUUU...UUUU.USSS....SSSS....TTTT.....
//.AAAA....AAAA..DDDDDDDDDDD.JJJJJJJJJ..UUUUUUUUUUU.USSSSSSSSSSS....TTTT.....
//.AAAA.....AAAA.DDDDDDDDDD..JJJJJJJJ....UUUUUUUUU...SSSSSSSSSS.....TTTT.....
//.AAAA.....AAAA.DDDDDDDDD....JJJJJJ......UUUUUUU.....SSSSSSSS......TTTT.....
//...........................................................................

function updateParticle(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
  let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;

  x = particleProps[i];
  y = particleProps[i2];
  theta = angle(x, y, center[0], center[1]) + 0.75 * HALF_PI;
  vx = lerp(particleProps[i3], 2 * cos(theta), 0.05);
  vy = lerp(particleProps[i4], 2 * sin(theta), 0.05);
  life = particleProps[i5];
  ttl = particleProps[i6];
  speed = particleProps[i7] + speedModifier;
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  size = particleProps[i8] + sizeModifier;
  hue = particleProps[i9] + hueModifier;
  drawParticle(x, y, theta, life, ttl, size, hue);

  life++;

  particleProps[i] = x2;
  particleProps[i2] = y2;
  particleProps[i3] = vx;
  particleProps[i4] = vy;
  particleProps[i5] = life;

  life > ttl && initParticle(i);
}

function drawParticle(x, y, theta, life, ttl, size, hue) {
  let xRel = x - (0.5 * size), yRel = y - (0.5 * size);

  ctx.a.save();
  ctx.a.lineCap = 'round';
  ctx.a.lineWidth = 1 + lineWidthModifier;
  ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctx.a.beginPath();
  ctx.a.translate(xRel + xPosModifier, yRel + yPosModifier); // ADJUST change x and y positions on the canvas
  ctx.a.rotate(theta);
  ctx.a.translate(-xRel + xMidpointModifier, -yRel + yMidpointModifier); // ADJUST radius of the inner circle radius
  ctx.a.strokeRect(xRel, yRel, size, size);
  ctx.a.closePath();
  ctx.a.restore();
}

//........................................
//.EEEEEEEEEEE.ENNN...NNNN..NDDDDDDDD.....
//.EEEEEEEEEEE.ENNNN..NNNN..NDDDDDDDDD....
//.EEEEEEEEEEE.ENNNN..NNNN..NDDDDDDDDDD...
//.EEEE........ENNNNN.NNNN..NDDD...DDDD...
//.EEEE........ENNNNN.NNNN..NDDD....DDDD..
//.EEEEEEEEEE..ENNNNNNNNNN..NDDD....DDDD..
//.EEEEEEEEEE..ENNNNNNNNNN..NDDD....DDDD..
//.EEEEEEEEEE..ENNNNNNNNNN..NDDD....DDDD..
//.EEEE........ENNNNNNNNNN..NDDD....DDDD..
//.EEEE........ENNN.NNNNNN..NDDD...DDDDD..
//.EEEEEEEEEEE.ENNN..NNNNN..NDDDDDDDDDD...
//.EEEEEEEEEEE.ENNN..NNNNN..NDDDDDDDDD....
//.EEEEEEEEEEE.ENNN...NNNN..NDDDDDDDD.....
//........................................

function createCanvas() {
  container = document.querySelector('.content--canvas');
	canvas = {
		a: document.createElement('canvas'),
		b: document.createElement('canvas')
	};
	canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
	container.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext('2d'),
		b: canvas.b.getContext('2d')
  };
  center = [];
}

function resize() {
	const { innerWidth, innerHeight } = window;
	
	canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a.drawImage(canvas.b, 0, 0);

	canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;
  
  ctx.b.drawImage(canvas.a, 0, 0);

  center[0] = 0.5 * canvas.a.width;
  center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
  ctx.b.save();
  ctx.b.filter = 'blur(8px) brightness(200%)';
  ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();

  ctx.b.save();
  ctx.b.filter = 'blur(4px) brightness(200%)';
  ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function render() {
  ctx.b.save();
  ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  tick++;

  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

  ctx.b.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

  drawParticles();
  //renderGlow();
  render();

	window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);