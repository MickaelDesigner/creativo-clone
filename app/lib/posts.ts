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

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

type SbPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  published_at: string | null;
  cover_image_url: string | null;
  featured: boolean | null;
  body_html: string | null;
};

function mapSbPost(row: SbPost): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    readTime: row.read_time,
    date: row.published_at
      ? new Date(row.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    img: row.cover_image_url ?? "",
    featured: row.featured ?? false,
    body: row.body_html ?? undefined,
  };
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/content_posts?status=eq.published&select=slug,title,excerpt,category,read_time,published_at,cover_image_url,featured,body_html&order=published_at.desc`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return POSTS.filter((p) => p.body);
    const rows: SbPost[] = await res.json();
    return rows.map(mapSbPost);
  } catch {
    return POSTS.filter((p) => p.body);
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/content_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=slug,title,excerpt,category,read_time,published_at,cover_image_url,featured,body_html&limit=1`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const rows: SbPost[] = await res.json();
    if (!rows.length) return null;
    return mapSbPost(rows[0]);
  } catch {
    return null;
  }
}

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
  {
    slug: "mi-equipo-de-11-agentes-ia-en",
    title: "How I built an 11-agent AI team that works while I sleep",
    excerpt:
      "I'm a one-person agency. Design, development, automation, and marketing. Here's how I built JARVIS, an orchestrator of 11 specialized AI agents that scales my capacity without hiring.",
    category: "IA Agents",
    readTime: "12 min",
    date: "Jun 18, 2026",
    img: "/assets/images/blog/mi-equipo-de-11-agentes-ia.png",
    featured: false,
    body: `<h2>The bottleneck is you</h2>

<p>There's a problem nobody tells you about when you start as a freelancer or small agency: the growth limit is you yourself. Every decision goes through your head. Every client needs your attention. Every project depends on you being available, focused, and energized.</p>

<p>For 15 years I worked in advertising, design, and development. I built brands, launched products, wrote code. And I reached a point where the question stopped being "can I do this?" and started being "how do I do more without burning out?"</p>

<p>Hiring people is an option. But hiring well is expensive, slow, and risky. A senior designer costs between $2,000 and $5,000 a month. A full-stack developer, the same. And you still have to coordinate them, review their work, and train them in your work culture.</p>

<p>The question that obsessed me in 2025 was different: what if instead of hiring people, I built a team of specialized AI agents, each with its own role, context, and way of working? What if that team could execute while I sleep?</p>

<p>That's JARVIS. And here I'll tell you exactly how I built it.</p>

<hr>

<h2>What JARVIS is and why it's not a chatbot</h2>

<p>If you think of AI as "you ask the chat something and it answers," JARVIS is something completely different. The inspiration comes straight from Iron Man: Tony Stark doesn't ask JARVIS "what should I do today?" Tony Stark says "manage the missile system" and JARVIS coordinates the right systems to make that happen.</p>

<p>The key difference is <strong>orchestrator vs. executor</strong>.</p>

<ul>
  <li><strong>A chatbot executes</strong>: it receives your prompt, generates a response, done.</li>
  <li><strong>An orchestrator coordinates</strong>: it understands the goal, identifies which specialists it needs, delegates tasks with precise context, collects results, and synthesizes.</li>
</ul>

<p>JARVIS never writes code. Never generates designs. Never drafts posts. JARVIS decides who does what, when, with what information, and with what token budget. It's the CEO of the system, not the technician.</p>

<p>This separation of responsibilities is what makes the system scale. Each agent works in its isolated context, without being contaminated by the context of others. When Neo (the development agent) is building a React component, it doesn't need to know anything about the branding brief that Trinity is processing at the same time.</p>

<blockquote>
  <p>An orchestrator without executors is useless. An executor without an orchestrator is chaos. The magic lies in the separation of roles and the communication protocol between them.</p>
</blockquote>

<hr>

<h2>The 11 agents on the team</h2>

<p>Each agent has a name from the Matrix universe (I couldn't resist), a specific role, an assigned model based on the complexity of its tasks, and real use cases I've already executed with them.</p>

<h3>Trinity — Design and Brand Identity</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Structured prompts for image generation + brand logic</p>

<p>Trinity runs the complete branding pipeline: receives the client brief, generates 3 visual identity concepts, expands the chosen concept into a full brand kit, and delivers the final brand book. It does in 4-6 hours what used to take me 3 days of work.</p>

<p><em>Real case</em>: For Hakuna Mata (a food venture), Trinity generated 3 logo proposals, explored color palettes, typography, and visual tone. The client chose in 20 minutes. Trinity expanded to packaging, menu, social media kit, and a 28-page brand book. All in one afternoon.</p>

<h3>Neo — Full-Stack Web Development</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Next.js 15 + React 19 + Tailwind 4 + Supabase</p>

<p>Neo builds and maintains websites, landing pages, dashboards, and APIs. It works with SDD (Spec-Driven Development): first specify, then implement, then verify. Never writes code before the design is clear.</p>

<p><em>Real case</em>: Neo built the Nexus CRM dashboard (my own SaaS) including the multi-tenant system, WhatsApp Business API integration, and the analytics module. Total time: 3 weeks of distributed work.</p>

<h3>Tank — Mobile</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Flutter + React Native</p>

<p>Tank handles everything mobile: native apps, PWAs, mobile API integrations. Specialized in UX for small screens and performance on mid-to-low-range devices (important for the Latin American market).</p>

<h3>Dozer — Automation</h3>

<p><strong>Model</strong>: Claude Haiku | <strong>Stack</strong>: n8n + scripts + webhooks</p>

<p>Dozer builds the pipelines that make everything run without human intervention. n8n workflows, WhatsApp bots, cron jobs, API integrations. It's the busiest agent on the team because automation is everywhere.</p>

<p><em>Real case</em>: Dozer built the complete Nexus CRM onboarding workflow: when a client registers, it automatically creates their tenant in Supabase, configures their WhatsApp instance, sends the welcome email, and schedules the onboarding call. No manual intervention.</p>

<h3>Morpheus — Marketing and Content</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Technical SEO + copywriting + strategy</p>

<p>Morpheus handles content strategy, blog posts, landing page copy, video scripts, and positioning. It works with real keywords, SEO structure, and the brand voice of each project.</p>

<h3>Switch — Social Media</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: IG + TikTok + Twitter/X + LinkedIn</p>

<p>Switch adapts Morpheus's content for each platform. A blog article becomes 5 Instagram posts, 3 Twitter threads, 1 LinkedIn carousel, and 2 Reel ideas. It knows the algorithms, the formats, and the best posting times for each network.</p>

<h3>Oracle — Finance</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Accounting integration + financial analysis</p>

<p>Oracle handles business accounting, generates client budgets, analyzes profitability per project, and projects cash flow. No more Excel sheets at the end of the month: Oracle has the numbers in real time.</p>

<h3>Niobe — Sales and CRM</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Nexus CRM + WhatsApp Business API</p>

<p>Niobe manages the sales pipeline: follows up on leads, drafts commercial proposals, coordinates follow-ups, and feeds the CRM with every interaction. It works directly with Nexus (my SaaS) for full funnel visibility.</p>

<h3>Seraph — Technical Documentation</h3>

<p><strong>Model</strong>: Claude Haiku | <strong>Stack</strong>: Markdown + wikis + README</p>

<p>Seraph documents everything the other agents build. APIs, architecture decisions, usage guides, changelogs. It uses Haiku because technical documentation is mechanical — it doesn't need Sonnet's power to do it well.</p>

<h3>Ghost — Security and Compliance</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Audits + code review + policies</p>

<p>Ghost reviews that nothing the team builds has vulnerabilities, privacy issues, or regulatory non-compliance. Before anything goes to production, Ghost audits it.</p>

<h3>Cypher — Video and UGC</h3>

<p><strong>Model</strong>: Claude Sonnet | <strong>Stack</strong>: Scripts + Higgsfield + Kling + Suno</p>

<p>Cypher produces video content: from the script and viral hook to directing AI-generated video using tools like Higgsfield or Kling. Specialized in UGC format and short-form social content.</p>

<hr>

<h2>The tech stack: what JARVIS uses under the hood</h2>

<p>A team of agents isn't magic. It's infrastructure. Here's what runs behind the scenes:</p>

<h3>Claude API (Anthropic)</h3>

<p>All agents use Claude. Not ChatGPT, not Gemini. Claude. The main reason is the quality of reasoning in complex tasks with long context, and output consistency. For a system where agents pass information between each other, you need a model that maintains coherence across long conversations.</p>

<p>The average cost of the complete system is $80-150 USD per month in tokens. Yes, you read that right. Less than what an hour of a senior freelancer would cost you.</p>

<h3>n8n (self-hosted)</h3>

<p>The automation engine. n8n connects agents to each other, triggers workflows based on events (new lead, new client, new task), and handles integrations with external services (WhatsApp, Gmail, Slack, Notion). Self-hosted on Hostinger via Easypanel for full control.</p>

<h3>Supabase</h3>

<p>Managed PostgreSQL with realtime, auth, and storage included. It's the database for Nexus CRM and JARVIS itself. Multi-tenant from day one, with Row Level Security so each client only sees their own data.</p>

<h3>Engram</h3>

<p>The most interesting piece of the stack. Engram is a persistent memory system I wrote in Go. It allows agents to remember decisions, context, and learnings between sessions. Without Engram, every time you start a session with an agent you have to explain everything from scratch.</p>

<p>With Engram, Neo knows you prefer TypeScript over JavaScript, that you use Tailwind 4 and not 3, that a client's color palette is such and such, and that there was an auth bug that was resolved in a certain way. That memory persists indefinitely.</p>

<h3>Vercel + Easypanel</h3>

<p>Frontend on Vercel (Next.js 15, deploy in seconds). Services on Easypanel on a Hetzner server: n8n, Engram, and custom microservices. Total monthly infrastructure cost: ~$35 USD.</p>

<h3>Claude Code + GitHub</h3>

<p>The development workflow uses Claude Code as the primary IDE. Changes go through GitHub, with automated CI/CD. Ghost reviews PRs before merge.</p>

<hr>

<h2>What I learned building it (real mistakes)</h2>

<p>Building this wasn't linear. Here are the most costly mistakes:</p>

<h3>Mistake 1: Wanting a single agent to do everything</h3>

<p>The first version of JARVIS was a single agent with a giant prompt. "You're a designer, developer, marketing strategist, salesperson, and accountant." The result was mediocre at everything and excellent at nothing. Specialization matters, even in AI.</p>

<h3>Mistake 2: Not separating context</h3>

<p>When agents share context, they contaminate each other. Neo starts opining about design. Trinity starts suggesting code architectures. The solution was isolated context per agent: each one only knows what it needs to know for its task.</p>

<h3>Mistake 3: Using the wrong model for each task</h3>

<p>At first I used Sonnet for everything, including mechanical tasks like documentation or formatting. The cost skyrocketed. The solution was <strong>Token Economics</strong>: Haiku for simple and mechanical tasks, Sonnet for medium complexity, Opus for architecture decisions. Cost dropped 60% without losing quality.</p>

<h3>Mistake 4: Not having persistent memory from the start</h3>

<p>For months I worked without Engram. Every session started from scratch. Agents repeated questions. They made inconsistent decisions with previous ones. Building Engram was the most valuable investment of the project: 3 weeks of development that completely changed the experience.</p>

<hr>

<h2>Want something like this for your business?</h2>

<p>JARVIS isn't a product you can buy. It's an architecture I designed specifically for my business, with my workflows and my clients.</p>

<p>But the principles are replicable. If you have a business that wants to scale its operational capacity without linearly scaling its human team, we can design something similar for you.</p>

<p>I'm not selling you a tool. I'll build you the system.</p>

<p><strong>Message me directly</strong> through the contact form or on Instagram at <strong>@MickaelDesigner</strong>. Tell me what your business does, where the bottlenecks are, and we'll talk about whether it makes sense.</p>`,
  },
  {
    slug: "stack-saas-ia-2026-en",
    title: "The stack I use to build SaaS with AI in 2026",
    excerpt:
      "Next.js 15, Supabase, Claude API, n8n self-hosted, and Engram. Each tool has a reason for being here — and the ones that don't, aren't.",
    category: "Stack",
    readTime: "7 min",
    date: "Jun 15, 2026",
    img: "/assets/images/blog/stack-saas-ia-2026.png",
    body: `<h2>A stack isn't a list of tools. It's an architecture decision.</h2>

<p>Every time someone asks me "what technology do you use to build X?", the honest answer is: it depends on what for. But in 2026, after building Nexus CRM, JARVIS, and several client projects, I have a default stack for any modern SaaS with AI components.</p>

<p>I didn't choose it from a "top tools 2026" list. I built it by elimination: what gave me problems got removed, what worked stayed. Here it is with the real reasons behind each choice.</p>

<hr>

<h2>Frontend: Next.js 15 + React 19 + Tailwind 4</h2>

<h3>Why Next.js 15 and not Vue or Svelte</h3>

<p>Vue is elegant. Svelte is fast. But the React ecosystem remains unbeatable for SaaS in 2026, and Next.js 15 has mature Server Components, a stable App Router, and the best Vercel support (which is also my deployment platform).</p>

<p>React 19 brought real performance improvements and async state management. With <code>use()</code> for promises and native Server Actions, the architecture pattern changed. You no longer need Redux for 90% of cases.</p>

<p>Tailwind 4 deserves a special mention: the new CSS-first engine is a paradigm shift. No more JavaScript config, the CSS file is the config, and tree-shaking is automatic. Build times were cut in half.</p>

<h3>What I don't use on the frontend</h3>

<p>I don't use Chakra UI, Material UI, or any heavy component library. For custom UI I prefer my own components built on Radix primitives. For animations, Framer Motion when I need something sophisticated, native CSS when I don't.</p>

<hr>

<h2>Backend: Supabase</h2>

<p>Supabase is the backend of the stack and I'll be direct: it's the decision that has saved me the most time in the last 2 years.</p>

<p>With Supabase you get:</p>

<ul>
  <li><strong>Managed PostgreSQL</strong> with automatic backups, replicas, and extensions (pgvector for embeddings, for example)</li>
  <li><strong>Complete auth</strong>: email, magic link, OAuth with Google/GitHub, JWTs, Row Level Security</li>
  <li><strong>Realtime</strong>: database change subscriptions via WebSockets, no extra configuration</li>
  <li><strong>Storage</strong>: S3-compatible, with access policies integrated with the auth system</li>
  <li><strong>Edge Functions</strong>: Deno-based for server logic that doesn't belong on the client</li>
</ul>

<p>For Nexus CRM, Supabase handles multi-tenancy via Row Level Security: each company has its isolated schema and can't access other companies' data. Implementing this from scratch in another system would have taken weeks.</p>

<h3>The pattern I use for multi-tenant</h3>

<pre><code>-- Basic RLS policy per organization
CREATE POLICY "org_isolation" ON contacts
  USING (org_id = auth.jwt() ->> 'org_id');</code></pre>

<p>Simple, scalable, and Supabase handles it transparently on every query.</p>

<hr>

<h2>AI: Claude API (Anthropic)</h2>

<h3>Why not OpenAI</h3>

<p>This is the question I get asked most. The short answer: Claude handles reasoning with long context better and is more consistent with structured outputs.</p>

<p>For a system like JARVIS where agents pass information between each other and need to maintain coherence across long conversations, that matters. GPT-4 has better benchmarks on specific coding tasks. Claude has better benchmarks on complex reasoning and multi-step instruction following.</p>

<p>Plus, Anthropic's prompt caching system is crucial for token economics: you can cache an agent's system prompt and only pay the difference per session. In a system with 11 agents that share a lot of base context, that reduces cost by up to 70%.</p>

<h3>Model assignment by role</h3>

<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Model</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Architecture, complex decisions</td>
      <td>Claude Opus</td>
      <td>Maximum reasoning</td>
    </tr>
    <tr>
      <td>Development, design, content</td>
      <td>Claude Sonnet</td>
      <td>Quality/cost balance</td>
    </tr>
    <tr>
      <td>Mechanical tasks, documentation</td>
      <td>Claude Haiku</td>
      <td>Speed and minimal cost</td>
    </tr>
  </tbody>
</table>

<p>The total cost of the system with 11 active agents is $80-150 USD/month. Less than an Adobe Creative Cloud subscription.</p>

<hr>

<h2>Automation: n8n self-hosted</h2>

<p>n8n is the glue piece of the stack. It connects everything with everything: when something happens in Supabase, n8n can trigger a JARVIS agent, send a WhatsApp message, update Notion, send an email, and log in the CRM — all in the same workflow.</p>

<h3>Why not Zapier or Make?</h3>

<p>Three reasons:</p>

<ol>
  <li><strong>Cost</strong>: Zapier at that workflow volume would cost $400-800/month. n8n self-hosted on my Hetzner server costs $8/month in infrastructure.</li>
  <li><strong>Control</strong>: When a workflow fails, I can debug the code. With Zapier you're hostage to their logging system.</li>
  <li><strong>Customization</strong>: n8n allows custom JavaScript code in any node. For rare integrations or complex logic, that's invaluable.</li>
</ol>

<p>I run it via Easypanel on a Hetzner VPS (CX21, €3.79/month). Stable for 14 months with no significant downtime.</p>

<hr>

<h2>Deploy: Vercel + Easypanel</h2>

<p>The frontend of any Next.js project goes to Vercel. There's no alternative that comes close in terms of DX (Developer Experience): push to main, automatic deploy in 45 seconds, preview URLs for every PR, integrated analytics.</p>

<p>For services that don't go on Vercel (n8n, custom APIs, Engram, microservices), I use Easypanel on Hetzner. Easypanel is basically a Docker control panel that makes deploying a service as simple as pasting a repository URL.</p>

<p>Total monthly infrastructure cost for a SaaS in production with moderate traffic: <strong>~$35-50 USD</strong>.</p>

<hr>

<h2>Memory: Engram</h2>

<p>Engram is the most custom component of the stack. I wrote it in Go and it's a persistent memory system for AI agents. It allows agents to remember decisions, context, and learnings between sessions.</p>

<p>The problem it solves: by default, every conversation with an AI model starts from scratch. For a production agent system, that's a huge problem. Engram acts as the team's long-term memory.</p>

<p>Technically it's an HTTP server that exposes an observations (memories) API with semantic and keyword search. Agents can save and retrieve context using MCP (Model Context Protocol).</p>

<hr>

<h2>CI/CD and Management: Claude Code + GitHub</h2>

<p>Claude Code as an IDE is the newest bet in the stack and I can no longer work without it. It's not just autocomplete: it's an agent that understands the full project context, can refactor multiple files, run commands, read errors and fix them.</p>

<p>The flow is simple: I work on a branch, Claude Code helps with development, when it's ready I create a PR on GitHub, Ghost (the security agent) reviews the code, and if it passes the automated CI, merge to main and Vercel deploys in minutes.</p>

<hr>

<h2>The complete stack in a table</h2>

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Tool</th>
      <th>Approx. Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>Next.js 15 + Vercel</td>
      <td>$0-20/mo (free tier)</td>
    </tr>
    <tr>
      <td>Database</td>
      <td>Supabase</td>
      <td>$0-25/mo</td>
    </tr>
    <tr>
      <td>AI</td>
      <td>Claude API</td>
      <td>$80-150/mo</td>
    </tr>
    <tr>
      <td>Automation</td>
      <td>n8n self-hosted</td>
      <td>~$4/mo (infra)</td>
    </tr>
    <tr>
      <td>Services</td>
      <td>Easypanel + Hetzner</td>
      <td>~$8-15/mo</td>
    </tr>
    <tr>
      <td>Repository</td>
      <td>GitHub</td>
      <td>$0-4/mo</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td></td>
      <td><strong>~$120-220/mo</strong></td>
    </tr>
  </tbody>
</table>

<p>For less than $220/month you get a production stack that competes with companies spending 10x more. That's the technical founder's advantage in 2026.</p>

<hr>

<h2>Want to implement this stack in your project?</h2>

<p>If you're building a SaaS and want to implement this stack from the start (without learning from the mistakes I already made), I can help you.</p>

<p>From the initial setup to the complete architecture of an AI agent system integrated into your product. Message me on Instagram <strong>@MickaelDesigner</strong> or through the contact form at <strong>mickaelvasquez.tech</strong>.</p>`,
  },
  {
    slug: "orquestador-vs-ejecutor-agentes-ia-en",
    title: "Why I separated my agency into orchestrator + executors (and how it changes the game)",
    excerpt:
      "JARVIS never writes a single line of code. It only delegates. Understanding the difference between orchestrating and executing is what makes an AI agent system truly scale.",
    category: "IA Agents",
    readTime: "6 min",
    date: "Jun 12, 2026",
    img: "/assets/images/blog/orquestador-vs-ejecutor-agentes-ia.png",
    body: `<h2>The mistake everyone makes when starting with AI agents</h2>

<p>When you discover you can give complex instructions to an AI model, the natural temptation is to build one agent that does everything. "You're my assistant. Design, develop, answer emails, handle accounting, manage social media."</p>

<p>The problem isn't the ambition. The problem is that approach doesn't scale. And the reason is technical: an agent that does everything needs to load all the context of everything. Every design decision, every line of code, every conversation with every client, every number on every invoice. Context explodes, quality drops, and you end up with an agent that's mediocre at everything.</p>

<p>The solution is a pattern we've used in business management for decades, but were slow to apply to AI systems: <strong>separate who decides from who executes</strong>.</p>

<hr>

<h2>The analogy that explains it all: the CEO and their team</h2>

<p>A company's CEO doesn't write code, doesn't design graphics, doesn't handle customer support chat. The CEO defines direction, allocates resources, makes high-level decisions, and coordinates so the right specialists are working on the right things.</p>

<p>If the CEO started doing technical work directly, two important things would stop happening: first, the technical work would be mediocre (because the CEO isn't the expert). Second, strategic coordination would be lost (because the CEO would be too deep in the details).</p>

<p>JARVIS works exactly the same way. JARVIS is the CEO of the system. It never writes a line of code. Never generates an image. Never drafts a post. JARVIS decides:</p>

<ul>
  <li>Which agent is best suited for this task?</li>
  <li>What context does that agent need to work well?</li>
  <li>How many tokens can it spend (token economics)?</li>
  <li>In what order should tasks execute when there are dependencies?</li>
  <li>How are the results from multiple agents synthesized?</li>
</ul>

<p>Everything else is done by the executors: Trinity for design, Neo for development, Morpheus for content, and so on with each of the 11 agents on the team.</p>

<hr>

<h2>Why isolated context is the system's superpower</h2>

<p>Here's the technical part that makes the most difference in practice.</p>

<p>When Neo is building a React component, it doesn't need to know anything about the branding brief Trinity is processing. It doesn't need to know the status of Niobe's sales pipeline. It doesn't need to read Oracle's latest financial metrics.</p>

<p>Each agent receives exactly the context it needs for its task and nothing more. This has three direct consequences:</p>

<h3>1. Higher quality</h3>

<p>An agent with clean, specific context produces better outputs than a generalist agent with saturated context. It's the same principle that makes a specialist better than a generalist at complex technical tasks.</p>

<h3>2. Lower cost</h3>

<p>AI models charge per input and output token. An agent that loads all of the company's context on every call consumes 10x more tokens than one that loads only what it needs. With 11 active agents, that difference becomes hundreds of dollars per month.</p>

<h3>3. Contained errors</h3>

<p>If Neo makes a mistake in a component, that error doesn't contaminate Trinity's work or Morpheus's work. Each agent is an independent system. Failures are local, not systemic.</p>

<blockquote>
  <p>Isolated context isn't a limitation of the system. It's a design feature. An agent that knows everything isn't smarter — it's harder to control.</p>
</blockquote>

<hr>

<h2>The communication protocol between agents</h2>

<p>If agents have isolated context, how do they pass information between each other? That's the right question, and the answer is the communication protocol defined by the orchestrator.</p>

<p>When JARVIS delegates a task to Neo, it doesn't say "look at everything that happened in the project." It tells it exactly what it needs:</p>

<ul>
  <li>The specific objective of the task</li>
  <li>Relevant context (only what's necessary)</li>
  <li>Constraints (tech stack, patterns, conventions)</li>
  <li>The expected output format</li>
</ul>

<p>When Neo finishes, it returns the result to JARVIS, which synthesizes it and decides what happens next: pass it to Ghost for auditing? Pass it to Seraph for documentation? Publish directly to production?</p>

<p>This protocol has a name in the SDD (Spec-Driven Development) world that I use in my projects: the <strong>result contract</strong>. Each agent knows it has to return its result in a specific format that the orchestrator can process. Without that, the system doesn't scale.</p>

<hr>

<h2>The concrete advantages I noticed in production</h2>

<p>After more than a year working with this system, the advantages I feel most in day-to-day work are these:</p>

<h3>Real task parallelization</h3>

<p>JARVIS can launch Trinity and Neo at the same time on the same project. Trinity works on visual assets while Neo builds frontend components. They don't bother each other. They don't contradict each other. At the end, JARVIS integrates both outputs.</p>

<h3>Specialization that shows in quality</h3>

<p>Neo's code is better than a generalist agent's because Neo only does code. Morpheus's copy is better because Morpheus only does content. The specialization that applies in human teams applies equally in agent teams.</p>

<h3>Scalability without linear complexity</h3>

<p>If tomorrow I need a new type of task (say, advanced data analysis), I add a new specialized agent without touching the other 11. The orchestrator learns to include it in relevant workflows. Complexity grows modularly, not exponentially.</p>

<h3>Localized debugging</h3>

<p>When something goes wrong, I know exactly where to look. If the design output isn't what I expected, it's a Trinity problem. If the code has a bug, it's a Neo problem. I don't have to guess in a monolithic system which of 50 responsibilities of the "single agent" failed.</p>

<hr>

<h2>When this pattern does NOT apply</h2>

<p>Not everything needs an orchestrator. If you have a simple, single task, a direct agent is more efficient. The orchestrator overhead (the decision and coordination layer) adds latency and cost that isn't worth it for atomic tasks.</p>

<p>The orchestrator + executors pattern applies when:</p>

<ul>
  <li>The task has multiple steps with dependencies</li>
  <li>Sub-tasks can be executed in parallel</li>
  <li>Different types of expertise are needed on the same project</li>
  <li>The work volume justifies the architectural investment</li>
</ul>

<p>For a small one-week project, you probably don't need it. For a business that wants to scale operations without linearly scaling its human team, it's the way to go.</p>

<hr>

<h2>Want us to design the system for your business?</h2>

<p>Every business has its own bottlenecks and its own workflows. The system I built for my agency isn't the same one I'd build for an e-commerce company, a fintech, or a law firm.</p>

<p>If you want to explore how to apply this pattern to your operation, let's start with a conversation. No smoke selling: if it makes sense for your case, we'll build it. If not, I'll tell you straight.</p>

<p>Message me at <strong>@MickaelDesigner</strong> on Instagram or through the form at <strong>mickaelvasquez.tech</strong>.</p>`,
  },
];

export const CATEGORIES = ["All", "IA Agents", "Automatización", "Stack", "AI Systems", "Brand", "Type", "Motion", "Engineering"];
