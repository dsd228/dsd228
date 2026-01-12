/**
 * 3D ANIMATIONS SYSTEM
 * Sistema de animaciones 3D distribuidas por todo el portfolio
 * Author: David Sebastián Díaz
 */

/* ===========================================
   1. PARTÍCULAS 3D FLOTANTES (HERO)
   =========================================== */
class FloatingParticles3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.particles = [];
    this.particleCount = 50;
    this.mouse = { x: null, y: null, radius: 100 };
    
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.6';
    
    // Crear partículas
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 200 - 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        baseX: 0,
        baseY: 0,
      });
      this.particles[i].baseX = this.particles[i].x;
      this.particles[i].baseY = this.particles[i].y;
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;
    });
    
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, i) => {
      // Movimiento flotante
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      
      // Repeler con el mouse
      if (this.mouse.x !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          particle.x += Math.cos(angle) * force * 2;
          particle.y += Math.sin(angle) * force * 2;
        }
      }
      
      // Volver suavemente al punto base
      const returnX = (particle.baseX - particle.x) * 0.01;
      const returnY = (particle.baseY - particle.y) * 0.01;
      particle.x += returnX;
      particle.y += returnY;
      
      // Límites
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      if (particle.z < -100 || particle.z > 100) particle.vz *= -1;
      
      // Dibujar con perspectiva
      const scale = 1 + particle.z / 200;
      const size = particle.size * scale;
      const opacity = 0.3 + (particle.z + 100) / 400;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(201, 160, 32, ${opacity})`;
      this.ctx.fill();
      
      // Conectar partículas cercanas
      this.particles.forEach((otherParticle, j) => {
        if (i !== j) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.strokeStyle = `rgba(201, 160, 32, ${0.1 * (1 - distance / 100)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   2. ESFERA WIREFRAME PULSANTE (ABOUT)
   =========================================== */
class WireframeSphere {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.rotation = { x: 0, y: 0 };
    this.scale = 1;
    this.pulseDirection = 1;
    
    this.init();
    this.animate();
  }
  
  init() {
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.canvas.style.display = 'block';
    this.canvas.style.margin = '0 auto';
    
    // Generar puntos de la esfera
    this.points = [];
    const radius = 100;
    const segments = 20;
    
    for (let lat = 0; lat <= segments; lat++) {
      const theta = (lat * Math.PI) / segments;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      
      for (let lon = 0; lon <= segments; lon++) {
        const phi = (lon * 2 * Math.PI) / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        
        this.points.push({
          x: radius * cosPhi * sinTheta,
          y: radius * cosTheta,
          z: radius * sinPhi * sinTheta
        });
      }
    }
  }
  
  rotatePoint(point, rx, ry) {
    // Rotar alrededor de X
    let y = point.y * Math.cos(rx) - point.z * Math.sin(rx);
    let z = point.y * Math.sin(rx) + point.z * Math.cos(rx);
    
    // Rotar alrededor de Y
    let x = point.x * Math.cos(ry) - z * Math.sin(ry);
    z = point.x * Math.sin(ry) + z * Math.cos(ry);
    
    return { x, y, z };
  }
  
  projectPoint(point) {
    const scale = 200 / (200 + point.z * this.scale);
    return {
      x: point.x * scale + this.canvas.width / 2,
      y: point.y * scale + this.canvas.height / 2,
      z: point.z
    };
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Pulsación
    this.scale += 0.003 * this.pulseDirection;
    if (this.scale > 1.2 || this.scale < 0.9) {
      this.pulseDirection *= -1;
    }
    
    // Rotación automática
    this.rotation.x += 0.005;
    this.rotation.y += 0.008;
    
    // Proyectar y dibujar puntos
    const projectedPoints = this.points.map(point => {
      const rotated = this.rotatePoint(point, this.rotation.x, this.rotation.y);
      return this.projectPoint(rotated);
    });
    
    // Dibujar wireframe
    projectedPoints.forEach((point, i) => {
      const segments = 21;
      
      // Líneas horizontales
      if (i % segments !== 0) {
        const prev = projectedPoints[i - 1];
        this.ctx.beginPath();
        this.ctx.moveTo(prev.x, prev.y);
        this.ctx.lineTo(point.x, point.y);
        const opacity = 0.3 + (point.z + 100) / 400;
        this.ctx.strokeStyle = `rgba(32, 201, 151, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
      
      // Líneas verticales
      if (i >= segments) {
        const above = projectedPoints[i - segments];
        this.ctx.beginPath();
        this.ctx.moveTo(above.x, above.y);
        this.ctx.lineTo(point.x, point.y);
        const opacity = 0.3 + (point.z + 100) / 400;
        this.ctx.strokeStyle = `rgba(32, 201, 151, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   3. TEXTO 3D CON PARALLAX (TÍTULOS)
   =========================================== */
class Text3DParallax {
  constructor(elements) {
    this.elements = typeof elements === 'string' 
      ? document.querySelectorAll(elements) 
      : elements;
    
    this.init();
    this.setupScrollListener();
  }
  
  init() {
    this.elements.forEach(el => {
      el.style.transformStyle = 'preserve-3d';
      el.style.transition = 'transform 0.3s ease-out';
      
      // Crear capas de profundidad
      const layers = 3;
      const text = el.textContent;
      el.innerHTML = '';
      
      for (let i = 0; i < layers; i++) {
        const layer = document.createElement('span');
        layer.textContent = text;
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.transform = `translateZ(${-i * 5}px)`;
        layer.style.opacity = 1 - (i * 0.3);
        layer.style.color = i === 0 ? 'inherit' : 'rgba(201, 160, 32, 0.3)';
        el.appendChild(layer);
      }
      
      el.style.position = 'relative';
    });
  }
  
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        const rotation = (scrollProgress - 0.5) * 15; // -7.5 a 7.5 grados
        
        el.style.transform = `rotateX(${rotation}deg) rotateY(${rotation * 0.5}deg)`;
      });
    });
  }
}

/* ===========================================
   4. ONDAS 3D (SKILLS/FONDO)
   =========================================== */
class Waves3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.time = 0;
    this.init();
    this.animate();
  }
  
  init() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = 400;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.opacity = '0.15';
    this.canvas.style.pointerEvents = 'none';
    
    window.addEventListener('resize', () => {
      this.canvas.width = this.container.offsetWidth;
    });
  }
  
  drawWave(y, amplitude, frequency, phase) {
    this.ctx.beginPath();
    
    for (let x = 0; x < this.canvas.width; x += 5) {
      const wave = Math.sin((x * frequency) + phase + this.time) * amplitude;
      const yPos = y + wave;
      
      if (x === 0) {
        this.ctx.moveTo(x, yPos);
      } else {
        this.ctx.lineTo(x, yPos);
      }
    }
    
    this.ctx.stroke();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.time += 0.02;
    
    // Onda 1 - rápida
    this.ctx.strokeStyle = 'rgba(201, 160, 32, 0.6)';
    this.ctx.lineWidth = 2;
    this.drawWave(100, 30, 0.01, 0);
    
    // Onda 2 - media
    this.ctx.strokeStyle = 'rgba(32, 201, 151, 0.5)';
    this.ctx.lineWidth = 2;
    this.drawWave(150, 40, 0.008, Math.PI / 2);
    
    // Onda 3 - lenta
    this.ctx.strokeStyle = 'rgba(201, 160, 32, 0.4)';
    this.ctx.lineWidth = 3;
    this.drawWave(200, 50, 0.006, Math.PI);
    
    // Onda 4 - muy lenta (fondo)
    this.ctx.strokeStyle = 'rgba(32, 201, 151, 0.3)';
    this.ctx.lineWidth = 4;
    this.drawWave(300, 60, 0.004, Math.PI * 1.5);
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   5. CARRUSEL 3D DE PROYECTOS
   =========================================== */
class Carousel3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.items = this.container.querySelectorAll('.carousel-item');
    this.currentIndex = 0;
    this.isAnimating = false;
    
    this.init();
    this.setupControls();
  }
  
  init() {
    this.container.style.perspective = '1000px';
    this.container.style.transformStyle = 'preserve-3d';
    
    const angleStep = (2 * Math.PI) / this.items.length;
    const radius = 350;
    
    this.items.forEach((item, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      
      item.style.position = 'absolute';
      item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}rad)`;
      item.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s';
      item.style.opacity = i === 0 ? '1' : '0.5';
    });
  }
  
  setupControls() {
    const prevBtn = this.container.parentElement.querySelector('.carousel-prev');
    const nextBtn = this.container.parentElement.querySelector('.carousel-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.rotate(-1));
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.rotate(1));
    }
    
    // Auto-rotate
    setInterval(() => this.rotate(1), 5000);
  }
  
  rotate(direction) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
    
    const angleStep = (2 * Math.PI) / this.items.length;
    const radius = 350;
    
    this.items.forEach((item, i) => {
      const angle = (i - this.currentIndex) * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      
      item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}rad)`;
      item.style.opacity = i === this.currentIndex ? '1' : '0.5';
    });
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
}

/* ===========================================
   6. PARTÍCULAS FORMANDO LOGO (DSD)
   =========================================== */
class ParticleLogo {
  constructor(containerId, text = 'DSD') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.text = text;
    this.particles = [];
    this.dispersed = false;
    
    this.init();
    this.animate();
  }
  
  init() {
    this.canvas.width = 400;
    this.canvas.height = 200;
    this.canvas.style.display = 'block';
    this.canvas.style.margin = '0 auto';
    
    // Dibujar texto temporalmente para obtener píxeles
    this.ctx.font = 'bold 100px Arial';
    this.ctx.fillStyle = '#C9A020';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.text, this.canvas.width / 2, this.canvas.height / 2);
    
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Crear partículas desde píxeles del texto
    for (let y = 0; y < this.canvas.height; y += 4) {
      for (let x = 0; x < this.canvas.width; x += 4) {
        const index = (y * this.canvas.width + x) * 4;
        const alpha = imageData.data[index + 3];
        
        if (alpha > 128) {
          this.particles.push({
            x: x,
            y: y,
            targetX: x,
            targetY: y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: 2 + Math.random() * 2
          });
        }
      }
    }
    
    // Auto-dispersar y reagrupar
    setInterval(() => {
      this.dispersed = !this.dispersed;
    }, 4000);
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      if (this.dispersed) {
        // Dispersar
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Límites
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      } else {
        // Volver al logo
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        particle.x += dx * 0.05;
        particle.y += dy * 0.05;
      }
      
      // Dibujar
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = '#C9A020';
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   7. FORMAS GEOMÉTRICAS FLOTANTES
   =========================================== */
class FloatingShapes {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.shapes = [];
    this.init();
    this.animate();
  }
  
  init() {
    const shapeTypes = ['cube', 'pyramid', 'sphere', 'torus'];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div');
      shape.className = `floating-shape floating-shape-${shapeTypes[i % shapeTypes.length]}`;
      
      shape.style.position = 'absolute';
      shape.style.width = `${40 + Math.random() * 60}px`;
      shape.style.height = shape.style.width;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.transformStyle = 'preserve-3d';
      shape.style.opacity = '0.15';
      shape.style.pointerEvents = 'none';
      
      this.shapes.push({
        element: shape,
        x: parseFloat(shape.style.left),
        y: parseFloat(shape.style.top),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rotX: Math.random() * 360,
        rotY: Math.random() * 360,
        rotZ: Math.random() * 360,
        rotSpeedX: (Math.random() - 0.5) * 2,
        rotSpeedY: (Math.random() - 0.5) * 2,
        rotSpeedZ: (Math.random() - 0.5) * 2
      });
      
      this.container.appendChild(shape);
    }
  }
  
  animate() {
    this.shapes.forEach(shape => {
      // Movimiento
      shape.x += shape.vx;
      shape.y += shape.vy;
      
      // Límites
      if (shape.x < -10 || shape.x > 110) shape.vx *= -1;
      if (shape.y < -10 || shape.y > 110) shape.vy *= -1;
      
      // Rotación
      shape.rotX += shape.rotSpeedX;
      shape.rotY += shape.rotSpeedY;
      shape.rotZ += shape.rotSpeedZ;
      
      // Aplicar transformaciones
      shape.element.style.left = `${shape.x}%`;
      shape.element.style.top = `${shape.y}%`;
      shape.element.style.transform = `
        rotateX(${shape.rotX}deg)
        rotateY(${shape.rotY}deg)
        rotateZ(${shape.rotZ}deg)
      `;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   8. MODELO 3D INTERACTIVO SIMPLE
   =========================================== */
class Interactive3DModel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.rotation = { x: 0.5, y: 0.5 };
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };
    
    this.init();
    this.setupInteraction();
    this.animate();
  }
  
  init() {
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvas.style.cursor = 'grab';
    
    // Definir vértices de un cubo
    this.vertices = [
      [-60, -60, -60], [60, -60, -60], [60, 60, -60], [-60, 60, -60],
      [-60, -60, 60], [60, -60, 60], [60, 60, 60], [-60, 60, 60]
    ];
    
    // Definir aristas
    this.edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Cara frontal
      [4, 5], [5, 6], [6, 7], [7, 4], // Cara trasera
      [0, 4], [1, 5], [2, 6], [3, 7]  // Conexiones
    ];
  }
  
  setupInteraction() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.canvas.style.cursor = 'grabbing';
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      
      this.rotation.y += dx * 0.01;
      this.rotation.x += dy * 0.01;
      
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.canvas.style.cursor = 'grab';
    });
  }
  
  rotatePoint([x, y, z]) {
    // Rotar alrededor de X
    let y1 = y * Math.cos(this.rotation.x) - z * Math.sin(this.rotation.x);
    let z1 = y * Math.sin(this.rotation.x) + z * Math.cos(this.rotation.x);
    
    // Rotar alrededor de Y
    let x1 = x * Math.cos(this.rotation.y) - z1 * Math.sin(this.rotation.y);
    let z2 = x * Math.sin(this.rotation.y) + z1 * Math.cos(this.rotation.y);
    
    return [x1, y1, z2];
  }
  
  projectPoint([x, y, z]) {
    const scale = 200 / (200 + z);
    return {
      x: x * scale + this.canvas.width / 2,
      y: y * scale + this.canvas.height / 2,
      z: z
    };
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Rotar automáticamente si no está siendo arrastrado
    if (!this.isDragging) {
      this.rotation.y += 0.01;
    }
    
    // Proyectar vértices
    const projected = this.vertices.map(v => {
      const rotated = this.rotatePoint(v);
      return this.projectPoint(rotated);
    });
    
    // Dibujar aristas
    this.edges.forEach(([start, end]) => {
      const p1 = projected[start];
      const p2 = projected[end];
      
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = '#C9A020';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
    
    // Dibujar vértices
    projected.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#20c997';
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

/* ===========================================
   INICIALIZACIÓN AUTOMÁTICA
   =========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializar si los contenedores existen
  
  // 1. Partículas en el hero
  if (document.getElementById('particles-3d-hero')) {
    new FloatingParticles3D('particles-3d-hero');
  }
  
  // 2. Esfera wireframe en About
  if (document.getElementById('wireframe-sphere')) {
    new WireframeSphere('wireframe-sphere');
  }
  
  // 3. Texto 3D en títulos principales
  const titleElements = document.querySelectorAll('.section-title-3d');
  if (titleElements.length > 0) {
    new Text3DParallax(titleElements);
  }
  
  // 4. Ondas en Skills
  if (document.getElementById('waves-3d-skills')) {
    new Waves3D('waves-3d-skills');
  }
  
  // 5. Carrusel 3D de proyectos
  if (document.getElementById('carousel-3d-projects')) {
    new Carousel3D('carousel-3d-projects');
  }
  
  // 6. Logo de partículas
  if (document.getElementById('particle-logo')) {
    new ParticleLogo('particle-logo', 'DSD');
  }
  
  // 7. Formas flotantes decorativas
  if (document.getElementById('floating-shapes-bg')) {
    new FloatingShapes('floating-shapes-bg');
  }
  
  // 8. Modelo 3D interactivo
  if (document.getElementById('interactive-3d-model')) {
    new Interactive3DModel('interactive-3d-model');
  }
  
  console.log('✨ Sistema de animaciones 3D inicializado');
});

/* ===========================================
   EXPORTAR PARA USO MANUAL
   =========================================== */
window.Animations3D = {
  FloatingParticles3D,
  WireframeSphere,
  Text3DParallax,
  Waves3D,
  Carousel3D,
  ParticleLogo,
  FloatingShapes,
  Interactive3DModel
};
