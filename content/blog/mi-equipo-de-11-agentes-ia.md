---
slug: mi-equipo-de-11-agentes-ia
title: "Cómo construí un equipo de 11 agentes IA que trabajan mientras duermo"
excerpt: "Soy una agencia de 1 persona. Diseño, desarrollo, automatizo y hago marketing. Acá te cuento cómo construí JARVIS, un orquestador de 11 agentes IA especializados que escala mi capacidad sin contratar."
category: IA Agents
readTime: 12 min
date: 2026-06-18
published: true
seoKeywords: agentes ia, multi-agent ia, claude agentes, automatización con ia, ia para agencias
---

BODY_HTML:

<h2>El cuello de botella se llama vos</h2>

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

<p><strong>Modelo</strong>: Claude Sonnet | <strong>Stack</strong>: Prompts estructurados para Midjourney + lógica de brand</p>

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

<p>Morpheus (sí, el que está escribiendo esto) se encarga de la estrategia de contenido, posts de blog, copy de landings, scripts de video y posicionamiento. Trabaja con keywords reales, estructura SEO, y la voz de marca de cada proyecto.</p>

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

<p><strong>Escribime directo</strong> desde el formulario de contacto o por Instagram <strong>@MickaelDesigner</strong>. Contame qué hace tu empresa, dónde están los cuellos de botella, y conversamos si tiene sentido.</p>
