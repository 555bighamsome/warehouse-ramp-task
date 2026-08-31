/* UI layer over solver-generated tasks: tabs, board animation, rule builder, logs. */

let CELL = 38;
let curIndex = 0;
let scn = TASKS[curIndex];
let rules = [];
const sceneRuleDrafts = new Map();
let library = [];
let robotEls = {};
let machineEls = {};
let timer = null;
let runs = [];
let lastResult = null;
let lastFrames = [];
let frameIndex = 0;
let experimentStartedAt = Date.now();
let trialStartedAt = experimentStartedAt;
let lastAttemptAt = experimentStartedAt;
let ruleEvents = [];
let lastRuleEventIndex = 0;
let nextRuleId = 1;
let rulebookRevision = 0;
let simpleFamilySelection = null;
const sceneGuidesSeen = new Set();

const $ = id => document.getElementById(id);
const URL_PARAMS = new URLSearchParams(window.location.search);
const DEBUG_UI = URL_PARAMS.get("debug") === "1" ||
  window.location.hash.includes("debug");
const SKIP_TUTORIAL = URL_PARAMS.get("skipTutorial") === "1";
// The experimental task is sequential by default. Designers can inspect every
// scene with ?order=free or ?skipTutorial=1 without changing the participant flow.
const ORDER_MODE = DEBUG_UI
  ? "free"
  : (URL_PARAMS.get("order") || (SKIP_TUTORIAL ? "free" : "curriculum"));
const FREE_ORDER = ORDER_MODE === "free";
const EDITOR_CONDITION = RAW_LIBRARY.condition === "fresh" ? "fresh" : "carry";
let activeTaskBranch = null;

function activateTaskBranch(branch){
  const rawTasks = RAW_LIBRARY.branch_tasks?.[branch];
  if(!Array.isArray(rawTasks) || !rawTasks.length) return false;
  const normalized = rawTasks.map(normalizeTask);
  TASKS.splice(0, TASKS.length, ...normalized);
  scn = TASKS[curIndex] || TASKS[0];
  activeTaskBranch = branch;
  return true;
}

const requestedBranch = URL_PARAMS.get("branch");
if(requestedBranch === "movement" || requestedBranch === "role"){
  activateTaskBranch(requestedBranch);
}

const shiftStates = Object.fromEntries(TASKS.map(task => [
  task.id,
  { visited:false, lastOk:null, testedRevision:null, attempts:0 },
]));

function taskUnlocked(task){
  if(FREE_ORDER) return true;
  const index = TASKS.indexOf(task);
  if(index <= 0) return true;
  return shiftStates[TASKS[index - 1].id].lastOk === true;
}

function unlockedTasks(){
  return TASKS.filter(taskUnlocked);
}

const EXPORTED_RULE_SCHEMA = RAW_LIBRARY.rule_schema || { fields:[], max_conditions:3 };
const MAX_RULE_CONDITIONS = EXPORTED_RULE_SCHEMA.max_conditions || 3;
const OBJECT_IDS = {
  "Target square":"target",
  "Square being entered":"target",
  "Next square":"target",
  "Traffic":"traffic",
  "Target station":"station",
  "Robot":"robot",
  "Robot type":"robot",
  "Robot role":"robot",
  "Movement":"movement",
};
const VISIBLE_RULE_FIELDS = (EXPORTED_RULE_SCHEMA.fields || []).filter(
  field => !CLEAN_RULE_LANGUAGE || field.predicate !== "contested"
);
const RULE_SCHEMA = Object.values(VISIBLE_RULE_FIELDS.reduce((groups, field) => {
  const objectId = OBJECT_IDS[field.object] || field.object.toLowerCase().replaceAll(" ", "-");
  if(!groups[objectId]){
    groups[objectId] = { id:objectId, label:field.object, properties:[] };
  }
  groups[objectId].properties.push({
    id:field.id,
    label:field.id,
    predicate:field.predicate,
    values:field.values,
  });
  return groups;
}, {}));

const MUTATING_RULE_EVENTS = new Set([
  "rule_added",
  "condition_edited",
  "condition_added",
  "condition_removed",
  "rule_removed",
  "library_rule_used",
  "rule_family_changed",
  "rule_value_added",
  "rule_value_removed",
]);

function recordRuleEvent(type, detail={}){
  if(MUTATING_RULE_EVENTS.has(type)){
    rulebookRevision += 1;
    if(scn?.id && shiftStates[scn.id]){
      shiftStates[scn.id].lastOk = null;
      shiftStates[scn.id].testedRevision = null;
    }
  }
  ruleEvents.push({
    type,
    shift_id:scn?.id || null,
    rulebook_revision:rulebookRevision,
    time_from_experiment_start_ms:Date.now() - experimentStartedAt,
    time_from_trial_start_ms:Date.now() - trialStartedAt,
    timestamp:new Date().toISOString(),
    ...detail,
  });
}

function icon(name, extraClass=""){
  const cls = `ui-icon ${extraClass}`.trim();
  const base = `class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"`;
  const stroke = 'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"';
  const fill = 'fill="currentColor"';
  if(name === "robot") return `<svg ${base}><path ${fill} d="M8 3h8v2h2v7H6V5h2V3ZM5 12h14v9H5v-9Z"/><circle cx="10" cy="8" r="1" fill="#202020"/><circle cx="14" cy="8" r="1" fill="#202020"/><path d="M9 16h6M9 18h6" stroke="#fff" stroke-width="1.4"/></svg>`;
  if(name === "carrier") return `<svg ${base}><path ${fill} d="M7 2h10v2h2v7H5V4h2V2ZM3 12h18v4h-2v6H5v-6H3v-4Z"/><circle cx="9" cy="7" r="1.2" fill="#202020"/><circle cx="15" cy="7" r="1.2" fill="#202020"/><path d="M8 14h8v7H8v-7Zm4 0v7M8 17h8" fill="#fff" stroke="#202020" stroke-width="1.3"/></svg>`;
  if(name === "cleaner") return `<svg ${base}><path ${fill} d="M8 3h8v2h2v7H6V5h2V3ZM5 12h14v9H5v-9Z"/><circle cx="10" cy="8" r="1" fill="#202020"/><circle cx="14" cy="8" r="1" fill="#202020"/><path d="m14 14 7 7M12.5 15.5l1.5 1.5M17 17l2 2M19 15l2 2" stroke="#202020" stroke-width="1.6" fill="none" stroke-linecap="square"/></svg>`;
  if(name === "operator") return `<svg ${base}><circle ${fill} cx="12" cy="2.5" r="1.5"/><path d="M12 4v2" stroke="currentColor" stroke-width="2"/><path ${fill} d="M4 6h16v9H4V6Zm3 10h10v6H7v-6Z"/><circle cx="9" cy="10" r="1.25" fill="#202020"/><circle cx="15" cy="10" r="1.25" fill="#202020"/><path d="M9 18h2M13 18h2M9 20h6" stroke="#202020" stroke-width="1.3" fill="none"/></svg>`;
  if(name === "spill") return `<svg ${base}><path ${fill} d="M12 2c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11Z"/><path d="M12 9v4M12 16h.01" stroke="#fff" stroke-width="2.5" stroke-linecap="square"/></svg>`;
  if(name === "cold") return `<svg ${base}><path ${stroke} d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M8 4.5l4 3 4-3M8 19.5l4-3 4 3"/></svg>`;
  if(name === "intersection") return `<svg ${base}><path ${fill} d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2Z"/></svg>`;
  if(name === "passage") return `<svg ${base}><path ${stroke} d="M5 3v18M19 3v18M8 7h8M8 12h8M8 17h8"/></svg>`;
  if(name === "exit") return `<svg ${base}><path ${stroke} d="M13 4.5 21 3v18l-8-1.5V4.5ZM13 19.5H5V5h8M17 12h.01"/></svg>`;
  if(name === "machine") return icon("exit", extraClass);
  if(name === "wall") return `<svg ${base}><path ${fill} d="M3 4h7v5H3V4Zm9 0h9v5h-9V4ZM3 11h4v5H3v-5Zm6 0h8v5H9v-5Zm10 0h2v5h-2v-5ZM3 18h9v3H3v-3Zm11 0h7v3h-7v-3Z"/></svg>`;
  if(name === "floor") return `<svg ${base}><rect ${stroke} x="4" y="4" width="16" height="16" stroke-width="1.5"/></svg>`;
  if(name === "reach") return `<svg ${base}><path ${fill} d="M10 2h4v7h7v4h-7v7h-4v-7H3V9h7V2Z"/></svg>`;
  if(name === "operate") return icon("machine", extraClass);
  if(name === "deliver") return icon("carrier", extraClass);
  if(name === "done") return `<svg ${base}><circle ${fill} cx="12" cy="12" r="10"/><path d="m7 12 3.2 3.2L17.5 8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="square"/></svg>`;
  if(name === "failed") return `<svg ${base}><circle ${fill} cx="12" cy="12" r="10"/><path d="m8 8 8 8M16 8l-8 8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="square"/></svg>`;
  if(name === "waiting") return `<svg ${base}><circle ${fill} cx="12" cy="12" r="10"/><path d="M9 7v10M15 7v10" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="square"/></svg>`;
  if(name === "run") return `<svg ${base}><circle ${fill} cx="12" cy="12" r="10"/><path d="m10 7 7 5-7 5V7Z" fill="#fff"/></svg>`;
  if(name === "idle") return `<svg ${base}><circle ${stroke} cx="12" cy="12" r="9"/></svg>`;
  if(name === "target") return icon("reach", extraClass);
  if(name === "charging") return `<svg ${base}><path ${stroke} d="M7 4h10v3h2v14H5V7h2V4Zm2 3h6V5H9v2Z"/><path ${fill} d="m13 9-4 6h3l-1 5 4-7h-3l1-4Z"/></svg>`;
  return `<svg ${base}><circle ${stroke} cx="12" cy="12" r="8"/></svg>`;
}

function roleIconName(role){
  if(SIMPLE_FAMILY_RULE_LANGUAGE) return "robot";
  if(role === "carrier") return "carrier";
  if(role === "operator") return "operator";
  if(role === "cleaner") return "cleaner";
  return "robot";
}

function agentDisplayId(id){
  const value = Number(id);
  if(!Number.isInteger(value) || value < 0) return String(id);
  let label = "";
  let index = value;
  do{
    label = String.fromCharCode(65 + (index % 26)) + label;
    index = Math.floor(index / 26) - 1;
  }while(index >= 0);
  return label;
}

function agentTargetNumber(agent, task=scn){
  const activeAgents = task?.agents?.filter(candidate => candidate.active) || [];
  const index = activeAgents.findIndex(candidate => String(candidate.id) === String(agent.id));
  return index >= 0 ? String(index + 1) : String(Number(agent.id) + 1);
}

function carryIcon(agent){
  return agent.carrying === "spill" ? icon("spill", "carry-icon") : "";
}

function goalIconName(agent){
  if(agent.goal.kind === "operate") return "operate";
  if(agent.goal.kind === "deliver") return "deliver";
  return "reach";
}

function stateIconName(meta){
  if(!meta) return "idle";
  if(meta.offDuty) return "idle";
  if(meta.failed) return "failed";
  if(meta.done) return "done";
  if(meta.waiting) return "waiting";
  if(meta.step_count === null || meta.step_count === undefined) return "idle";
  return "run";
}

const ROLE_SHORT_ZH = {
  carrier:"A",
  operator:"B",
  inspector:"C",
  loader:"D",
  technician:"E",
  courier:"F",
  scout:"G",
  guard:"H",
  cleaner:"Cl",
};
const MOVEMENT_ARROWS = {
  N:"\u2191", NE:"\u2197", E:"\u2192", SE:"\u2198",
  S:"\u2193", SW:"\u2199", W:"\u2190", NW:"\u2196",
};
const PROPERTY_LABELS = {
  target_type:"type",
  contested:"state",
  station_marker:"marker",
  role:"type",
  carrying:"carrying",
  move_dir:"direction",
};

const SIMPLE_ROBOT_COLOR = "#2D70B3";

function agentColor(agent){
  return SIMPLE_FAMILY_RULE_LANGUAGE ? SIMPLE_ROBOT_COLOR : roleColor(agent.role);
}

const ROLE_COLORS = {
  carrier: "#D85C2F",
  operator: "#347FC4",
  inspector: "#7B61A8",
  loader: "#2D8B73",
  technician: "#B06C2D",
  courier: "#4F6F8F",
  scout: "#8A6D3B",
  guard: "#7A4B57",
  cleaner: "#17966F",
};

function roleColor(role){
  return ROLE_COLORS[role] || COL[5];
}

function robotTypeLetter(role){
  return ROLE_SHORT_ZH[role] || "?";
}

function robotTypeMark(role, extraClass=""){
  return `<span class="robot-type-letter ${extraClass}" aria-hidden="true">${robotTypeLetter(role)}</span>`;
}

function roleLegendAvatar(role, extraClass=""){
  const mark = SIMPLE_FAMILY_RULE_LANGUAGE
    ? `${icon("robot", "agent-avatar-icon")}${robotTypeMark(role, "agent-type-letter")}`
    : icon(roleIconName(role), "agent-avatar-icon");
  const color = SIMPLE_FAMILY_RULE_LANGUAGE ? SIMPLE_ROBOT_COLOR : roleColor(role);
  return `<span class="agent-avatar role-key-avatar ${extraClass}" style="--agent-color:${color}">${mark}</span>`;
}

function passageMapSample(extraClass=""){
  return `<span class="passage-map-sample ${extraClass}" aria-hidden="true"></span>`;
}

function roleBadge(agent, className=""){
  return `<span class="role-badge role-${agent.role} ${className}">${ROLE_SHORT_ZH[agent.role] || "R"}</span>`;
}

function spillBadge(agent, className=""){
  if(agent.carrying === "none") return "";
  return `<span class="spill-badge ${className}" title="Carrying spill">spill</span>`;
}

function zoneMarkup(zone){
  if(zone === "cold") return icon("cold", "board-zone-icon");
  return "";
}

function targetMarkup(agent, targetIndex=0, onMachine=false){
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    const corner = targetIndex % 4;
    return `<span class="target-label target-label-corner-${corner}${onMachine ? ` target-label-on-machine target-label-machine-${corner}` : ""}">${agentTargetNumber(agent)}</span>`;
  }
  const corner = targetIndex % 4;
  return `<span class="target-label target-label-corner-${corner}${onMachine ? ` target-label-on-machine target-label-machine-${corner}` : ""}">${agentDisplayId(agent.id)}</span>`;
}

function agentAvatar(agent, extraClass=""){
  const mark = SIMPLE_FAMILY_RULE_LANGUAGE
    ? `${icon("robot", "agent-avatar-icon")}${robotTypeMark(agent.role, "agent-type-letter")}`
    : icon(roleIconName(agent.role), "agent-avatar-icon");
  const identity = SIMPLE_FAMILY_RULE_LANGUAGE
    ? ""
    : `<span class="agent-avatar-id">${agentDisplayId(agent.id)}</span>`;
  return `<span class="agent-avatar ${extraClass}" style="--agent-color:${agentColor(agent)}">${mark}${identity}</span>`;
}

function spillIconBadge(agent, className=""){
  if(agent.carrying !== "spill") return "";
  return `<span class="spill-icon-badge ${className}" title="Carrying spill">${icon("spill", "spill-icon")}</span>`;
}

function displayedMovement(agent, meta=null){
  return meta?.display_dir || meta?.intent?.dir || agent.movementArrow || null;
}

function robotMarkup(agent, meta){
  const movement = displayedMovement(agent, meta);
  const identity = SIMPLE_FAMILY_RULE_LANGUAGE
    ? `${icon("robot", "robot-role")}${robotTypeMark(agent.role, "robot-type-mark")}`
    : icon(roleIconName(agent.role), "robot-role");
  return [
    identity,
    `<span class="robot-id">${SIMPLE_FAMILY_RULE_LANGUAGE ? agentTargetNumber(agent) : agentDisplayId(agent.id)}</span>`,
    SIMPLE_FAMILY_RULE_LANGUAGE && movement
      ? `<span class="movement-arrow-badge" title="Movement direction ${MOVEMENT_ARROWS[movement] || movement}">${MOVEMENT_ARROWS[movement] || movement}</span>`
      : "",
    carryIcon(agent),
    meta?.done ? icon("done", "robot-state-mark") : "",
    meta?.failed ? icon("failed", "robot-state-mark") : "",
    meta?.waiting ? icon("waiting", "robot-state-mark wait") : "",
  ].join("");
}

const introducedFeatures = new Set();

const SCENE_GUIDES = {
  trial_1: {
    title:"When paths meet",
    body:"Robots cannot enter the same square together.",
  },
  trial_2: {
    title:"New map element",
  },
  trial_3: {
    title:"New map element",
  },
  trial_7: {
    title:"New map element: Narrow passage",
    body:"Robots may enter a narrow passage from either end, but only one robot can be inside at a time.",
    example:"If two robots arrive from opposite ends together, one must wait at the entrance until the other has left.",
  },
};

const GUIDE_COPY = {
  cold:"",
  machine:"A marked exit that admits one robot at a time. After entering, the robot leaves the map and the exit becomes available again.",
  passage:"",
  carrier:"",
  operator:"",
  cleaner:"Can carry a spill into cold storage without contamination.",
};

function sceneFeatureItems(task){
  const roles = new Set(task.agents.filter(agent => agent.active).map(agent => agent.role));
  const hasCold = Object.values(task.zones).includes("cold");
  const specs = [
    {
      id:"cold",
      present:hasCold,
      iconName:"cold",
      title:"Cold storage square",
      detail:GUIDE_COPY.cold,
    },
    {
      id:"passage",
      present:Object.keys(task.passages).length > 0,
      iconName:"passage",
      title:"Narrow passage",
      detail:GUIDE_COPY.passage,
    },
    {
      id:"machine",
      present:Object.keys(task.machines).length > 0,
      iconName:"exit",
      title:"Exit",
      detail:GUIDE_COPY.machine,
    },
    {
      id:"carrier",
      present:roles.has("carrier"),
      iconName:"carrier",
      role:"carrier",
      title:"Carrier",
      detail:GUIDE_COPY.carrier,
    },
    {
      id:"operator",
      present:roles.has("operator"),
      iconName:"operator",
      role:"operator",
      title:"Operator",
      detail:GUIDE_COPY.operator,
    },
    {
      id:"cleaner",
      present:roles.has("cleaner"),
      iconName:"cleaner",
      role:"cleaner",
      title:"Cleaner",
      detail:GUIDE_COPY.cleaner,
    },
  ];
  return specs.filter(spec => spec.present && !introducedFeatures.has(spec.id));
}

function guideFeatureMarkup(feature){
  let symbol;
  if(feature.target){
    symbol = '<span class="legend-target-sample" style="--agent-color:#555"><span>0</span></span>';
  }else if(feature.role){
    symbol = roleLegendAvatar(feature.role);
  }else if(feature.id === "passage"){
    symbol = passageMapSample("guide-passage-sample");
  }else{
    symbol = legendIcon(feature.iconName, feature.legendClass || `${feature.iconName}-sample`);
  }
  return `<div class="guide-item">${symbol}<span><strong>${feature.title}</strong>${feature.detail ? `<small>${feature.detail}</small>` : ""}</span></div>`;
}

function sceneHasGuide(task){
  if(SIMPLE_FAMILY_RULE_LANGUAGE) return false;
  return sceneFeatureItems(task).length > 0;
}

function shouldAutoShowGuide(task){
  if(SIMPLE_FAMILY_RULE_LANGUAGE) return false;
  return sceneFeatureItems(task).length > 0;
}

function closeSceneGuide(){
  const backdrop = $("guide-backdrop");
  if(!backdrop || backdrop.hidden) return;
  backdrop.hidden = true;
  sceneGuidesSeen.add(scn.id);
  recordRuleEvent("scene_guide_closed", {scene_guide_id:scn.id});
}

function showSceneGuide(force=false){
  const guide = SCENE_GUIDES[scn.id];
  const newFeatures = sceneFeatureItems(scn);
  const backdrop = $("guide-backdrop");
  if(!backdrop || !newFeatures.length) return;
  $("guide-kicker").textContent = `${scn.label} · Task guide`;
  $("guide-title").textContent = guide?.title || "New elements in this task";
  $("guide-items").innerHTML = newFeatures.map(guideFeatureMarkup).join("");
  const body = $("guide-body");
  const example = $("guide-example");
  body.textContent = guide?.body || "";
  body.hidden = !body.textContent;
  example.textContent = guide?.example || "";
  example.hidden = !example.textContent;
  newFeatures.forEach(feature => {
    introducedFeatures.add(feature.id);
  });
  renderSceneGuideButton();
  backdrop.hidden = false;
  recordRuleEvent("scene_guide_opened", {scene_guide_id:scn.id, first_view:!sceneGuidesSeen.has(scn.id)});
  $("guide-close")?.focus();
}

function renderSceneGuideButton(){
  const button = $("scene-guide");
  if(!button) return;
  const available = sceneHasGuide(scn);
  button.hidden = !available;
  button.onclick = available ? () => showSceneGuide(true) : null;
}

function closeScenePicker(){
  const backdrop = $("scene-picker-backdrop");
  if(backdrop) backdrop.hidden = true;
}

function sceneFullMapMarkup(task){
  const targets = new Map();
  task.agents.filter(agent => agent.active).forEach(agent => {
    const target = goalCell(task, agent);
    const key = K(target[0], target[1]);
    if(!targets.has(key)) targets.set(key, []);
    targets.get(key).push(agent);
  });
  const machines = new Map(Object.values(task.machines).map(machine => [K(machine.cell[0], machine.cell[1]), machine]));
  const cells = [];
  for(let row = 0; row < task.rows; row++){
    for(let col = 0; col < task.cols; col++){
      const key = K(row, col);
      const wall = task.walls.has(key);
      const zone = task.zones[key] || "normal";
      const agents = task.agents.filter(agent => agent.active && sameCell(agent.pos, [row, col]));
      const items = Object.values(task.items).filter(item => K(item.cell[0], item.cell[1]) === key);
      const machine = machines.get(key);
      const passage = task.passageCells.has(key);
      const feature = machine
        ? `<span class="picker-machine marker-${machine.marker || "plain"}"><span class="picker-machine-icon">${icon("machine")}</span></span>`
        : passage
          ? `<span class="picker-passage" aria-hidden="true"></span>`
          : "";
      const itemMarkup = items.map(item => `<span class="picker-item item-${item.colour}" aria-hidden="true"></span>`).join("");
      const targetMarkup = (targets.get(key) || []).map((agent, targetIndex) =>
        `<span class="picker-target picker-target-${targetIndex % 4}${machines.has(key) ? ` picker-target-on-machine picker-target-on-machine-${targetIndex % 4}` : ""}" style="--agent-color:${agentColor(agent)}" aria-hidden="true"><span class="picker-target-label picker-target-label-${targetIndex % 4}">${SIMPLE_FAMILY_RULE_LANGUAGE ? agentTargetNumber(agent, task) : agentDisplayId(agent.id)}</span></span>`
      ).join("");
      const agentMarkup = agents.map((agent, agentIndex) =>
        `<span class="picker-agent ${agents.length > 1 ? "picker-agent-multi" : ""} picker-agent-index-${agentIndex}" style="--agent-color:${agentColor(agent)}" aria-hidden="true">${icon(roleIconName(agent.role), "picker-agent-icon")}<span class="picker-agent-id">${SIMPLE_FAMILY_RULE_LANGUAGE ? agentTargetNumber(agent, task) : agentDisplayId(agent.id)}</span>${SIMPLE_FAMILY_RULE_LANGUAGE ? robotTypeMark(agent.role, "picker-agent-type") : ""}${agent.goal?.kind === "operate" ? icon("machine", "picker-goal-badge") : ""}${agent.carrying === "spill" ? icon("spill", "picker-carry-icon") : ""}</span>`
      ).join("");
      const zoneMarkupText = !wall && zone === "cold" ? zoneMarkup("cold") : "";
      cells.push(`<span class="picker-map-cell ${wall ? "picker-map-wall" : `picker-map-${zone}${passage ? " picker-passage-square" : ""}`}" aria-hidden="true">${wall ? "" : zoneMarkupText + feature + itemMarkup + targetMarkup + agentMarkup}</span>`);
    }
  }
  return `<span class="scene-full-map" style="--map-cols:${task.cols};--map-rows:${task.rows}">${cells.join("")}</span>`;
}

function renderScenePickerKey(){
  const key = $("scene-picker-key");
  if(!key) return;
  const roles = [...new Set(TASKS.flatMap(task =>
    task.agents.filter(agent => agent.active).map(agent => agent.role)
  ))];
  const roleTiles = roles.map(role => {
    const agent = TASKS.flatMap(task => task.agents)
      .find(candidate => candidate.active && candidate.role === role);
    return `<div class="picker-key-tile">${roleLegendAvatar(role, "picker-key-symbol role-symbol")}<span>${ROLE_ZH[role] || role}</span></div>`;
  }).join("");
  const environmentTiles = [
    ["floor", "Available square"],
    ["wall", "Wall"],
    ["passage", "Narrow passage"],
    ["exit", "Exit"],
  ].map(([iconName, label]) =>
    `<div class="picker-key-tile">${iconName === "passage"
      ? passageMapSample("picker-key-symbol")
      : `<span class="picker-key-symbol ${iconName}-symbol">${icon(iconName)}</span>`}<span>${label}</span></div>`
  ).join("");
  key.innerHTML = `<strong>Map key</strong><div class="picker-key-group"><span class="picker-key-group-label">Robot types</span>${roleTiles}</div><div class="picker-key-group"><span class="picker-key-group-label">Map</span><div class="picker-key-grid"><div class="picker-key-tile"><span class="picker-key-target"><span>${SIMPLE_FAMILY_RULE_LANGUAGE ? "1" : "0"}</span></span><span>${SIMPLE_FAMILY_RULE_LANGUAGE ? "Numbered charging bay" : "Target"}</span></div>${environmentTiles}</div></div>`;
}

function showScenePicker(){
  const backdrop = $("scene-picker-backdrop");
  const options = $("scene-picker-options");
  if(!backdrop || !options) return;
  renderScenePickerKey();
  options.innerHTML = "";
  TASKS.forEach((task, index) => {
    const button = document.createElement("button");
    button.className = "scene-picker-card";
    button.type = "button";
    button.innerHTML = `${sceneFullMapMarkup(task)}<span class="scene-picker-card-label">${task.label}</span>`;
    button.onclick = () => {
      initialSceneChosen = true;
      closeScenePicker();
      recordRuleEvent("initial_scene_selected", {
        selected_shift_id:task.id,
        selected_shift_index:index,
      });
      if(index === curIndex){
        renderAll();
        if(shouldAutoShowGuide(scn)) setTimeout(() => showSceneGuide(), 0);
      }else{
        switchTask(index);
      }
    };
    options.appendChild(button);
  });
  backdrop.hidden = false;
  options.querySelector("button")?.focus();
}

function switchTask(index){
  if(!taskUnlocked(TASKS[index])) return;
  const sourceIndex = curIndex;
  const sourceTask = scn;
  const targetWasVisited = shiftStates[TASKS[index].id].visited;
  if(EDITOR_CONDITION === "fresh"){
    sceneRuleDrafts.set(scn.id, rules);
  }
  curIndex = index;
  scn = TASKS[curIndex];
  const carriesActiveRulebook = EDITOR_CONDITION === "carry";
  if(!carriesActiveRulebook){
    const existingDraft = sceneRuleDrafts.get(scn.id);
    rules = existingDraft || loadStarterRules(scn);
  }
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    simpleFamilySelection = rules[0]?.conds?.[0]?.p ||
      (carriesActiveRulebook ? simpleFamilySelection : null);
  }
  lastResult = null;
  lastFrames = [];
  frameIndex = 0;
  trialStartedAt = Date.now();
  if(timer){ clearInterval(timer); timer = null; }
  recordRuleEvent("shift_selected", {
    selected_shift_id:scn.id,
    selected_shift_index:index,
    previously_visited:shiftStates[scn.id].visited,
  });
  if(carriesActiveRulebook){
    recordRuleEvent("rulebook_carried_over", {
      source_shift_id:sourceTask.id,
      source_shift_index:sourceIndex,
      source_was_successful:shiftStates[sourceTask.id].lastOk === true,
      carried_rule_ids:rules.map(rule => rule.id),
      carried_rule_json:ruleJson(),
    });
  }
  renderAll();
  const shouldAutoTest = carriesActiveRulebook &&
    !FREE_ORDER &&
    !targetWasVisited &&
    shiftStates[sourceTask.id].lastOk === true &&
    rules.some(rule => rule.conds?.length);
  if(shouldAutoTest){
    setStatus(`Testing your ${sourceTask.label} rule on ${scn.label}...`, "");
    recordRuleEvent("carryover_auto_test_started", {
      source_shift_id:sourceTask.id,
      target_shift_id:scn.id,
    });
    const expectedIndex = curIndex;
    setTimeout(() => {
      if(curIndex === expectedIndex && !shiftStates[scn.id].visited){
        play("carryover_auto");
      }
    }, 450);
  }else if(carriesActiveRulebook){
    setStatus(`The rule from ${sourceTask.label} carried over. Run it on ${scn.label}, or edit it first.`, "");
  }
  if(shouldAutoShowGuide(scn)){
    setTimeout(() => showSceneGuide(), 0);
  }
}

function buildTabs(){
  const tabs = $("tabs");
  tabs.innerHTML = "";
  TASKS.forEach((task, index) => {
    const button = document.createElement("button");
    const state = shiftStates[task.id];
    const locked = !taskUnlocked(task);
    const stateClass = locked
      ? "locked"
      : !state.visited || state.lastOk === null ? "unseen" : state.lastOk ? "solved" : "failed";
    button.className = `tab case-tab ${stateClass}` + (index === curIndex ? " active" : "");
    const mark = locked || !state.visited || state.lastOk === null ? "" : state.lastOk ? "✓" : "×";
    button.innerHTML = `<span class="scene-number">${task.label}</span><span class="scene-mark" aria-hidden="true">${mark}</span>`;
    button.disabled = locked;
    button.title = locked
      ? `${task.label}: complete the previous task first`
      : !state.visited
      ? `${task.label}: not yet run`
      : state.lastOk === null
      ? `${task.label}: edited rule not yet run`
      : `${task.label}: ${state.lastOk ? "solved" : "not solved"}`;
    button.onclick = () => switchTask(index);
    tabs.appendChild(button);
  });
  const sceneLabel = $("scene-label");
  if(sceneLabel) sceneLabel.textContent = scn.label;
  const position = $("scene-position");
  if(position){
    position.textContent = `${scn.label} / ${TASKS.length}`;
  }
  renderSceneGuideButton();
  const visited = Object.values(shiftStates).filter(state => state.visited).length;
  const currentSolved = Object.values(shiftStates).filter(state =>
    state.lastOk
  ).length;
  const available = unlockedTasks().length;
  const caseSummary = $("case-summary");
  if(caseSummary){
    caseSummary.textContent = `${scn.label} · ${currentSolved}/${TASKS.length} solved`;
  }
  const courseProgress = $("course-progress");
  if(courseProgress){
    courseProgress.textContent = `${visited} / ${TASKS.length} checked`;
  }
}

function renderSceneGoal(){
  const list = $("scene-goal-list");
  if(!list) return;
  list.innerHTML = '<div class="goal-instruction">Let every robot reach its assigned charging bay. Whenever two routes meet, use your rule to choose which robot waits.</div>';
}

function buildBoard(){
  const board = $("board");
  board.innerHTML = "";
  robotEls = {};
  machineEls = {};
  const frame = document.querySelector(".board-frame");
  const frameWidth = frame?.clientWidth || window.innerWidth;
  const availableWidth = Math.max(0, frameWidth - 40);
  // Use the viewport, rather than the board's current height, so repeated
  // renders do not progressively shrink the map.
  const availableHeight = Math.max(0, Math.min(window.innerHeight - 250, 680));
  const widthCell = Math.floor(availableWidth / scn.cols);
  const heightCell = Math.floor(availableHeight / scn.rows);
  const widthLimit = widthCell > 0 ? widthCell : 38;
  const heightLimit = heightCell > 0 ? heightCell : 38;
  const minimumCell = SIMPLE_FAMILY_RULE_LANGUAGE
    ? (window.innerWidth <= 700 ? 16 : 22)
    : (window.innerWidth <= 700 ? 19 : 24);
  CELL = Math.min(38, Math.max(minimumCell, Math.min(widthLimit, heightLimit)));
  board.style.width = (scn.cols * CELL) + "px";
  board.style.height = (scn.rows * CELL) + "px";
  const machineCellKeys = new Set(
    Object.values(scn.machines).map(machine => K(machine.cell[0], machine.cell[1]))
  );
  const passageCellKeys = scn.passageCells;
  const passageEntranceKeys = scn.passageEntrances;
  scn.diagonalEdgePairs.forEach(([first, second]) => {
    const firstX = first[1] * CELL + (CELL - 4) / 2;
    const firstY = first[0] * CELL + (CELL - 4) / 2;
    const secondX = second[1] * CELL + (CELL - 4) / 2;
    const secondY = second[0] * CELL + (CELL - 4) / 2;
    const dx = secondX - firstX;
    const dy = secondY - firstY;
    const link = document.createElement("div");
    link.className = "diagonal-road-link";
    link.style.left = `${firstX}px`;
    link.style.top = `${firstY}px`;
    link.style.width = `${Math.hypot(dx, dy)}px`;
    link.style.height = `${Math.max(8, CELL - 8)}px`;
    link.style.transform = `translateY(-50%) rotate(${Math.atan2(dy, dx)}rad)`;
    board.appendChild(link);
  });

  for(let r=0; r<scn.rows; r++) for(let c=0; c<scn.cols; c++){
    const key = K(r,c);
    const blocked = !passable(scn, [r,c]);
    const zone = zoneOf(scn, [r,c]);
    const visualZone = zone === "intersection" ? "normal" : zone;
    const cell = document.createElement("div");
    cell.className = blocked
      ? `cell wall${r % 2 ? " wall-row-offset" : ""}`
      : "cell zone-" + visualZone
        + (machineCellKeys.has(key) ? " machine-square-cell" : "")
        + (passageCellKeys.has(key) ? " passage-square-cell" : "")
        + (passageEntranceKeys.has(key) ? " passage-entrance-cell" : "");
    cell.style.left = (c * CELL) + "px";
    cell.style.top = (r * CELL) + "px";
    cell.style.width = (blocked ? CELL : CELL - 4) + "px";
    cell.style.height = (blocked ? CELL : CELL - 4) + "px";
    cell.dataset.cell = key;
    cell.setAttribute("aria-label", blocked
      ? "Wall"
      : machineCellKeys.has(key)
        ? "Exit"
        : passageCellKeys.has(key)
          ? "Narrow passage"
          : (ZONE_ZH[visualZone] || visualZone));
    if(!blocked){
      cell.innerHTML = zoneMarkup(visualZone);
    }
    board.appendChild(cell);
  }

  Object.values(scn.machines).forEach(machine => {
    const el = document.createElement("div");
    el.className = `machine marker-${machine.marker || "plain"}`;
    el.style.left = (machine.cell[1] * CELL + 3) + "px";
    el.style.top = (machine.cell[0] * CELL + 3) + "px";
    el.style.width = (CELL - 8) + "px";
    el.style.height = (CELL - 8) + "px";
    el.innerHTML = icon("machine", "board-feature-icon");
    el.setAttribute("aria-label", machineLabel(machine.id));
    board.appendChild(el);
    machineEls[machine.id] = el;
  });

  Object.values(scn.items).forEach(item => {
    const el = document.createElement("div");
    el.className = "item item-" + item.colour;
    el.style.left = (item.cell[1] * CELL + 11) + "px";
    el.style.top = (item.cell[0] * CELL + 11) + "px";
    el.style.width = (CELL - 22) + "px";
    el.style.height = (CELL - 22) + "px";
    el.setAttribute("aria-label", ITEM_ZH[item.colour] || item.id);
    board.appendChild(el);
  });

  const activeAgents = scn.agents.filter(agent => agent.active);
  const targetGroups = {};
  activeAgents.forEach(agent => {
    const target = goalCell(scn, agent);
    const key = K(target[0], target[1]);
    targetGroups[key] = targetGroups[key] || [];
    targetGroups[key].push(agent.id);
  });

  Object.values(scn.machines).forEach(machine => {
    const assigned = activeAgents.filter(agent =>
      agent.goal.kind === "operate" && agent.goal.machine === machine.id
    );
    const machineEl = machineEls[machine.id];
    if(!machineEl || !assigned.length) return;
    const labels = assigned.map(agent =>
      `<span style="--agent-color:${agentColor(agent)}">${agentDisplayId(agent.id)}</span>`
    ).join("");
    machineEl.insertAdjacentHTML("beforeend", `<span class="machine-goal-ids" aria-label="Target for robots ${assigned.map(agent => agentDisplayId(agent.id)).join(" and ")}">${labels}</span>`);
  });

  activeAgents.forEach(agent => {
    const target = goalCell(scn, agent);
    const targetIds = targetGroups[K(target[0], target[1])];
    const targetIndex = targetIds.indexOf(agent.id);
    const targetIsMachine = Object.values(scn.machines).some(machine => sameCell(machine.cell, target));
    if(targetIsMachine) return;
    const inset = targetIsMachine ? 0 : targetIndex * 4;
    const ring = document.createElement("div");
    ring.className = "ring";
    if(targetIds.length > 1) ring.classList.add("shared-target-ring");
    ring.style.left = (target[1] * CELL + inset) + "px";
    ring.style.top = (target[0] * CELL + inset) + "px";
    ring.style.width = (CELL - 4 - inset * 2) + "px";
    ring.style.height = (CELL - 4 - inset * 2) + "px";
    ring.style.borderColor = agentColor(agent);
    ring.style.setProperty("--agent-color", agentColor(agent));
    ring.classList.add("goal-" + agent.goal.kind);
    if(targetIsMachine){
      ring.classList.add("machine-target-ring");
    }
    ring.setAttribute("aria-label", SIMPLE_FAMILY_RULE_LANGUAGE
      ? `Charging bay ${agentTargetNumber(agent)} for Robot ${agentTargetNumber(agent)}, ${ROLE_ZH[agent.role] || agent.role}`
      : `Robot ${agentDisplayId(agent.id)} target: ${goalLabel(agent)}`);
    ring.innerHTML = targetMarkup(agent, targetIndex, targetIsMachine);
    board.appendChild(ring);
  });

  scn.agents.forEach(agent => {
    const robot = document.createElement("div");
    robot.className = "robot" + (agent.active ? "" : " off-duty");
    robot.dataset.agentId = agent.id;
    robot.dataset.role = agent.role;
    const robotSize = Math.max(18, CELL - 10);
    robot.style.width = robotSize + "px";
    robot.style.height = robotSize + "px";
    robot.style.background = agentColor(agent);
    const movement = displayedMovement(agent);
    const identity = SIMPLE_FAMILY_RULE_LANGUAGE
      ? `Robot ${agentTargetNumber(agent)}, ${ROLE_ZH[agent.role] || agent.role}, movement ${MOVEMENT_ARROWS[movement] || movement}`
      : `Robot ${agentDisplayId(agent.id)}`;
    robot.setAttribute("aria-label", agent.active ? identity : `${identity}: off duty`);
    robot.innerHTML = robotMarkup(agent, null);
    board.appendChild(robot);
    robotEls[agent.id] = robot;
  });

  renderFrame(initialFrame());
}

function initialFrame(){
  const pos = Object.fromEntries(scn.agents.map(a => [a.id, a.pos]));
  const agents = {};
  scn.agents.forEach(agent => {
    agents[agent.id] = {
      state:agent.active ? "pending" : "off-duty",
      done:!agent.active,
      offDuty:!agent.active,
      waiting:false,
      failed:false,
      step_index:null,
      step_count:null,
      next_step:"",
    };
  });
  return { pos, event:null, agents, tick:0 };
}

function stateText(meta){
  if(!meta) return "Not run";
  if(meta.offDuty) return "Off duty";
  if(meta.failed) return "Failed";
  if(meta.done) return "Complete";
  if(meta.waiting) return "Waiting by rule";
  if(meta.step_count === null || meta.step_count === undefined) return "Not run";
  return "Moving";
}

function stateClass(meta){
  if(!meta) return "idle";
  if(meta.offDuty) return "off-duty";
  if(meta.failed) return "bad";
  if(meta.done) return "ok";
  if(meta.waiting) return "wait";
  return "run";
}

function goalLabel(agent){
  const target = goalCell(scn, agent);
  if(agent.goal.kind === "deliver") return `deliver ${agent.goal.item} to (${target[0]}, ${target[1]})`;
  if(agent.goal.kind === "operate") return `leave through the ${machineLabel(agent.goal.machine)}`;
  return `reach (${target[0]}, ${target[1]})`;
}

function agentBadge(agent, className=""){
  return `<span class="agent-chip ${className}">${agentAvatar(agent)}${spillIconBadge(agent, "chip-spill")}</span>`;
}

function legendSection(title, content, className=""){
  if(!content) return "";
  return `<section class="legend-section ${className}"><div class="legend-title">${title}</div><div class="legend-grid">${content}</div></section>`;
}

function legendTile(symbol, title, detail="", extraClass=""){
  return `<div class="legend-tile ${extraClass}">${symbol}<span class="legend-copy"><strong>${title}</strong>${detail ? `<small>${detail}</small>` : ""}</span></div>`;
}

function legendSample(text, className=""){
  return `<span class="legend-sample ${className}">${text}</span>`;
}

function legendIcon(iconName, className=""){
  return `<span class="legend-symbol ${className}">${icon(iconName)}</span>`;
}

function statePill(meta){
  return `<span class="state-pill ${stateClass(meta)}">${stateText(meta)}</span>`;
}

function renderAgentProgress(frame){
  const panel = $("agent-progress");
  if(!panel) return;
  panel.innerHTML = "";
  panel.hidden = true;
}

function renderFrame(frame){
  Object.values(machineEls).forEach(el => el.classList.remove("available"));
  const releasedMachines = new Set();
  const occupiedMachines = new Set();
  scn.agents.forEach(agent => {
    const p = frame.pos[agent.id];
    const el = robotEls[agent.id];
    if(!el || !p) return;
    const meta = frame.agents?.[agent.id] || frame.agents?.[String(agent.id)] || null;
    const released = !!meta?.released;
    el.classList.toggle("released", released);
    el.setAttribute("aria-hidden", released ? "true" : "false");
    const robotSize = Number.parseFloat(el.style.width) || Math.max(18, CELL - 10);
    const robotInset = Math.max(2, (CELL - 4 - robotSize) / 2);
    el.style.left = (p[1] * CELL + robotInset) + "px";
    el.style.top = (p[0] * CELL + robotInset) + "px";
    el.classList.toggle("done", !!meta?.done);
    el.classList.toggle("off-duty", !!meta?.offDuty);
    el.classList.toggle("waiting", !!meta?.waiting);
    el.classList.toggle("failed", !!meta?.failed);
    const movement = displayedMovement(agent, meta);
    const identity = SIMPLE_FAMILY_RULE_LANGUAGE
      ? `${ROLE_ZH[agent.role] || agent.role}, movement ${MOVEMENT_ARROWS[movement] || movement}`
      : "";
    el.setAttribute("aria-label", SIMPLE_FAMILY_RULE_LANGUAGE
      ? `Robot ${agentTargetNumber(agent)}, ${identity}: ${stateText(meta)}`
      : `Robot ${agentDisplayId(agent.id)}: ${stateText(meta)}`);
    el.innerHTML = robotMarkup(agent, meta);
    if(agent.goal?.kind === "operate"){
      if(released){
        releasedMachines.add(agent.goal.machine);
      }else if(sameCell(p, scn.machines[agent.goal.machine]?.cell)){
        occupiedMachines.add(agent.goal.machine);
      }
    }
  });
  releasedMachines.forEach(machineId => {
    if(!occupiedMachines.has(machineId)) machineEls[machineId]?.classList.add("available");
  });
  document.querySelectorAll(".cell.flash").forEach(el => el.classList.remove("flash"));
  if(frame.event && frame.event.cell && frame.event.type !== "machine-complete"){
    const cell = document.querySelector('[data-cell="' + K(frame.event.cell[0], frame.event.cell[1]) + '"]');
    if(cell) cell.classList.add("flash");
  }
  renderAgentProgress(frame);
  updateFrameButtons();
}

function schemaObject(id){
  return RULE_SCHEMA.find(object => object.id === id) || null;
}

function schemaProperty(objectId, propertyId){
  return schemaObject(objectId)?.properties.find(property => property.id === propertyId) || null;
}

function conditionText(cond){
  if(cond.p === "target_type"){
    const targetType = {
      road:"an ordinary road square",
      passage:"a narrow-passage square",
      machine:"an exit",
      cold:"cold storage",
    }[cond.v] || cond.v;
    return `the next square is ${targetType}`;
  }
  if(cond.p === "role"){
    const role = ROLE_ZH[cond.v] || cond.v;
    return SIMPLE_FAMILY_RULE_LANGUAGE
      ? `the robot is ${role}`
      : `the robot's role is ${role}`;
  }
  if(cond.p === "carrying"){
    return "the robot is carrying a spill";
  }
  if(cond.p === "move_dir"){
    if(SIMPLE_FAMILY_RULE_LANGUAGE){
      return `the robot's movement direction is ${MOVEMENT_ARROWS[cond.v] || cond.v}`;
    }
    const direction = {N:"north", S:"south", E:"east", W:"west"}[cond.v] || cond.v;
    return `the robot is moving ${direction}`;
  }
  if(cond.p === "station_marker"){
    const marker = {red:"red", blue:"blue", green:"green"}[cond.v] || cond.v;
    return `the target station is ${marker}`;
  }
  if(cond.p === "contested"){
    return "the robot's movement conflicts with another robot";
  }
  return cond.label || `${cond.p}: ${cond.v}`;
}

function displayCondition(_rule, cond){
  return conditionText(cond);
}

function cloneCondition(cond){
  return {
    object:cond.object,
    property:cond.property,
    p:cond.p,
    v:cond.v,
    negated:false,
  };
}

function cloneRule(rule, sourceLibraryId=null){
  return {
    id:nextRuleId++,
    action:"MOVE",
    conds:rule.conds.map(cloneCondition),
    editor:null,
    sourceLibraryId,
  };
}

function duplicateRuleForEdit(rule, sourceIndex){
  if(!rule.conds.length){
    showNotice("Add a condition before duplicating this rule.");
    return;
  }
  const duplicate = cloneRule(rule, rule.sourceLibraryId || null);
  const preferredIndex = Math.max(
    0,
    duplicate.conds.findIndex(condition => condition.p === "move_dir" || condition.p === "role"),
  );
  const condition = duplicate.conds[preferredIndex];
  duplicate.editor = {
    conditionIndex:preferredIndex,
    object:condition.object,
    property:condition.property,
    value:condition.v,
  };
  rules.push(duplicate);
  recordRuleEvent("rule_duplicated_for_edit", {
    source_rule_id:rule.id,
    source_rule_index:sourceIndex,
    rule_id:duplicate.id,
    rule_index:rules.length - 1,
    condition_index:preferredIndex,
  });
  renderRules();
}

function starterRulesFor(task){
  return (task?.starter_rulebook || []).map(rule => cloneRule({
    action:"MOVE",
    conds:rule.conds || [],
  }));
}

function loadStarterRules(task){
  const starter = starterRulesFor(task);
  if(!starter.length) return [];
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    simpleFamilySelection = starter[0]?.conds?.[0]?.p || null;
  }
  sceneRuleDrafts.set(task.id, starter);
  recordRuleEvent("starter_rulebook_loaded", {
    starter_rule_ids:starter.map(rule => rule.id),
    starter_rule_json:ruleJson(starter),
  });
  return starter;
}

function ruleSignature(rule){
  return rule.conds
    .map(cond => `${cond.p}|${String(cond.v)}`)
    .sort()
    .join(";");
}

function ruleText(rule){
  return `If ${rule.conds.map(c => displayCondition(rule, c)).join(" and ")}, then do not move into the square`;
}

function saveRuleToLibrary(rule, ruleIndex){
  if(!rule.conds.length){
    showNotice("Add a complete condition before saving this rule.");
    return;
  }
  const signature = ruleSignature(rule);
  const existing = library.find(entry => entry.signature === signature);
  if(existing){
    recordRuleEvent("library_save_skipped", {
      rule_id:rule.id,
      rule_index:ruleIndex,
      library_rule_id:existing.id,
      reason:"duplicate_rule",
    });
    setStatus("This rule is already in the library.", "");
    return;
  }
  const entry = {
    id:`L${Math.max(0, ...library.map(row => Number(row.id.slice(1)) || 0)) + 1}`,
    signature,
    sourceRuleId:rule.id,
    rule:{action:"MOVE", conds:rule.conds.map(cloneCondition)},
  };
  library.push(entry);
  recordRuleEvent("library_rule_saved", {
    rule_id:rule.id,
    rule_index:ruleIndex,
    library_rule_id:entry.id,
    rule:ruleJson([rule])[0],
  });
  renderRules();
}

function useLibraryRule(entry){
  const signature = entry.signature;
  if(rules.some(rule => ruleSignature(rule) === signature)){
    recordRuleEvent("library_rule_use_skipped", {
      library_rule_id:entry.id,
      reason:"already_active",
    });
    setStatus("This library rule is already active in the task.", "");
    return;
  }
  const rule = cloneRule(entry.rule, entry.id);
  rules.push(rule);
  recordRuleEvent("library_rule_used", {
    rule_id:rule.id,
    rule_index:rules.length - 1,
    library_rule_id:entry.id,
    source_rule_id:entry.sourceRuleId,
  });
  renderRules();
}

function removeLibraryRule(entry){
  library = library.filter(row => row.id !== entry.id);
  recordRuleEvent("library_rule_removed", {library_rule_id:entry.id});
  renderRules();
}

function renderLibrary(){
  const box = $("library");
  if(!box) return;
  box.innerHTML = "";
  $("library-count").textContent = `${library.length} saved`;
  if(!library.length){
    box.innerHTML = '<div class="library-empty">No saved rules yet.</div>';
    return;
  }
  library.forEach(entry => {
    const row = document.createElement("div");
    row.className = "library-row";
    const text = document.createElement("span");
    text.className = "library-rule-text";
    text.textContent = `${entry.id}: ${ruleText(entry.rule)}`;
    row.appendChild(text);

    const use = document.createElement("button");
    use.className = "library-use";
    use.textContent = "Add to rulebook";
    use.title = "Add this saved rule to the shared rulebook";
    use.onclick = () => useLibraryRule(entry);
    row.appendChild(use);

    const remove = document.createElement("button");
    remove.className = "library-remove";
    remove.textContent = "×";
    remove.title = "Remove this rule from the library";
    remove.setAttribute("aria-label", `Remove ${entry.id} from library`);
    remove.onclick = () => removeLibraryRule(entry);
    row.appendChild(remove);
    box.appendChild(row);
  });
}

function emptyConditionEditor(conditionIndex=null){
  return {
    conditionIndex,
    object:null,
    property:null,
    value:null,
  };
}

function editorSelect(className, placeholder, options, selected, onChange, disabled=false){
  const select = document.createElement("select");
  select.className = className;
  select.disabled = disabled;
  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = placeholder;
  select.appendChild(blank);
  options.forEach(option => {
    const row = document.createElement("option");
    row.value = String(option.id);
    row.textContent = option.label;
    row.selected = selected !== null && selected !== undefined && String(option.id) === String(selected);
    select.appendChild(row);
  });
  select.onchange = () => onChange(select.value);
  return select;
}

function editorField(label, control){
  const field = document.createElement("label");
  field.className = "editor-field";
  const caption = document.createElement("span");
  caption.className = "editor-field-label";
  caption.textContent = label;
  field.appendChild(caption);
  field.appendChild(control);
  return field;
}

function conditionPayload(cond){
  return {
    object:cond.object,
    property:cond.property,
    predicate:cond.p,
    value:cond.v,
    text:conditionText(cond),
  };
}

function conditionTerms(object){
  if(!object) return [];
  return object.properties.flatMap(property =>
    property.values.map(value => ({
      id:`${property.id}|${String(value.id)}`,
      label:value.label,
      property:property.id,
      predicate:property.predicate,
      value:value.id,
    }))
  );
}

function termPlaceholder(objectId){
  if(objectId === "target") return "Choose square fact";
  if(objectId === "robot") return "Choose robot fact";
  if(objectId === "movement") return "Choose movement fact";
  return "Choose fact";
}

function renderConditionEditor(rule, card){
  const editor = rule.editor;
  if(!editor) return;

  const panel = document.createElement("div");
  panel.className = "condition-editor";
  const prefix = document.createElement("span");
  prefix.className = "condition-builder-prefix";
  const hasPreviousCondition = editor.conditionIndex === null
    ? rule.conds.length > 0
    : editor.conditionIndex > 0;
  prefix.textContent = hasPreviousCondition
    ? "AND"
    : "WHEN";
  panel.appendChild(prefix);

  const object = schemaObject(editor.object);
  const property = schemaProperty(editor.object, editor.property);
  const availableObjects = RULE_SCHEMA;

  const objectSelect = editorSelect(
    "typed-select object-select",
    "Select object",
    availableObjects,
    editor.object,
    value => {
      editor.object = value || null;
      editor.property = null;
      editor.value = null;
      recordRuleEvent("condition_field_selected", {rule_id:rule.id, field:"object", value:value || null});
      renderRules();
    }
  );
  objectSelect.setAttribute("aria-label", "Condition object");
  panel.appendChild(objectSelect);

  const terms = conditionTerms(object);
  const selectedTerm = editor.property === null
    ? null
    : `${editor.property}|${String(editor.value)}`;
  const valueSelect = editorSelect(
    "typed-select value-select",
    "Select fact",
    terms,
    selectedTerm,
    value => {
      const selected = terms.find(option => option.id === value) || null;
      editor.property = selected?.property || null;
      editor.value = selected ? selected.value : null;
      recordRuleEvent("condition_term_selected", {
        rule_id:rule.id,
        object:editor.object,
        property:editor.property,
        predicate:selected?.predicate || null,
        value:editor.value,
        label:selected?.label || null,
      });
      renderRules();
    },
    !object
  );
  valueSelect.setAttribute("aria-label", "Condition fact");
  panel.appendChild(valueSelect);

  const actions = document.createElement("div");
  actions.className = "condition-editor-actions";
  const save = document.createElement("button");
  save.className = "btn condition-save";
  save.textContent = editor.conditionIndex === null ? "Add" : "Save";
  save.disabled = !object || !property || editor.value === null;
  save.onclick = () => {
    const duplicatePropertyIndex = rule.conds.findIndex((existing, index) =>
      index !== editor.conditionIndex && existing.property === property.id
    );
    if(duplicatePropertyIndex !== -1){
      showNotice("Each rule can use a property only once.");
      return;
    }
    const cond = {
      object:object.id,
      property:property.id,
      p:property.predicate,
      v:editor.value,
      negated:false,
    };
    const editing = editor.conditionIndex !== null;
    if(editing) rule.conds[editor.conditionIndex] = cond;
    else rule.conds.push(cond);
    recordRuleEvent(editing ? "condition_edited" : "condition_added", {
      rule_id:rule.id,
      condition_index:editing ? editor.conditionIndex : rule.conds.length - 1,
      condition:conditionPayload(cond),
    });
    rule.editor = null;
    renderRules();
  };
  actions.appendChild(save);

  const cancel = document.createElement("button");
  cancel.className = "btn condition-cancel";
  cancel.textContent = "Cancel";
  cancel.onclick = () => {
    recordRuleEvent("condition_editor_closed", {rule_id:rule.id, saved:false});
    rule.editor = null;
    renderRules();
  };
  actions.appendChild(cancel);
  panel.appendChild(actions);
  card.appendChild(panel);
}

function simpleField(predicate){
  return (EXPORTED_RULE_SCHEMA.fields || []).find(field => field.predicate === predicate) || null;
}

function simpleFamilyFor(sourceRules=rules){
  return sourceRules.find(rule => rule.conds.length)?.conds?.[0]?.p ||
    (sourceRules === rules ? simpleFamilySelection : null);
}

function simpleSelectedValues(sourceRules=rules, family=simpleFamilyFor(sourceRules)){
  const field = simpleField(family);
  if(!field) return [];
  const selected = new Set(sourceRules
    .flatMap(rule => rule.conds)
    .filter(cond => cond.p === family)
    .map(cond => String(cond.v)));
  return field.values.filter(value => selected.has(String(value.id)));
}

function simpleRuleMatchesAgent(agent, sourceRules=rules){
  if(!agent?.active) return false;
  const family = simpleFamilyFor(sourceRules);
  const selected = new Set(
    simpleSelectedValues(sourceRules, family).map(value => String(value.id))
  );
  if(family === "role") return selected.has(String(agent.role));
  if(family === "move_dir") return selected.has(String(agent.movementArrow));
  return false;
}

function renderRuleMatchPreview(){
  if(!SIMPLE_FAMILY_RULE_LANGUAGE) return;
  scn.agents.forEach(agent => {
    const matches = simpleRuleMatchesAgent(agent);
    robotEls[agent.id]?.classList.toggle("rule-preview-waits", matches);
  });
}

function naturalList(items){
  if(items.length < 2) return items[0] || "";
  if(items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

function simpleRuleSentence(sourceRules=rules){
  const family = simpleFamilyFor(sourceRules);
  const values = simpleSelectedValues(sourceRules, family);
  if(!family || !values.length) return "No waiting rule yet.";
  if(family === "role"){
    const types = naturalList(values.map(value => value.label));
    return values.length === 1
      ? `When two robots meet, the ${types} robot waits.`
      : `When two robots meet, robots of ${types} wait.`;
  }
  const directions = naturalList(values.map(value => value.symbol || MOVEMENT_ARROWS[value.id] || value.label));
  return values.length === 1
    ? `When two robots meet, the robot moving ${directions} waits.`
    : `When two robots meet, robots moving ${directions} wait.`;
}

function simpleCondition(field, value){
  return {
    object:field.object,
    property:field.id,
    p:field.predicate,
    v:value.id,
    negated:false,
  };
}

function resetRunAfterRuleEdit(){
  if(timer){
    clearInterval(timer);
    timer = null;
  }
  lastResult = null;
  lastFrames = [];
  frameIndex = 0;
  buildBoard();
  updateContinueButton();
  setStatus(
    simpleSelectedValues().length
      ? "Rule changed. Run it to test."
      : "No values selected. Run to see what happens without a waiting rule.",
    "",
  );
}

function chooseSimpleFamily(field){
  if(simpleFamilySelection === field.predicate) return;
  const previous = simpleFamilySelection;
  simpleFamilySelection = field.predicate;
  rules = [];
  recordRuleEvent("rule_family_changed", {
    previous_family:previous,
    family:field.predicate,
    cleared_previous_values:true,
  });
  resetRunAfterRuleEdit();
  renderRules();
}

function toggleSimpleValue(field, value){
  if(simpleFamilySelection !== field.predicate){
    chooseSimpleFamily(field);
  }
  const index = rules.findIndex(rule =>
    rule.conds.length === 1 &&
    rule.conds[0].p === field.predicate &&
    String(rule.conds[0].v) === String(value.id)
  );
  if(index >= 0){
    const [removed] = rules.splice(index, 1);
    recordRuleEvent("rule_value_removed", {
      family:field.predicate,
      value:value.id,
      rule_id:removed.id,
    });
  }else{
    const rule = {
      id:nextRuleId++,
      action:"MOVE",
      conds:[simpleCondition(field, value)],
      editor:null,
    };
    rules.push(rule);
    recordRuleEvent("rule_value_added", {
      family:field.predicate,
      value:value.id,
      rule_id:rule.id,
    });
  }
  resetRunAfterRuleEdit();
  renderRules();
}

function renderSimpleRuleEditor(){
  const box = $("rules");
  const actions = document.querySelector(".rulebook-actions");
  const libraryPanel = document.querySelector(".library-panel");
  if(actions) actions.hidden = true;
  if(libraryPanel) libraryPanel.hidden = true;
  box.innerHTML = "";

  const editor = document.createElement("div");
  editor.className = "simple-rule-editor";
  const context = document.createElement("div");
  context.className = "simple-rule-context";
  context.textContent = "WHEN TWO ROBOTS MEET";
  editor.appendChild(context);

  const fields = EXPORTED_RULE_SCHEMA.fields || [];
  const familyStep = document.createElement("section");
  familyStep.className = "simple-rule-step";
  familyStep.innerHTML = '<div class="simple-step-heading"><span>1</span><strong>Choose what the rule uses</strong></div>';
  const familyButtons = document.createElement("div");
  familyButtons.className = "simple-family-buttons";
  fields.forEach(field => {
    const button = document.createElement("button");
    const selected = simpleFamilySelection === field.predicate;
    button.type = "button";
    button.className = `simple-family-button${selected ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = field.predicate === "role"
      ? `${icon("robot", "family-button-icon")}<span>Robot type</span>`
      : '<span class="family-arrow-icon" aria-hidden="true">\u2197</span><span>Movement direction</span>';
    button.onclick = () => chooseSimpleFamily(field);
    familyButtons.appendChild(button);
  });
  familyStep.appendChild(familyButtons);
  editor.appendChild(familyStep);

  const field = simpleField(simpleFamilySelection);
  const selectedValues = new Set(simpleSelectedValues().map(value => String(value.id)));
  if(field){
    const valueStep = document.createElement("section");
    valueStep.className = "simple-rule-step";
    const valueHeading = simpleFamilySelection === "role"
      ? "Choose the type(s)"
      : "Choose the direction(s)";
    valueStep.innerHTML = `<div class="simple-step-heading"><span>2</span><strong>${valueHeading}</strong></div><p class="simple-selection-hint">Click to select. Click again to remove.</p>`;
    const valueGrid = document.createElement("div");
    valueGrid.className = "simple-value-grid";
    field.values.forEach(value => {
      const button = document.createElement("button");
      const selected = selectedValues.has(String(value.id));
      button.type = "button";
      button.className = `simple-value-button value-${field.predicate}${selected ? " selected" : ""}`;
      button.dataset.family = field.predicate;
      button.dataset.value = value.id;
      button.setAttribute("aria-pressed", String(selected));
      button.title = value.label;
      if(field.predicate === "role"){
        button.innerHTML = `<span class="simple-role-swatch simple-type-swatch" style="--role-color:${SIMPLE_ROBOT_COLOR}">${icon("robot", "simple-role-icon")}${robotTypeMark(value.id, "simple-type-letter")}</span><span>${value.label}</span>`;
      }else{
        button.innerHTML = `<span class="simple-arrow-value">${value.symbol || MOVEMENT_ARROWS[value.id] || value.id}</span><span>${value.label}</span>`;
      }
      button.onclick = () => toggleSimpleValue(field, value);
      valueGrid.appendChild(button);
    });
    valueStep.appendChild(valueGrid);
    editor.appendChild(valueStep);
  }

  if(selectedValues.size){
    const current = document.createElement("section");
    current.className = "simple-current-rule";
    current.innerHTML = `<span>CURRENT RULE</span><strong>${simpleRuleSentence()}</strong>`;
    editor.appendChild(current);
  }
  box.appendChild(editor);

  const count = $("rule-count");
  if(count) count.textContent = `${simpleSelectedValues().length} values`;
  const runButton = $("run");
  if(runButton) runButton.disabled = false;
  renderRuleMatchPreview();
  buildTabs();
}

function renderRules(){
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    renderSimpleRuleEditor();
    return;
  }
  const box = $("rules");
  box.innerHTML = "";
  $("rule-count").textContent = `${rules.filter(rule => rule.conds.length > 0).length} active`;
  if(rules.length === 0){
    box.innerHTML = "";
  }

  const displayRules = rules
    .map((rule, sourceIndex) => ({rule, sourceIndex}))
    .sort((a, b) => Number(a.rule.conds.length > 0) - Number(b.rule.conds.length > 0));
  let activeRuleNumber = 0;

  displayRules.forEach(({rule, sourceIndex}) => {
    if(rule.conds.length > 0 && activeRuleNumber === 0){
      const label = document.createElement("div");
      label.className = "rule-group-label";
      label.textContent = "Active rules";
      box.appendChild(label);
    }
    if(rule.conds.length > 0 && activeRuleNumber > 0){
      const separator = document.createElement("div");
      separator.className = "rule-or-separator";
      separator.textContent = "OR";
      separator.setAttribute("aria-label", "or");
      box.appendChild(separator);
    }
    const ruleLabel = rule.conds.length === 0
      ? ""
      : `Rule ${++activeRuleNumber}`;
    const card = document.createElement("div");
    card.className = "rule";

    const header = document.createElement("div");
    header.className = "rule-header";
    header.innerHTML = ruleLabel ? `<strong>${ruleLabel}</strong>` : "";
    const actions = document.createElement("div");
    actions.className = "rule-actions";
    const duplicate = document.createElement("button");
    duplicate.className = "duplicate-rule";
    duplicate.textContent = "Duplicate";
    duplicate.title = rule.conds.length
      ? "Copy this rule and change one condition"
      : "Add a condition before duplicating";
    duplicate.disabled = !rule.conds.length;
    duplicate.onclick = () => duplicateRuleForEdit(rule, sourceIndex);
    actions.appendChild(duplicate);
    const save = document.createElement("button");
    save.className = "save-rule";
    save.textContent = "Save to library";
    if(!rule.conds.length) save.classList.add("needs-condition");
    save.title = rule.conds.length
      ? "Save this rule for reuse in another task"
      : "Add a complete condition before saving";
    save.onclick = () => saveRuleToLibrary(rule, sourceIndex);
    actions.appendChild(save);

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "×";
    del.title = "Remove rule";
    del.setAttribute("aria-label", "Remove rule");
    del.onclick = () => {
      recordRuleEvent("rule_removed", {rule_id:rule.id, rule_index:sourceIndex});
      rules.splice(sourceIndex, 1);
      renderRules();
    };
    actions.appendChild(del);
    header.appendChild(actions);
    card.appendChild(header);

    const actionLine = document.createElement("div");
    actionLine.className = "rule-action-line";
    actionLine.innerHTML = CLEAN_RULE_LANGUAGE
      ? '<strong>A ROBOT WAITS</strong>'
      : '<span class="kw2">FORBID</span><strong>MOVE INTO A SQUARE</strong>';
    card.appendChild(actionLine);

    const conditions = document.createElement("div");
    conditions.className = "condition-list";
    rule.conds.forEach((cond, ci) => {
      const row = document.createElement("div");
      row.className = "condition-row";
      const join = document.createElement("span");
      join.className = "condition-join";
      join.textContent = ci === 0 ? "WHEN" : "AND";
      row.appendChild(join);

      const edit = document.createElement("button");
      edit.className = "condition-sentence";
      edit.textContent = conditionText(cond);
      edit.title = "Edit this condition";
      edit.onclick = () => {
        rule.editor = {
          conditionIndex:ci,
          object:cond.object,
          property:cond.property,
          value:cond.v,
        };
        recordRuleEvent("condition_editor_opened", {rule_id:rule.id, condition_index:ci, mode:"edit"});
        renderRules();
      };
      row.appendChild(edit);

      const remove = document.createElement("button");
      remove.className = "condition-remove";
      remove.textContent = "×";
      remove.title = "Delete this condition";
      remove.onclick = () => {
        recordRuleEvent("condition_removed", {
          rule_id:rule.id,
          condition_index:ci,
          condition:conditionPayload(cond),
        });
        rule.conds.splice(ci, 1);
        rule.editor = null;
        renderRules();
      };
      row.appendChild(remove);
      conditions.appendChild(row);
    });
    card.appendChild(conditions);

    if(!rule.editor && rule.conds.length < MAX_RULE_CONDITIONS){
      const add = document.createElement("button");
      add.className = "add-condition";
      add.textContent = "+ Add condition";
      add.onclick = () => {
        rule.editor = emptyConditionEditor();
        recordRuleEvent("condition_editor_opened", {rule_id:rule.id, condition_index:null, mode:"add"});
        renderRules();
      };
      card.appendChild(add);
    }

    renderConditionEditor(rule, card);
    box.appendChild(card);
  });
  renderLibrary();
  buildTabs();
}

function renderLegend(){
  const activeAgents = scn.agents.filter(agent => agent.active);
  const legendAgents = SIMPLE_FAMILY_RULE_LANGUAGE
    ? [...new Map(activeAgents.map(agent => [agent.role, agent])).values()]
    : activeAgents;
  const robotTiles = legendAgents.map(agent => {
    const symbol = agentAvatar(agent, "legend-robot-avatar");
    return SIMPLE_FAMILY_RULE_LANGUAGE
      ? `<div class="legend-tile robot-identity-tile" data-robot-type="${agent.role}">${symbol}<span class="legend-copy"><strong>${ROLE_ZH[agent.role] || agent.role}</strong><small>Robot type</small></span></div>`
      : `<div class="legend-tile robot-identity-tile" data-agent-id="${agent.id}">${symbol}<span class="legend-copy"><strong>Robot ${agentDisplayId(agent.id)}</strong><small>${ROLE_ZH[agent.role] || agent.role}</small></span></div>`;
  }).join("");

  const chargingTile = SIMPLE_FAMILY_RULE_LANGUAGE
    ? legendTile(
        '<span class="legend-target-sample" style="--agent-color:#2d70b3"><span>1</span></span>',
        "Numbered charging bay",
        "Robot 1 goes to Bay 1",
        "charging-bay-tile",
      )
    : "";

  const markerTiles = [...new Set(Object.values(scn.machines).map(machine => machine.marker || "plain"))]
    .map(marker => legendTile(
      `<span class="machine-sample marker-${marker}">${icon("machine")}</span>`,
      marker === "plain" ? "Exit" : `${marker[0].toUpperCase() + marker.slice(1)} exit`,
      marker === "plain" ? "One robot can enter at a time" : "",
      `machine-tile marker-${marker}`,
    ));
  const passageTile = Object.keys(scn.passages).length
    ? legendTile(
        passageMapSample("legend-symbol"),
        "Narrow passage",
        "",
        "passage-tile",
      )
    : "";
  const legend = $("legend");
  if(legend) legend.innerHTML = `<section class="map-key compact-map-key" aria-labelledby="map-key-title"><h3 class="map-key-title" id="map-key-title">Key</h3><div class="legend-grid essential-key">${robotTiles}${chargingTile}${passageTile}${markerTiles.join("")}</div></section>`;
  const conditionLines = RULE_SCHEMA.map(object => {
    const fields = object.properties.map(property =>
      `${property.label}: ${property.values.map(value => value.label).join(" / ")}`
    );
    return `${object.label} — ${fields.join("; ")}`;
  });
  const atomicPredicateCount = RULE_SCHEMA.reduce(
    (sum, object) => sum + object.properties.reduce(
      (objectSum, property) => objectSum + property.values.length,
      0
    ),
    0
  );
  $("vocab").innerHTML = [
    `<div class="vocab-summary">${CLEAN_RULE_LANGUAGE ? "Waiting-rule" : "Typed MOVE-rule"} space · ${atomicPredicateCount} positive conditions · up to ${MAX_RULE_CONDITIONS} conditions</div>`,
    `<details class="vocab-detail"><summary>Show typed fields</summary><div>${conditionLines.join("<br>")}<br>Runs on this page = human attempts.</div></details>`
  ].join("");
  renderRuleMatchPreview();
}

function ruleSummary(){
  if(SIMPLE_FAMILY_RULE_LANGUAGE) return simpleRuleSentence();
  const active = rules.filter(r => r.conds.length > 0);
  if(active.length === 0) return "(no rules)";
  return active.map(ruleText).join("; ");
}

function ruleJson(sourceRules=rules){
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    const family = simpleFamilyFor(sourceRules);
    const values = simpleSelectedValues(sourceRules, family);
    if(!family || !values.length) return [];
    return [{
      rule_id:"shared_waiting_rule",
      family,
      predicate:family,
      values:values.map(value => value.id),
      value_join:"OR",
      text:simpleRuleSentence(sourceRules),
    }];
  }
  return sourceRules
    .filter(r => r.conds.length > 0)
    .map(r => ({
      rule_id:r.id,
      source_library_id:r.sourceLibraryId || null,
      action:"MOVE",
      literals:r.conds.map(c => ({
        object:c.object,
        property:c.property,
        predicate:c.p,
        value:c.v,
        label:displayCondition(r, c),
      })),
    }));
}

function renderLog(){
  const el = $("log");
  if(runs.length === 0){ el.innerHTML = ""; return; }
  let html = '<h4>Run log (human attempts = ' + runs.length + ')</h4>';
  runs.forEach(r => {
    html += '<div class="logrow"><span class="n">' + r.global_attempt_index + '</span><span class="log-main"><strong>' +
      r.shift_label + '</strong> · ' + r.rule_summary + '<span class="reason">' + r.reason_text + '</span></span><span class="res ' +
      (r.ok ? "ok" : "bad") + '">' + (r.ok ? "Success" : "Fail") + '</span></div>';
  });
  el.innerHTML = html;
}

function setStatus(text, kind){
  const status = $("status");
  status.textContent = text;
  status.className = "status" + (kind ? " " + kind : "");
}

function feedbackCellType(cell){
  if(!cell) return "square";
  if(Object.values(scn.machines).some(machine => sameCell(machine.cell, cell))){
    return "exit";
  }
  if(scn.mergeCells.has(K(cell[0], cell[1]))) return "shared square";
  if(scn.passageCells.has(K(cell[0], cell[1]))) return "narrow passage";
  const zone = scn.zones[K(cell[0], cell[1])];
  if(zone === "cold") return "cold-storage area";
  return "route square";
}

function feedbackAgent(id){
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    const agent = scn.agents.find(row => String(row.id) === String(id));
    return `Robot ${agentTargetNumber(agent)} (${ROLE_ZH[agent?.role] || agent?.role || "unknown type"})`;
  }
  return `Robot ${agentDisplayId(id)}`;
}

function lastWaitingFrame(result){
  return [...(result.frames || [])].reverse().find(frame =>
    Object.values(frame.agents || {}).some(agent => agent.waiting)
  ) || null;
}

const FEEDBACK_DIRECTIONS = {
  N:"\u2191", NE:"\u2197", E:"\u2192", SE:"\u2198",
  S:"\u2193", SW:"\u2199", W:"\u2190", NW:"\u2196",
};

function feedbackMove(id, frame){
  const agent = scn.agents.find(row => String(row.id) === String(id));
  const direction = frame?.agents?.[String(id)]?.intent?.dir || agent?.movementArrow;
  if(!direction) return feedbackAgent(id);
  return SIMPLE_FAMILY_RULE_LANGUAGE
    ? `${feedbackAgent(id)} (${FEEDBACK_DIRECTIONS[direction] || direction})`
    : `${feedbackAgent(id)} moving ${FEEDBACK_DIRECTIONS[direction] || direction}`;
}

function feedbackRuleMatches(result, frame, ids, passageContested=false){
  const norms = result.testedNorms || [];
  return Object.fromEntries(ids.map(id => {
    const intent = frame?.agents?.[String(id)]?.intent;
    const agent = scn.agents.find(row => String(row.id) === String(id));
    if(!intent || !agent) return [String(id), []];
    const ctx = {
      world:scn,
      agent,
      action:"MOVE",
      cell:intent.cell,
      moveDir:intent.dir,
      plannedTurn:null,
      item:null,
      machine:null,
      contested:true,
      passageContested,
    };
    return [String(id), norms
      .filter(norm => matchesNorm(norm, ctx))
      .map((norm, index) => norm.feedbackLabel || `Rule ${index + 1}`)];
  }));
}

function joinedMoves(ids, frame){
  return ids.map(id => feedbackMove(id, frame)).join(" and ");
}

function uniqueRuleLabels(matches, ids){
  return [...new Set(ids.flatMap(id => matches[String(id)] || []))];
}

function ruleStopExplanation(matches, ids, frame){
  const stoppedByRule = new Map();
  ids.forEach(id => {
    (matches[String(id)] || []).forEach(label => {
      const stopped = stoppedByRule.get(label) || [];
      stopped.push(id);
      stoppedByRule.set(label, stopped);
    });
  });
  return [...stoppedByRule.entries()]
    .map(([label, stopped]) => `${label} stops ${joinedMoves(stopped, frame)}`)
    .join("; ");
}

function buildRunFeedback(result){
  const frame = result.frames?.[result.frames.length - 1] || null;
  const event = frame?.event || null;
  const step = frame?.tick ?? Math.max(0, (result.frames?.length || 1) - 1);
  const ids = event?.agents || (event?.agent !== undefined ? [event.agent] : []);
  const robots = SIMPLE_FAMILY_RULE_LANGUAGE
    ? joinedMoves(ids, frame)
    : ids.map(id => feedbackAgent(id, frame)).join(" and ");
  const square = feedbackCellType(event?.cell);

  if(result.ok){
    return {
      title:"Success",
      observation:SIMPLE_FAMILY_RULE_LANGUAGE
        ? "Every robot reached its assigned charging bay."
        : "Every robot reached its matching target.",
      kind:"ok",
    };
  }

  if(result.reason?.startsWith("pollution:")){
    const robotNames = ids.map(id => feedbackAgent(id)).join(" and ");
    return {
      title:"Something went wrong",
      observation:`At step ${step}, ${robotNames} carried a spill into the ${square}, so that area was contaminated. Use the step buttons to look back at the move.`,
      kind:"bad",
    };
  }
  if(result.reason === "collision" || result.reason === "resource-conflict"){
    const matches = feedbackRuleMatches(result, frame, ids);
    const matchedRules = uniqueRuleLabels(matches, ids);
    if(square === "exit"){
      const coverage = matchedRules.length
        ? `${matchedRules.join(" and ")} did not leave one robot free to enter first.`
        : `None of your current rules covered ${joinedMoves(ids, frame)}, so neither robot waited.`;
      return {
        title:"This exit has an entry order",
        observation:`At step ${step}, ${robots} tried to enter the exit together. ${coverage} Change the rule so one robot waits while the other enters first.`,
        kind:"bad",
      };
    }
    const coverage = matchedRules.length
      ? "Your rule did not let one robot move first."
      : "Your rule matched neither robot, so neither waited.";
    return {
      title:"Collision at the shared square",
      observation:`Step ${step}: ${robots} arrived together. ${coverage}`,
      kind:"bad",
    };
  }
  if(result.reason === "passage-conflict"){
    const matches = feedbackRuleMatches(result, frame, ids, true);
    const matchedRules = uniqueRuleLabels(matches, ids);
    const hasPassageRule = (result.testedNorms || []).some(hasPassageCondition);
    let diagnosis;
    if(!hasPassageRule){
      diagnosis = "Your current rules do not name the narrow passage, so they cannot decide who waits at its entrances.";
    }else if(!matchedRules.length){
      diagnosis = `Your narrow-passage rule did not match ${joinedMoves(ids, frame)}.`;
    }else{
      diagnosis = `${matchedRules.join(" and ")} did not leave exactly one entrance free.`;
    }
    return {
      title:"The narrow passage was not resolved",
      observation:`At step ${step}, ${robots} entered from opposite ends. ${diagnosis} Adjust a narrow-passage rule so one robot waits at the entrance.`,
      kind:"bad",
    };
  }
  if(result.reason === "lane-blocked"){
    const blocker = event?.blocking_agent !== undefined
      ? feedbackMove(event.blocking_agent, frame)
      : "The robot at the near destination";
    const traveler = event?.moving_agent !== undefined
      ? feedbackMove(event.moving_agent, frame)
      : "the other robot";
    return {
      title:"The wrong robot went first",
      observation:`${blocker} went first and stopped at the near destination, blocking ${traveler}. Your rule selected the wrong robot to wait.`,
      kind:"bad",
    };
  }
  if(result.reason === "priority-violation"){
    const entrant = event?.agent !== undefined ? feedbackAgent(event.agent, frame) : "A robot";
    const waitingIds = ids.filter(id => String(id) !== String(event?.agent));
    const matches = feedbackRuleMatches(result, frame, ids);
    const waitingMove = waitingIds.length ? feedbackMove(waitingIds[0], frame) : "the other robot";
    const waitingRules = uniqueRuleLabels(matches, waitingIds);
    const cause = waitingRules.length
      ? `${waitingRules.join(" and ")} made ${waitingMove} wait, so ${entrant} entered first.`
      : `${entrant} entered first because the other robot was stopped.`;
    return {
      title:"The exit received the wrong robot first",
      observation:`At step ${step}, ${cause} This exit requires the opposite order, so change which approach waits.`,
      kind:"bad",
    };
  }
  if(result.reason === "no-plan"){
    return {
      title:"One robot has no way through",
      observation:`With these rules, ${feedbackAgent(result.blockedAgent)} cannot find a route to its destination. A rule may be stopping more moves than you intended.`,
      kind:"bad",
    };
  }
  if(result.reason === "timeout"){
    const waitingFrame = lastWaitingFrame(result);
    const waitingIds = Object.entries(waitingFrame?.agents || {})
      .filter(([, meta]) => meta.waiting)
      .map(([id]) => id);
    const waitingRobots = waitingIds.map(id => feedbackAgent(id, waitingFrame)).join(" and ");
    const matches = feedbackRuleMatches(result, waitingFrame, waitingIds);
    const matchedRules = uniqueRuleLabels(matches, waitingIds);
    const stoppedByRules = ruleStopExplanation(matches, waitingIds, waitingFrame);
    const targetCell = waitingFrame?.agents?.[waitingIds[0]]?.intent?.cell;
    const target = feedbackCellType(targetCell);
    const cause = matchedRules.length
      ? `At the ${target}, ${stoppedByRules}.`
      : `${waitingRobots || "The robots"} are repeatedly being stopped at the ${target}.`;
    return {
      title:"Both robots are being told to wait",
      observation:`${cause} Neither robot can enter, so the task cannot continue.`,
      kind:"bad",
    };
  }
  if(result.reason === "machine-order"){
    return {
      title:"The exit was not open",
      observation:`At step ${step}, ${robots} tried to enter the exit too soon. Look back one step to see what needed to happen first.`,
      kind:"bad",
    };
  }
  return {
    title:"This run did not work yet",
    observation:`${reasonText(result.reason, result)} Use the step buttons to inspect the last move, then adjust your rules and try again.`,
    kind:"bad",
  };
}

function setRunFeedback(result){
  const status = $("status");
  const feedback = buildRunFeedback(result);
  status.className = `status run-feedback ${feedback.kind}`;
  status.replaceChildren();
  const title = document.createElement("strong");
  title.className = "feedback-title";
  title.textContent = feedback.title;
  const observation = document.createElement("span");
  observation.textContent = feedback.observation;
  status.append(title, observation);
  updateContinueButton();
  return feedback;
}

function updateContinueButton(){
  const button = $("continue");
  if(!button) return;
  const nextTask = TASKS[curIndex + 1];
  const canContinue = !!lastResult?.ok && !!nextTask && taskUnlocked(nextTask);
  button.hidden = !canContinue;
  if(canContinue) button.textContent = `Next: ${nextTask.label} \u2192`;
  const runButton = $("run");
  if(runButton){
    runButton.textContent = lastResult?.ok ? "Run again" : "Run rule";
    runButton.classList.toggle("primary", !lastResult?.ok);
    runButton.classList.toggle("secondary-run", !!lastResult?.ok);
  }
}

function closeNotice(){
  const backdrop = $("notice-backdrop");
  if(backdrop) backdrop.hidden = true;
}

function showNotice(message){
  const backdrop = $("notice-backdrop");
  const text = $("notice-message");
  if(!backdrop || !text) return;
  text.textContent = message;
  backdrop.hidden = false;
  $("notice-close")?.focus();
}

function updateFrameButtons(){
  const prev = $("prev");
  const next = $("next");
  const label = $("step-label");
  if(!prev || !next) return;
  const enabled = lastFrames.length > 0;
  prev.disabled = !enabled || frameIndex <= 0;
  next.disabled = !enabled || frameIndex >= lastFrames.length - 1;
  if(label){
    label.textContent = enabled ? frameStepLabel(frameIndex) : "Ready";
  }
}

function frameStepLabel(index){
  if(!lastFrames.length || index <= 0) return "Start";
  const frame = lastFrames[index];
  const total = lastFrames.length - 1;
  const waiting = Object.values(frame?.agents || {}).some(agent => agent.waiting);
  const failed = frame?.event && frame.event.type !== "machine-complete";
  if(lastResult?.ok && index === total) return `Finish · ${index}/${total}`;
  if(failed && index === total) return `Conflict · ${index}/${total}`;
  if(waiting) return `Wait · ${index}/${total}`;
  return `Move · ${index}/${total}`;
}

function showFrameAt(index, updateStatus=true){
  if(!lastFrames.length) return;
  frameIndex = Math.max(0, Math.min(index, lastFrames.length - 1));
  renderFrame(lastFrames[frameIndex]);
  if(updateStatus){
    if(lastResult && frameIndex === lastFrames.length - 1){
      setRunFeedback(lastResult);
    }else{
      setStatus(frameIndex === 0
        ? "Start: every robot is ready to follow its shortest route."
        : `${frameStepLabel(frameIndex)}: use the arrows to inspect what happened.`, "");
    }
  }
}

function currentNorms(){
  return rules
    .map((rule, index) => ({rule, index}))
    .filter(({rule}) => rule.conds.length > 0)
    .map(({rule, index}) => ({
      action:"MOVE",
      feedbackLabel:SIMPLE_FAMILY_RULE_LANGUAGE ? "Your current rule" : `Rule ${index + 1}`,
      conds:rule.conds.map(condition => ({
        p:condition.p,
        v:condition.v,
        negated:!!condition.negated,
      })),
    }));
}

function libraryNorms(){
  return library
    .filter(entry => entry.rule && entry.rule.conds && entry.rule.conds.length > 0)
    .map(entry => ({
      action:"MOVE",
      conds:entry.rule.conds.map(condition => ({
        p:condition.p,
        v:condition.v,
        negated:!!condition.negated,
      })),
    }));
}

function play(trigger="manual"){
  if(timer){ clearInterval(timer); timer = null; }
  const continueButton = $("continue");
  if(continueButton) continueButton.hidden = true;
  const runButton = $("run");
  if(runButton){
    runButton.textContent = "Run rule";
    runButton.classList.add("primary");
    runButton.classList.remove("secondary-run");
  }
  const norms = currentNorms();
  const result = simulate(scn, norms);
  result.testedNorms = norms.map(norm => ({
    action:norm.action,
    feedbackLabel:norm.feedbackLabel,
    conds:norm.conds.map(condition => ({...condition})),
  }));
  const availableBefore = new Set(unlockedTasks().map(task => task.id));
  const shiftState = shiftStates[scn.id];
  shiftState.visited = true;
  shiftState.lastOk = result.ok;
  shiftState.testedRevision = rulebookRevision;
  shiftState.attempts += 1;
  if(result.ok && curIndex === 0 && !activeTaskBranch && SIMPLE_FAMILY_RULE_LANGUAGE){
    const branch = simpleFamilySelection === "role" ? "role" : "movement";
    if(activateTaskBranch(branch)){
      result.activatedBranch = branch;
      recordRuleEvent("curriculum_branch_selected", {
        branch,
        selected_family:simpleFamilySelection,
        trigger:"first_successful_t1_rule",
      });
    }
  }
  if(!FREE_ORDER && result.ok){
    const newlyUnlocked = unlockedTasks().filter(task => !availableBefore.has(task.id));
    if(newlyUnlocked.length){
      result.curriculumMessage =
        `Task complete. Available next: ${newlyUnlocked.map(task => task.label).join(", ")}.`;
      newlyUnlocked.forEach(task => recordRuleEvent("shift_unlocked", {
        unlocked_shift_id:task.id,
        unlocked_shift_index:TASKS.indexOf(task),
        unlocked_by_shift_id:scn.id,
      }));
    }else if(unlockedTasks().length === TASKS.length &&
             TASKS.every(task => shiftStates[task.id].lastOk)){
      result.curriculumMessage = "Curriculum complete.";
    }
  }
  lastResult = result;
  lastFrames = result.frames || [];
  frameIndex = 0;
  const now = Date.now();
  const feedback = buildRunFeedback(result);
  const record = {
    participant_id: null,
    experiment_version:RAW_LIBRARY.experiment_version || 2,
    curriculum_branch:activeTaskBranch,
    run_trigger:trigger,
    shift_id: scn.id,
    shift_label: scn.label,
    shift_attempt_index:shiftState.attempts,
    global_attempt_index:runs.length + 1,
    rulebook_revision:rulebookRevision,
    rule_summary: ruleSummary(),
    rule_json: ruleJson(),
    active_rule_ids:rules.map(rule => rule.id),
    active_library_rule_ids:rules.map(rule => rule.sourceLibraryId).filter(Boolean),
    saved_library_rule_ids:library.map(entry => entry.id),
    ok: result.ok,
    reason: result.reason,
    reason_text: reasonText(result.reason, result),
    feedback_observation:feedback.observation,
    curriculum_message:result.curriculumMessage || null,
    frames: result.frames,
    agent_report: result.frames.length ? result.frames[result.frames.length - 1].agents : {},
    time_from_trial_start_ms: now - trialStartedAt,
    time_from_experiment_start_ms: now - experimentStartedAt,
    time_from_last_attempt_ms: now - lastAttemptAt,
    rule_construction_events: ruleEvents.slice(lastRuleEventIndex),
    timestamp: new Date(now).toISOString(),
  };
  runs.push(record);
  lastRuleEventIndex = ruleEvents.length;
  lastAttemptAt = now;
  renderLog();
  buildTabs();

  if(lastFrames.length) showFrameAt(0, false);
  setStatus("Running...", "");
  timer = setInterval(() => {
    if(frameIndex < lastFrames.length - 1){
      showFrameAt(frameIndex + 1, false);
    }
    if(frameIndex >= lastFrames.length - 1){
      clearInterval(timer);
      timer = null;
      setRunFeedback(result);
    }
  }, 360);
}

function resetBoard(){
  if(timer){ clearInterval(timer); timer = null; }
  lastResult = null;
  lastFrames = [];
  frameIndex = 0;
  buildBoard();
  setStatus("Ready to replay this rule from the start.", "");
  updateFrameButtons();
  updateContinueButton();
}

function download(name, mime, content){
  const blob = new Blob([content], { type:mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJson(){
  const payload = {
    experiment_version:RAW_LIBRARY.experiment_version || null,
    curriculum_branch:activeTaskBranch,
    tutorial:window.tutorialReport || null,
    rule_events:ruleEvents,
    runs,
  };
  download("norm-task-log.json", "application/json", JSON.stringify(payload, null, 2));
}

function exportCsv(){
  const cols = ["shift_id","shift_label","curriculum_branch","run_trigger","shift_attempt_index","global_attempt_index","rulebook_revision","active_rule_ids","active_library_rule_ids","saved_library_rule_ids","ok","reason","feedback_observation","rule_summary","time_from_trial_start_ms","time_from_experiment_start_ms","time_from_last_attempt_ms","timestamp"];
  const esc = v => '"' + String(v ?? "").replaceAll('"', '""') + '"';
  const rows = [cols.join(",")].concat(runs.map(r => cols.map(c => esc(r[c])).join(",")));
  download("norm-task-log.csv", "text/csv", rows.join("\n") + "\n");
}

function startTaskAfterTutorial(){
  const screen = $("tutorial-screen");
  if(screen) screen.hidden = true;
  document.body.classList.remove("tutorial-active");
  document.querySelector(".wrap")?.removeAttribute("aria-hidden");
  const startTime = Date.now();
  experimentStartedAt = startTime;
  trialStartedAt = startTime;
  lastAttemptAt = startTime;
  lastRuleEventIndex = ruleEvents.length;
  window.scrollTo(0, 0);
  if(scn.starter_rulebook?.length){
    setStatus("A starter rule is set. The outlined robot matches it. Run the rule.", "");
  }else if(SIMPLE_FAMILY_RULE_LANGUAGE && !simpleSelectedValues().length){
    setStatus("No waiting rule is selected. Run to see what happens, or choose a rule.", "");
  }
  if(shouldAutoShowGuide(scn)){
    setTimeout(() => showSceneGuide(), 0);
  }
}

function initializeTutorial(){
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    if(SKIP_TUTORIAL || !window.ResearchTutorial?.startSimple){
      startTaskAfterTutorial();
      return;
    }
    window.ResearchTutorial.startSimple({
      log:recordRuleEvent,
      onComplete:startTaskAfterTutorial,
    });
    return;
  }
  const screen = $("tutorial-screen");
  if(!screen || !window.ResearchTutorial){
    startTaskAfterTutorial();
    return;
  }
  window.ResearchTutorial.start({
    log:recordRuleEvent,
    onComplete:startTaskAfterTutorial,
  });
}

function renderAll(){
  buildTabs();
  renderSceneGoal();
  buildBoard();
  renderRules();
  renderLegend();
  renderLog();
  updateContinueButton();
}

if(!TASKS.length){
  setStatus("Could not find data/tasks.generated.js. Run python3 solver/task_generator.py first.", "bad");
}else{
  const researcherPanel = $("researcher-panel");
  if(researcherPanel) researcherPanel.hidden = !DEBUG_UI;
  $("run").onclick = () => play("manual");
  $("continue").onclick = () => {
    if(curIndex < TASKS.length - 1) switchTask(curIndex + 1);
  };
  $("prev").onclick = () => showFrameAt(frameIndex - 1);
  $("next").onclick = () => showFrameAt(frameIndex + 1);
  $("guide-close").onclick = closeSceneGuide;
  $("guide-backdrop").onclick = event => {
    if(event.target.id === "guide-backdrop") closeSceneGuide();
  };
  $("notice-close").onclick = closeNotice;
  $("notice-backdrop").onclick = event => {
    if(event.target.id === "notice-backdrop") closeNotice();
  };
  document.addEventListener("keydown", event => {
    if(event.key === "Escape") {
      closeSceneGuide();
      closeNotice();
    }
  });
  $("addrule").onclick = () => {
    if(SIMPLE_FAMILY_RULE_LANGUAGE) return;
    const rule = { id:nextRuleId++, action:"MOVE", conds:[], editor:null };
    rules.push(rule);
    recordRuleEvent("rule_added", {rule_id:rule.id, rule_index:rules.length - 1});
    renderRules();
  };
  $("export-json").onclick = exportJson;
  $("export-csv").onclick = exportCsv;
  rules = sceneRuleDrafts.get(scn.id) || loadStarterRules(scn);
  if(SIMPLE_FAMILY_RULE_LANGUAGE){
    simpleFamilySelection = rules[0]?.conds?.[0]?.p || null;
  }
  renderAll();
  if(SKIP_TUTORIAL) startTaskAfterTutorial();
  else initializeTutorial();
}
