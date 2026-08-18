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
3. **Work** — dos bloques: **Compositions** (Tom Cage, Manta, Early Experiments) ·
   **Improvisation** (Hybrid Percussion Set). Dos obras por fila.
4. **Projects · Collaborations** — Marianito Rojo; Páramo 26005; Duo with Tibor Kovács.
5. **Media** — rejilla de vídeos + prensa y press kit.
5. **About** — bio en inglés.
6. **Contact** — email + enlaces (YouTube, Instagram, Bandcamp).

## Reglas de contenido
- **Nunca uses la raya (—) como conector dentro de una frase.** Ni «Ayuso — percusionista», ni
  «Percussion — Live Electronics». Punto, coma o dos puntos. Los guiones dentro de una palabra
  compuesta (*self-built*) sí valen. Regla de Álvaro, ago 2026.
- El `<title>` es **solo «Álvaro Ayuso»**. El oficio va en la meta description, no en el título.
- **Vídeos: NO subir archivos de vídeo de actuaciones.** Se **incrustan** desde YouTube con `<iframe>`. En el código hay enlaces "Watch on YouTube" provisionales y comentarios `TODO embed` marcando dónde va cada vídeo cuando Álvaro dé la URL. El único vídeo alojado propio es el del hero.
- **Fotos: optimizar antes de añadir.** Receta: `magick foto.jpg -resize 2000x2000\> -quality 82 salida.jpg`.
- Email de contacto: alvaroayuso00@hotmail.com. (En el dossier hay más datos de contacto, pero en la web va solo el email.)

## Decisiones de estructura (ago 2026)
- **Work se divide en bloques, no en una lista única.** El set híbrido no es una composición: es
  el instrumento con el que Álvaro improvisa, y va bajo *Improvisation*.
- **Nada entra en la web sin vídeo, grabación o fotos que lo respalden.** Se probó un bloque de
  *Encargos* en texto (electrónica para Altin Volaj, cabecera del podcast *Invertebrados*) y se
  retiró: Álvaro prefiere no listar trabajo que no se pueda ver ni oír. Cuando haya material,
  vuelven a entrar. Regla general, ago 2026.
- **Jerarquía:** el rótulo de sección es grande y manda; el título de cada obra va por debajo.
  Lo contrario hacía que las secciones no se distinguieran.
- **La banda sonora del film de Alma Tejada se retira**: la película nunca llegó a publicarse.
- **Proyectos y Colaboraciones se fusionan** en una sola sección, titulada solo **Proyectos**:
  las colaboraciones son proyectos suyos y van al mismo nivel. Hecho.
- **División futura de Proyectos**, cuando haya obra en solitario publicada: dos bloques,
  **«Álvaro Ayuso solo» / «Álvaro Ayuso with friends»** en inglés y **«En solitario» /
  «En compañía»** en español. El inglés NO es traducción del español: cada idioma usa lo que
  le funciona («y amigos» en español suena a concierto benéfico). Idea tomada de
  vanessa-porter.de/projects, que agrupa por formación. **No aplicar hasta que la ficha de
  *Piñas, platos y patches* esté en la web**, o el bloque «solo» quedaría vacío.
- **Orden del menú:** Proyectos, Obra, Agenda, Bio, Media, Contacto. Proyectos primero: es lo
  que se contrata.
- **Los textos en español no son traducción del inglés.** Se reescribieron en ago 2026 para que
  suenen naturales: primera persona, frases cortas, sin calcos («agencia del intérprete»,
  «mi práctica», «en tiempo real» a todas horas). Al añadir texto nuevo, redactar en cada
  idioma, no traducir.

## Tareas pendientes (roadmap)
- [ ] **SaintLeo**: no se publica hasta que haya vídeo. Entonces entra en *Compositions*.
- [ ] Encargos (fuera de la web por ahora): recuperar material de la electrónica de *Echoes of
      the Past* de Altin Volaj y el enlace del podcast *Invertebrados* cuando se publique. Solo
      entonces vuelven a entrar, y con año.
- [ ] Incrustar los vídeos de YouTube reales (Álvaro dará las URLs) sustituyendo los enlaces "Watch on YouTube". Vídeos conocidos: Manta, Tom Cage, ELEVATOR IMPRO (Marianito), Bulería de cactus (Páramo), SoL Trailer (Tibor), improvisación del set híbrido, directo de gin Joan (Joan Guinjoan).
- [ ] Sección **Agenda**: lista de conciertos desde un JSON editable a mano (fecha, lugar, ciudad, enlace). Aún no añadida.
- [ ] Separar CSS y JS de `index.html` a `styles.css` y `main.js`.
- [ ] Auto-alojar Hanken Grotesk (`.woff2` + `@font-face`) en vez de depender de Google Fonts.
- [ ] Extraer **color de acento** de un fotograma del vídeo de San Leonardo.
- [ ] Decidir idioma definitivo (solo ES vs bilingüe ES/EN).
- [x] ~~Corregir "Tibor Novak" → "Tibor Kovács"~~ — hecho el 12 ago 2026 en `index.html` y aquí. Apellido correcto confirmado por Álvaro: **Kovács**.
- [ ] Confirmar el programa real del recital "Piñas, platos y patches" (el texto está redactado a partir de notas; revisar nombres y obras).
- [ ] (Opcional) Wordmark SVG del nombre.
- [ ] Comprobar SIEMPRE el sitio en móvil tras cada cambio (responsive, peso del vídeo).
- [ ] **Cuando caduque el token de GitHub** (el push pedirá usuario/contraseña): NO generar otro token. Decisión de Álvaro (ago 2026): migrar a **claves SSH** y cambiar el remoto de HTTPS a SSH, para no volver a renovar nada nunca. Remoto actual: `https://github.com/alvaroayuso/mi-web.git`.
- [x] ~~Dominio en Porkbun: verificar auto-renew~~ — comprobado el 18 ago 2026. Dominio:
      **alvaro-ayuso.com** (https://alvaro-ayuso.com, ya conectado a Netlify), caduca el 2029-07-01
      y el icono de RENEW sale en verde, o sea **auto-renew activado** (en blanco significaría
      desactivado). Queda solo revisar la tarjeta guardada antes de 2029.

## Flujo de trabajo
Editar → revisar → `git add .` → `git commit -m "mensaje corto y claro"` → `git push`. Netlify republica en ~1 min. No hace falta autenticación en cada push (guardada en el Llavero).
