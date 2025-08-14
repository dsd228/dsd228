# Diseño - Aplicación de Enfermería

## Descripción / Description

**ES:**  
Este directorio contiene todos los recursos de diseño para la aplicación de enfermería, incluyendo wireframes, prototipos, guías de estilo, iconografía y assets visuales.

**EN:**  
This directory contains all design resources for the nursing application, including wireframes, prototypes, style guides, iconography, and visual assets.

## Estructura / Structure

```
design/
├── wireframes/         # Wireframes y esquemas / Wireframes and layouts
│   ├── low-fidelity/  # Bocetos iniciales / Initial sketches
│   ├── high-fidelity/ # Wireframes detallados / Detailed wireframes
│   └── user-flows/    # Flujos de usuario / User flows
├── prototypes/        # Prototipos interactivos / Interactive prototypes
│   ├── figma/        # Archivos de Figma / Figma files
│   ├── adobe-xd/     # Archivos de Adobe XD / Adobe XD files
│   └── exports/      # Exportaciones / Exports
├── ui-kit/           # Kit de interfaz / UI kit
│   ├── components/   # Componentes de UI / UI components
│   ├── icons/        # Iconografía / Iconography
│   ├── colors/       # Paleta de colores / Color palette
│   └── typography/   # Tipografía / Typography
├── style-guide/      # Guía de estilo / Style guide
│   ├── brand-guide.md # Guía de marca / Brand guide
│   ├── ui-patterns.md # Patrones de UI / UI patterns
│   └── accessibility.md # Accesibilidad / Accessibility
├── user-research/    # Investigación de usuarios / User research
│   ├── personas/     # Personas de usuario / User personas
│   ├── journey-maps/ # Mapas de experiencia / Journey maps
│   └── usability/    # Tests de usabilidad / Usability tests
├── assets/          # Assets de diseño / Design assets
│   ├── images/      # Imágenes / Images
│   ├── illustrations/ # Ilustraciones / Illustrations
│   └── animations/  # Animaciones / Animations
└── README.md       # Este archivo / This file
```

## Principios de Diseño / Design Principles

### 🎯 Centrado en el Usuario / User-Centered
- **Enfermeras:** Interfaz eficiente para tareas críticas
- **Pacientes:** Experiencia clara y accesible
- **Administradores:** Dashboards informativos y funcionales

### 🏥 Específico para Salud / Healthcare-Specific
- **Claridad:** Información médica debe ser fácil de leer
- **Urgencia:** Indicadores visuales para situaciones críticas
- **Precisión:** Evitar errores en entrada de datos médicos
- **Privacidad:** Diseño que protege información sensible

### ♿ Accesibilidad / Accessibility
- **WCAG 2.1 AA:** Cumplimiento de estándares
- **Contraste:** Ratios adecuados para legibilidad
- **Navegación:** Compatible con lectores de pantalla
- **Motor:** Interfaces adaptables para diferentes capacidades

## Herramientas de Diseño / Design Tools

### Principales / Primary
- **Figma:** Diseño colaborativo y prototipado
- **Adobe Creative Suite:** Photoshop, Illustrator, XD
- **Sketch:** Diseño de interfaces (macOS)

### Complementarias / Complementary
- **InVision:** Prototipado y colaboración
- **Zeplin:** Handoff developer-designer
- **Principle:** Animaciones y microinteracciones
- **Miro/Mural:** Investigación y ideación

## Guías de Estilo / Style Guidelines

### 🎨 Paleta de Colores / Color Palette
```
Primario / Primary:    #2E86AB (Azul médico / Medical blue)
Secundario / Secondary: #A23B72 (Rosa profesional / Professional pink)
Éxito / Success:       #43AA8B (Verde suave / Soft green)
Advertencia / Warning:  #F18F01 (Naranja cálido / Warm orange)
Error / Error:         #C73E1D (Rojo alerta / Alert red)
Neutro / Neutral:      #F5F3F0 (Gris claro / Light gray)
```

### 🔤 Tipografía / Typography
- **Primaria:** Inter (Alta legibilidad médica)
- **Secundaria:** Source Sans Pro (Alternativa web-safe)
- **Monospace:** Fira Code (Códigos y datos técnicos)

### 📐 Espaciado / Spacing
Sistema basado en 8px grid para consistencia visual.

## Flujos de Usuario Principales / Main User Flows

1. **Registro de Paciente:** Admisión → Datos básicos → Historial médico
2. **Administración de Medicamentos:** Consulta → Prescripción → Seguimiento
3. **Cambio de Turno:** Handoff → Revisión de casos → Transferencia
4. **Emergencias:** Alerta → Triage → Acción inmediata

## Responsive Design

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px - 1440px
- **Large Desktop:** 1440px+

### Prioridades por Dispositivo / Device Priorities
- **Mobile:** Funciones críticas, lectura rápida
- **Tablet:** Entrada de datos, formularios
- **Desktop:** Análisis completo, administración

## Proceso de Diseño / Design Process

1. **Investigación:** Análisis de usuarios y contexto médico
2. **Ideación:** Brainstorming y sketching
3. **Wireframing:** Estructuras y flujos
4. **Prototipado:** Interacciones y animaciones
5. **Testing:** Validación con usuarios reales
6. **Iteración:** Refinamiento basado en feedback

## Colaboración / Collaboration

### Con Desarrollo / With Development
- Design tokens para consistencia
- Handoff detallado con especificaciones
- Revisiones regulares de implementación

### Con Stakeholders
- Presentaciones de conceptos
- Validación con personal médico
- Iteración basada en feedback clínico

## Recursos Adicionales / Additional Resources

- **Bibliotecas de Iconos:** Healthcare icons, Medical symbols
- **Fotografía Stock:** Unsplash Medical, Pexels Healthcare
- **Inspiración:** Dribbble Healthcare, Behance Medical UI
- **Guidelines:** Apple HIG, Material Design, Healthcare UX

## Contribución / Contributing

1. Mantener consistencia con la guía de estilo
2. Documentar decisiones de diseño
3. Validar accesibilidad en todos los diseños
4. Considerar contexto médico en cada decisión
5. Colaborar estrechamente con el equipo médico