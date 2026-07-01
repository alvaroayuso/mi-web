# CLAUDE.md — Web de Álvaro Ayuso

## Qué es este proyecto
Web personal de **Álvaro Ayuso**, percusionista y músico electrónico (Logroño, 2000; basado en Bern, estudia en la HKB). Sitio **estático** (HTML/CSS/JS, sin framework). Una sola página larga (`index.html`) con secciones ancladas. Desplegado en **Netlify** con **despliegue continuo**: cada `git push` a la rama `main` de GitHub republica el sitio solo.

## Cómo trabajar conmigo (Álvaro)
- Estoy **aprendiendo desarrollo web**. Explícame los cambios y el porqué mientras los haces, en lenguaje claro; no solo "hecho".
- Respóndeme en **español**.
- Antes de cambios grandes, propón el plan y espera mi OK.
- Formato sobrio, sin florituras.

## Estructura del repo
- `index.html` — todo el sitio (HTML + CSS dentro de `<style>` + un `<script>` de scroll-reveal). Pendiente: separar CSS y JS a archivos propios.
- `images/` — fotos optimizadas (~2000px, calidad 82).
- `video/parawebvideo-web.mp4` — vídeo textural del hero (mudo, en loop).
- `DESIGN.md` — **sistema de diseño. Léelo SIEMPRE antes de tocar estilo.**
- `.gitignore` — ignora `.DS_Store`.
- Remoto: GitHub `alvaroayuso/mi-web`. Hosting: Netlify (auto-deploy desde `main`).

## Sistema de diseño (resumen; el detalle está en DESIGN.md)
- Palabra-guía: **silencio**. Estética reductiva. Ante la duda, quitar.
- Color: fondo `--bg: #0B0B0B`, texto `--fg: #ECE9E1`. La jerarquía se hace con tamaño/peso/opacidad del mismo blanco, **no** con más colores. Sin degradados. Acento pendiente (se sacará de un fotograma del vídeo de San Leonardo).
- Tipografía: **Hanken Grotesk** (ahora vía Google Fonts; pendiente auto-alojar). Una sola familia para todo.
- Movimiento: scroll-reveal sutil (fade + ~16px hacia arriba), respeta `prefers-reduced-motion`. Nada que llame la atención sobre sí mismo.
- **Anti-slop (NUNCA):** fuentes Inter/Roboto/Arial/Helvetica/Space Grotesk; degradados (en especial morados); tarjetas con sombra en rejilla; estética tipo SaaS; blanco puro `#FFF` o negro puro `#000`; centrarlo todo por defecto.

## Estado actual del sitio
Idioma actual: **inglés**. Secciones, en orden:
1. **Hero** — vídeo de fondo en loop + nombre "Álvaro Ayuso" + rol.
2. **Galería** — fotos en columnas (masonry) que aparecen al hacer scroll.
3. **Work — Compositions** — Piñas, platos y patches (recital/tesis); Tom Cage; Manta; Hybrid Percussion Set; Soundtrack for Experimental Film; Early Experiments.
4. **Projects — Collaborations** — Marianito Rojo; Páramo 26005; Duo with Tibor Novak; Joan Guinjoan Prize.
5. **About** — bio en inglés.
6. **Contact** — email + enlaces (YouTube, Instagram, Bandcamp).

## Reglas de contenido
- **Vídeos: NO subir archivos de vídeo de actuaciones.** Se **incrustan** desde YouTube con `<iframe>`. En el código hay enlaces "Watch on YouTube" provisionales y comentarios `TODO embed` marcando dónde va cada vídeo cuando Álvaro dé la URL. El único vídeo alojado propio es el del hero.
- **Fotos: optimizar antes de añadir.** Receta: `magick foto.jpg -resize 2000x2000\> -quality 82 salida.jpg`.
- Email de contacto: alvaroayuso00@hotmail.com. (En el dossier hay más datos de contacto, pero en la web va solo el email.)

## Tareas pendientes (roadmap)
- [ ] Incrustar los vídeos de YouTube reales (Álvaro dará las URLs) sustituyendo los enlaces "Watch on YouTube". Vídeos conocidos: Manta, Tom Cage, ELEVATOR IMPRO (Marianito), Bulería de cactus (Páramo), SoL Trailer (Tibor), improvisación del set híbrido, directo de gin Joan (Joan Guinjoan).
- [ ] Sección **Agenda**: lista de conciertos desde un JSON editable a mano (fecha, lugar, ciudad, enlace). Aún no añadida.
- [ ] Separar CSS y JS de `index.html` a `styles.css` y `main.js`.
- [ ] Auto-alojar Hanken Grotesk (`.woff2` + `@font-face`) en vez de depender de Google Fonts.
- [ ] Extraer **color de acento** de un fotograma del vídeo de San Leonardo.
- [ ] Decidir idioma definitivo (solo ES vs bilingüe ES/EN).
- [ ] Revisar dato: en la bio pone "Tibor Kovács" y en Projects "Tibor Novak" — confirmar cuál es correcto y unificar.
- [ ] Confirmar el programa real del recital "Piñas, platos y patches" (el texto está redactado a partir de notas; revisar nombres y obras).
- [ ] (Opcional) Wordmark SVG del nombre.
- [ ] Comprobar SIEMPRE el sitio en móvil tras cada cambio (responsive, peso del vídeo).

## Flujo de trabajo
Editar → revisar → `git add .` → `git commit -m "mensaje corto y claro"` → `git push`. Netlify republica en ~1 min. No hace falta autenticación en cada push (guardada en el Llavero).
