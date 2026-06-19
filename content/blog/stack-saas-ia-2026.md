---
slug: stack-saas-ia-2026
title: "El stack que uso para construir SaaS con IA en 2026"
excerpt: "Next.js 15, Supabase, Claude API, n8n self-hosted y Engram. Cada herramienta tiene una razón de estar acá — y las que no la tienen, no están."
category: Stack
readTime: 7 min
date: 2026-06-18
published: true
seoKeywords: stack saas 2026, nextjs 15 saas, supabase saas, claude api desarrollo, n8n automatización
---

BODY_HTML:

<h2>Un stack no es una lista de tools. Es una decisión de arquitectura.</h2>

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
  USING (org_id = auth.jwt() ->> 'org_id');
</code></pre>

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

<p>Desde el setup inicial hasta la arquitectura completa de un sistema de agentes IA integrado a tu producto. Escribime por Instagram <strong>@MickaelDesigner</strong> o desde el formulario de contacto en <strong>mickaelvasquez.tech</strong>.</p>
