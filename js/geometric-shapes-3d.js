/**
 * FORMAS GEOMÉTRICAS 3D CON CSS
 * Sistema de formas 3D puras con CSS Transforms (sin Canvas)
 * Similar al cubo pero con diferentes geometrías
 */

/* ===========================================
   1. PIRÁMIDE 3D
   =========================================== */
class Pyramid3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 120,
      color: options.color || 'rgba(201, 160, 32, 0.15)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 2}px;
      height: ${this.options.size * 2}px;
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const pyramid = document.createElement('div');
    pyramid.className = 'pyramid3d';
    pyramid.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3D 8s infinite linear;' : ''}
    `;
    
    // 4 caras triangulares + base
    const faces = ['base', 'front', 'right', 'back', 'left'];
    faces.forEach(face => {
      const faceEl = document.createElement('div');
      faceEl.className = `pyramid-face pyramid-${face}`;
      faceEl.style.cssText = this.getFaceStyles(face);
      pyramid.appendChild(faceEl);
    });
    
    wrapper.appendChild(pyramid);
    this.container.appendChild(wrapper);
  }
  
  getFaceStyles(face) {
    const size = this.options.size;
    const half = size / 2;
    
    const baseStyles = `
      position: absolute;
      background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
      border: 2px solid rgba(201,160,32,0.3);
      box-shadow: 
        inset 0 2px 8px rgba(255,255,255,0.2),
        inset 0 -4px 12px rgba(0,0,0,0.15),
        0 8px 20px rgba(0,0,0,0.2);
      backface-visibility: hidden;
    `;
    
    switch(face) {
      case 'base':
        return `${baseStyles}
          width: ${size}px;
          height: ${size}px;
          transform: rotateX(-90deg) translateZ(-${half}px);
        `;
      case 'front':
        return `${baseStyles}
          width: ${size}px;
          height: ${size}px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transform: rotateX(45deg) translateZ(${half}px);
        `;
      case 'right':
        return `${baseStyles}
          width: ${size}px;
          height: ${size}px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transform: rotateY(90deg) rotateX(45deg) translateZ(${half}px);
        `;
      case 'back':
        return `${baseStyles}
          width: ${size}px;
          height: ${size}px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transform: rotateY(180deg) rotateX(45deg) translateZ(${half}px);
        `;
      case 'left':
        return `${baseStyles}
          width: ${size}px;
          height: ${size}px;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transform: rotateY(-90deg) rotateX(45deg) translateZ(${half}px);
        `;
    }
  }
}

/* ===========================================
   2. OCTAEDRO (Diamante 3D)
   =========================================== */
class Octahedron3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 120,
      color: options.color || 'rgba(32, 201, 151, 0.15)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 2}px;
      height: ${this.options.size * 2}px;
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const octahedron = document.createElement('div');
    octahedron.className = 'octahedron3d';
    octahedron.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3D 10s infinite linear;' : ''}
    `;
    
    // 8 caras triangulares
    const angles = [0, 90, 180, 270];
    angles.forEach((angle, i) => {
      // Cara superior
      const topFace = document.createElement('div');
      topFace.className = `octahedron-face octahedron-top-${i}`;
      topFace.style.cssText = this.getOctaFaceStyles(angle, true);
      octahedron.appendChild(topFace);
      
      // Cara inferior
      const bottomFace = document.createElement('div');
      bottomFace.className = `octahedron-face octahedron-bottom-${i}`;
      bottomFace.style.cssText = this.getOctaFaceStyles(angle, false);
      octahedron.appendChild(bottomFace);
    });
    
    wrapper.appendChild(octahedron);
    this.container.appendChild(wrapper);
  }
  
  getOctaFaceStyles(angle, isTop) {
    const size = this.options.size;
    
    return `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
      border: 2px solid rgba(32,201,151,0.3);
      box-shadow: 
        inset 0 2px 8px rgba(255,255,255,0.2),
        inset 0 -4px 12px rgba(0,0,0,0.15),
        0 8px 20px rgba(0,0,0,0.2);
      backface-visibility: hidden;
      transform: 
        rotateY(${angle}deg) 
        rotateX(${isTop ? -60 : 60}deg) 
        translateZ(${size/3}px);
    `;
  }
}

/* ===========================================
   3. PRISMA HEXAGONAL
   =========================================== */
class HexagonalPrism3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 100,
      height: options.height || 120,
      color: options.color || 'rgba(201, 160, 32, 0.15)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 3}px;
      height: ${this.options.height * 2}px;
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const prism = document.createElement('div');
    prism.className = 'hexprism3d';
    prism.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.height}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3DY 12s infinite linear;' : ''}
    `;
    
    // 6 caras laterales + 2 tapas hexagonales
    for (let i = 0; i < 6; i++) {
      const face = document.createElement('div');
      face.className = `hexprism-side hexprism-side-${i}`;
      face.style.cssText = this.getHexSideStyles(i);
      prism.appendChild(face);
    }
    
    // Tapas superior e inferior
    ['top', 'bottom'].forEach(side => {
      const cap = document.createElement('div');
      cap.className = `hexprism-cap hexprism-${side}`;
      cap.style.cssText = this.getHexCapStyles(side);
      prism.appendChild(cap);
    });
    
    wrapper.appendChild(prism);
    this.container.appendChild(wrapper);
  }
  
  getHexSideStyles(index) {
    const angle = index * 60;
    const size = this.options.size;
    const height = this.options.height;
    const radius = size / 2;
    
    return `
      position: absolute;
      width: ${size/1.5}px;
      height: ${height}px;
      background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
      border: 2px solid rgba(201,160,32,0.3);
      box-shadow: 
        inset 0 2px 8px rgba(255,255,255,0.2),
        inset 0 -4px 12px rgba(0,0,0,0.15),
        0 8px 20px rgba(0,0,0,0.2);
      backface-visibility: hidden;
      transform: 
        rotateY(${angle}deg) 
        translateZ(${radius}px);
      transform-origin: center center;
    `;
  }
  
  getHexCapStyles(side) {
    const size = this.options.size;
    const height = this.options.height;
    
    return `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.08));
      border: 2px solid rgba(201,160,32,0.35);
      box-shadow: 
        inset 0 2px 8px rgba(255,255,255,0.25),
        0 8px 20px rgba(0,0,0,0.2);
      backface-visibility: hidden;
      transform: 
        rotateX(${side === 'top' ? 90 : -90}deg) 
        translateZ(${height/2}px);
    `;
  }
}

/* ===========================================
   4. DODECAEDRO SIMPLE (12 caras)
   =========================================== */
class SimpleDodecahedron3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 120,
      color: options.color || 'rgba(139, 92, 246, 0.15)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 2}px;
      height: ${this.options.size * 2}px;
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const dodecahedron = document.createElement('div');
    dodecahedron.className = 'dodecahedron3d';
    dodecahedron.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3D 15s infinite linear;' : ''}
    `;
    
    // 12 caras pentagonales
    const positions = [
      { rotX: 0, rotY: 0, rotZ: 0, z: 60 },
      { rotX: 0, rotY: 72, rotZ: 0, z: 60 },
      { rotX: 0, rotY: 144, rotZ: 0, z: 60 },
      { rotX: 0, rotY: 216, rotZ: 0, z: 60 },
      { rotX: 0, rotY: 288, rotZ: 0, z: 60 },
      { rotX: 116, rotY: 36, rotZ: 0, z: 40 },
      { rotX: 116, rotY: 108, rotZ: 0, z: 40 },
      { rotX: 116, rotY: 180, rotZ: 0, z: 40 },
      { rotX: 116, rotY: 252, rotZ: 0, z: 40 },
      { rotX: 116, rotY: 324, rotZ: 0, z: 40 },
      { rotX: 180, rotY: 0, rotZ: 0, z: 60 },
      { rotX: 64, rotY: 0, rotZ: 0, z: 40 },
    ];
    
    positions.forEach((pos, i) => {
      const face = document.createElement('div');
      face.className = `dodeca-face dodeca-face-${i}`;
      face.style.cssText = `
        position: absolute;
        width: ${this.options.size * 0.6}px;
        height: ${this.options.size * 0.6}px;
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
        border: 2px solid rgba(139,92,246,0.3);
        box-shadow: 
          inset 0 2px 8px rgba(255,255,255,0.2),
          inset 0 -4px 12px rgba(0,0,0,0.15),
          0 8px 20px rgba(0,0,0,0.2);
        backface-visibility: hidden;
        transform: 
          rotateX(${pos.rotX}deg) 
          rotateY(${pos.rotY}deg) 
          rotateZ(${pos.rotZ}deg) 
          translateZ(${pos.z}px);
      `;
      dodecahedron.appendChild(face);
    });
    
    wrapper.appendChild(dodecahedron);
    this.container.appendChild(wrapper);
  }
}

/* ===========================================
   5. ESTRELLA 3D (Prisma Estrella)
   =========================================== */
class Star3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 120,
      points: options.points || 5,
      color: options.color || 'rgba(255, 215, 0, 0.2)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 2}px;
      height: ${this.options.size * 2}px;
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const star = document.createElement('div');
    star.className = 'star3d';
    star.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3DZ 8s infinite linear;' : ''}
    `;
    
    // Crear caras de estrella
    for (let i = 0; i < this.options.points * 2; i++) {
      const face = document.createElement('div');
      face.className = `star-face star-face-${i}`;
      const angle = (i * 360) / (this.options.points * 2);
      
      face.style.cssText = `
        position: absolute;
        width: ${this.options.size * 0.4}px;
        height: ${this.options.size}px;
        background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
        border: 2px solid rgba(255,215,0,0.4);
        box-shadow: 
          inset 0 2px 8px rgba(255,255,255,0.3),
          inset 0 -4px 12px rgba(0,0,0,0.2),
          0 0 20px rgba(255,215,0,0.3);
        backface-visibility: hidden;
        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        transform: 
          rotateZ(${angle}deg) 
          translateY(-${this.options.size/4}px)
          translateZ(${i % 2 === 0 ? 20 : 10}px);
      `;
      star.appendChild(face);
    }
    
    wrapper.appendChild(star);
    this.container.appendChild(wrapper);
  }
}

/* ===========================================
   6. TORUS (Dona 3D)
   =========================================== */
class Torus3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.options = {
      size: options.size || 150,
      thickness: options.thickness || 40,
      segments: options.segments || 16,
      color: options.color || 'rgba(236, 72, 153, 0.15)',
      autoRotate: options.autoRotate !== false,
      ...options
    };
    
    this.create();
  }
  
  create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'shape3d-wrapper';
    wrapper.style.cssText = `
      width: ${this.options.size * 2}px;
      height: ${this.options.size * 2}px;
      perspective: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const torus = document.createElement('div');
    torus.className = 'torus3d';
    torus.style.cssText = `
      width: ${this.options.size}px;
      height: ${this.options.size}px;
      position: relative;
      transform-style: preserve-3d;
      ${this.options.autoRotate ? 'animation: rotate3D 20s infinite linear;' : ''}
    `;
    
    // Crear segmentos del torus
    for (let i = 0; i < this.options.segments; i++) {
      const angle = (i * 360) / this.options.segments;
      const segment = document.createElement('div');
      segment.className = `torus-segment torus-segment-${i}`;
      
      segment.style.cssText = `
        position: absolute;
        width: ${this.options.thickness}px;
        height: ${this.options.thickness}px;
        background: linear-gradient(135deg, ${this.options.color}, rgba(255,255,255,0.05));
        border: 2px solid rgba(236,72,153,0.3);
        border-radius: 50%;
        box-shadow: 
          inset 0 2px 8px rgba(255,255,255,0.2),
          inset 0 -4px 12px rgba(0,0,0,0.15),
          0 0 15px rgba(236,72,153,0.3);
        transform: 
          rotateY(${angle}deg) 
          translateZ(${this.options.size/2}px);
      `;
      torus.appendChild(segment);
    }
    
    wrapper.appendChild(torus);
    this.container.appendChild(wrapper);
  }
}

/* ===========================================
   ANIMACIONES CSS (agregar al documento)
   =========================================== */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes rotate3D {
    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
  }
  
  @keyframes rotate3DY {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }
  
  @keyframes rotate3DZ {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }
`;
document.head.appendChild(styleSheet);

/* ===========================================
   EXPORTAR PARA USO GLOBAL
   =========================================== */
window.GeometricShapes3D = {
  Pyramid3D,
  Octahedron3D,
  HexagonalPrism3D,
  SimpleDodecahedron3D,
  Star3D,
  Torus3D
};

/* ===========================================
   EJEMPLOS DE USO
   =========================================== */
/*
// Pirámide
new GeometricShapes3D.Pyramid3D('pyramid-container', {
  size: 120,
  color: 'rgba(201, 160, 32, 0.15)',
  autoRotate: true
});

// Octaedro (Diamante)
new GeometricShapes3D.Octahedron3D('octahedron-container', {
  size: 120,
  color: 'rgba(32, 201, 151, 0.15)'
});

// Prisma Hexagonal
new GeometricShapes3D.HexagonalPrism3D('hexprism-container', {
  size: 100,
  height: 120
});

// Dodecaedro
new GeometricShapes3D.SimpleDodecahedron3D('dodeca-container', {
  size: 120
});

// Estrella 3D
new GeometricShapes3D.Star3D('star-container', {
  size: 120,
  points: 5
});

// Torus (Dona)
new GeometricShapes3D.Torus3D('torus-container', {
  size: 150,
  thickness: 40,
  segments: 16
});
*/

console.log('✨ Geometric Shapes 3D System loaded');
