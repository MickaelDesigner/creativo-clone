export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  img: string;
  featured?: boolean;
  body?: string;
};

export const POSTS: Post[] = [
  {
    slug: "mi-equipo-de-11-agentes-ia",
    title: "Cómo construí un equipo de 11 agentes IA que trabajan mientras duermo",
    excerpt:
      "Soy una agencia de 1 persona. Diseño, desarrollo, automatizo y hago marketing. Acá te cuento cómo construí JARVIS, un orquestador de 11 agentes IA especializados que escala mi capacidad sin contratar.",
    category: "IA Agents",
    readTime: "12 min",
    date: "Jun 18, 2026",
    img: "/assets/images/blog/mi-equipo-de-11-agentes-ia.png",
    featured: true,
    body: `<h2>El cuello de botella se llama vos</h2>

<p>Hay un problema que nadie te cuenta cuando empezás como freelance o agencia pequeña: el límite de crecimiento sos vos mismo. Toda decisión pasa por tu cabeza. Todo cliente necesita tu atención. Todo proyecto depende de que vos estés disponible, enfocado y con energía.</p>

<p>Durante 15 años trabajé en advertising, diseño y desarrollo. Construí marcas, lancé productos, escribí código. Y llegó un punto donde la pregunta dejó de ser "¿puedo hacer esto?" y empezó a ser "¿cómo hago más sin romperme?"</p>

<p>Contratar personas es una opción. Pero contratar bien es caro, lento y arriesgado. Un senior de diseño te cuesta entre $2,000 y $5,000 al mes. Un desarrollador full-stack, otro tanto. Y todavía tenés que coordinarlos, revisarlos, formarlos en tu cultura de trabajo.</p>

<p>La pregunta que me obsesionó en 2025 fue diferente: ¿y si en vez de contratar personas, construía un equipo de agentes IA especializados, cada uno con su rol, su contexto y su forma de trabajar? ¿Y si ese equipo podía ejecutar mientras yo duermo?</p>

<p>Eso es JARVIS. Y acá te cuento exactamente cómo lo construí.</p>

<hr>

<h2>Qué es JARVIS y por qué no es un chatbot</h2>

<p>Si pensás en IA como "le preguntás cosas al chat y te responde", JARVIS es algo completamente distinto. La inspiración viene directo de Iron Man: Tony Stark no le pregunta a JARVIS "¿qué debería hacer hoy?". Tony Stark le dice "gestioná el sistema de misiles" y JARVIS coordina los sistemas correctos para que eso pase.</p>

<p>La diferencia clave es <strong>orquestador vs. ejecutor</strong>.</p>

<ul>
  <li><strong>Un chatbot ejecuta</strong>: recibe tu prompt, genera una respuesta, listo.</li>
  <li><strong>Un orquestador coordina</strong>: entiende el objetivo, identifica qué especialistas necesita, les delega tareas con contexto preciso, recopila resultados y sintetiza.</li>
</ul>

<p>JARVIS nunca escribe código. Nunca genera diseños. Nunca redacta posts. JARVIS decide quién hace qué, cuándo, con qué información, y con qué presupuesto de tokens. Es el CEO del sistema, no el técnico.</p>

<p>Esta separación de responsabilidades es lo que hace que el sistema escale. Cada agente trabaja en su contexto aislado, sin contaminarse con el contexto de los otros. Cuando Neo (el agente de desarrollo) está construyendo un componente React, no necesita saber nada del brief de branding que Trinity está procesando al mismo tiempo.</p>

<blockquote>
  <p>Un orquestador sin ejecutores es inútil. Un ejecutor sin orquestador es caótico. La magia está en la separación de roles y el protocolo de comunicación entre ellos.</p>
</blockquote>

<hr>

<h2>Los 11 agentes del equipo</h2>

<p>Cada agente tiene un nombre del universo Matrix (no podía resistirme), un rol específico, un modelo asignado según la complejidad de sus tareas, y casos de uso reales que ya ejecuté con ellos.</p>

<h3>Trinity — Diseño y Brand Identity</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Prompts estructurados para generación de imagen + lógica de brand</p>

<p>Trinity ejecuta el pipeline completo de branding: recibe el brief del cliente, genera 3 conceptos de identidad visual, expande el concepto elegido a brand kit completo y entrega el brand book final. Hace en 4-6 horas lo que antes me tomaba 3 días de trabajo.</p>

<p><em>Caso real</em>: Para Hakuna Mata (emprendimiento gastronómico), Trinity generó 3 propuestas de logo, exploró paletas de color, tipografías y tono visual. El cliente eligió en 20 minutos. Trinity expandió a packaging, menú, social media kit y brand book de 28 páginas. Todo en una tarde.</p>

<h3>Neo — Desarrollo Web Full-Stack</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Next.js 15 + React 19 + Tailwind 4 + Supabase</p>

<p>Neo construye y mantiene sitios web, landings, dashboards y APIs. Trabaja con SDD (Spec-Driven Development): primero especifica, luego implementa, luego verifica. Nunca escribe código antes de tener el diseño claro.</p>

<p><em>Caso real</em>: Neo construyó el dashboard de Nexus CRM (mi SaaS propio) incluyendo el sistema de multi-tenant, integración con WhatsApp Business API, y el módulo de analytics. Tiempo total: 3 semanas de trabajo distribuido.</p>

<h3>Tank — Mobile</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Flutter + React Native</p>

<p>Tank se encarga de todo lo móvil: apps nativas, PWAs, integraciones con APIs móviles. Especializado en UX para pantallas chicas y performance en dispositivos de gama media-baja (importante para el mercado latinoamericano).</p>

<h3>Dozer — Automatización</h3>

<p><strong>Modelo</strong>: Claude Haiku | <strong>Stack</strong>: n8n + scripts + webhooks</p>

<p>Dozer construye los pipelines que hacen que todo funcione sin intervención humana. Workflows de n8n, bots de WhatsApp, cron jobs, integraciones entre APIs. Es el agente más ocupado del equipo porque la automatización está en todo.</p>

<p><em>Caso real</em>: Dozer armó el workflow completo de onboarding de Nexus CRM: cuando un cliente se registra, automáticamente se crea su tenant en Supabase, se configura su instancia de WhatsApp, se envía el email de bienvenida y se agenda el call de onboarding. Sin intervención manual.</p>

<h3>Morpheus — Marketing y Contenido</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: SEO técnico + copywriting + estrategia</p>

<p>Morpheus se encarga de la estrategia de contenido, posts de blog, copy de landings, scripts de video y posicionamiento. Trabaja con keywords reales, estructura SEO, y la voz de marca de cada proyecto.</p>

<h3>Switch — Redes Sociales</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: IG + TikTok + Twitter/X + LinkedIn</p>

<p>Switch adapta el contenido de Morpheus para cada plataforma. Un artículo de blog se convierte en 5 posts de Instagram, 3 hilos de Twitter, 1 carousel de LinkedIn y 2 ideas de Reels. Conoce los algoritmos, los formatos y los mejores horarios para cada red.</p>

<h3>Oracle — Finanzas</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Integración contable + análisis financiero</p>

<p>Oracle lleva la contabilidad del negocio, genera presupuestos para clientes, analiza rentabilidad por proyecto y proyecta flujo de caja. Nada de hojas de Excel al final del mes: Oracle tiene el número en tiempo real.</p>

<h3>Niobe — Ventas y CRM</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Nexus CRM + WhatsApp Business API</p>

<p>Niobe gestiona el pipeline de ventas: hace seguimiento de leads, redacta propuestas comerciales, coordina los follow-ups y alimenta el CRM con cada interacción. Trabaja directamente con Nexus (mi SaaS) para tener visibilidad total del funnel.</p>

<h3>Seraph — Documentación Técnica</h3>

<p><strong>Modelo</strong>: Claude Haiku | <strong>Stack</strong>: Markdown + wikis + README</p>

<p>Seraph documenta todo lo que los otros agentes construyen. APIs, decisiones de arquitectura, guías de uso, changelogs. Usa Haiku porque la documentación técnica es mecánica — no necesita el poder de Sonnet para hacerlo bien.</p>

<h3>Ghost — Seguridad y Compliance</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Auditorías + revisión de código + políticas</p>

<p>Ghost revisa que nada de lo que el equipo construye tenga vulnerabilidades, problemas de privacidad o incumplimientos regulatorios. Antes de que cualquier cosa salga a producción, Ghost la audita.</p>

<h3>Cypher — Video y UGC</h3>

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Scripts + Higgsfield + Kling + Suno</p>

<p>Cypher produce contenido de video: desde el script y el hook viral hasta la dirección del AI video generado con herramientas como Higgsfield o Kling. Especializado en formato UGC y contenido para redes de corta duración.</p>

<hr>

<h2>El stack técnico: qué usa JARVIS por dentro</h2>

<p>Un equipo de agentes no es magia. Es infraestructura. Acá está lo que corre por detrás:</p>

<h3>Claude API (Anthropic)</h3>

<p>Todos los agentes usan Claude. No ChatGPT, no Gemini. Claude. La razón principal es la calidad del razonamiento en tareas complejas con contexto largo, y la consistencia del output. Para un sistema donde los agentes se pasan información entre sí, necesitás un modelo que mantenga coherencia a lo largo de conversaciones largas.</p>

<p>El costo promedio del sistema completo es de $80-150 USD al mes en tokens. Sí, leíste bien. Menos de lo que te costaría una hora de un freelance senior.</p>

<h3>n8n (self-hosted)</h3>

<p>El motor de automatización. n8n conecta los agentes entre sí, dispara workflows según eventos (nuevo lead, nuevo cliente, nueva tarea), y maneja las integraciones con servicios externos (WhatsApp, Gmail, Slack, Notion). Self-hosted en Hostinger via Easypanel para tener control total.</p>

<h3>Supabase</h3>

<p>PostgreSQL gestionado con realtime, auth y storage incluidos. Es la base de datos de Nexus CRM y de JARVIS mismo. Multi-tenant desde el día 1, con Row Level Security para que cada cliente solo vea sus datos.</p>

<h3>Engram</h3>

<p>La pieza más interesante del stack. Engram es un sistema de memoria persistente que escribí en Go. Permite que los agentes recuerden decisiones, contexto y aprendizajes entre sesiones. Sin Engram, cada vez que iniciás una sesión con un agente tenés que explicarle todo desde cero.</p>

<p>Con Engram, Neo sabe que preferís TypeScript sobre JavaScript, que usás Tailwind 4 y no 3, que la paleta de colores de un cliente es tal cosa, y que hubo un bug en el auth que ya se resolvió de determinada manera. Esa memoria persiste indefinidamente.</p>

<h3>Vercel + Easypanel</h3>

<p>Frontend en Vercel (Next.js 15, deploy en segundos). Servicios en Easypanel sobre un servidor en Hetzner: n8n, Engram, y los microservicios propios. Costo mensual total de infraestructura: ~$35 USD.</p>

<h3>Claude Code + GitHub</h3>

<p>El workflow de desarrollo usa Claude Code como IDE principal. Los cambios pasan por GitHub, con CI/CD automatizado. Los PRs los revisa Ghost antes del merge.</p>

<hr>

<h2>Lo que aprendí construyéndolo (errores reales)</h2>

<p>Construir esto no fue lineal. Acá van los errores más costosos:</p>

<h3>Error 1: Querer que un solo agente haga todo</h3>

<p>La primera versión de JARVIS era un agente único con un prompt gigante. "Sos diseñador, desarrollador, estratega de marketing, vendedor y contador." El resultado fue mediocre en todo y excelente en nada. La especialización importa, incluso en IA.</p>

<h3>Error 2: No separar el contexto</h3>

<p>Cuando los agentes comparten contexto, se contaminan. Neo empieza a opinar sobre diseño. Trinity empieza a sugerir arquitecturas de código. La solución fue contexto aislado por agente: cada uno sabe solo lo que necesita saber para su tarea.</p>

<h3>Error 3: Usar el modelo equivocado para cada tarea</h3>

<p>Al principio usaba Sonnet para todo, incluyendo tareas mecánicas como documentación o formateo. El costo se disparó. La solución fue <strong>Token Economics</strong>: Haiku para tareas simples y mecánicas, Sonnet para complejidad media, Opus para decisiones de arquitectura. El costo bajó un 60% sin perder calidad.</p>

<h3>Error 4: No tener memoria persistente desde el principio</h3>

<p>Durante meses trabajé sin Engram. Cada sesión empezaba desde cero. Los agentes repetían preguntas. Tomaban decisiones inconsistentes con las anteriores. Construir Engram fue la inversión más valiosa del proyecto: 3 semanas de desarrollo que cambiaron completamente la experiencia.</p>

<hr>

<h2>¿Querés algo así para tu empresa?</h2>

<p>JARVIS no es un producto que puedas comprar. Es una arquitectura que diseñé específicamente para mi negocio, con mis flujos de trabajo y mis clientes.</p>

<p>Pero los principios son replicables. Si tenés una empresa que quiere escalar su capacidad operativa sin escalar su equipo humano de forma lineal, podemos diseñar algo similar para vos.</p>

<p>No te vendo una herramienta. Te construyo el sistema.</p>

<p><strong>Escribime directo</strong> desde el formulario de contacto o por Instagram <strong>@MickaelDesigner</strong>. Contame qué hace tu empresa, dónde están los cuellos de botella, y conversamos si tiene sentido.</p>`,
  },
  {
    slug: "stack-saas-ia-2026",
    title: "El stack que uso para construir SaaS con IA en 2026",
    excerpt:
      "Next.js 15, Supabase, Claude API, n8n self-hosted y Engram. Cada herramienta tiene una razón de estar acá — y las que no la tienen, no están.",
    category: "Stack",
    readTime: "7 min",
    date: "Jun 15, 2026",
    img: "/assets/images/blog/stack-saas-ia-2026.png",
    body: `<h2>Un stack no es una lista de tools. Es una decisión de arquitectura.</h2>

<p>Cada vez que alguien me pregunta "¿qué tecnología uso para hacer X?", la respuesta honesta es: depende de para qué. Pero en 2026, después de construir Nexus CRM, JARVIS, y varios proyectos de clientes, tengo un stack que uso por default para cualquier SaaS moderno con componentes de IA.</p>

<p>No lo elegí de un listado de "top tools 2026". Lo construí por eliminación: lo que me dio problemas salió, lo que funcionó se quedó. Acá está con las razones reales detrás de cada elección.</p>

<hr>

<h2>Frontend: Next.js 15 + React 19 + Tailwind 4</h2>

<h3>Por qué Next.js 15 y no Vue o Svelte</h3>

<p>Vue es elegante. Svelte es rápido. Pero el ecosistema de React sigue siendo imbatible para SaaS en 2026, y Next.js 15 tiene Server Components maduros, App Router estable y el mejor soporte de Vercel (que es también mi plataforma de deploy).</p>

<p>React 19 trajo mejoras reales en performance y el manejo de estado asíncrono. Con <code>use()</code> para promesas y Server Actions nativos, el patrón de arquitectura cambió. Ya no necesitás Redux para el 90% de los casos.</p>

<p>Tailwind 4 merece mención especial: el nuevo motor CSS-first es un cambio de paradigma. Ya no hay config de JavaScript, el archivo CSS es la config, y el tree-shaking es automático. Los build times bajaron a la mitad.</p>

<h3>Lo que no uso en el frontend</h3>

<p>No uso Chakra UI, Material UI ni ninguna librería de componentes pesada. Para UI custom prefiero componentes propios sobre primitivos de Radix. Para animaciones, Framer Motion cuando necesito algo sofisticado, CSS nativo cuando no.</p>

<hr>

<h2>Backend: Supabase</h2>

<p>Supabase es el backend del stack y acá voy a ser directo: es la decisión que más me ha ahorrado tiempo en los últimos 2 años.</p>

<p>Con Supabase obtenés:</p>

<ul>
  <li><strong>PostgreSQL gestionado</strong> con backups automáticos, replicas y extensiones (pgvector para embeddings, por ejemplo)</li>
  <li><strong>Auth completo</strong>: email, magic link, OAuth con Google/GitHub, JWTs, Row Level Security</li>
  <li><strong>Realtime</strong>: suscripciones a cambios en base de datos via WebSockets, sin configuración extra</li>
  <li><strong>Storage</strong>: S3-compatible, con policies de acceso integradas con el sistema de auth</li>
  <li><strong>Edge Functions</strong>: Deno-based para lógica de servidor que no va en el cliente</li>
</ul>

<p>Para Nexus CRM, Supabase maneja multi-tenancy via Row Level Security: cada empresa tiene su schema aislado y no puede acceder a datos de otras. Implementarlo desde cero en otro sistema hubiera tomado semanas.</p>

<h3>El patrón que uso para multi-tenant</h3>

<pre><code>-- RLS policy básica por organización
CREATE POLICY "org_isolation" ON contacts
  USING (org_id = auth.jwt() ->> 'org_id');</code></pre>

<p>Simple, escalable, y Supabase lo maneja transparentemente en cada query.</p>

<hr>

<h2>IA: Claude API (Anthropic)</h2>

<h3>Por qué no OpenAI</h3>

<p>Esta es la pregunta que más me hacen. La respuesta corta: Claude maneja mejor el razonamiento con contexto largo y es más consistente en outputs estructurados.</p>

<p>Para un sistema como JARVIS donde los agentes se pasan información entre sí y necesitan mantener coherencia a lo largo de conversaciones largas, eso importa. GPT-4 tiene mejor benchmark en tareas de código puntual. Claude tiene mejor benchmark en tareas de razonamiento complejo y seguimiento de instrucciones multi-paso.</p>

<p>Además, el sistema de prompt caching de Anthropic es crucial para token economics: podés cachear el system prompt de un agente y pagar solo la diferencia por sesión. En un sistema con 11 agentes que comparten mucho contexto base, eso reduce el costo hasta un 70%.</p>

<h3>La asignación de modelos por rol</h3>

<table>
  <thead>
    <tr>
      <th>Tarea</th>
      <th>Modelo</th>
      <th>Razón</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Arquitectura, decisiones complejas</td>
      <td>Claude Opus</td>
      <td>Máximo razonamiento</td>
    </tr>
    <tr>
      <td>Desarrollo, diseño, contenido</td>
      <td>Claude Sonnet</td>
      <td>Balance calidad/costo</td>
    </tr>
    <tr>
      <td>Tareas mecánicas, documentación</td>
      <td>Claude Haiku</td>
      <td>Velocidad y costo mínimo</td>
    </tr>
  </tbody>
</table>

<p>El costo total del sistema con 11 agentes activos es de $80-150 USD/mes. Menos que una suscripción de Adobe Creative Cloud.</p>

<hr>

<h2>Automatización: n8n self-hosted</h2>

<p>n8n es la pieza de pegamento del stack. Conecta todo con todo: cuando pasa algo en Supabase, n8n puede disparar un agente de JARVIS, enviar un mensaje de WhatsApp, actualizar Notion, mandar un email y registrar en el CRM — todo en el mismo workflow.</p>

<h3>¿Por qué no Zapier o Make?</h3>

<p>Tres razones:</p>

<ol>
  <li><strong>Costo</strong>: Zapier a ese volumen de workflows costaría $400-800/mes. n8n self-hosted en mi servidor Hetzner cuesta $8/mes de infra.</li>
  <li><strong>Control</strong>: Cuando un workflow falla, puedo debuggear el código. Con Zapier sos rehén de su sistema de logs.</li>
  <li><strong>Customización</strong>: n8n permite código JavaScript custom en cualquier nodo. Para integraciones raras o lógica compleja, eso es invaluable.</li>
</ol>

<p>Lo corro via Easypanel en un VPS de Hetzner (CX21, €3.79/mes). Estable hace 14 meses sin downtime significativo.</p>

<hr>

<h2>Deploy: Vercel + Easypanel</h2>

<p>El frontend de cualquier proyecto Next.js va a Vercel. No hay alternativa que se le acerque en términos de DX (Developer Experience): push a main, deploy automático en 45 segundos, preview URLs para cada PR, analytics integrado.</p>

<p>Para servicios que no van en Vercel (n8n, APIs propias, Engram, microservicios), uso Easypanel sobre Hetzner. Easypanel es básicamente un panel de control de Docker que hace que deployar un servicio sea tan simple como pegar la URL de un repositorio.</p>

<p>El costo mensual total de infra para un SaaS en producción con tráfico moderado: <strong>~$35-50 USD</strong>.</p>

<hr>

<h2>Memoria: Engram</h2>

<p>Engram es el componente más custom del stack. Lo escribí en Go y es un sistema de memoria persistente para agentes IA. Permite que los agentes recuerden decisiones, contexto y aprendizajes entre sesiones.</p>

<p>El problema que resuelve: por defecto, cada conversación con un modelo de IA empieza desde cero. Para un sistema de agentes en producción, eso es un problema enorme. Engram actúa como la memoria de largo plazo del equipo.</p>

<p>Técnicamente es un servidor HTTP que expone una API de observaciones (memories) con búsqueda semántica y por keywords. Los agentes pueden guardar y recuperar contexto usando MCP (Model Context Protocol).</p>

<hr>

<h2>CI/CD y Gestión: Claude Code + GitHub</h2>

<p>Claude Code como IDE es la apuesta más reciente del stack y ya no puedo trabajar sin él. No es solo autocompletado: es un agente que entiende el contexto completo del proyecto, puede refactorizar múltiples archivos, ejecutar comandos, leer errores y resolverlos.</p>

<p>El flujo es simple: trabajo en una rama, Claude Code ayuda con el desarrollo, cuando está listo hago PR en GitHub, Ghost (el agente de seguridad) revisa el código, y si pasa el CI automático, merge a main y Vercel deploya en minutos.</p>

<hr>

<h2>El stack completo en una tabla</h2>

<table>
  <thead>
    <tr>
      <th>Capa</th>
      <th>Tool</th>
      <th>Costo aprox.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>Next.js 15 + Vercel</td>
      <td>$0-20/mes (free tier)</td>
    </tr>
    <tr>
      <td>Base de datos</td>
      <td>Supabase</td>
      <td>$0-25/mes</td>
    </tr>
    <tr>
      <td>IA</td>
      <td>Claude API</td>
      <td>$80-150/mes</td>
    </tr>
    <tr>
      <td>Automatización</td>
      <td>n8n self-hosted</td>
      <td>~$4/mes (infra)</td>
    </tr>
    <tr>
      <td>Servicios</td>
      <td>Easypanel + Hetzner</td>
      <td>~$8-15/mes</td>
    </tr>
    <tr>
      <td>Repositorio</td>
      <td>GitHub</td>
      <td>$0-4/mes</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td></td>
      <td><strong>~$120-220/mes</strong></td>
    </tr>
  </tbody>
</table>

<p>Por menos de $220/mes tenés un stack de producción que compite con el de empresas que gastan 10 veces más. Esa es la ventaja del founder técnico en 2026.</p>

<hr>

<h2>¿Querés implementar este stack en tu proyecto?</h2>

<p>Si estás construyendo un SaaS y querés implementar este stack desde el principio (sin aprender de los errores que ya cometí yo), puedo ayudarte.</p>

<p>Desde el setup inicial hasta la arquitectura completa de un sistema de agentes IA integrado a tu producto. Escribime por Instagram <strong>@MickaelDesigner</strong> o desde el formulario de contacto en <strong>mickaelvasquez.tech</strong>.</p>`,
  },
  {
    slug: "orquestador-vs-ejecutor-agentes-ia",
    title: "Por qué separé mi agencia en orquestador + ejecutores (y cómo te cambia el juego)",
    excerpt:
      "JARVIS nunca escribe una línea de código. Solo delega. Entender la diferencia entre orquestar y ejecutar es lo que hace que un sistema de agentes IA escale de verdad.",
    category: "IA Agents",
    readTime: "6 min",
    date: "Jun 12, 2026",
    img: "/assets/images/blog/orquestador-vs-ejecutor-agentes-ia.png",
    body: `<h2>El error que cometen todos al empezar con agentes IA</h2>

<p>Cuando descubrís que podés darle instrucciones complejas a un modelo de IA, la tentación natural es construir un agente que haga todo. "Vos sos mi asistente. Diseñá, desarrollá, respondé emails, llevá la contabilidad, manejá las redes sociales."</p>

<p>El problema no es la ambición. El problema es que ese enfoque no escala. Y el motivo es técnico: un agente que hace todo necesita cargar todo el contexto de todo. Cada decisión de diseño, cada línea de código, cada conversación con cada cliente, cada número de cada factura. El contexto explota, la calidad baja, y terminás con un agente mediocre en todo.</p>

<p>La solución es un patrón que usamos en gestión empresarial hace décadas, pero que tardamos en aplicar a sistemas de IA: <strong>separar quién decide de quién ejecuta</strong>.</p>

<hr>

<h2>La analogía que lo explica todo: el CEO y su equipo</h2>

<p>El CEO de una empresa no escribe el código, no diseña las piezas gráficas, no atiende al cliente en el chat de soporte. El CEO define la dirección, asigna recursos, toma decisiones de alto nivel y coordina que los especialistas correctos estén trabajando en las cosas correctas.</p>

<p>Si el CEO empezara a hacer el trabajo técnico directamente, dejarían de pasar dos cosas importantes: primero, el trabajo técnico sería mediocre (porque el CEO no es el experto). Segundo, la coordinación estratégica se perdería (porque el CEO estaría demasiado en el detalle).</p>

<p>JARVIS funciona exactamente igual. JARVIS es el CEO del sistema. Nunca escribe una línea de código. Nunca genera una imagen. Nunca redacta un post. JARVIS decide:</p>

<ul>
  <li>¿Qué agente es el más adecuado para esta tarea?</li>
  <li>¿Qué contexto necesita ese agente para trabajar bien?</li>
  <li>¿Cuántos tokens puede gastar (token economics)?</li>
  <li>¿En qué orden deben ejecutarse las tareas cuando hay dependencias?</li>
  <li>¿Cómo se sintetizan los resultados de múltiples agentes?</li>
</ul>

<p>Todo lo demás lo hacen los ejecutores: Trinity para diseño, Neo para desarrollo, Morpheus para contenido, y así con cada uno de los 11 agentes del equipo.</p>

<hr>

<h2>Por qué el contexto aislado es el superpoder del sistema</h2>

<p>Acá está la parte técnica que más diferencia hace en la práctica.</p>

<p>Cuando Neo está construyendo un componente React, no necesita saber nada del brief de branding que Trinity está procesando. No necesita conocer el estado del pipeline de ventas de Niobe. No necesita leer las últimas métricas financieras de Oracle.</p>

<p>Cada agente recibe exactamente el contexto que necesita para su tarea y nada más. Esto tiene tres consecuencias directas:</p>

<h3>1. Calidad más alta</h3>

<p>Un agente con contexto limpio y específico produce outputs mejores que un agente generalist con contexto saturado. Es el mismo principio que hace que un especialista sea mejor que un generalista en tareas técnicas complejas.</p>

<h3>2. Costo más bajo</h3>

<p>Los modelos de IA cobran por token de entrada y salida. Un agente que carga todo el contexto de la empresa en cada llamada consume 10 veces más tokens que uno que carga solo lo que necesita. Con 11 agentes activos, esa diferencia se convierte en cientos de dólares por mes.</p>

<h3>3. Errores contenidos</h3>

<p>Si Neo comete un error en un componente, ese error no contamina el trabajo de Trinity ni el de Morpheus. Cada agente es un sistema independiente. Los fallos son locales, no sistémicos.</p>

<blockquote>
  <p>El contexto aislado no es una limitación del sistema. Es una feature de diseño. Un agente que sabe todo no es más inteligente — es más difícil de controlar.</p>
</blockquote>

<hr>

<h2>El protocolo de comunicación entre agentes</h2>

<p>Si los agentes tienen contexto aislado, ¿cómo se pasan información entre sí? Esa es la pregunta correcta, y la respuesta es el protocolo de comunicación que define el orquestador.</p>

<p>Cuando JARVIS delega una tarea a Neo, no le dice "mirá todo lo que pasó en el proyecto". Le dice exactamente lo que necesita:</p>

<ul>
  <li>El objetivo específico de la tarea</li>
  <li>El contexto relevante (solo el necesario)</li>
  <li>Las restricciones (tech stack, patrones, convenciones)</li>
  <li>El formato esperado del output</li>
</ul>

<p>Cuando Neo termina, devuelve el resultado a JARVIS, que lo sintetiza y decide qué pasa después: ¿se lo pasa a Ghost para auditoría? ¿Se lo pasa a Seraph para documentación? ¿Se publica directo a producción?</p>

<p>Este protocolo tiene un nombre en el mundo SDD (Spec-Driven Development) que uso en mis proyectos: el <strong>result contract</strong>. Cada agente sabe que tiene que devolver su resultado en un formato específico que el orquestador puede procesar. Sin eso, el sistema no escala.</p>

<hr>

<h2>Las ventajas concretas que noté en producción</h2>

<p>Después de más de un año trabajando con este sistema, las ventajas que más siento en el día a día son estas:</p>

<h3>Paralización real de tareas</h3>

<p>JARVIS puede lanzar Trinity y Neo al mismo tiempo en el mismo proyecto. Trinity trabaja en los assets visuales mientras Neo construye los componentes del frontend. No se molestan. No se contradicen. Al final, JARVIS integra los dos outputs.</p>

<h3>Especialización que se nota en la calidad</h3>

<p>El código de Neo es mejor que el de un agente generalista porque Neo solo hace código. El copy de Morpheus es mejor porque Morpheus solo hace contenido. La especialización que aplica en equipos humanos aplica igual en equipos de agentes.</p>

<h3>Escalabilidad sin complejidad lineal</h3>

<p>Si mañana necesito un nuevo tipo de tarea (digamos, análisis de datos avanzado), agrego un nuevo agente especializado sin tocar los otros 11. El orquestador aprende a incluirlo en los workflows relevantes. La complejidad crece de forma modular, no exponencial.</p>

<h3>Debuggeo localizado</h3>

<p>Cuando algo sale mal, sé exactamente dónde buscar. Si el output de diseño no es lo que esperaba, es un problema de Trinity. Si el código tiene un bug, es un problema de Neo. No tengo que adivinar en un sistema monolítico cuál de las 50 responsabilidades del "agente único" falló.</p>

<hr>

<h2>Cuándo este patrón NO aplica</h2>

<p>No todo necesita un orquestador. Si tenés una tarea simple y única, un agente directamente es más eficiente. El overhead del orquestador (la capa de decisión y coordinación) agrega latencia y costo que no vale la pena para tareas atómicas.</p>

<p>El patrón orquestador + ejecutores aplica cuando:</p>

<ul>
  <li>La tarea tiene múltiples pasos con dependencias</li>
  <li>Se pueden ejecutar sub-tareas en paralelo</li>
  <li>Se necesitan diferentes tipos de expertise en el mismo proyecto</li>
  <li>El volumen de trabajo justifica la inversión en arquitectura</li>
</ul>

<p>Para un proyecto chico de una semana, probablemente no lo necesitás. Para un negocio que quiere escalar operaciones sin escalar el equipo humano de forma lineal, es el camino.</p>

<hr>

<h2>¿Querés que diseñemos el sistema para tu empresa?</h2>

<p>Cada negocio tiene sus propios cuellos de botella y sus propios flujos de trabajo. El sistema que construí para mi agencia no es el mismo que construiría para una empresa de e-commerce, una fintech o un estudio legal.</p>

<p>Si querés explorar cómo aplicar este patrón a tu operación, arranquemos con una conversación. Sin venta de humo: si tiene sentido para tu caso, lo construimos. Si no, te lo digo directo.</p>

<p>Escribime a <strong>@MickaelDesigner</strong> en Instagram o desde el formulario en <strong>mickaelvasquez.tech</strong>.</p>`,
  },
  {
    slug: "automatizar-branding-ia-pipeline",
    title: "Cómo automaticé el pipeline completo de branding con IA (de brief a brand book en horas)",
    excerpt:
      "Lo que antes tomaba 3-5 días de trabajo — research, conceptos de logo, brand kit, brand book — ahora lo ejecuta Trinity, mi agente de diseño, en una tarde.",
    category: "Automatización",
    readTime: "7 min",
    date: "Jun 10, 2026",
    img: "/assets/images/blog/automatizar-branding-ia-pipeline.png",
    body: `<h2>El problema con el branding tradicional</h2>

<p>El proceso de branding clásico tiene un problema de escala: es casi completamente lineal y depende de la disponibilidad y energía del diseñador en cada etapa. Brief del cliente, investigación, moodboards, propuestas de logo, revisiones, ajustes, brand kit, brand book. En el mejor caso, una semana de trabajo. En proyectos con clientes exigentes o muchas rondas de revisión, dos o tres semanas.</p>

<p>Eso pone un techo duro a cuántos proyectos de branding puedo tomar en paralelo. Si cada proyecto toma una semana, nunca puedo tener más de 4-5 proyectos simultáneos sin que la calidad baje o los plazos se incumplan.</p>

<p>La pregunta que me hice en 2025 fue: ¿qué partes de ese proceso son realmente creativas e irreemplazables, y qué partes son mecánicas y repetibles? La respuesta me llevó a construir el Brand Agency Pro pipeline, ejecutado por Trinity, mi agente de diseño.</p>

<hr>

<h2>El pipeline: 5 fases, una tarde de trabajo</h2>

<p>El Brand Agency Pro pipeline tiene 5 fases. Algunas las ejecuta Trinity de forma autónoma. Otras requieren una decisión del cliente (que suele tardar 20 minutos, no 3 días).</p>

<h3>Fase 1: Brief conversacional con Claude</h3>

<p>En vez de mandar un formulario de 3 páginas que el cliente llena a medias y sin pensar, el proceso arranca con una conversación. El cliente habla con un agente de Claude que hace las preguntas correctas en el orden correcto:</p>

<ul>
  <li>¿Qué hace tu empresa y a quién le vende?</li>
  <li>¿Cuáles son los 3 valores que definen tu marca?</li>
  <li>¿Hay marcas que admitás por su estilo visual (no necesariamente del mismo rubro)?</li>
  <li>¿Qué palabras NO querés que describan tu marca?</li>
  <li>¿Hay colores o estilos que definitivamente no van?</li>
</ul>

<p>El agente sintetiza las respuestas en un brief estructurado que Trinity puede procesar. Tiempo del cliente: 15-20 minutos. Resultado: un brief 10 veces más útil que un formulario estándar.</p>

<h3>Fase 2: Generación de 3 conceptos de identidad</h3>

<p>Trinity procesa el brief y genera 3 conceptos de identidad visual completamente diferentes entre sí. Cada concepto incluye:</p>

<ul>
  <li>Nombre del concepto y filosofía visual</li>
  <li>Propuesta de logo (estilo, forma, tipografía)</li>
  <li>Paleta de colores primaria y secundaria con hex codes</li>
  <li>Tipografías (heading + body)</li>
  <li>Tono visual general (minimalista, expresivo, técnico, orgánico, etc.)</li>
  <li>Referencias visuales de la dirección propuesta</li>
</ul>

<p><em>Caso real — Hakuna Mata</em>: Para este emprendimiento gastronómico, Trinity propuso tres conceptos: "Raíces" (orgánico, cálido, tipografía serif), "Moderno Africano" (geométrico, bold, colores saturados) y "Minimalismo Natural" (blanco, verde sage, sans-serif limpia). El cliente eligió "Raíces" en 20 minutos de llamada.</p>

<h3>Fase 3: Selección del cliente y refinamiento</h3>

<p>El cliente elige uno de los 3 conceptos. Si hay ajustes menores (un color diferente, cambiar el peso de la tipografía, explorar variantes del logo), Trinity los incorpora en la siguiente iteración.</p>

<p>Este es el único momento de fricción humana en el pipeline. Y está bien: la decisión de qué dirección toma la marca de alguien no debería ser 100% automatizada. El cliente tiene que ser parte de esa elección.</p>

<p>Pero notar algo: la conversación ya no es "¿qué querés que diseñe?". Es "de estos 3 caminos concretos, ¿cuál representa mejor tu marca?" Eso cambia completamente la dinámica. Los clientes deciden más rápido cuando tienen opciones concretas.</p>

<h3>Fase 4: Expansión al brand kit completo</h3>

<p>Con el concepto aprobado, Trinity expande a brand kit completo. Esto incluye:</p>

<ul>
  <li>Logo en todas las variaciones: horizontal, vertical, isotipo solo, versión monocromática, versión para fondos oscuros</li>
  <li>Sistema de color con primarios, secundarios y neutrales</li>
  <li>Sistema tipográfico con jerarquías definidas (H1-H4, body, caption, label)</li>
  <li>Patrones y texturas de marca si aplica</li>
  <li>Elementos gráficos secundarios (iconos, ilustraciones de soporte)</li>
  <li>Ejemplos de aplicación: tarjeta personal, sobre, membrete</li>
  <li>Kit para redes sociales: avatar, cover de Instagram, plantillas de stories y posts</li>
</ul>

<p><em>Caso real — Tuppie</em>: Para esta marca de packaging sustentable, el brand kit incluyó el sistema de color completo (5 tonos primarios + 3 neutros), 2 familias tipográficas, patrón de textura kraft, set de iconos de producto y plantillas para Instagram y LinkedIn. Todo generado en 3 horas de proceso.</p>

<h3>Fase 5: Brand book final</h3>

<p>El entregable final es un brand book en PDF de entre 20 y 35 páginas. Trinity genera el contenido de cada sección y los assets visuales. El documento incluye:</p>

<ol>
  <li>Historia y filosofía de la marca</li>
  <li>Personalidad de marca (voz, tono, valores)</li>
  <li>Logo: usos correctos e incorrectos</li>
  <li>Sistema de color con especificaciones (HEX, RGB, CMYK, Pantone)</li>
  <li>Sistema tipográfico con uso en contexto</li>
  <li>Fotografía y estilo visual</li>
  <li>Aplicaciones de marca (packaging, digital, impresión)</li>
  <li>Guía de redes sociales</li>
</ol>

<p>El brand book tiene un estilo visual coherente con la marca del cliente — no es un template genérico. Trinity adapta el diseño del documento al estilo que acaba de construir.</p>

<hr>

<h2>Los números reales</h2>

<table>
  <thead>
    <tr>
      <th>Métrica</th>
      <th>Antes (manual)</th>
      <th>Ahora (pipeline Trinity)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tiempo de brief</td>
      <td>2-4 horas (formulario + call)</td>
      <td>15-20 min (conversacional)</td>
    </tr>
    <tr>
      <td>Tiempo hasta conceptos</td>
      <td>2-3 días</td>
      <td>2-3 horas</td>
    </tr>
    <tr>
      <td>Iteraciones promedio</td>
      <td>3-5 rondas</td>
      <td>1-2 rondas</td>
    </tr>
    <tr>
      <td>Tiempo hasta brand book</td>
      <td>5-10 días</td>
      <td>1-2 días</td>
    </tr>
    <tr>
      <td>Proyectos simultáneos posibles</td>
      <td>3-4</td>
      <td>8-12</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Lo que el pipeline NO reemplaza</h2>

<p>Quiero ser directo en esto porque hay mucho hype alrededor de la IA en diseño y no quiero vender algo que no es.</p>

<p>El pipeline automatiza las partes mecánicas y repetibles del proceso de branding. No reemplaza la creatividad estratégica de un diseñador senior que entiende el mercado, la psicología del consumidor y las tendencias visuales.</p>

<p>Lo que sí hace es <strong>multiplicar la capacidad de ese diseñador</strong>. En vez de gastar 3 días construyendo el primer concepto desde cero, el diseñador gasta 3 horas revisando, refinando y elevando lo que Trinity generó. El resultado final tiene la calidad de un trabajo de semanas porque el diseñador humano pone el juicio estratégico sobre una base que la IA construyó rápido.</p>

<p>Es colaboración, no sustitución.</p>

<hr>

<h2>Qué sigue en el pipeline</h2>

<p>Actualmente estoy trabajando en dos expansiones del Brand Agency Pro:</p>

<p><strong>Motion Brand Kit</strong>: Agregar animaciones de logo, transiciones de marca y assets de video a cada proyecto de branding. Cypher (el agente de video) se integra al pipeline de Trinity para producir assets de movimiento.</p>

<p><strong>Brand Consistency Audit</strong>: Un proceso periódico donde Ghost revisa todas las aplicaciones de la marca del cliente (web, redes, documentos) para detectar inconsistencias y sugerir correcciones. Una marca que se mantiene consistente a lo largo del tiempo vale 10 veces más que una que se va degradando.</p>

<hr>

<h2>¿Querés este pipeline para tu marca?</h2>

<p>El Brand Agency Pro pipeline está disponible para clientes de Mickael Vasquez Studio. Si necesitás branding completo para tu empresa — logo, brand kit, brand book — con la calidad de semanas de trabajo en la fracción del tiempo, esto es para vos.</p>

<p>También ofrezco el pipeline para agencias que quieren licenciarlo para sus propios proyectos. Si manejás varios proyectos de branding al mes y querés escalar sin escalar el equipo, conversemos.</p>

<p>Escribime a <strong>@MickaelDesigner</strong> en Instagram o desde el formulario en <strong>mickaelvasquez.tech</strong>. Primera consulta es gratis y sin compromiso.</p>`,
  },
  {
    slug: "designing-for-ai-not-against-it",
    title: "Designing for AI, not against it",
    excerpt:
      "A field guide for product designers shipping AI features without losing the soul of the product. What to delegate, what to keep human.",
    category: "AI Systems",
    readTime: "9 min",
    date: "May 18, 2026",
    img: "/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png",
  },
  {
    slug: "brand-systems-in-the-age-of-llms",
    title: "Brand systems in the age of LLMs",
    excerpt:
      "Identity used to be a static PDF. Now it ships as tokens, prompts, and guardrails. Here's how we rebuilt our brand stack.",
    category: "Brand",
    readTime: "6 min",
    date: "May 02, 2026",
    img: "/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png",
  },
  {
    slug: "the-quiet-power-of-typography",
    title: "The quiet power of typography",
    excerpt:
      "Why we picked a serif for a fintech app, and what changed in conversion when the whole brand started reading slower.",
    category: "Type",
    readTime: "5 min",
    date: "Apr 21, 2026",
    img: "/assets/images/prismic/ZvWhwbVsGrYSwDK-_Frame204.png",
  },
  {
    slug: "gsap-and-the-lost-art-of-motion-craft",
    title: "GSAP and the lost art of motion craft",
    excerpt:
      "Modern web motion looks the same everywhere. A short manifesto for getting back to deliberate, narrative animation.",
    category: "Motion",
    readTime: "7 min",
    date: "Apr 09, 2026",
    img: "/assets/images/prismic/ZvWhxrVsGrYSwDK__Frame205.png",
  },
  {
    slug: "no-code-isnt-the-enemy",
    title: "No-code isn't the enemy",
    excerpt:
      "How we shipped a 12-market e-commerce stack in 6 weeks — without writing a single backend service.",
    category: "Engineering",
    readTime: "8 min",
    date: "Mar 27, 2026",
    img: "/assets/images/prismic/ZvWhzLVsGrYSwDLA_Frame206.png",
  },
  {
    slug: "the-design-engineer-stack-2026",
    title: "The design-engineer stack, 2026 edition",
    excerpt:
      "Figma → Next.js → Vercel. The toolchain that powers everything I ship — and what I'd add or drop next year.",
    category: "Stack",
    readTime: "4 min",
    date: "Mar 14, 2026",
    img: "/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png",
  },
  {
    slug: "writing-prompts-like-design-briefs",
    title: "Writing prompts like design briefs",
    excerpt:
      "The same discipline that makes a good creative brief makes a good prompt. A field-tested template.",
    category: "AI Systems",
    readTime: "6 min",
    date: "Feb 28, 2026",
    img: "/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png",
  },
];

export const CATEGORIES = ["All", "IA Agents", "Automatización", "Stack", "AI Systems", "Brand", "Type", "Motion", "Engineering"];
