    // ── Page navigation ──
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[data-page]');

    function showPage(id) {
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById('page-' + id).classList.add('active');
      window.scrollTo({ top: 0 });
      navLinks.forEach(a => a.classList.toggle('current', a.dataset.page === id));
      paginaActual = id;
      ajustarScrim();
      initReveals();
    }

    // ── Velo sobre el vídeo de fondo ──
    // En la portada arranca claro (se ve el vídeo) y se va oscureciendo al bajar,
    // para que la galería y el teaser se lean bien. En el resto de páginas,
    // siempre oscuro: hay mucho texto.
    const SCRIM_CLARO = 0.42, SCRIM_OSCURO = 0.72;
    let paginaActual = 'home', tick = false;
    function ajustarScrim() {
      let v = SCRIM_OSCURO;
      if (paginaActual === 'home') {
        const recorrido = window.innerHeight * 0.7;
        const t = Math.min(1, window.scrollY / recorrido);
        v = SCRIM_CLARO + (SCRIM_OSCURO - SCRIM_CLARO) * t;
      }
      document.documentElement.style.setProperty('--scrim', v.toFixed(3));
    }
    window.addEventListener('scroll', () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => { ajustarScrim(); tick = false; });
    }, { passive: true });
    ajustarScrim();

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        showPage(link.dataset.page);
      });
    });

    // Set initial nav state
    document.querySelector('[data-page="home"]').classList.add('current');

    // ── Scroll reveal ──
    // Regla de seguridad: el texto y los vídeos empiezan invisibles y es el JS
    // quien los muestra, así que si algo falla el contenido desaparece. Por eso
    // hay tres redes: lo que ya está en pantalla se muestra en el acto, el
    // observador se encarga del resto al bajar, y un plazo máximo lo enseña todo
    // aunque el observador no llegue a dispararse.
    let revealObserver;
    function mostrar(el) {
      el.classList.add('visible');
      if (revealObserver) revealObserver.unobserve(el);
    }
    function initReveals() {
      if (revealObserver) revealObserver.disconnect();
      const pendientes = [...document.querySelectorAll('.page.active .reveal:not(.visible)')];

      // 1. Lo que ya cae dentro de la pantalla se muestra sin esperar a nadie.
      const alto = window.innerHeight || 0;
      pendientes.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < alto && r.bottom > 0) mostrar(el);
      });

      // 2. El resto, al ir bajando. threshold 0 en vez de 0.1: con bloques más
      //    altos que la pantalla, pedir un porcentaje retrasaba la aparición.
      if (!('IntersectionObserver' in window)) {
        pendientes.forEach(mostrar);
        return;
      }
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) mostrar(e.target); });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      pendientes.forEach(el => {
        if (!el.classList.contains('visible')) revealObserver.observe(el);
      });

      // 3. Red final: pase lo que pase, a los 3 s no queda nada oculto.
      setTimeout(() => {
        document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(mostrar);
      }, 3000);
    }
    initReveals();

    // ── Bio: short / long ──
    const bioToggle = document.getElementById('bio-toggle');
    const bioBody = document.getElementById('bio-body');
    if (bioToggle && bioBody) {
      bioToggle.addEventListener('click', () => {
        const open = bioBody.classList.toggle('long-open');
        const es = document.documentElement.lang === 'es';
        bioToggle.textContent = open
          ? (es ? 'Ver la biografía corta' : 'Show short biography')
          : (es ? 'Leer la biografía completa' : 'Read full biography');
        bioToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ── Vídeo de fondo ──
    (function () {
      const v = document.getElementById('bg-video');
      if (!v) return;
      const grande = window.matchMedia('(min-width: 901px)').matches;
      const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const con = navigator.connection || {};
      const ahorro = con.saveData;
      // Conexión lenta declarada por el navegador: nos quedamos con el póster.
      const lenta = /(^|-)2g$/.test(con.effectiveType || '');
      if (quieto || ahorro || lenta) return;

      // Un solo archivo para todos: 1280x720, el mismo en móvil y en escritorio.
      // Antes el móvil recibía una versión reducida y se le notaba la calidad.
      // El archivo lleva el índice al principio (faststart), así que empieza a
      // verse enseguida en vez de esperar a bajarse entero.
      const fuente = v.dataset.src;
      if (!fuente) return;

      function cargar() {
        v.src = fuente;
        v.load();
        // En móvil hay que pedir la reproducción a mano: al poner el src por JS
        // después de cargar la página, el autoplay del atributo ya no dispara.
        // Si el navegador la rechaza, se queda el póster y no pasa nada.
        const intento = v.play();
        if (intento && intento.catch) intento.catch(() => {});
      }

      // Antes esto esperaba al evento load, que en móvil no llega hasta que han
      // bajado las 48 fotos de la galería: el vídeo no arrancaba nunca. Ahora
      // entra en cuanto el navegador está desahogado, sin bloquear el pintado.
      if (grande) cargar();
      else if ('requestIdleCallback' in window) requestIdleCallback(cargar, { timeout: 2000 });
      else setTimeout(cargar, 800);

      // Al volver a la pestaña, iOS deja el vídeo parado: se reanuda.
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && v.src && v.paused) {
          const r = v.play();
          if (r && r.catch) r.catch(() => {});
        }
      });
    })();

    // ── Vídeo: cargar el iframe solo al hacer clic ──
    function initLite(el) {
      if (el.dataset.loaded) return;
      el.dataset.loaded = '1';
      const start = el.dataset.start ? '&start=' + el.dataset.start : '';
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + el.dataset.id + '?autoplay=1&rel=0' + start;
      f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      f.title = el.getAttribute('aria-label') || 'video';
      el.appendChild(f);
      el.querySelector('.play')?.remove();
    }
    document.querySelectorAll('.lite').forEach(el => {
      // si YouTube no tiene miniatura en alta, caer a la estándar
      const probe = new Image();
      probe.onerror = () => {
        el.style.backgroundImage = "url('https://i.ytimg.com/vi/" + el.dataset.id + "/hqdefault.jpg')";
      };
      probe.src = 'https://i.ytimg.com/vi/' + el.dataset.id + '/maxresdefault.jpg';
      el.addEventListener('click', () => initLite(el));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); initLite(el); }
      });
    });

    // ── Idioma: inglés por defecto, español opcional ──
    const ES = {
  "nav.work": "Obra",
  "nav.projects": "Proyectos",
  "nav.agenda": "Agenda",
  "nav.media": "Media",
  "nav.contact": "Contacto",
  "hero.role": "Percusión · Electrónica en vivo · Arte sonoro",
  "label.projects": "Proyectos",
  "label.agenda": "Agenda",
  "label.bio": "Bio",
  "label.video": "Vídeo",
  "label.press": "Prensa y descargas",
  "label.contact": "Contacto",
  "label.comp": "Composiciones",
  "label.impro": "Improvisación",
  "w1.h": "Tom Cage",
  "w1.p": "Pieza para tom, pedal y controlador MIDI, a partir de las ideas de Cage sobre la indeterminación y el margen de decisión del intérprete. El sistema electrónico introduce una imprevisibilidad controlada: quien toca puede alterar la estructura y el rumbo de la pieza sobre la marcha.",
  "w2.h": "Manta",
  "w2.p": "Para vibráfono y electrónica en vivo, a partir de <em>Mantra</em> de Stockhausen, donde los dos pianos pasan por modulación en anillo. Traslado ese procedimiento al vibráfono: la modulación reordena su espectro y, con él, todo el color armónico del instrumento.",
  "w3.h": "Primeros experimentos",
  "w3.p": "Vengo de la percusión clásica, así que mis primeras pruebas con la electrónica fueron de soporte fijo, sobre repertorio que ya tocaba: una pista para <em>Figment V</em> de Elliott Carter que subraya sus modulaciones métricas, y otra sobre la Sarabanda y su Doble de la Partita n.º 1 para violín solo de Bach, donde la danza y su doble suenan a la vez y se responden (a partir del 1:46).",
  "i1.h": "Set híbrido de percusión",
  "i1.p": "El instrumento que me he construido: percusión, controladores MIDI y dispositivos que programo yo en Max for Live, con todo el procesado en directo dentro de Ableton. Es la herramienta central de mi trabajo, la que uso para improvisar y la que entra también en otros proyectos, y la sigo ampliando a medida que aprendo herramientas nuevas.",
  "p1.h": "Marianito Rojo",
  "p1.p": "Dúo con la trompetista Carmen Llena, a caballo entre la performance experimental y la improvisación. Trabajamos con material escrito y con formas abiertas, y dejamos que el sonido salga de la interacción y de la escucha. Venimos de la música contemporánea, la improvisación y el jazz, y usamos electrónica en vivo para extender los instrumentos acústicos y transformarlos mientras suenan.",
  "p2.h": "Páramo 26005",
  "p2.p": "Colectivo de creación sonora que fundé junto a Adrián Fuentes y Juls Ruiz. Toco, participo en la escritura de las piezas y me ocupo de cómo suenan y de cómo entra en ellas la electrónica en vivo.",
  "p3.h": "Dúo con Tibor Kovács",
  "p3.p": "Dúo de improvisación libre: mi set híbrido de percusión y electrónica frente al sistema modular de Tibor. Solemos movernos hacia texturas lentas y atmosféricas, cerca del drone. De ahí salió también <em>SoL</em>, una performance de sonido, luz e imagen distorsionada.",
  "ag1.h": "Madame Bovary",
  "ag1.r": "Percusión",
  "ag1.m": "jul 2026",
  "ag2.h": "John Cage · <em>Four⁴</em>",
  "ag2.r": "Cuarteto de percusión · coproducción HKB",
  "ag2.m": "ago 2026",
  "ag3.h": "El silencio de Valvanera",
  "ag3.r": "Beca Inicia",
  "ag3.m": "nov 2026",
  "bio.more": "Leer la biografía completa",
  "m1.t": "Nicole Lizée, White Label Experiment",
  "m1.m": "HKB Percussion, Berna",
  "m2.t": "Yido Chae, Possessed (and they came all at once)",
  "m2.m": "Estreno · À suivre, Berna, 2026",
  "m3.t": "Premio Internacional de Composición Joan Guinjoan",
  "m3.m": "Como intérprete, con el ensemble",
  "m4.t": "Cort Lippe, Duo for Cajón and Computer",
  "m4.m": "Percusión y electrónica en vivo",
  "m5.t": "Philippe Manoury, Le livre des claviers IV",
  "m5.m": "Vibráfono",
  "m6.t": "Charles Wuorinen, Janissary Music I",
  "m6.m": "Percusión sola",
  "c1.k": "Entrevista",
  "c1.t": "Cadena SER",
  "c1.m": "Radio · en español",
  "c2.k": "Press kit",
  "c2.t": "Fotos en alta resolución y biografía",
  "c2.m": "Google Drive",
  "cap.garyberger": "Gary Berger, 31 mal lösen · Piñas, platos y patches",
  "cap.marianito-1": "Marianito Rojo en el Troubadour, Londres",
  "cap.marianito-2": "Marianito Rojo en el Troubadour, Londres",
  "cap.marianito-3": "Marianito Rojo en el Troubadour, Londres",
  "cap.marianito-5": "Marianito Rojo en el Troubadour, Londres",
  "cap.saintleo": "SaintLeo · Piñas, platos y patches",
  "cap.solo-5": "Naturstudium, residencia con Luis Tabuenca, Fabra i Coats, Barcelona",
  "cap.so-primari": "María Amor, So primari · Piñas, platos y patches",
  "cap.Feller-4": "Cort Lippe, Duo for Cajón and Computer",
  "cap.shlomowitz": "Matthew Shlomowitz, Popular Contexts 8",
  "cap.solo-7": "Entre pulsos y paisajes en La Lonja, Logroño",
  "cap.Feller-5": "Tom Cage"
};
    const BIO_ES = {
      "bio.short": "<p>Álvaro Ayuso (Logroño, 2000) es percusionista y artista sonoro afincado en Berna. Su trabajo parte de la percusión acústica y se extiende hacia la electrónica en vivo y la instalación, combinando herramientas digitales, circuitos y dispositivos que construye él mismo como si fueran un único instrumento. Le interesa el sonido casi a nivel físico: cómo se genera y qué puede modificarse desde dentro. Sus proyectos parten de la memoria y del paisaje de su pueblo, y los construye enteros: escribe la música y, a veces, fabrica los instrumentos. <em>Piñas, platos y patches</em> y <em>El silencio de Valvanera</em> son dos de ellos.</p><p>Ha colaborado con el grupo Frames Percussion y con compositores como Magnus Lindberg, Matthew Shlomowitz y Gary Berger; ha estrenado obras de Altin Volaj, María Amor, Tibor Kovács y Yido Chae, y ha participado como intérprete en dos ediciones del Premio Internacional de Composición Joan Guinjoan. Ha tocado en festivales como el Festival Actual (Logroño) o Les Jardins Musicaux (Cernier), y en espacios como el Teatre Nacional de Catalunya (Barcelona) o el Troubadour (Londres). Entre sus proyectos están Páramo 26005, colectivo que cofundó y que trabaja con partituras abiertas; el dúo Marianito Rojo con la trompetista Carmen Llena y un dúo de improvisación libre con el compositor Tibor Kovács. Se formó en la ESMUC de Barcelona con Miquel Bernat y cursó el Máster en Interpretación de Percusión en la Hochschule der Künste Bern, donde realiza ahora un segundo máster en Contemporary Arts Practice. Es beneficiario de la beca Albert Hänggi y de la Beca Inicia del Ayuntamiento de Logroño.</p>",
      "bio.long": "<p>Álvaro Ayuso (Logroño, 2000) es percusionista y artista sonoro afincado en Berna. Su trabajo parte de la percusión acústica y se extiende hacia la electrónica en vivo y la instalación, combinando herramientas digitales, circuitos y dispositivos que construye él mismo como si fueran un único instrumento. Le interesa el sonido casi a nivel físico: cómo se genera, qué ocurre dentro de él y qué puede modificarse desde dentro. Pero la materia sola no le basta. Sus proyectos parten de la memoria y del paisaje de su pueblo, y se apoyan en objetos construidos y en vídeo para que la pieza, además de sonar, cuente algo.</p><p>De ahí salen programas que construye de principio a fin, para los que compone y a veces fabrica sus propios instrumentos. <em>Piñas, platos y patches</em> recorre distintas formas de relación entre el ser humano y la tecnología, de las piñas y las cáscaras de bellota a la síntesis digital, con obras comisionadas para el proyecto y una suya, <em>SaintLeo</em>, para percusión, electrónica en vivo y vídeo. En esa misma línea estrena en noviembre <em>El silencio de Valvanera</em>, un concierto-performance sobre la historia y los oficios de La Rioja, para el que recibió la Beca Inicia del Ayuntamiento de Logroño.</p><p>Ha colaborado con el grupo Frames Percussion (Barcelona) y con compositores como Magnus Lindberg, Matthew Shlomowitz, Gary Berger y Luis Tabuenca. Ha estrenado obras de Altin Volaj, María Amor, Tibor Kovács, Lluís Pérez Villegas y Yido Chae, y ha participado como intérprete del ensemble en dos ediciones del Premio Internacional de Composición Joan Guinjoan. Escribe también la electrónica de piezas de otros compositores, como <em>Echoes of the Past</em> de Altin Volaj, y la música de cabecera del podcast <em>Invertebrados</em>.</p><p>La improvisación libre ocupa buena parte de su trabajo: con la trompetista Carmen Llena forma el dúo Marianito Rojo, y con el compositor Tibor Kovács un dúo de percusión híbrida y síntesis modular que se mueve hacia texturas lentas, cercanas al drone. Es cofundador de Páramo 26005, colectivo que trabaja con partituras abiertas, y forma parte del colectivo de percusión Percu-Rioja. Desarrolla además Desmayus, un proyecto personal de live looping en el que se cruzan el techno, el hip-hop y el flamenco, y es percusionista de Vivace, grupo de música tradicional riojana.</p><p>Ha tocado en festivales y eventos como el Festival Actual, el Festival Barullo y Nos Vamos de Pira (Logroño), el Festival Ágora Internacional de Percusión (Jávea), la Kolumbianische Nacht de Forum3 y la 4ª Berner Beratungstagung de la BFH (Berna), À la pièce Dance Festival (Biel) o Les Jardins Musicaux (Cernier); y en espacios como el Palau de la Música Catalana, el Teatre Nacional de Catalunya y la Fundació Antoni Tàpies (Barcelona), la Galería de Arte La Lonja (Logroño), La Guarida (Berna) o el Troubadour (Londres).</p><p>Se formó en la Escola Superior de Música de Catalunya (ESMUC) con Miquel Bernat y cursó el Máster en Interpretación de Percusión en la Hochschule der Künste Bern (HKB) con Brian Archinal; actualmente realiza un segundo máster en Contemporary Arts Practice en la misma institución, especializándose en artes sonoras. Es miembro de PAKT Bern, la red de nueva música de la ciudad, y beneficiario de la beca de la Fundación Albert Hänggi.</p>"
    };
    const EN = {}, BIO_EN = {};
    document.querySelectorAll('[data-i18n]').forEach(el => EN[el.dataset.i18n] = el.innerHTML);
    document.querySelectorAll('[data-i18n-html]').forEach(el => BIO_EN[el.dataset.i18nHtml] = el.innerHTML);
    document.querySelectorAll('[data-i18n-cap]').forEach(el => EN[el.dataset.i18nCap] = el.querySelector('figcaption').textContent);

    function setLang(l) {
      const dic = l === 'es' ? ES : EN;
      const bio = l === 'es' ? BIO_ES : BIO_EN;
      document.documentElement.lang = l;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = dic[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v;
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const v = bio[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v;
      });
      document.querySelectorAll('[data-i18n-cap]').forEach(el => {
        const v = dic[el.dataset.i18nCap]; if (v === undefined) return;
        el.querySelector('figcaption').textContent = v;
        el.querySelector('img').alt = v;
      });
      const b = document.getElementById('bio-body');
      if (b && bioToggle) {
        const abierta = b.classList.contains('long-open');
        bioToggle.textContent = l === 'es'
          ? (abierta ? 'Ver la biografía corta' : 'Leer la biografía completa')
          : (abierta ? 'Show short biography' : 'Read full biography');
      }
      // El título se queda igual en los dos idiomas: solo el nombre.
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', l === 'es'
        ? 'Percusionista y artista sonoro afincado en Berna. Percusión acústica, electrónica en vivo e instrumentos de creación propia, en escena y en instalación.'
        : 'Percussionist and sound artist based in Bern. Acoustic percussion, live electronics and self-built instruments, on stage and in installation.');
      document.querySelectorAll('[data-lang-opt]').forEach(sp =>
        sp.classList.toggle('on', sp.dataset.langOpt === l));
      try { localStorage.setItem('lang', l); } catch (e) {}
    }

    const sw = document.getElementById('lang-switch');
    if (sw) sw.addEventListener('click', () =>
      setLang(document.documentElement.lang === 'es' ? 'en' : 'es'));
    let inicial = 'en';
    try { if (localStorage.getItem('lang') === 'es') inicial = 'es'; } catch (e) {}
    setLang(inicial);

