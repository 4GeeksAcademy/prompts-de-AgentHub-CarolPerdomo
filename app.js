const state = {
  currentView: "dashboard",
  isDark: false,
  mobileMenuOpen: false,
  agentFilters: {
    search: "",
    status: "all",
    type: "all",
  },
  skillFilters: {
    categories: new Set(),
    compatibility: new Set(),
  },
  selectedClientId: "CL-001",
  selectedMemberId: "usr-001",
  openDropdownId: null,
  openSkillGroups: new Set(["Core Ops"]),
  modal: null,
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "◉" },
  { id: "agents", label: "Catalogo de Agentes", icon: "◎" },
  { id: "agent-detail", label: "Detalle de Agente", icon: "◌" },
  { id: "skills", label: "Biblioteca de Skills", icon: "◈" },
  { id: "deployments", label: "Despliegues y Tareas", icon: "◍" },
  { id: "clients", label: "Clientes y Usuarios", icon: "◐" },
];

const metrics = [
  { label: "Agentes activos", value: "128", delta: "+12% semanal", accent: "var(--primary)", icon: "AI" },
  { label: "Tareas ejecutadas", value: "42.8k", delta: "+18% semanal", accent: "var(--secondary)", icon: "TK" },
  { label: "Errores criticos", value: "09", delta: "-22% semanal", accent: "var(--danger)", icon: "ER" },
  { label: "Clientes activos", value: "37", delta: "+3 altas netas", accent: "var(--accent)", icon: "CL" },
];

const recentEvents = [
  { type: "Deploy", text: "Ops Planner desplegado para Nova Retail", time: "hace 12 min" },
  { type: "Skill", text: "Se equiparo Compliance Watcher en Finance Sentinel", time: "hace 31 min" },
  { type: "Incident", text: "Error recuperado en flujo de Email Classifier", time: "hace 54 min" },
  { type: "Client", text: "Orbital Health cambio a plan Enterprise", time: "hace 1 h" },
  { type: "Access", text: "Nuevo owner invitado para Aster Labs", time: "hace 2 h" },
];

const agents = [
  { id: "agt-001", name: "Support Triage", type: "Support", skills: 6, status: "Active", updated: "Hace 2 h" },
  { id: "agt-002", name: "Finance Sentinel", type: "Finance", skills: 9, status: "Active", updated: "Hace 4 h" },
  { id: "agt-003", name: "Sales Qualifier", type: "Revenue", skills: 5, status: "Draft", updated: "Ayer" },
  { id: "agt-004", name: "Ops Planner", type: "Operations", skills: 8, status: "Paused", updated: "Hace 35 min" },
  { id: "agt-005", name: "Legal Intake", type: "Compliance", skills: 4, status: "Inactive", updated: "Hace 3 dias" },
  { id: "agt-006", name: "People Assistant", type: "HR", skills: 7, status: "Active", updated: "Hoy" },
];

const agentDetail = {
  name: "Finance Sentinel",
  description: "Monitorea tickets financieros, valida politicas y activa rutas de aprobacion.",
  status: "Active",
  prompt: "Analiza solicitudes de gasto, clasifica riesgo y prepara respuesta operativa con contexto contable.",
  objective: "Reducir tiempo de triage financiero y elevar consistencia en aprobaciones.",
  channels: ["Slack", "Email", "Portal interno"],
  limits: ["120 tareas concurrentes", "timeout de 18 s", "SLA 99.2%"],
  skillGroups: [
    {
      group: "Core Ops",
      skills: ["Intent Router", "Policy Evaluator", "Escalation Bridge"],
    },
    {
      group: "Knowledge",
      skills: ["Ledger Retriever", "Expense Matcher", "Vendor Lookup"],
    },
    {
      group: "Execution",
      skills: ["ERP Action Runner", "Approval Notifier"],
    },
  ],
  timeline: [
    { date: "12 Jul", actor: "Mariana", action: "Ajusto limites operativos" },
    { date: "11 Jul", actor: "System", action: "Despliegue exitoso v2.8" },
    { date: "09 Jul", actor: "Pedro", action: "Equipo skill Expense Matcher" },
    { date: "07 Jul", actor: "Valentina", action: "Actualizo prompt base" },
  ],
};

const skills = [
  {
    id: "sk-01",
    name: "Intent Router",
    description: "Clasifica solicitudes entrantes y define camino operativo.",
    category: "Routing",
    availability: "Disponible",
    monthlyUsage: "18.2k",
    compatibility: ["Slack", "Email"],
  },
  {
    id: "sk-02",
    name: "Compliance Watcher",
    description: "Valida reglas internas y marca desalineaciones regulatorias.",
    category: "Compliance",
    availability: "Disponible",
    monthlyUsage: "9.7k",
    compatibility: ["Portal", "Email"],
  },
  {
    id: "sk-03",
    name: "Voice Summary",
    description: "Resume llamadas y emite minuta accionable.",
    category: "Productivity",
    availability: "No disponible",
    monthlyUsage: "3.4k",
    compatibility: ["Voice"],
  },
  {
    id: "sk-04",
    name: "ERP Action Runner",
    description: "Ejecuta acciones controladas sobre sistemas de backoffice.",
    category: "Execution",
    availability: "Disponible",
    monthlyUsage: "12.1k",
    compatibility: ["Portal", "Slack"],
  },
  {
    id: "sk-05",
    name: "Vendor Lookup",
    description: "Consulta catalogos de proveedor y anexa metadata comercial.",
    category: "Knowledge",
    availability: "Disponible",
    monthlyUsage: "6.8k",
    compatibility: ["Portal"],
  },
  {
    id: "sk-06",
    name: "Escalation Bridge",
    description: "Coordina handoff humano con contexto y prioridad.",
    category: "Routing",
    availability: "Disponible",
    monthlyUsage: "15.6k",
    compatibility: ["Slack", "Voice"],
  },
];

const deployments = [
  { id: "dep-2201", agent: "Support Triage", client: "Nova Retail", date: "12 Jul 08:00", status: "Running", sla: "99.7%" },
  { id: "dep-2202", agent: "Finance Sentinel", client: "Orbital Health", date: "12 Jul 08:20", status: "Running", sla: "99.2%" },
  { id: "dep-2203", agent: "Ops Planner", client: "Aster Labs", date: "11 Jul 19:30", status: "Paused", sla: "97.9%" },
  { id: "dep-2204", agent: "Legal Intake", client: "Boreal Legal", date: "11 Jul 16:15", status: "Failed", sla: "95.4%" },
  { id: "dep-2205", agent: "Sales Qualifier", client: "Avenue Growth", date: "13 Jul 09:30", status: "Scheduled", sla: "--" },
];

const taskQueue = [
  { id: "task-871", name: "Sync de inventario de skills", progress: 82 },
  { id: "task-872", name: "Reintento de indexacion documental", progress: 56 },
  { id: "task-873", name: "Provision de sandbox para cliente nuevo", progress: 34 },
  { id: "task-874", name: "Validacion de permisos cross-workspace", progress: 67 },
];

const clients = [
  {
    id: "CL-001",
    company: "Nova Retail",
    plan: "Enterprise",
    activeAgents: 14,
    admin: "Sofia Nuñez",
    subscription: "Activa",
    members: [
      {
        id: "usr-001",
        name: "Sofia Nuñez",
        email: "sofia@novaretail.com",
        role: "Owner",
        access: "Hace 12 min",
        permissions: { Dashboard: true, Agentes: true, Skills: true, Billing: true },
      },
      {
        id: "usr-002",
        name: "Diego Parra",
        email: "diego@novaretail.com",
        role: "Admin",
        access: "Hace 2 h",
        permissions: { Dashboard: true, Agentes: true, Skills: false, Billing: false },
      },
      {
        id: "usr-003",
        name: "Laura Gil",
        email: "laura@novaretail.com",
        role: "Viewer",
        access: "Ayer",
        permissions: { Dashboard: true, Agentes: false, Skills: false, Billing: false },
      },
    ],
  },
  {
    id: "CL-002",
    company: "Orbital Health",
    plan: "Scale",
    activeAgents: 8,
    admin: "Matias Correa",
    subscription: "Activa",
    members: [
      {
        id: "usr-101",
        name: "Matias Correa",
        email: "matias@orbital.health",
        role: "Owner",
        access: "Hace 25 min",
        permissions: { Dashboard: true, Agentes: true, Skills: true, Billing: true },
      },
      {
        id: "usr-102",
        name: "Paula Reyes",
        email: "paula@orbital.health",
        role: "Admin",
        access: "Hoy",
        permissions: { Dashboard: true, Agentes: true, Skills: true, Billing: false },
      },
    ],
  },
  {
    id: "CL-003",
    company: "Aster Labs",
    plan: "Starter",
    activeAgents: 3,
    admin: "Camilo Rojas",
    subscription: "En riesgo",
    members: [
      {
        id: "usr-201",
        name: "Camilo Rojas",
        email: "camilo@asterlabs.io",
        role: "Owner",
        access: "Hace 1 d",
        permissions: { Dashboard: true, Agentes: true, Skills: false, Billing: true },
      },
    ],
  },
];

const viewTitles = {
  dashboard: "Dashboard",
  agents: "Catalogo de Agentes",
  "agent-detail": "Detalle de Agente",
  skills: "Biblioteca de Skills",
  deployments: "Despliegues y Tareas",
  clients: "Clientes y Usuarios",
};

const statusMap = {
  Active: "background: rgba(0, 209, 102, 0.18); color: var(--primary);",
  Draft: "background: rgba(255, 156, 69, 0.18); color: var(--accent);",
  Paused: "background: rgba(255, 190, 122, 0.18); color: #8a4b0f;",
  Inactive: "background: rgba(93, 112, 136, 0.16); color: var(--text-muted);",
  Running: "background: rgba(0, 209, 102, 0.18); color: var(--primary);",
  Failed: "background: rgba(209, 67, 67, 0.18); color: var(--danger);",
  Scheduled: "background: rgba(18, 104, 214, 0.16); color: var(--secondary);",
  Disponible: "background: rgba(0, 209, 102, 0.18); color: var(--primary);",
  "No disponible": "background: rgba(93, 112, 136, 0.16); color: var(--text-muted);",
  Activa: "background: rgba(0, 209, 102, 0.18); color: var(--primary);",
  "En riesgo": "background: rgba(255, 156, 69, 0.18); color: var(--accent);",
};

const app = {
  navList: document.querySelector("#nav-list"),
  viewTitle: document.querySelector("#view-title"),
  viewPanels: Array.from(document.querySelectorAll(".view-panel")),
  modalRoot: document.querySelector("#modal-root"),
  mobileMenuToggle: document.querySelector("#mobile-menu-toggle"),
  sidebarNav: document.querySelector("#sidebar-nav"),
  themeToggles: Array.from(document.querySelectorAll("#theme-toggle-desktop, #theme-toggle-mobile")),
};

function initialize() {
  renderNav();
  renderAllViews();
  bindGlobalEvents();
  syncThemeButtons();
}

function renderNav() {
  app.navList.innerHTML = navItems
    .map(
      (item) => `
        <li>
          <button class="nav-item w-full text-left ${state.currentView === item.id ? "is-active" : ""}" data-view-target="${item.id}" type="button">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--surface-elevated)] shadow-[0_12px_28px_rgba(11,28,48,0.05)]">${item.icon}</span>
            <span>
              <span class="block font-medium">${item.label}</span>
              <span class="block text-xs text-[var(--text-muted)]">Vista interna</span>
            </span>
          </button>
        </li>
      `,
    )
    .join("");
}

function renderAllViews() {
  setActiveView(state.currentView);
  renderDashboard();
  renderAgents();
  renderAgentDetail();
  renderSkills();
  renderDeployments();
  renderClients();
  renderModal();
}

function setActiveView(viewId) {
  state.currentView = viewId;
  app.viewTitle.textContent = viewTitles[viewId];
  app.viewPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== `view-${viewId}`);
  });
  renderNav();
  if (window.innerWidth < 1024) {
    state.mobileMenuOpen = false;
    app.sidebarNav.classList.remove("is-open");
  }
}

function renderDashboard() {
  const panel = document.querySelector("#view-dashboard");
  panel.innerHTML = `
    <div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="grid gap-4 sm:grid-cols-2">
        ${metrics
          .map(
            (metric) => `
              <article class="metric-card surface-card rounded-[28px] p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm text-[var(--text-muted)]">${metric.label}</p>
                    <h3 class="font-space mt-4 text-4xl font-bold text-[var(--text)]">${metric.value}</h3>
                    <p class="mt-3 text-sm font-medium" style="color:${metric.accent}">${metric.delta}</p>
                  </div>
                  <div class="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--surface-elevated)] font-space text-sm font-bold shadow-[0_16px_36px_rgba(11,28,48,0.05)]" style="color:${metric.accent}">
                    ${metric.icon}
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
        <article class="section-card rounded-[30px] p-6 sm:col-span-2" style="background: linear-gradient(135deg, rgba(0, 109, 50, 0.08), rgba(18, 104, 214, 0.08));">
          <div class="flex min-h-[220px] items-center justify-center rounded-[26px] bg-[var(--surface-panel)] px-6 text-center soft-ring" style="border-style: dashed; border-width: 0; box-shadow: inset 0 0 0 2px rgba(18, 104, 214, 0.16);">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">Actividad</p>
              <h4 class="font-space mt-3 text-2xl font-bold text-[var(--text)]">Grafico de actividad semanal (placeholder)</h4>
            </div>
          </div>
        </article>
      </div>
      <aside class="section-card rounded-[30px] surface-elevated p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Eventos recientes</p>
            <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Pulso operativo</h3>
          </div>
          <div class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-sm text-[var(--text-muted)]">5 items</div>
        </div>
        <div class="mt-6 space-y-4">
          ${recentEvents
            .map(
              (event) => `
                <article class="rounded-[24px] bg-[var(--surface-low)] p-4">
                  <div class="flex items-center justify-between gap-3">
                    <span class="status-badge" style="${event.type === "Incident" ? statusMap.Failed : statusMap.Running}">${event.type}</span>
                    <span class="text-sm text-[var(--text-muted)]">${event.time}</span>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-[var(--text)]">${event.text}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </aside>
    </div>
  `;
}

function filteredAgents() {
  return agents.filter((agent) => {
    const matchesSearch = [agent.name, agent.type].join(" ").toLowerCase().includes(state.agentFilters.search.toLowerCase());
    const matchesStatus = state.agentFilters.status === "all" || agent.status === state.agentFilters.status;
    const matchesType = state.agentFilters.type === "all" || agent.type === state.agentFilters.type;
    return matchesSearch && matchesStatus && matchesType;
  });
}

function renderAgents() {
  const panel = document.querySelector("#view-agents");
  const visibleAgents = filteredAgents();
  const typeOptions = [...new Set(agents.map((agent) => agent.type))];
  panel.innerHTML = `
    <article class="section-card rounded-[30px] surface-elevated p-5 lg:p-6">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Catalogo vivo</p>
          <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Agentes configurables</h3>
        </div>
        <div class="grid gap-3 md:grid-cols-3 xl:min-w-[720px]">
          <input id="agent-search" class="ghost-input" type="search" placeholder="Buscar agente o tipo" value="${state.agentFilters.search}" />
          <select id="agent-status-filter" class="ghost-select">
            ${["all", "Active", "Draft", "Paused", "Inactive"]
              .map((option) => `<option value="${option}" ${state.agentFilters.status === option ? "selected" : ""}>${option === "all" ? "Todos los estados" : option}</option>`)
              .join("")}
          </select>
          <select id="agent-type-filter" class="ghost-select">
            <option value="all">Todos los tipos</option>
            ${typeOptions.map((type) => `<option value="${type}" ${state.agentFilters.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="table-shell mt-6 overflow-x-auto rounded-[28px] surface-card p-3">
        <table class="min-w-full text-left text-sm">
          <thead class="text-[var(--text-muted)]">
            <tr>
              <th class="px-4 py-3 font-medium">Nombre</th>
              <th class="px-4 py-3 font-medium">Tipo</th>
              <th class="px-4 py-3 font-medium">Skills</th>
              <th class="px-4 py-3 font-medium">Estado</th>
              <th class="px-4 py-3 font-medium">Ultima actualizacion</th>
              <th class="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${visibleAgents
              .map(
                (agent) => `
                  <tr>
                    <td class="px-4 py-4">
                      <div class="rounded-[22px] bg-[var(--surface-elevated)] px-4 py-3">
                        <p class="font-medium text-[var(--text)]">${agent.name}</p>
                        <p class="text-xs text-[var(--text-muted)]">${agent.id}</p>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-[var(--text)]">${agent.type}</td>
                    <td class="px-4 py-4 text-[var(--text)]">${agent.skills}</td>
                    <td class="px-4 py-4"><span class="status-badge" style="${statusMap[agent.status]}">${agent.status}</span></td>
                    <td class="px-4 py-4 text-[var(--text-muted)]">${agent.updated}</td>
                    <td class="relative px-4 py-4 text-right">
                      <button class="rounded-full bg-[var(--surface-elevated)] px-4 py-2 text-sm font-medium text-[var(--text)] shadow-[0_14px_34px_rgba(11,28,48,0.05)]" type="button" data-dropdown-trigger="${agent.id}">
                        Acciones
                      </button>
                      ${state.openDropdownId === agent.id ? renderActionMenu(agent.id) : ""}
                    </td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-sm text-[var(--text)]" type="button">Anterior</button>
        <div class="flex items-center gap-2">
          ${[1, 2, 3]
            .map(
              (page) => `
                <button class="rounded-full px-4 py-2 text-sm ${page === 1 ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-low)] text-[var(--text)]"}" type="button">
                  ${page}
                </button>
              `,
            )
            .join("")}
        </div>
        <button class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-sm text-[var(--text)]" type="button">Siguiente</button>
      </div>
    </article>
  `;
}

function renderActionMenu(agentId) {
  return `
    <div class="action-menu" data-dropdown-menu="${agentId}">
      <button type="button" data-nav-jump="agent-detail">Ver</button>
      <button type="button">Editar</button>
      <button type="button">Duplicar</button>
      <button type="button">Desactivar</button>
    </div>
  `;
}

function renderAgentDetail() {
  const panel = document.querySelector("#view-agent-detail");
  panel.innerHTML = `
    <article class="section-card rounded-[30px] p-6" style="background: linear-gradient(135deg, rgba(0, 109, 50, 0.12), rgba(18, 104, 214, 0.12));">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Agente seleccionado</p>
          <h3 class="font-space mt-2 text-3xl font-bold text-[var(--text)]">${agentDetail.name}</h3>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">${agentDetail.description}</p>
          <div class="mt-4 flex items-center gap-3">
            <span class="status-badge" style="${statusMap[agentDetail.status]}">${agentDetail.status}</span>
            <span class="text-sm text-[var(--text-muted)]">Ultimo deploy estable hace 4 horas</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button class="rounded-full bg-[var(--surface-elevated)] px-5 py-3 font-medium text-[var(--text)] shadow-[0_18px_36px_rgba(11,28,48,0.06)]" type="button">Editar</button>
          <button class="rounded-full px-5 py-3 font-medium text-white shadow-[0_18px_36px_rgba(0,109,50,0.18)]" style="background: linear-gradient(135deg, var(--primary), var(--primary-bright));" type="button">Desplegar</button>
        </div>
      </div>
    </article>

    <div class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="grid gap-5 md:grid-cols-2">
        <article class="section-card rounded-[28px] surface-elevated p-5">
          <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Prompt base</p>
          <p class="mt-4 text-sm leading-7 text-[var(--text)]">${agentDetail.prompt}</p>
        </article>
        <article class="section-card rounded-[28px] surface-elevated p-5">
          <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Objetivo</p>
          <p class="mt-4 text-sm leading-7 text-[var(--text)]">${agentDetail.objective}</p>
        </article>
        <article class="section-card rounded-[28px] surface-elevated p-5">
          <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Canales habilitados</p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${agentDetail.channels.map((channel) => `<span class="pill-chip soft-ring bg-[var(--surface-low)] text-[var(--text)]">${channel}</span>`).join("")}
          </div>
        </article>
        <article class="section-card rounded-[28px] surface-elevated p-5">
          <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Limites operativos</p>
          <div class="mt-4 space-y-3">
            ${agentDetail.limits.map((limit) => `<div class="rounded-[18px] bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--text)]">${limit}</div>`).join("")}
          </div>
        </article>
      </div>
      <article class="section-card rounded-[28px] surface-card p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Skills equipadas</p>
            <h4 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Grupos colapsables</h4>
          </div>
        </div>
        <div class="mt-6 space-y-3">
          ${agentDetail.skillGroups
            .map(
              (group) => `
                <div class="accordion-item rounded-[24px] bg-[var(--surface-elevated)] p-4 ${state.openSkillGroups.has(group.group) ? "is-open" : ""}" data-accordion-item="${group.group}">
                  <button class="flex w-full items-center justify-between gap-3 text-left" type="button" data-accordion-trigger="${group.group}">
                    <div>
                      <p class="font-medium text-[var(--text)]">${group.group}</p>
                      <p class="text-sm text-[var(--text-muted)]">${group.skills.length} skills</p>
                    </div>
                    <span class="accordion-arrow text-xl text-[var(--text-muted)]">⌄</span>
                  </button>
                  <div class="accordion-content mt-4">
                    <div class="space-y-2">
                      ${group.skills.map((skill) => `<div class="rounded-[18px] bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--text)]">${skill}</div>`).join("")}
                    </div>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
    </div>

    <article class="section-card rounded-[28px] surface-elevated p-5">
      <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Historial de cambios</p>
      <div class="mt-6 grid gap-4 lg:grid-cols-4">
        ${agentDetail.timeline
          .map(
            (item) => `
              <div class="rounded-[24px] bg-[var(--surface-low)] p-4">
                <p class="font-space text-lg font-bold text-[var(--text)]">${item.date}</p>
                <p class="mt-3 text-sm font-medium text-[var(--text)]">${item.action}</p>
                <p class="mt-2 text-sm text-[var(--text-muted)]">${item.actor}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function filteredSkills() {
  return skills.filter((skill) => {
    const categoryFilter = state.skillFilters.categories;
    const compatibilityFilter = state.skillFilters.compatibility;
    const matchesCategory = categoryFilter.size === 0 || categoryFilter.has(skill.category);
    const matchesCompatibility = compatibilityFilter.size === 0 || skill.compatibility.some((item) => compatibilityFilter.has(item));
    return matchesCategory && matchesCompatibility;
  });
}

function renderSkills() {
  const panel = document.querySelector("#view-skills");
  const categories = [...new Set(skills.map((skill) => skill.category))];
  const compatibilities = [...new Set(skills.flatMap((skill) => skill.compatibility))];
  const visibleSkills = filteredSkills();
  panel.innerHTML = `
    <div class="grid gap-5 xl:grid-cols-[300px_1fr]">
      <aside class="section-card rounded-[28px] surface-elevated p-5">
        <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Filtros</p>
        <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Biblioteca</h3>
        <div class="mt-6 space-y-6">
          <div>
            <p class="text-sm font-medium text-[var(--text)]">Categoria</p>
            <div class="mt-3 flex flex-wrap gap-2">
              ${categories
                .map(
                  (category) => `
                    <button class="pill-chip ${state.skillFilters.categories.has(category) ? "bg-[var(--primary)] text-white" : "soft-ring bg-[var(--surface-low)] text-[var(--text)]"}" type="button" data-skill-category="${category}">
                      ${category}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div>
            <p class="text-sm font-medium text-[var(--text)]">Compatibilidad</p>
            <div class="mt-3 space-y-3">
              ${compatibilities
                .map(
                  (compatibility) => `
                    <label class="flex items-center justify-between rounded-[18px] bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--text)]">
                      <span>${compatibility}</span>
                      <input type="checkbox" data-skill-compatibility="${compatibility}" ${state.skillFilters.compatibility.has(compatibility) ? "checked" : ""} />
                    </label>
                  `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </aside>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        ${visibleSkills
          .map(
            (skill) => `
              <article class="skill-card rounded-[28px] p-5 ${skill.availability === "No disponible" ? "opacity-65" : ""}" style="background:${skill.availability === "No disponible" ? "var(--surface-card)" : "var(--surface-elevated)"};">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <span class="status-badge" style="${statusMap[skill.availability]}">${skill.availability}</span>
                    <h4 class="font-space mt-4 text-2xl font-bold text-[var(--text)]">${skill.name}</h4>
                  </div>
                  <span class="pill-chip soft-ring bg-[var(--surface-low)] text-[var(--text)]">${skill.category}</span>
                </div>
                <p class="mt-4 text-sm leading-7 text-[var(--text-muted)]">${skill.description}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  ${skill.compatibility.map((compatibility) => `<span class="pill-chip soft-ring bg-[var(--surface-low)] text-[var(--text)]">${compatibility}</span>`).join("")}
                </div>
                <div class="mt-6 flex items-center justify-between gap-3">
                  <div>
                    <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Uso mensual</p>
                    <p class="font-space mt-2 text-2xl font-bold text-[var(--text)]">${skill.monthlyUsage}</p>
                  </div>
                  ${skill.availability === "No disponible"
                    ? `
                      <div class="tooltip-shell">
                        <button class="rounded-full bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--text-muted)]" type="button" disabled>Equipar</button>
                        <div class="tooltip-text text-sm">Disponible cuando el conector de voz salga de beta privada.</div>
                      </div>
                    `
                    : `<button class="rounded-full px-4 py-3 text-sm font-medium text-white shadow-[0_18px_36px_rgba(0,109,50,0.18)]" style="background: linear-gradient(135deg, var(--primary), var(--primary-bright));" type="button" data-equip-skill="${skill.id}">Equipar</button>`}
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
    </div>
  `;
}

function renderDeployments() {
  const panel = document.querySelector("#view-deployments");
  panel.innerHTML = `
    <div class="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <article class="section-card rounded-[30px] surface-elevated p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Despliegues</p>
            <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Estado operacional</h3>
          </div>
          <span class="pill-chip soft-ring bg-[var(--surface-low)] text-[var(--text)]">${deployments.length} despliegues</span>
        </div>
        <div class="table-shell mt-6 overflow-x-auto rounded-[28px] surface-card p-3">
          <table class="min-w-full text-left text-sm">
            <thead class="text-[var(--text-muted)]">
              <tr>
                <th class="px-4 py-3 font-medium">ID</th>
                <th class="px-4 py-3 font-medium">Agente</th>
                <th class="px-4 py-3 font-medium">Cliente</th>
                <th class="px-4 py-3 font-medium">Fecha</th>
                <th class="px-4 py-3 font-medium">Estado</th>
                <th class="px-4 py-3 font-medium">SLA</th>
                <th class="px-4 py-3 font-medium text-right">Accion</th>
              </tr>
            </thead>
            <tbody>
              ${deployments
                .map(
                  (deployment) => `
                    <tr>
                      <td class="px-4 py-4 text-[var(--text-muted)]">${deployment.id}</td>
                      <td class="px-4 py-4 text-[var(--text)]">${deployment.agent}</td>
                      <td class="px-4 py-4 text-[var(--text)]">${deployment.client}</td>
                      <td class="px-4 py-4 text-[var(--text-muted)]">${deployment.date}</td>
                      <td class="px-4 py-4"><span class="status-badge" style="${statusMap[deployment.status]}">${deployment.status}</span></td>
                      <td class="px-4 py-4 text-[var(--text)]">${deployment.sla}</td>
                      <td class="px-4 py-4 text-right">
                        ${deployment.status === "Running"
                          ? `<button class="rounded-full bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--text)]" type="button" data-pause-deployment="${deployment.id}">Pausar</button>`
                          : deployment.status === "Paused"
                            ? `<button class="rounded-full bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--text)]" type="button" data-resume-deployment="${deployment.id}">Reanudar</button>`
                            : `<span class="text-sm text-[var(--text-muted)]">Sin accion</span>`}
                      </td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </article>

      <aside class="queue-card rounded-[30px] surface-card p-5">
        <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Cola de tareas</p>
        <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Procesos pendientes</h3>
        <div class="mt-6 space-y-4">
          ${taskQueue
            .map(
              (task) => `
                <article class="rounded-[24px] bg-[var(--surface-elevated)] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-medium text-[var(--text)]">${task.name}</p>
                      <p class="mt-1 text-sm text-[var(--text-muted)]">${task.id}</p>
                    </div>
                    <span class="font-space text-xl font-bold text-[var(--text)]">${task.progress}%</span>
                  </div>
                  <div class="progress-track mt-4">
                    <div class="progress-fill" style="width:${task.progress}%"></div>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </aside>
    </div>
  `;
}

function currentClient() {
  return clients.find((client) => client.id === state.selectedClientId) || clients[0];
}

function currentMember() {
  const selectedClient = currentClient();
  return selectedClient.members.find((member) => member.id === state.selectedMemberId) || selectedClient.members[0];
}

function renderClients() {
  const panel = document.querySelector("#view-clients");
  const selectedClient = currentClient();
  const selectedMember = currentMember();
  panel.innerHTML = `
    <div class="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <article class="section-card rounded-[30px] surface-elevated p-5">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Cuentas</p>
            <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Clientes y membresias</h3>
          </div>
          <button class="rounded-full px-5 py-3 font-medium text-white shadow-[0_18px_36px_rgba(0,109,50,0.18)]" style="background: linear-gradient(135deg, var(--primary), var(--primary-bright));" type="button" data-open-invite>
            Invitar usuario
          </button>
        </div>
        <div class="table-shell mt-6 overflow-x-auto rounded-[28px] surface-card p-3">
          <table class="min-w-full text-left text-sm">
            <thead class="text-[var(--text-muted)]">
              <tr>
                <th class="px-4 py-3 font-medium">Empresa</th>
                <th class="px-4 py-3 font-medium">Plan</th>
                <th class="px-4 py-3 font-medium">Agentes activos</th>
                <th class="px-4 py-3 font-medium">Admin principal</th>
                <th class="px-4 py-3 font-medium">Suscripcion</th>
              </tr>
            </thead>
            <tbody>
              ${clients
                .map(
                  (client) => `
                    <tr class="cursor-pointer" data-select-client="${client.id}">
                      <td class="px-4 py-4">
                        <div class="rounded-[22px] ${state.selectedClientId === client.id ? "bg-[var(--surface-elevated)]" : "bg-transparent"} px-4 py-3 transition-colors">
                          <p class="font-medium text-[var(--text)]">${client.company}</p>
                          <p class="text-xs text-[var(--text-muted)]">${client.id}</p>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-[var(--text)]">${client.plan}</td>
                      <td class="px-4 py-4 text-[var(--text)]">${client.activeAgents}</td>
                      <td class="px-4 py-4 text-[var(--text-muted)]">${client.admin}</td>
                      <td class="px-4 py-4"><span class="status-badge" style="${statusMap[client.subscription]}">${client.subscription}</span></td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </article>

      <aside class="account-card rounded-[30px] surface-card p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Miembros</p>
            <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">${selectedClient.company}</h3>
          </div>
          <span class="pill-chip soft-ring bg-[var(--surface-elevated)] text-[var(--text)]">${selectedClient.members.length} usuarios</span>
        </div>

        <div class="mt-6 space-y-3">
          ${selectedClient.members
            .map(
              (member) => `
                <button class="flex w-full items-center justify-between rounded-[22px] px-4 py-4 text-left ${selectedMember.id === member.id ? "bg-[var(--surface-elevated)]" : "bg-[var(--surface-low)]"}" type="button" data-select-member="${member.id}">
                  <div>
                    <p class="font-medium text-[var(--text)]">${member.name}</p>
                    <p class="text-sm text-[var(--text-muted)]">${member.role} · ${member.access}</p>
                  </div>
                  <span class="text-xs text-[var(--text-muted)]">${member.email}</span>
                </button>
              `,
            )
            .join("")}
        </div>

        <div class="mt-6 rounded-[26px] bg-[var(--surface-elevated)] p-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-medium text-[var(--text)]">${selectedMember.name}</p>
              <p class="text-sm text-[var(--text-muted)]">${selectedMember.role} · ${selectedMember.email}</p>
            </div>
            <span class="status-badge" style="${statusMap.Activa}">Activo</span>
          </div>
          <div class="mt-5 space-y-3">
            ${Object.entries(selectedMember.permissions)
              .map(
                ([moduleName, enabled]) => `
                  <label class="flex items-center justify-between rounded-[18px] bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--text)]">
                    <span>${moduleName}</span>
                    <button class="theme-toggle ${enabled ? "" : "opacity-60"}" type="button" data-toggle-permission="${moduleName}">
                      <span class="theme-toggle-thumb" style="transform:${enabled ? "translateX(2.35rem)" : "translateX(0)"};"></span>
                    </button>
                  </label>
                `,
              )
              .join("")}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function renderModal() {
  if (!state.modal) {
    app.modalRoot.innerHTML = "";
    return;
  }

  if (state.modal.type === "equip-skill") {
    const skill = skills.find((item) => item.id === state.modal.skillId);
    app.modalRoot.innerHTML = `
      <div class="modal-overlay" data-close-modal>
        <div class="modal-card w-full max-w-xl rounded-[30px] p-6 surface-elevated" onclick="event.stopPropagation()">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Equipar skill</p>
              <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">${skill.name}</h3>
            </div>
            <button class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-[var(--text)]" type="button" data-close-modal>✕</button>
          </div>
          <p class="mt-4 text-sm leading-7 text-[var(--text-muted)]">Selecciona el agente destino para asociar la skill. Esta accion es solo visual en memoria.</p>
          <div class="mt-6">
            <label class="text-sm font-medium text-[var(--text)]">Agente destino</label>
            <select id="equip-agent-select" class="ghost-select mt-3">
              ${agents.map((agent) => `<option value="${agent.id}">${agent.name}</option>`).join("")}
            </select>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button class="rounded-full bg-[var(--surface-low)] px-5 py-3 text-[var(--text)]" type="button" data-close-modal>Cancelar</button>
            <button class="rounded-full px-5 py-3 font-medium text-white" style="background: linear-gradient(135deg, var(--primary), var(--primary-bright));" type="button" data-confirm-equip="${skill.id}">Confirmar</button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.modal.type === "pause-deployment") {
    const deployment = deployments.find((item) => item.id === state.modal.deploymentId);
    app.modalRoot.innerHTML = `
      <div class="modal-overlay" data-close-modal>
        <div class="modal-card w-full max-w-lg rounded-[30px] p-6 surface-elevated" onclick="event.stopPropagation()">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Confirmacion</p>
              <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Pausar despliegue</h3>
            </div>
            <button class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-[var(--text)]" type="button" data-close-modal>✕</button>
          </div>
          <p class="mt-4 text-sm leading-7 text-[var(--text-muted)]">Confirma el cambio visual de estado para ${deployment.agent} en ${deployment.client}.</p>
          <div class="mt-6 flex justify-end gap-3">
            <button class="rounded-full bg-[var(--surface-low)] px-5 py-3 text-[var(--text)]" type="button" data-close-modal>Cancelar</button>
            <button class="rounded-full px-5 py-3 font-medium text-white" style="background: linear-gradient(135deg, #b84a1a, #ff9c45);" type="button" data-confirm-pause="${deployment.id}">Pausar</button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.modal.type === "invite-user") {
    app.modalRoot.innerHTML = `
      <div class="modal-overlay" data-close-modal>
        <div class="modal-card w-full max-w-xl rounded-[30px] p-6 surface-elevated" onclick="event.stopPropagation()">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Invitar usuario</p>
              <h3 class="font-space mt-2 text-2xl font-bold text-[var(--text)]">Nuevo acceso cliente</h3>
            </div>
            <button class="rounded-full bg-[var(--surface-low)] px-4 py-2 text-[var(--text)]" type="button" data-close-modal>✕</button>
          </div>
          <div class="mt-6 space-y-4">
            <div>
              <label class="text-sm font-medium text-[var(--text)]">Email</label>
              <input id="invite-email" class="ghost-input mt-3" type="email" placeholder="nombre@empresa.com" />
              <p id="invite-email-error" class="mt-2 hidden text-sm" style="color: var(--danger);">Ingresa un email valido.</p>
            </div>
            <div>
              <label class="text-sm font-medium text-[var(--text)]">Rol</label>
              <select id="invite-role" class="ghost-select mt-3">
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button class="rounded-full bg-[var(--surface-low)] px-5 py-3 text-[var(--text)]" type="button" data-close-modal>Cancelar</button>
            <button class="rounded-full px-5 py-3 font-medium text-white" style="background: linear-gradient(135deg, var(--primary), var(--primary-bright));" type="button" data-submit-invite>Confirmar</button>
          </div>
        </div>
      </div>
    `;
  }
}

function bindGlobalEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);
  app.mobileMenuToggle.addEventListener("click", () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    app.sidebarNav.classList.toggle("is-open", state.mobileMenuOpen);
  });
  app.themeToggles.forEach((button) => button.addEventListener("click", toggleTheme));
}

function handleClick(event) {
  const navButton = event.target.closest("[data-view-target]");
  if (navButton) {
    setActiveView(navButton.dataset.viewTarget);
    return;
  }

  const jumpButton = event.target.closest("[data-nav-jump]");
  if (jumpButton) {
    state.openDropdownId = null;
    setActiveView(jumpButton.dataset.navJump);
    renderAgents();
    return;
  }

  const dropdownTrigger = event.target.closest("[data-dropdown-trigger]");
  if (dropdownTrigger) {
    const nextId = dropdownTrigger.dataset.dropdownTrigger;
    state.openDropdownId = state.openDropdownId === nextId ? null : nextId;
    renderAgents();
    return;
  }

  if (!event.target.closest("[data-dropdown-menu]")) {
    if (state.openDropdownId) {
      state.openDropdownId = null;
      renderAgents();
    }
  }

  const accordionTrigger = event.target.closest("[data-accordion-trigger]");
  if (accordionTrigger) {
    const group = accordionTrigger.dataset.accordionTrigger;
    if (state.openSkillGroups.has(group)) {
      state.openSkillGroups.delete(group);
    } else {
      state.openSkillGroups.add(group);
    }
    renderAgentDetail();
    return;
  }

  const equipButton = event.target.closest("[data-equip-skill]");
  if (equipButton) {
    state.modal = { type: "equip-skill", skillId: equipButton.dataset.equipSkill };
    renderModal();
    return;
  }

  const pauseButton = event.target.closest("[data-pause-deployment]");
  if (pauseButton) {
    state.modal = { type: "pause-deployment", deploymentId: pauseButton.dataset.pauseDeployment };
    renderModal();
    return;
  }

  const resumeButton = event.target.closest("[data-resume-deployment]");
  if (resumeButton) {
    const target = deployments.find((deployment) => deployment.id === resumeButton.dataset.resumeDeployment);
    target.status = "Running";
    renderDeployments();
    return;
  }

  const confirmPause = event.target.closest("[data-confirm-pause]");
  if (confirmPause) {
    const target = deployments.find((deployment) => deployment.id === confirmPause.dataset.confirmPause);
    target.status = "Paused";
    state.modal = null;
    renderDeployments();
    renderModal();
    return;
  }

  const confirmEquip = event.target.closest("[data-confirm-equip]");
  if (confirmEquip) {
    state.modal = null;
    renderModal();
    window.alert("Skill equipada visualmente en el agente seleccionado.");
    return;
  }

  const openInvite = event.target.closest("[data-open-invite]");
  if (openInvite) {
    state.modal = { type: "invite-user" };
    renderModal();
    return;
  }

  const submitInvite = event.target.closest("[data-submit-invite]");
  if (submitInvite) {
    const emailInput = document.querySelector("#invite-email");
    const emailError = document.querySelector("#invite-email-error");
    const email = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailError.classList.toggle("hidden", isValid);
    if (!isValid) {
      emailInput.focus();
      return;
    }
    const role = document.querySelector("#invite-role").value;
    const client = currentClient();
    const memberId = `usr-${Date.now()}`;
    client.members.push({
      id: memberId,
      name: email.split("@")[0],
      email,
      role,
      access: "Invitacion pendiente",
      permissions: { Dashboard: true, Agentes: role !== "Viewer", Skills: role === "Owner" || role === "Admin", Billing: role === "Owner" },
    });
    state.selectedMemberId = memberId;
    state.modal = null;
    renderClients();
    renderModal();
    return;
  }

  const closeModal = event.target.closest("[data-close-modal]");
  if (closeModal) {
    state.modal = null;
    renderModal();
    return;
  }

  const selectClientButton = event.target.closest("[data-select-client]");
  if (selectClientButton) {
    state.selectedClientId = selectClientButton.dataset.selectClient;
    state.selectedMemberId = currentClient().members[0].id;
    renderClients();
    return;
  }

  const selectMemberButton = event.target.closest("[data-select-member]");
  if (selectMemberButton) {
    state.selectedMemberId = selectMemberButton.dataset.selectMember;
    renderClients();
    return;
  }

  const permissionToggle = event.target.closest("[data-toggle-permission]");
  if (permissionToggle) {
    const selectedMember = currentMember();
    const moduleName = permissionToggle.dataset.togglePermission;
    selectedMember.permissions[moduleName] = !selectedMember.permissions[moduleName];
    renderClients();
  }
}

function handleInput(event) {
  if (event.target.id === "agent-search") {
    state.agentFilters.search = event.target.value;
    renderAgents();
  }
}

function handleChange(event) {
  if (event.target.id === "agent-status-filter") {
    state.agentFilters.status = event.target.value;
    renderAgents();
  }

  if (event.target.id === "agent-type-filter") {
    state.agentFilters.type = event.target.value;
    renderAgents();
  }

  const compatibilityToggle = event.target.closest("[data-skill-compatibility]");
  if (compatibilityToggle) {
    const key = compatibilityToggle.dataset.skillCompatibility;
    if (compatibilityToggle.checked) {
      state.skillFilters.compatibility.add(key);
    } else {
      state.skillFilters.compatibility.delete(key);
    }
    renderSkills();
  }
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    if (state.openDropdownId) {
      state.openDropdownId = null;
      renderAgents();
    }
    if (state.modal) {
      state.modal = null;
      renderModal();
    }
  }
}

function toggleTheme() {
  state.isDark = !state.isDark;
  document.body.classList.toggle("theme-dark", state.isDark);
  syncThemeButtons();
}

function syncThemeButtons() {
  app.themeToggles.forEach((button) => {
    button.setAttribute("aria-pressed", String(state.isDark));
  });
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-skill-category]");
  if (!categoryButton) {
    return;
  }
  const category = categoryButton.dataset.skillCategory;
  if (state.skillFilters.categories.has(category)) {
    state.skillFilters.categories.delete(category);
  } else {
    state.skillFilters.categories.add(category);
  }
  renderSkills();
});

initialize();