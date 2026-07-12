# SPECS.md - Prototipo Panel Admin AgentHub

## 1) Descripcion breve del producto

AgentHub es una plataforma SaaS donde empresas pueden alquilar agentes de IA preconfigurados y equiparlos con skills para ejecutar tareas de negocio.

El usuario objetivo de este panel es el administrador interno de AgentHub (operaciones/producto/soporte), que necesita:
- monitorear uso y estado de agentes,
- configurar capacidades y despliegues,
- gestionar cuentas de clientes y permisos,
- revisar rapidamente indicadores operativos sin depender del backend en esta fase.

## 2) Stack tecnologico y restricciones

- Prototipo construido en HTML5 semantico.
- Estilos con Tailwind CSS cargado por CDN (sin build step).
- Interactividad implementada solo con JavaScript vanilla (sin React, Vue, Angular, jQuery u otros frameworks).
- Sin integracion de backend: todos los datos deben ser hardcodeados o simulados en frontend.
- Sin persistencia real: cualquier cambio de estado UI (filtros, toggles, modales) es temporal en memoria de la pagina.
- Debe ser responsive para desktop y mobile, priorizando uso en desktop para equipo interno.

## 3) Especificaciones por seccion (6 vistas)

### 3.1 Dashboard

1. **Grid de metricas**: mostrar 4 tarjetas de metricas en una grilla responsive (2x2 en desktop, 1 columna en mobile), cada tarjeta con icono, etiqueta, valor hardcodeado y microtexto de variacion semanal.
2. **Jerarquia visual de estado**: cada tarjeta usa un color de acento diferente por categoria (agentes activos, tareas ejecutadas, errores, clientes activos), con borde suave y sombra ligera para separacion visual.
3. **Actividad semanal placeholder**: debajo de las metricas, incluir un bloque de ancho completo con borde discontinuo, altura minima fija y etiqueta centrada "Grafico de actividad semanal (placeholder)".
4. **Feed de eventos recientes**: al costado o debajo (segun breakpoint), mostrar lista de 5 eventos hardcodeados con timestamp relativo y badge de tipo de evento.

### 3.2 Catalogo de Agentes

1. **Tabla/lista principal**: renderizar listado de agentes con columnas minimas: nombre, tipo, skills asociadas (contador), estado (badge), ultima actualizacion y acciones.
2. **Controles de filtrado**: incluir buscador por texto y dos filtros select (estado y tipo), aplicados en cliente sobre el dataset hardcodeado.
3. **Dropdown de acciones por fila**: cada agente tiene menu de acciones (Ver, Editar, Duplicar, Desactivar) que se abre/cierra al click y se cierra al click fuera.
4. **Paginacion visual**: mostrar controles de paginacion simulados (Anterior, paginas, Siguiente) con estado activo claro; no requiere data real de backend.

### 3.3 Detalle de Agente

1. **Header de contexto**: mostrar nombre del agente, descripcion corta, badge de estado y botones primarios "Editar" y "Desplegar".
2. **Bloques de configuracion**: dividir la vista en tarjetas para "Prompt base", "Objetivo", "Canales habilitados" y "Limites operativos", con contenido hardcodeado editable solo a nivel visual.
3. **Lista de skills colapsable**: mostrar skills agrupadas por categoria; cada grupo se expande/contrae con animacion simple y un indicador de flecha rotando.
4. **Historial de cambios**: incluir timeline simplificada con al menos 4 entradas hardcodeadas (fecha, actor, accion).

### 3.4 Biblioteca de Skills

1. **Galeria de skills**: mostrar tarjetas de skills con nombre, descripcion corta, categoria, badge de disponibilidad y metrica de uso mensual hardcodeada.
2. **Panel de filtros**: incluir filtros por categoria y compatibilidad (checkboxes/tags) que actualizan las tarjetas visibles en cliente.
3. **Accion de equipar skill**: boton "Equipar" por tarjeta que abre un modal para seleccionar agente destino; modal incluye select, botones Cancelar/Confirmar y overlay.
4. **Estados visuales claros**: skills "No disponible" deben verse atenuadas y su boton deshabilitado con tooltip explicativo.

### 3.5 Despliegues y Tareas

1. **Listado de despliegues**: tabla con id, agente, cliente, fecha de despliegue, estado de ejecucion y SLA (hardcodeado).
2. **Indicador de estado operacional**: estado mostrado con badges consistentes (Running, Paused, Failed, Scheduled) y color semantico.
3. **Acciones rapidas con confirmacion**: botones "Pausar" y "Reanudar" por fila; "Pausar" exige modal de confirmacion antes de cambiar estado visual.
4. **Vista de cola de tareas**: bloque secundario con lista de tareas en cola y barra de progreso simulada por tarea.

### 3.6 Clientes y Usuarios

1. **Tabla de cuentas**: listar empresas cliente con plan, cantidad de agentes activos, usuario administrador principal y estado de suscripcion.
2. **Gestion de miembros**: al seleccionar una cuenta, mostrar sublista de usuarios internos con rol (Owner/Admin/Viewer) y ultimo acceso.
3. **Invitacion de usuario**: boton "Invitar usuario" abre modal con campos email y rol, validacion visual basica de email y botones de accion.
4. **Control de permisos**: toggles por modulo (Dashboard, Agentes, Skills, Billing) para el usuario seleccionado, solo con comportamiento visual local.

## 4) Inventario de componentes reutilizables de UI

- **Sidebar de navegacion**: logo, secciones, item activo y colapso en mobile.
- **Tarjeta de metrica**: icono, etiqueta, valor, variacion, color de acento.
- **Dropdown de acciones**: menu contextual anclado a boton, cierre por click externo o Escape.
- **Modal base**: overlay, contenedor centrado, titulo, cuerpo, footer con acciones.
- **Badge de estado**: variaciones de color y texto para estados operativos/comerciales.
- **Lista de skills colapsable**: grupos expandibles con indicador visual de estado.
- **Toggle de modo oscuro**: switch global que cambia tema visual del panel.
- **Tabla responsive**: encabezados, filas, estados vacios y scroll horizontal en mobile.
- **Campo de busqueda/filtros**: input con icono y controles select/checkbox reutilizables.

## 5) Criterios de aceptacion

1. El prototipo incluye exactamente las 6 vistas definidas: Dashboard, Catalogo de Agentes, Detalle de Agente, Biblioteca de Skills, Despliegues y Tareas, Clientes y Usuarios.
2. Cada vista implementa al menos 3 requisitos visuales o interactivos descritos en esta especificacion.
3. El layout responde correctamente en mobile y desktop sin solapamientos criticos ni perdida de informacion principal.
4. El dropdown de acciones se abre con click en su trigger y se cierra al hacer click fuera o presionar Escape.
5. Los modales se abren desde sus acciones gatillo, muestran overlay visible y pueden cerrarse con boton Cancelar o icono de cierre.
6. La lista de skills colapsable permite expandir y contraer grupos mostrando cambio visual de estado (contenido + indicador).
7. El toggle de modo oscuro aplica y revierte una variacion de tema global visible en toda la interfaz.
8. Los badges de estado mantienen semantica de color y texto consistente en todas las secciones.
9. Todos los datos mostrados en metricas, tablas y listas son hardcodeados o simulados (sin llamadas de red a backend).
10. Toda interaccion implementada usa JavaScript vanilla y estilos con Tailwind via CDN, sin frameworks adicionales.