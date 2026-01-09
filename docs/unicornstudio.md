# Integración UnicornStudio en héroe

## Qué se añadió
- Canvas UnicornStudio dentro de `.card` para conservar neumorfismo.
- Fallback de imagen (`#hero-banner`) hasta que UnicornStudio inicializa.
- CSS inline para responsividad y ocultar el fallback al estar listo.

## Dónde
- HTML: bloque `.hero-visual` con `#unicorn-canvas` y `#hero-banner` en la sección héroe.
- Scripts: loader de UnicornStudio y monitor `unicorn-ready` antes de `</body>`.
- CSS: reglas inline en `<head>` para `#unicorn-canvas`, `.hero-visual`, `#hero-banner`, `.unicorn-ready`.

## Probar localmente (Windows)
### Opción Python
```powershell
python -m http.server 5500
```
Abrir http://localhost:5500

### Opción Node.js (npx)
```powershell
npx serve .
```
Abrir la URL que indique la consola.

## Fallback
Si el CDN no carga, se muestra la imagen del banner.
