# DESIGN.md — Web de Álvaro Ayuso

> Sistema de diseño para el sitio personal de Álvaro Ayuso, percusionista y músico electrónico.
> Este documento es la fuente de verdad estética. Cárgalo junto al skill `frontend-design`
> (o pégalo en Claude Design) antes de generar nada. Si algo no está aquí, pregúntame antes de inventar.

---

## 1. Identidad y posicionamiento

Álvaro Ayuso es percusionista y músico electrónico. Su práctica es **reductiva y procesual**: parte
del silencio, la escucha y el gesto físico, y cruza percusión acústica, electrónica en vivo, e
instalación sonora y cinética con hardware DIY (Arduino, micros de contacto, Max/MSP, TouchDesigner).

La web no es un escaparate comercial: es un **espacio de escucha**. Debe sentirse sobria, precisa y
silenciosa, como una sala de conciertos a oscuras antes de la primera nota.

**Referencias estéticas (no musicales literales, sino el *tono*):** Alvin Lucier, Éliane Radigue,
Peter Ablinger, Michael Pisaro, Luigi Nono, Pauline Oliveros, Lê Quan Ninh. Reducción, proceso,
tiempo largo, materia mínima.

**Palabra-guía:** *silencio*. Ante cualquier duda de diseño, elige la opción más callada.

---

## 2. Principios (en orden de prioridad)

1. **Silencio sobre decoración.** El vacío es contenido. Si una sección duda entre añadir o quitar, quita.
2. **El contenido manda, el diseño desaparece.** La tipografía y el espacio hacen el trabajo; nada de adornos.
3. **El movimiento es gesto, no efecto.** Animación sutil y con sentido; nunca decorativa ni llamativa.
4. **La obra aporta el color.** El único color vivo permitido sale del propio material de Álvaro (vídeo/fotos).
5. **Rendimiento como respeto.** Debe ir fino en móvil; el peso y los tirones rompen el silencio.

---

## 3. Color

Paleta deliberadamente mínima: **dos colores y nada más**. La jerarquía se consigue con tamaño,
peso y opacidad del mismo blanco, no metiendo más tonos.

```css
:root {
  --bg:        #0B0B0B; /* casi-negro: respira mejor que el negro puro, cansa menos */
  --fg:        #ECE9E1; /* blanco roto cálido: "papel", no "pantalla" */

  /* Escala de jerarquía = opacidades del MISMO blanco, no colores nuevos */
  --fg-strong: #ECE9E1;            /* titulares */
  --fg-muted:  rgba(236,233,225,0.66); /* texto secundario */
  --fg-faint:  rgba(236,233,225,0.40); /* metadatos, fechas, captions */
  --hairline:  rgba(236,233,225,0.14); /* líneas finas, separadores */

  /* ACENTO: pendiente. NO elegir a dedo.
     Se extraerá de un fotograma del vídeo de San Leonardo (luz, tierra, pinares).
     Hasta entonces, no usar ningún color de acento. */
  --accent: var(--fg); /* placeholder: sin acento todavía */
}
```

**Reglas de color:**
- Prohibido cualquier degradado (en especial morados/azules tipo plantilla).
- Prohibido el blanco puro `#FFFFFF` y el negro puro `#000000` como base.
- Sobre el vídeo del hero, oscurecer con una capa negra translúcida para legibilidad (`rgba(0,0,0,0.45)`).

---

## 4. Tipografía

**Única familia: Hanken Grotesk** (libre, Google Fonts, auto-alojable). Geométrica, limpia, excelente
en tamaños pequeños. Una sola fuente para todo: el carácter viene de la escala y el aire, no de mezclar.

```css
/* Auto-alojar los .woff2 en /fonts y declararlos con @font-face.
   No depender del CDN de Google en producción. */
:root {
  --font: "Hanken Grotesk", system-ui, sans-serif;

  /* Pesos */
  --w-light: 300;   /* grandes titulares / display */
  --w-reg:   400;   /* cuerpo */
  --w-med:   500;   /* énfasis, navegación activa */

  /* Escala (modular ~1.25). Display fluido con clamp. */
  --t-display: clamp(3rem, 9vw, 7rem);  /* nombre en el hero */
  --t-h1:      clamp(1.8rem, 4vw, 2.6rem);
  --t-h2:      1.4rem;
  --t-body:    1.0625rem;
  --t-small:   0.82rem;  /* fechas de agenda, captions */
}
```

**Reglas tipográficas:**
- Display y H1 en peso **light (300)** con *tracking* ligeramente negativo (`letter-spacing: -0.02em`): grande pero silencioso.
- Cuerpo en **400**, `line-height: 1.6`, ancho de línea cómodo (máx. ~68 caracteres).
- Metadatos (fechas, créditos) en `--t-small`, en `--fg-faint`, opcionalmente en MAYÚSCULAS con `letter-spacing: 0.08em`.
- **Nunca** usar Inter, Roboto, Arial, Helvetica, Space Grotesk ni fuentes "por defecto de IA".

> **Logotipo del nombre (futuro, opcional):** si más adelante se quiere un wordmark "chulo" de
> "Álvaro Ayuso", será un **SVG/imagen**, no una fuente, y debe seguir siendo sobrio. Por defecto,
> el nombre va escrito en Hanken Grotesk: en una estética reductiva, eso ya es la firma.

---

## 5. Layout y espacio

- **El espacio negativo es el material principal.** Márgenes generosos, mucho aire entre secciones.
- Contenedor de lectura estrecho (máx. ~720–820px) centrado; el hero y las rejillas pueden ir a ancho completo.
- **Asimetría intencionada** antes que rejillas centradas y perfectas: alinear a una columna, dejar respirar el resto.
- Ritmo vertical amplio entre secciones (`clamp(5rem, 12vh, 9rem)`).
- Sin tarjetas con sombra, sin bordes redondeados marcados, sin "cajas". Separadores = líneas finas `--hairline` o solo espacio.

---

## 6. Secciones (arquitectura del sitio)

Una sola página larga con ancla por sección (single-page, scroll), salvo que crezca y pida páginas aparte.

1. **Hero** — Vídeo propio de San Leonardo en *loop* a pantalla completa (fondo), capa oscura encima,
   y sobre él: el nombre (`--t-display`), una línea de rol ("percusión · electrónica · instalación")
   y nada más. Quietud. Una flecha o señal mínima de "baja".
2. **Work / Proyectos** — Rejilla/lista que se **revela al hacer scroll**. Cada proyecto: imagen o vídeo,
   título, una línea. Al hacer hover, mínima reacción (leve cambio de opacidad o un dato que aparece).
3. **About / Bio** — Texto sobrio, en primera o tercera persona, sin lenguaje de marketing.
4. **Agenda** — Lista de conciertos: fecha · lugar · ciudad · (enlace). Tipografía pequeña, alineada,
   muy legible. Se alimenta de un JSON editable a mano (ver Fase 6).
5. **Contact / Links** — Email y enlaces esenciales (Bandcamp, etc.). Breve.

> Contenido real disponible para borradores (Álvaro lo afinará): proyectos como *Saint Leo*,
> *El silencio de Valvanera*, el dúo *Marianito Rojo*, el colectivo *Páramo 26005*. No inventar
> obras ni fechas: usar placeholders claros donde falte el dato.

---

## 7. Interacción y movimiento

- **Hero video:** `autoplay muted loop playsinline`, con `poster` (primer fotograma) como fallback.
  En móvil, vigilar peso: vídeo corto, comprimido, o imagen estática si el dispositivo no rinde.
- **Scroll-reveal:** los elementos aparecen con un *fade + leve translación hacia arriba* (≤16px),
  una sola vez, suave (`cubic-bezier`, ~500ms). Nada de rebotes ni efectos vistosos.
- **Navegación:** índice fijo arriba, minimal. Los nombres de sección están **siempre presentes**;
  el activo se marca con un detalle sutil (un punto, un subrayado fino o peso `--w-med`),
  **no** con pestañas/carpetas literales. Distinto a las referencias, más callado.
- **Hover:** estados mínimos (cambio de opacidad o aparición de un dato). Sin transformaciones llamativas.
- **`prefers-reduced-motion`:** respetar siempre; si está activo, desactivar reveals y vídeo en movimiento.

---

## 8. Tono de voz (textos)

Sobrio, preciso, sin grandilocuencia ni jerga de marketing. Frases cortas. El texto describe el
trabajo, no se vende. (Decisión pendiente: **idioma** — solo español, o bilingüe ES/EN para el
circuito internacional. Marcar como TODO hasta confirmar.)

---

## 9. Anti-slop — lo que NUNCA se hace

- Fuentes por defecto de IA (Inter, Roboto, Arial, Helvetica, Space Grotesk).
- Degradados morados/azules genéricos; cualquier degradado, en realidad.
- Tarjetas con sombra suave en rejilla uniforme, "hero con dos botones", secciones tipo SaaS.
- Iconos genéricos, emojis decorativos, ilustraciones de stock.
- Blanco puro sobre negro puro.
- Animaciones que llaman la atención sobre sí mismas.
- Centrarlo todo "por defecto"; preferir asimetría con intención.

---

## 10. Pendientes (TODO antes de cerrar)

- [ ] Extraer **color de acento** de un fotograma del vídeo de San Leonardo.
- [ ] Decidir **idioma** (ES vs ES/EN).
- [ ] Confirmar lista real de **proyectos** y orden.
- [ ] Vídeo del hero: exportar versión optimizada (peso/duración) + `poster`.
- [ ] (Opcional, futuro) Wordmark SVG del nombre.

---

*Stack: HTML/CSS/JS estático. Hosting Netlify. Tipografía auto-alojada. Sin frameworks pesados salvo necesidad real.*
