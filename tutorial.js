/* Pre-task tutorial for the curriculum version of Shared Rulebook.
 *
 * It teaches only the interface and the warehouse's base mechanics. Special
 * elements such as cold storage, exits, Cleaners, and Operators remain for
 * the curriculum to introduce.
 */

(function(){
"use strict";

const CELL = 42;
const STEP_MS = 420;
const SIMPLE_TYPE_COLOR = "#2D70B3";
const SIMPLE_TYPE_LETTERS = {
  carrier:"A",
  operator:"B",
  inspector:"C",
  loader:"D",
  technician:"E",
  courier:"F",
  scout:"G",
  guard:"H",
};

function simpleTypeLetter(role){
  return SIMPLE_TYPE_LETTERS[role] || "?";
}

function simpleTypeLabel(role){
  return `Type ${simpleTypeLetter(role)}`;
}

function tutorialTargetNumber(agent, scene){
  const activeAgents = scene?.agents?.filter(candidate => candidate.active) || [];
  const index = activeAgents.findIndex(candidate => String(candidate.id) === String(agent.id));
  return index >= 0 ? String(index + 1) : String(Number(agent.id) + 1);
}

let emit = () => {};
let finish = () => {};
let tutorialMode = "standard";
let instructionStep = 0;
let instructionReviewMode = false;

const state = {
  page:0,
  result:null,
  frames:[],
  frameIndex:0,
  timer:null,
  startedAt:0,
  pageStartedAt:0,
  pageVisits:[],
  runs:[],
  practiceCondition:null,
  practiceSolved:false,
  practiceSaved:false,
  practiceUsed:false,
  reuseSolved:false,
  simpleCollisionObserved:false,
  simpleFamily:null,
  simpleValues:[],
  simpleFamiliesSolved:[],
  simplePracticeOneSolved:false,
  simpleCarryObserved:false,
  simplePracticeTwoSolved:false,
};

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

function makeScene(id, walls, agents, options={}){
  return normalizeTask({
    id,
    level:0,
    layer:0,
    prerequisites:[],
    label:id,
    family:"tutorial",
    description:"",
    participant_prompt:"",
    active_agent_count:agents.length,
    measure:"",
    expected_min_norms:null,
    solver:null,
    baseline:null,
    world:{
      rows:options.rows || 5,
      cols:options.cols || 7,
      walls,
      zones:[],
      protected:[],
      items:[],
      machines:[],
      scanners:[],
      diagonal_edges:options.diagonalEdges || [],
      agents,
    },
  });
}

function carrier(id, start, target){
  return {
    id,
    start,
    role:"carrier",
    carrying:"none",
    active:true,
    tokens:[],
    goal:{kind:"reach", target},
  };
}

function tutorialRobot(id, start, target, role, movementArrow){
  return {
    id,
    start,
    role,
    movement_arrow:movementArrow,
    carrying:"none",
    active:true,
    tokens:[],
    goal:{kind:"reach", target},
  };
}

function wallsOutside(openCells, rows=5, cols=7){
  const open = new Set(openCells.map(cell => `${cell[0]},${cell[1]}`));
  const walls = [];
  for(let row = 0; row < rows; row += 1){
    for(let col = 0; col < cols; col += 1){
      if(!open.has(`${row},${col}`)) walls.push([row, col]);
    }
  }
  return walls;
}

const MOVEMENT_SCENE = makeScene(
  "tutorial_movement",
  [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[2,3]],
  [carrier(0, [2,0], [2,6])],
);

const COLLISION_SCENE = makeScene(
  "tutorial_collision",
  [[0,0],[0,1],[0,2],[0,4],[0,5],[0,6],[4,0],[4,1],[4,2],[4,4],[4,5],[4,6]],
  [
    carrier(0, [2,1], [2,5]),
    carrier(1, [0,3], [4,3]),
  ],
);

const RULE_PRACTICE_SCENE = makeScene(
  "tutorial_rule_practice",
  [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]],
  [carrier(0, [2,0], [2,6])],
);
RULE_PRACTICE_SCENE.practiceMarked = [2,3];

const RULE_REUSE_SCENE = makeScene(
  "tutorial_rule_reuse",
  [[0,0],[1,0],[2,0],[3,0],[4,0],[0,6],[1,6],[2,6],[3,6],[4,6]],
  [carrier(0, [0,3], [4,3])],
);
RULE_REUSE_SCENE.practiceMarked = [2,3];

const SIMPLE_CONFLICT_OPEN = [
  [2,1], [2,2], [2,3],
  [4,3], [3,3],
  [1,4], [0,5],
];
const SIMPLE_CONFLICT_SCENE = makeScene(
  "tutorial_shared_square",
  wallsOutside(SIMPLE_CONFLICT_OPEN),
  [
    tutorialRobot(0, [2,1], [1,4], "carrier", "E"),
    tutorialRobot(1, [4,3], [0,5], "operator", "N"),
  ],
  {
    diagonalEdges:[
      [[2,3], [1,4]],
      [[1,4], [0,5]],
    ],
  },
);

const SIMPLE_CARRY_OPEN = [
  [2,0], [2,1], [2,2], [1,2], [0,2], [1,3], [0,4], [3,2], [4,2],
  [2,10], [2,9], [2,8], [1,8], [0,8], [3,8], [4,8], [3,7], [4,6],
];
const SIMPLE_CARRY_SCENE = makeScene(
  "tutorial_rule_carryover",
  wallsOutside(SIMPLE_CARRY_OPEN, 5, 11),
  [
    tutorialRobot(0, [2,0], [0,4], "carrier", "E"),
    tutorialRobot(1, [4,2], [0,2], "operator", "N"),
    tutorialRobot(2, [2,10], [4,6], "inspector", "W"),
    tutorialRobot(3, [0,8], [4,8], "loader", "S"),
  ],
  {
    rows:5,
    cols:11,
    diagonalEdges:[
      [[2,2], [1,3]],
      [[1,3], [0,4]],
      [[2,8], [3,7]],
      [[3,7], [4,6]],
    ],
  },
);

const ALL_PAGES = [
  {
    id:"goal",
    title:"Read the map",
    lead:"Your task is to write shared rules that let every active robot complete its target without causing a failure.",
    points:[
      "A robot and its target have the same letter and colour.",
      "A target is shown as a dashed square.",
      "Robots may enter available squares but cannot enter walls.",
      "Letters and colours only match robots to targets; they do not give priority.",
    ],
    scene:MOVEMENT_SCENE,
    controls:false,
    reference:"map",
    initialNote:"Robot A and its dashed target use the same letter and colour.",
  },
  {
    id:"movement",
    title:"How robots move",
    lead:"Press Run to watch Robot A plan a route around the wall and reach its target.",
    points:[
      "A robot moves one square during each time step.",
      "It chooses the shortest legal route. If routes are equally short, it prefers fewer turns.",
      "A wall changes the route; it does not stop the robot from planning.",
      "Use the arrows after a run to inspect the movement one step at a time.",
    ],
    scene:MOVEMENT_SCENE,
    controls:true,
    initialNote:"Press Run to see the planned route.",
  },
  {
    id:"simultaneous",
    title:"Robots move at the same time",
    lead:"Press Run to see what happens when two independently planned routes cross.",
    points:[
      "All active robots act during the same time step.",
      "If multiple robots try to enter the same square in the same step, they collide.",
      "The task is complete only when every active robot reaches its target.",
      "After a run, use the arrows to inspect the robots' positions at each time step.",
    ],
    scene:COLLISION_SCENE,
    controls:true,
    initialNote:"Both robots are heading toward the centre square.",
  },
  {
    id:"rules",
    title:"Build, test, and refine a rule",
    lead:"Entering the marked square causes this practice task to fail. Build a rule that prevents the robot from entering it.",
    points:[
      "Choose an object and a fact; then select Add condition.",
      "Conditions within one rule are joined by AND, so all of them must be true.",
      "Every active rule applies to every robot in the task.",
    ],
    scene:RULE_PRACTICE_SCENE,
    controls:true,
    initialNote:"Press Run first, or build a rule and test it.",
    reference:"rule",
    requires:"practice_solved",
  },
  {
    id:"library",
    title:"Save and reuse a rule",
    lead:"The library is optional. Use it when you want to carry a rule into another task.",
    points:[
      "Save to library keeps a copy available throughout the rest of the task.",
      "A saved rule is not active in a new task automatically.",
      "To reuse it, select Add to rulebook. You can then run the task to test it.",
    ],
    scene:RULE_REUSE_SCENE,
    controls:true,
    initialNote:"This is a new task. No rules are active yet.",
    reference:"library",
  },
];

// Rule carry-over is controlled by the assigned experimental condition.
// The optional library would create a second participant-controlled path.
const DEFAULT_PAGES = ALL_PAGES.filter(page => page.id !== "library");

const SIMPLE_PAGES = [
  {
    id:"simple_encounter",
    title:"The first conflict",
    lead:"Both robots are trying to enter the same square at the same time. Press Run to see the collision.",
    points:[
      "To avoid a collision, choose which robot waits. The other robot moves first, and the waiting robot follows.",
    ],
    scene:SIMPLE_CONFLICT_SCENE,
    controls:true,
    initialNote:"No waiting rule is active.",
    requires:"collision_observed",
  },
  {
    id:"simple_practice_one",
    title:"Choose who waits",
    lead:"Make one rule using Movement direction, then another using Robot type. Both should let the robots pass safely.",
    points:[],
    scene:SIMPLE_CONFLICT_SCENE,
    controls:true,
    reference:"simple_builder",
    requires:"simple_practice_one",
  },
];

const INSTRUCTION_STEPS = [
  {
    label:"Step 1 · Goal",
    title:"Guide every robot to its charging bay",
    lead:"The robots follow their routes automatically. You decide how they coordinate when their routes cross.",
    points:[
      "The number on a robot matches the number on its charging bay.",
      "You do not steer the robots. Press Run to test the waiting rule you have written.",
      "You complete the task when every robot reaches its own charging bay.",
    ],
    visual:() => `
      <figure class="instruction-screenshot">
        <img src="assets/instructions/map-overview.png?v=32" alt="A tutorial practice map showing two robots, their routes, and numbered charging bays.">
      </figure>`,
  },
  {
    label:"Step 2 · Robot information",
    title:"Each robot shows two different features",
    lead:"The letter and arrow describe different things. Both are always visible on the robot.",
    points:[
      "Robot type is the letter badge. It stays with that robot throughout the task.",
      "Movement direction is the arrow badge. It shows the direction the robot is currently moving and can change as the route turns.",
      "The number is only used to match the robot to its charging bay.",
    ],
    visual:() => `
      <figure class="instruction-screenshot is-robot-detail">
        <img src="assets/instructions/robot-badges.png?v=32" alt="A tutorial robot with destination number 1, type A, and a rightward movement arrow.">
      </figure>`,
  },
  {
    label:"Step 3 · Crossing",
    title:"",
    lead:"Sometimes two robots reach the same square at the same time. Without a waiting rule, they cannot both continue.",
    points:[
      "If two robots try to enter the same square, choose which one should wait.",
      "The other robot moves first. The waiting robot continues after it has passed.",
      "Your rule applies every time two robots meet on the map.",
    ],
    visual:() => `
      <figure class="instruction-screenshot-pair">
        <div>
          <strong>No waiting rule</strong>
          <img src="assets/instructions/approaching-crossing.png?v=32" alt="Two tutorial robots about to enter the same square without a waiting rule.">
        </div>
        <div>
          <strong>One robot waits</strong>
          <img src="assets/instructions/wait-at-crossing.png?v=32" alt="One tutorial robot waiting while the other enters the crossing.">
        </div>
      </figure>`,
  },
  {
    label:"Step 4 · Waiting rule",
    title:"Write one rule and test it",
    lead:"Choose which feature the rule uses, then choose the values that identify the robot that should wait.",
    points:[
      "Choose either Movement direction or Robot type.",
      "You can choose one or more arrows or types. A robot waits if it has any one of your choices.",
      "Run the rule, inspect what happened, and change it if needed.",
      "Your rule stays on screen in the next task. You can keep it or change it.",
    ],
    visual:() => `
      <figure class="instruction-screenshot is-editor">
        <img src="assets/instructions/rule-editor.png?v=32" alt="The tutorial rule editor with Movement direction selected and east chosen.">
      </figure>`,
  },
];

let PAGES = DEFAULT_PAGES;

const el = id => document.getElementById(id);

function stopAnimation(){
  if(state.timer !== null){
    clearInterval(state.timer);
    state.timer = null;
  }
}

function drawBoard(host, scene, frame=null){
  host.innerHTML = "";
  host.style.width = `${scene.cols * CELL}px`;
  host.style.height = `${scene.rows * CELL}px`;

  (scene.diagonalEdgePairs || []).forEach(([first, second]) => {
    const firstX = first[1] * CELL + (CELL - 4) / 2;
    const firstY = first[0] * CELL + (CELL - 4) / 2;
    const secondX = second[1] * CELL + (CELL - 4) / 2;
    const secondY = second[0] * CELL + (CELL - 4) / 2;
    const dx = secondX - firstX;
    const dy = secondY - firstY;
    const link = document.createElement("div");
    link.className = "diagonal-road-link tut-diagonal-road-link";
    link.style.left = `${firstX}px`;
    link.style.top = `${firstY}px`;
    link.style.width = `${Math.hypot(dx, dy)}px`;
    link.style.height = `${Math.max(8, CELL - 8)}px`;
    link.style.transform = `translateY(-50%) rotate(${Math.atan2(dy, dx)}rad)`;
    host.appendChild(link);
  });

  for(let row = 0; row < scene.rows; row += 1){
    for(let col = 0; col < scene.cols; col += 1){
      const cell = document.createElement("div");
      const blocked = !passable(scene, [row, col]);
      cell.className = blocked ? "cell wall" : "cell zone-normal";
      cell.style.left = `${col * CELL}px`;
      cell.style.top = `${row * CELL}px`;
      cell.style.width = `${blocked ? CELL : CELL - 4}px`;
      cell.style.height = `${blocked ? CELL : CELL - 4}px`;
      cell.dataset.tutorialCell = K(row, col);
      if(scene.practiceMarked && sameCell(scene.practiceMarked, [row, col])){
        cell.classList.add("practice-marked");
        cell.innerHTML = "<span>Marked</span>";
      }
      host.appendChild(cell);
    }
  }

  scene.agents.forEach(agent => {
    const target = goalCell(scene, agent);
    const agentColour = tutorialMode === "simple" ? SIMPLE_TYPE_COLOR : COL[agent.id % COL.length];
    const ring = document.createElement("div");
    ring.className = "ring";
    ring.style.left = `${target[1] * CELL}px`;
    ring.style.top = `${target[0] * CELL}px`;
    ring.style.width = `${CELL - 4}px`;
    ring.style.height = `${CELL - 4}px`;
    ring.style.borderColor = agentColour;
    ring.style.setProperty("--agent-color", agentColour);
    ring.setAttribute("aria-label", tutorialMode === "simple"
      ? `Charging bay ${tutorialTargetNumber(agent, scene)} for Robot ${tutorialTargetNumber(agent, scene)}, ${simpleTypeLabel(agent.role)}`
      : `Target for Robot ${agentDisplayId(agent.id)}`);
    ring.innerHTML = tutorialMode === "simple"
      ? `<span class="target-label target-label-corner-0">${tutorialTargetNumber(agent, scene)}</span>`
      : `<span class="target-label target-label-corner-0">${agentDisplayId(agent.id)}</span>`;
    host.appendChild(ring);
  });

  scene.agents.forEach(agent => {
    const position = frame?.pos?.[agent.id] || agent.pos;
    const meta = frame?.agents?.[agent.id] || frame?.agents?.[String(agent.id)] || {};
    const robot = document.createElement("div");
    robot.className = "robot";
    robot.classList.toggle("done", !!meta.done);
    robot.classList.toggle("failed", !!meta.failed);
    robot.classList.toggle("waiting", !!meta.waiting);
    robot.style.left = `${position[1] * CELL + 7}px`;
    robot.style.top = `${position[0] * CELL + 7}px`;
    robot.style.width = `${CELL - 14}px`;
    robot.style.height = `${CELL - 14}px`;
    robot.style.background = tutorialMode === "simple" ? SIMPLE_TYPE_COLOR : COL[agent.id % COL.length];
    robot.title = tutorialMode === "simple"
      ? `Robot ${tutorialTargetNumber(agent, scene)}, ${simpleTypeLabel(agent.role)}`
      : `Robot ${agentDisplayId(agent.id)}`;
    const direction = meta.display_dir || meta.intent?.dir || agent.movementArrow;
    const arrows = {N:"↑", NE:"↗", E:"→", SE:"↘", S:"↓", SW:"↙", W:"←", NW:"↖"};
    robot.innerHTML = (tutorialMode === "simple"
      ? icon("robot", "robot-role") + `<span class="robot-id">${tutorialTargetNumber(agent, scene)}</span>` + `<span class="robot-type-letter robot-type-mark" aria-hidden="true">${simpleTypeLetter(agent.role)}</span>`
      : icon(agent.role || "robot", "robot-role") + `<span class="robot-id">${agentDisplayId(agent.id)}</span>`) +
      (direction ? `<span class="tut-robot-arrow" aria-label="Moving ${direction}">${arrows[direction] || direction}</span>` : "") +
      (meta.waiting ? icon("waiting", "robot-state-mark") : "") +
      (meta.failed ? icon("failed", "robot-state-mark") : "") +
      (meta.done ? icon("done", "robot-state-mark") : "");
    host.appendChild(robot);
  });

  const eventCell = frame?.event?.cell;
  if(eventCell){
    host.querySelector(`[data-tutorial-cell="${K(eventCell[0], eventCell[1])}"]`)?.classList.add("flash");
  }
}

function rulePracticeResult(){
  const condition = state.practiceCondition;
  const blocksMarkedSquare =
    condition?.object === "practice" &&
    condition?.fact === "marked";
  const path = blocksMarkedSquare
    ? [[2,0],[2,1],[2,2],[1,2],[1,3],[1,4],[2,4],[2,5],[2,6]]
    : [[2,0],[2,1],[2,2],[2,3]];
  const frames = path.map((position, index) => ({
    pos:{0:position},
    agents:{
      0:{
        done:blocksMarkedSquare && index === path.length - 1,
        failed:!blocksMarkedSquare && index === path.length - 1,
      },
    },
    event:!blocksMarkedSquare && index === path.length - 1
      ? {type:"practice_marked", cell:[2,3], agent:0}
      : null,
  }));
  return {
    ok:blocksMarkedSquare,
    reason:blocksMarkedSquare ? "ok" : "practice_marked",
    frames,
  };
}

function ruleReuseResult(){
  const path = state.practiceUsed
    ? [[0,3],[1,3],[1,2],[2,2],[3,2],[3,3],[4,3]]
    : [[0,3],[1,3],[2,3]];
  const frames = path.map((position, index) => ({
    pos:{0:position},
    agents:{
      0:{
        done:state.practiceUsed && index === path.length - 1,
        failed:!state.practiceUsed && index === path.length - 1,
      },
    },
    event:!state.practiceUsed && index === path.length - 1
      ? {type:"practice_marked", cell:[2,3], agent:0}
      : null,
  }));
  return {
    ok:state.practiceUsed,
    reason:state.practiceUsed ? "ok" : "practice_marked",
    frames,
  };
}

function feedbackEntry(result){
  if(result.ok){
    const steps = Math.max(0, result.frames.length - 1);
    return {
      kind:"ok",
      title:"That worked!",
      text:tutorialMode === "simple"
        ? `Every robot reached its assigned charging bay in ${steps} steps.`
        : `Every robot reached its destination in ${steps} steps.`,
    };
  }
  if(result.reason === "timeout" && tutorialMode === "simple"){
    return {
      kind:"bad",
      title:"Both robots are being told to wait",
      text:"At one encounter, both robots match the rule. Change the selected values so exactly one of them waits.",
    };
  }
  if(result.reason === "collision"){
    const event = result.frames[result.frames.length - 1]?.event;
    const scene = PAGES[state.page]?.scene;
    const names = (event?.agents || []).map(id => {
      if(tutorialMode !== "simple") return `Robot ${agentDisplayId(id)}`;
      const agent = scene?.agents.find(row => String(row.id) === String(id));
      return `Robot ${tutorialTargetNumber(agent, scene)} (${simpleTypeLabel(agent?.role)})`;
    }).join(" and ");
    return {
      kind:"bad",
      title:"They met at the same time",
      text:`${names || "The robots"} both tried to enter the same square. Look at the move just before they met and decide who should wait.`,
    };
  }
  if(result.reason === "practice_marked"){
    return {
      kind:"bad",
      title:"Almost there",
      text:"Robot A entered the marked square. Add a rule that asks it to wait before that move, then try again.",
    };
  }
  return {
    kind:"bad",
    title:"This run did not work yet",
    text:`${reasonText(result.reason, result)} Take another look at the last move and adjust your rule.`,
  };
}

function setFeedback(entry, plainText=""){
  const box = el("tut-feedback");
  box.className = "tut-feedback" + (entry ? ` ${entry.kind}` : "");
  if(entry){
    box.innerHTML = `<strong>${entry.title}</strong><span>${entry.text}</span>`;
  }else{
    box.textContent = plainText;
  }
}

function showFrame(index, inspected=false){
  const page = PAGES[state.page];
  if(!page.scene || !state.frames.length) return;
  state.frameIndex = Math.max(0, Math.min(index, state.frames.length - 1));
  drawBoard(el("tut-board"), page.scene, state.frames[state.frameIndex]);
  el("tut-step-label").textContent = `Step ${state.frameIndex} / ${state.frames.length - 1}`;
  el("tut-prev").disabled = state.frameIndex === 0;
  el("tut-next-step").disabled = state.frameIndex === state.frames.length - 1;
  if(state.frameIndex === state.frames.length - 1){
    setFeedback(feedbackEntry(state.result));
    if(page.id === "rules") renderReference("rule");
    if(page.id === "library") renderReference("library");
    if(page.reference === "simple_builder") renderReference("simple_builder");
  }
  if(inspected){
    emit("tutorial_step_inspected", {
      tutorial_page:page.id,
      step_index:state.frameIndex,
    });
  }
}

function runCurrentScene(){
  const page = PAGES[state.page];
  if(!page.scene) return;
  stopAnimation();
  const isSimplePractice = page.id === "simple_practice_one" || page.id === "simple_practice_two";
  state.result = page.id === "rules"
    ? rulePracticeResult()
    : page.id === "library"
      ? ruleReuseResult()
      : simulate(page.scene, isSimplePractice ? simpleTutorialRules() : []);
  state.frames = state.result.frames || [];
  state.frameIndex = 0;
  if(page.id === "rules"){
    state.practiceSolved = state.result.ok;
    updateContinueState();
  }
  if(page.id === "library"){
    state.reuseSolved = state.result.ok;
    updateContinueState();
  }
  if(page.id === "simple_encounter"){
    state.simpleCollisionObserved = state.result.reason === "collision";
    updateContinueState();
  }
  if(page.id === "simple_practice_one"){
    state.simplePracticeOneSolved = state.result.ok;
    if(state.result.ok && state.simpleFamily && !state.simpleFamiliesSolved.includes(state.simpleFamily)){
      state.simpleFamiliesSolved.push(state.simpleFamily);
    }
    updateContinueState();
  }
  if(page.id === "simple_practice_two"){
    state.simpleCarryObserved = true;
    state.simplePracticeTwoSolved = state.result.ok;
    updateContinueState();
  }
  state.runs.push({
    page_id:page.id,
    ok:state.result.ok,
    reason:state.result.reason,
    timestamp:new Date().toISOString(),
  });
  emit("tutorial_run", {
    tutorial_page:page.id,
    ok:state.result.ok,
    reason:state.result.reason,
  });
  setFeedback(null);
  showFrame(0);
  state.timer = setInterval(() => {
    if(state.frameIndex < state.frames.length - 1){
      showFrame(state.frameIndex + 1);
      return;
    }
    stopAnimation();
  }, STEP_MS);
}

function resetCurrentScene(){
  const page = PAGES[state.page];
  stopAnimation();
  state.result = null;
  state.frames = [];
  state.frameIndex = 0;
  if(page.scene) drawBoard(el("tut-board"), page.scene);
  el("tut-step-label").textContent = "Step 0 / 0";
  el("tut-prev").disabled = true;
  el("tut-next-step").disabled = true;
  const note = page.reference === "simple_builder" ? "" : page.initialNote || "";
  setFeedback(null, note);
}

function mapReferenceMarkup(){
  return `
    <div class="tut-map-key" aria-label="Basic map elements">
      <div>
        <span class="tut-key-robot">${icon("carrier", "robot-role")}<small>A</small></span>
        <span><strong>Robot A</strong><small>An active robot.</small></span>
      </div>
      <div>
        <span class="tut-key-target"><small>A</small></span>
        <span><strong>Target A</strong><small>Robot A's destination.</small></span>
      </div>
      <div>
        <span class="tut-key-floor">${icon("floor")}</span>
        <span><strong>Available square</strong><small>A robot may enter it.</small></span>
      </div>
      <div>
        <span class="tut-key-wall">${icon("wall")}</span>
        <span><strong>Wall</strong><small>A robot cannot enter it.</small></span>
      </div>
    </div>
  `;
}

function simpleTutorialFields(){
  if(typeof EXPORTED_RULE_SCHEMA === "undefined") return [];
  return (EXPORTED_RULE_SCHEMA.fields || []).filter(field =>
    field.predicate === "move_dir" || field.predicate === "role"
  );
}

function simpleTutorialField(predicate=state.simpleFamily){
  return simpleTutorialFields().find(field => field.predicate === predicate) || null;
}

function simpleTutorialSelectedValues(){
  const field = simpleTutorialField();
  if(!field) return [];
  const selected = new Set(state.simpleValues.map(String));
  return field.values.filter(value => selected.has(String(value.id)));
}

function simpleTutorialVisibleValues(field){
  const scene = PAGES[state.page]?.scene;
  if(!field || !scene) return field?.values || [];
  const present = new Set(scene.agents.map(agent =>
    field.predicate === "role" ? agent.role : agent.movementArrow
  ));
  return field.values.filter(value => present.has(value.id));
}

function simpleTutorialRuleSentence(){
  const values = simpleTutorialSelectedValues();
  if(!state.simpleFamily || !values.length) return "No waiting rule yet.";
  if(state.simpleFamily === "role"){
    const types = naturalTutorialList(values.map(value => value.label));
    return values.length === 1
      ? `When two robots meet, the ${types} robot waits.`
      : `When two robots meet, robots of ${types} wait.`;
  }
  const directions = naturalTutorialList(values.map(value => value.symbol || value.id));
  return values.length === 1
    ? `When two robots meet, the robot moving ${directions} waits.`
    : `When two robots meet, robots moving ${directions} wait.`;
}

function naturalTutorialList(items){
  if(items.length < 2) return items[0] || "";
  if(items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

function simpleTutorialRules(){
  const field = simpleTutorialField();
  if(!field) return [];
  return simpleTutorialSelectedValues().map((value, index) => ({
    id:9000 + index,
    action:"MOVE",
    conds:[{
      object:field.object,
      property:field.id,
      p:field.predicate,
      v:value.id,
      negated:false,
    }],
    editor:null,
  }));
}

function simpleBuilderHelp(page){
  if(page.id === "simple_practice_two" && !state.simpleCarryObserved){
    return "Run the carried rule first.";
  }
  if(page.id === "simple_practice_two" && state.simpleCarryObserved && !state.simplePracticeTwoSolved){
    return "Update the selected values, then run again.";
  }
  if(page.id === "simple_practice_one" && !state.simpleFamily){
    return "Run without a waiting rule, or choose Movement direction or Robot type.";
  }
  if(!state.simpleValues.length) return "No values selected. You can still run the task.";
  if(page.id === "simple_practice_one" && state.simpleFamiliesSolved.length === 1){
    const remaining = state.simpleFamiliesSolved[0] === "role" ? "Movement direction" : "Robot type";
    return `That works. Now switch to ${remaining} and solve it again.`;
  }
  if(page.id === "simple_practice_one" && state.simpleFamiliesSolved.length === 2){
    return "Both rule forms work. Continue.";
  }
  if(page.id === "simple_practice_two" && state.simplePracticeTwoSolved){
    return "This shared rule handles both crossings.";
  }
  return "Run the rule.";
}

function simpleRuleBuilderMarkup(){
  const page = PAGES[state.page];
  const fields = simpleTutorialFields();
  const field = simpleTutorialField();
  const selected = new Set(state.simpleValues.map(String));
  const locked = page.id === "simple_practice_two" && !state.simpleCarryObserved;
  return `
    <div class="tut-simple-builder${locked ? " is-locked" : ""}" aria-label="Practice rule editor">
      <div class="simple-rule-context">WHEN TWO ROBOTS MEET</div>
      <section class="simple-rule-step">
        <div class="simple-step-heading"><span>1</span><strong>Choose what the rule uses</strong></div>
        <div class="simple-family-buttons">
          ${fields.map(option => {
            const isSelected = state.simpleFamily === option.predicate;
            const content = option.predicate === "role"
              ? `${icon("robot", "family-button-icon")}<span>Robot type</span>`
              : '<span class="family-arrow-icon" aria-hidden="true">↗</span><span>Movement direction</span>';
            return `<button class="simple-family-button${isSelected ? " selected" : ""}" type="button"
              data-tut-family="${option.predicate}" aria-pressed="${isSelected}" ${locked ? "disabled" : ""}>${content}</button>`;
          }).join("")}
        </div>
      </section>
      ${field ? `
        <section class="simple-rule-step">
          <div class="simple-step-heading"><span>2</span><strong>${field.predicate === "role" ? "Choose the type(s)" : "Choose the direction(s)"}</strong></div>
          <p class="simple-selection-hint">Click to select. Click again to remove.</p>
          <div class="simple-value-grid">
            ${simpleTutorialVisibleValues(field).map(value => {
              const isSelected = selected.has(String(value.id));
              const mark = field.predicate === "role"
                ? `<span class="simple-role-swatch simple-type-swatch" style="--role-color:${SIMPLE_TYPE_COLOR}">${icon("robot", "simple-role-icon")}<span class="robot-type-letter simple-type-letter" aria-hidden="true">${simpleTypeLetter(value.id)}</span></span>`
                : `<span class="simple-arrow-value">${value.symbol || value.id}</span>`;
              return `<button class="simple-value-button tut-simple-value-button${isSelected ? " selected" : ""}" type="button"
                data-tut-family="${field.predicate}" data-tut-value="${value.id}" aria-pressed="${isSelected}"
                ${locked ? "disabled" : ""}>${mark}<span>${value.label}</span></button>`;
            }).join("")}
          </div>
        </section>
      ` : ""}
      ${state.simpleValues.length ? `
        <section class="simple-current-rule">
          <span>CURRENT PRACTICE RULE</span>
          <strong>${simpleTutorialRuleSentence()}</strong>
        </section>
      ` : ""}
      ${page.id === "simple_practice_one" && state.simpleFamiliesSolved.length ? `
        <div class="tut-family-progress" aria-label="Practice progress">
          <span class="is-solved">✓ ${state.simpleFamiliesSolved.length === 2
            ? "Both rule forms work"
            : `${state.simpleFamiliesSolved[0] === "move_dir" ? "Movement" : "Robot type"} works`}</span>
          ${state.simpleFamiliesSolved.length === 1 ? "<small>1 of 2 complete</small>" : ""}
        </div>
      ` : ""}
      <p class="tut-simple-builder-help">${simpleBuilderHelp(page)}</p>
    </div>
  `;
}

function bindSimpleRuleBuilder(){
  const page = PAGES[state.page];
  const locked = page.id === "simple_practice_two" && !state.simpleCarryObserved;
  if(locked) return;
  document.querySelectorAll("#tut-rule-reference [data-tut-family]:not([data-tut-value])").forEach(button => {
    button.onclick = () => {
      const family = button.dataset.tutFamily;
      if(state.simpleFamily === family) return;
      const previousFamily = state.simpleFamily;
      state.simpleFamily = family;
      state.simpleValues = [];
      state.simplePracticeOneSolved = false;
      state.simplePracticeTwoSolved = false;
      emit("tutorial_rule_family_changed", {previous_family:previousFamily, family});
      resetCurrentScene();
      renderReference("simple_builder");
      updateContinueState();
    };
  });
  document.querySelectorAll("#tut-rule-reference [data-tut-value]").forEach(button => {
    button.onclick = () => {
      const value = button.dataset.tutValue;
      const selected = new Set(state.simpleValues.map(String));
      if(selected.has(String(value))) selected.delete(String(value));
      else selected.add(String(value));
      const field = simpleTutorialField();
      state.simpleValues = field.values
        .filter(option => selected.has(String(option.id)))
        .map(option => option.id);
      if(page.id === "simple_practice_one"){
        state.simpleFamiliesSolved = state.simpleFamiliesSolved.filter(family => family !== state.simpleFamily);
      }
      state.simplePracticeOneSolved = false;
      state.simplePracticeTwoSolved = false;
      emit("tutorial_rule_value_toggled", {
        family:state.simpleFamily,
        value,
        selected:selected.has(String(value)),
      });
      resetCurrentScene();
      renderReference("simple_builder");
      updateContinueState();
    };
  });
}

const PRACTICE_TERMS = {
  practice:[
    {id:"marked", label:"marked", text:"the practice object is marked"},
  ],
};

function updateContinueState(){
  const requirement = PAGES[state.page].requires;
  el("tut-continue").disabled =
    (requirement === "practice_solved" && !state.practiceSolved) ||
    (requirement === "collision_observed" && !state.simpleCollisionObserved) ||
    (requirement === "simple_practice_one" && state.simpleFamiliesSolved.length < 2) ||
    (requirement === "simple_practice_two" && !state.simplePracticeTwoSolved);
  const run = el("tut-run");
  if(run) run.disabled = false;
}

function bindRulePractice(){
  const object = el("tut-practice-object");
  const fact = el("tut-practice-fact");
  const add = el("tut-practice-add");
  if(!object || !fact || !add) return;

  function updateFacts(){
    const terms = PRACTICE_TERMS[object.value] || [];
    fact.innerHTML = '<option value="">Select fact</option>' +
      terms.map(term => `<option value="${term.id}">${term.label}</option>`).join("");
    fact.disabled = !terms.length;
    add.disabled = true;
  }

  function updateAdd(){
    add.disabled = !(object.value && fact.value);
  }

  object.onchange = updateFacts;
  fact.onchange = updateAdd;
  add.onclick = () => {
    const term = (PRACTICE_TERMS[object.value] || []).find(row => row.id === fact.value);
    state.practiceCondition = {
      object:object.value,
      fact:fact.value,
      text:term?.text || "",
    };
    state.practiceSolved = false;
    emit("tutorial_condition_created", {...state.practiceCondition});
    resetCurrentScene();
    renderReference("rule");
    updateContinueState();
  };
}

function ruleReferenceMarkup(){
  const condition = state.practiceCondition;
  const step = !condition
    ? {label:"Step 1", text:"Choose Practice object and marked. Then click Add condition."}
    : !state.practiceSolved
      ? {label:"Step 2", text:"Click Run to test the rule."}
      : null;
  return `
    ${step ? `
      <div class="tut-rule-instruction">
        <span>${step.label}</span>
        <strong>${step.text}</strong>
      </div>
    ` : ""}
    <div class="tut-rule-example tut-rule-builder" aria-label="Practice rule builder">
      <div class="tut-rule-action">${CLEAN_RULE_LANGUAGE
        ? "<strong>A ROBOT WAITS</strong>"
        : "<span>FORBID</span><strong>MOVE INTO A SQUARE</strong>"}</div>
      ${condition ? `
        <div class="tut-rule-cond completed"><span>WHEN</span><b>${condition.text}</b></div>
        <div class="tut-practice-rule-actions">
          <button class="tut-change-condition" id="tut-change-condition" type="button">Change condition</button>
        </div>
      ` : `
        <div class="tut-practice-editor">
          <span>WHEN</span>
          <select id="tut-practice-object" aria-label="Condition object">
            <option value="">Select object</option>
            <option value="practice">Practice object</option>
          </select>
          <select id="tut-practice-fact" aria-label="Condition fact" disabled>
            <option value="">Select fact</option>
          </select>
          <button id="tut-practice-add" type="button" disabled>Add condition</button>
        </div>
      `}
    </div>
    <p class="tut-practice-help">${condition
      ? state.practiceSolved
        ? ""
        : "Condition added. Press Run to test it; use Change condition if it does not work."
      : "Run without a rule to observe the problem, then build the practice rule."}</p>
  `;
}

function libraryReferenceMarkup(){
  const text = state.practiceCondition?.text || "the robot is moving north";
  const action = CLEAN_RULE_LANGUAGE
    ? "<strong>A ROBOT WAITS</strong>"
    : "<span>FORBID</span> MOVE INTO A SQUARE";
  const summary = CLEAN_RULE_LANGUAGE
    ? `A ROBOT WAITS WHEN ${text}`
    : `FORBID MOVE INTO A SQUARE WHEN ${text}`;
  if(!state.practiceSaved){
    return `
      <div class="tut-library-instruction">
        <span>Optional</span>
        <strong>Save the rule from the previous task to make it available here, or start the task without saving it.</strong>
      </div>
      <div class="tut-library-demo">
        <section>
          <h3>Rule from the previous task</h3>
          <div class="tut-library-rule">
            <div>${action}</div>
            <div><span>WHEN</span> ${text}</div>
          </div>
          <button id="tut-save-practice" type="button">Save to library</button>
        </section>
        <section>
          <h3>Saved rule library</h3>
          <p class="tut-library-empty">No saved rules.</p>
        </section>
      </div>
    `;
  }
  return `
    <div class="tut-library-instruction ${state.practiceUsed ? "is-complete" : ""}">
      <span>${state.practiceUsed ? "Added" : "Saved"}</span>
      <strong>${state.practiceUsed
        ? "The saved rule is now in this task's rulebook."
        : "The rule remains in the library. Add it to this task's rulebook if you want to test it here."}</strong>
    </div>
    <div class="tut-library-demo">
      <section>
        <h3>Rules in this task</h3>
        ${state.practiceUsed ? `
          <div class="tut-library-rule">
            <div>${action}</div>
            <div><span>WHEN</span> ${text}</div>
          </div>
        ` : '<p class="tut-library-empty">No active rules.</p>'}
      </section>
      <section>
        <h3>Saved rule library</h3>
        <div class="tut-saved-row">
          <span>${summary}</span>
          <button class="${state.practiceUsed ? "" : "tut-next-action"}" id="tut-use-practice" type="button" ${state.practiceUsed ? "disabled" : ""}>
            ${state.practiceUsed ? "Added" : "Add to rulebook"}
          </button>
        </div>
      </section>
    </div>
  `;
}

function bindLibraryPractice(){
  const save = el("tut-save-practice");
  if(save){
    save.onclick = () => {
      state.practiceSaved = true;
      emit("tutorial_library_saved", {condition:state.practiceCondition?.text || null});
      renderReference("library");
      updateContinueState();
    };
  }
  const use = el("tut-use-practice");
  if(use){
    use.onclick = () => {
      state.practiceUsed = true;
      state.reuseSolved = false;
      emit("tutorial_library_used", {condition:state.practiceCondition?.text || null});
      resetCurrentScene();
      setFeedback(null, "The saved rule is active in this task. Press Run to test it.");
      renderReference("library");
      updateContinueState();
    };
  }
}

function renderReference(kind){
  const host = el("tut-rule-reference");
  host.hidden = !kind;
  if(!kind) return;
  if(kind === "map") host.innerHTML = mapReferenceMarkup();
  if(kind === "simple_builder"){
    host.innerHTML = simpleRuleBuilderMarkup();
    bindSimpleRuleBuilder();
  }
  if(kind === "rule"){
    host.innerHTML = ruleReferenceMarkup();
    bindRulePractice();
    const change = el("tut-change-condition");
    if(change){
      change.onclick = () => {
        state.practiceCondition = null;
        state.practiceSolved = false;
        state.practiceSaved = false;
        state.practiceUsed = false;
        state.reuseSolved = false;
        resetCurrentScene();
        renderReference("rule");
        updateContinueState();
      };
    }
  }
  if(kind === "library"){
    host.innerHTML = libraryReferenceMarkup();
    bindLibraryPractice();
  }
}

function recordPageVisit(){
  if(!state.pageStartedAt) return;
  state.pageVisits.push({
    page_id:PAGES[state.page].id,
    duration_ms:Date.now() - state.pageStartedAt,
  });
}

function hideOnboardingScreens(){
  ["ethics-screen", "instructions-screen", "tutorial-screen"].forEach(id => {
    const screen = el(id);
    if(screen) screen.hidden = true;
  });
}

function setOnboardingActive(active){
  document.body.classList.toggle("tutorial-active", active);
  const task = document.querySelector(".wrap");
  if(active) task?.setAttribute("aria-hidden", "true");
  else task?.removeAttribute("aria-hidden");
}

function renderInstructionStep(index){
  instructionStep = Math.max(0, Math.min(index, INSTRUCTION_STEPS.length - 1));
  const step = INSTRUCTION_STEPS[instructionStep];
  el("instruction-step-label").textContent = step.label;
  const instructionTitle = el("instruction-step-title");
  instructionTitle.textContent = step.title;
  instructionTitle.hidden = !step.title;
  el("instruction-step-lead").textContent = step.lead;
  el("instruction-step-points").innerHTML = step.points.map(point => `<li>${point}</li>`).join("");
  el("instruction-visual").innerHTML = step.visual();
  el("instruction-progress-label").textContent = `${instructionStep + 1} of ${INSTRUCTION_STEPS.length}`;
  el("instruction-progress-bar").style.width = `${((instructionStep + 1) / INSTRUCTION_STEPS.length) * 100}%`;
  el("instruction-back").disabled = instructionStep === 0;
  el("instruction-next").textContent = instructionStep === INSTRUCTION_STEPS.length - 1
    ? instructionReviewMode ? "Return to task" : "Start tutorial"
    : "Next";
  el("instruction-dots").innerHTML = INSTRUCTION_STEPS.map((row, stepIndex) => {
    const className = stepIndex === instructionStep ? "is-active" : stepIndex < instructionStep ? "is-complete" : "";
    return `<span class="${className}"></span>`;
  }).join("");
  emit("instruction_step_viewed", {
    instruction_step:instructionStep + 1,
    instruction_step_id:step.label,
    review:instructionReviewMode,
  });
}

function closeInstructionReview(){
  hideOnboardingScreens();
  setOnboardingActive(false);
  window.scrollTo(0, 0);
  emit("instructions_closed", {review:true});
}

function beginInteractiveTutorial(){
  hideOnboardingScreens();
  setOnboardingActive(true);
  const screen = el("tutorial-screen");
  if(!screen){
    finish();
    return;
  }
  screen.hidden = false;
  emit("interactive_tutorial_started", {page_count:PAGES.length});
  renderPage(0);
  el("tut-continue").focus();
}

function openInstructions(review=false){
  instructionReviewMode = !!review;
  instructionStep = 0;
  hideOnboardingScreens();
  setOnboardingActive(true);
  const screen = el("instructions-screen");
  if(!screen){
    if(instructionReviewMode) closeInstructionReview();
    else beginInteractiveTutorial();
    return;
  }
  screen.hidden = false;
  emit("instructions_opened", {review:instructionReviewMode});
  renderInstructionStep(0);
  el("instruction-next").focus();
}

function updateEthicsAgreement(){
  const sheet = el("ethics-scroll");
  const agree = el("ethics-agree");
  if(!sheet || !agree) return;
  const reachedBottom = sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 12;
  agree.disabled = !reachedBottom;
}

function showEthicsScreen(){
  hideOnboardingScreens();
  setOnboardingActive(true);
  const screen = el("ethics-screen");
  if(!screen){
    openInstructions(false);
    return;
  }
  screen.hidden = false;
  const sheet = el("ethics-scroll");
  if(sheet) sheet.scrollTop = 0;
  updateEthicsAgreement();
  emit("participant_information_viewed", {ethics_reference:"979409"});
}

function renderPage(index){
  recordPageVisit();
  stopAnimation();
  state.page = Math.max(0, Math.min(index, PAGES.length - 1));
  state.pageStartedAt = Date.now();
  const page = PAGES[state.page];

  el("tut-title").textContent = page.title;
  el("tut-lead").textContent = page.lead;
  el("tut-points").hidden = page.points.length === 0;
  el("tut-points").innerHTML = page.points.map(point => `<li>${point}</li>`).join("");

  const visual = el("tut-visual");
  const ruleReference = el("tut-rule-reference");
  const isRulePractice = page.id === "rules" || page.id === "library" ||
    page.id === "simple_practice_one" || page.id === "simple_practice_two";
  document.querySelector(".tut-panel")?.classList.toggle(
    "has-rule-practice",
    isRulePractice,
  );
  document.querySelector(".tut-body")?.classList.toggle(
    "has-rule-practice",
    isRulePractice,
  );
  visual.hidden = !page.scene;
  ruleReference.hidden = !page.reference;
  el("tut-controls").hidden = !page.scene || !page.controls;

  if(page.scene){
    resetCurrentScene();
  }
  renderReference(page.reference);

  el("tut-progress-label").textContent = `${state.page + 1} of ${PAGES.length}`;
  el("tut-progress-bar").style.width = `${((state.page + 1) / PAGES.length) * 100}%`;
  el("tut-back").disabled = state.page === 0;
  el("tut-continue").textContent = state.page === PAGES.length - 1 ? "Start task" : "Next";
  updateContinueState();
  el("tut-dots").innerHTML = PAGES.map((row, pageIndex) => {
    const className = pageIndex === state.page ? "is-active" : pageIndex < state.page ? "is-complete" : "";
    return `<span class="${className}"></span>`;
  }).join("");

  emit("tutorial_page_viewed", {
    tutorial_page:page.id,
    tutorial_page_index:state.page,
  });
}

function completeTutorial(){
  recordPageVisit();
  stopAnimation();
  window.tutorialReport = {
    duration_ms:Date.now() - state.startedAt,
    page_visits:state.pageVisits,
    runs:state.runs,
    practice:{
      condition_created:!!state.practiceCondition,
      rule_solved:state.practiceSolved,
      library_saved:state.practiceSaved,
      library_used:state.practiceUsed,
      reuse_solved:state.reuseSolved,
      simple_family:state.simpleFamily,
      simple_values:state.simpleValues.slice(),
      collision_observed:state.simpleCollisionObserved,
      first_rule_solved:state.simplePracticeOneSolved,
      families_solved:state.simpleFamiliesSolved.slice(),
      carryover_observed:state.simpleCarryObserved,
      carryover_rule_solved:state.simplePracticeTwoSolved,
    },
  };
  emit("tutorial_completed", {
    duration_ms:window.tutorialReport.duration_ms,
    run_count:state.runs.length,
  });
  hideOnboardingScreens();
  setOnboardingActive(false);
  finish();
}

function bind(){
  el("tut-run").onclick = runCurrentScene;
  el("tut-reset").onclick = resetCurrentScene;
  el("tut-prev").onclick = () => {
    stopAnimation();
    showFrame(state.frameIndex - 1, true);
  };
  el("tut-next-step").onclick = () => {
    stopAnimation();
    showFrame(state.frameIndex + 1, true);
  };
  el("tut-back").onclick = () => renderPage(state.page - 1);
  el("tut-continue").onclick = () => {
    if(state.page === PAGES.length - 1) completeTutorial();
    else renderPage(state.page + 1);
  };
  el("ethics-agree").onclick = () => {
    emit("consent_agreed", {ethics_reference:"979409"});
    openInstructions(false);
  };
  el("ethics-scroll").onscroll = updateEthicsAgreement;
  el("instruction-back").onclick = () => renderInstructionStep(instructionStep - 1);
  el("instruction-next").onclick = () => {
    if(instructionStep < INSTRUCTION_STEPS.length - 1){
      renderInstructionStep(instructionStep + 1);
      return;
    }
    if(instructionReviewMode) closeInstructionReview();
    else beginInteractiveTutorial();
  };
}

function startTutorial(options={}, mode="standard"){
    tutorialMode = mode;
    PAGES = mode === "simple" ? SIMPLE_PAGES : DEFAULT_PAGES;
    emit = options.log || (() => {});
    finish = options.onComplete || (() => {});
    const screen = el("tutorial-screen");
    if(!screen || !el("instructions-screen")){
      finish();
      return;
    }
    state.startedAt = Date.now();
    state.pageStartedAt = 0;
    state.pageVisits = [];
    state.runs = [];
    state.practiceCondition = null;
    state.practiceSolved = false;
    state.practiceSaved = false;
    state.practiceUsed = false;
    state.reuseSolved = false;
    state.simpleCollisionObserved = false;
    state.simpleFamily = null;
    state.simpleValues = [];
    state.simpleFamiliesSolved = [];
    state.simplePracticeOneSolved = false;
    state.simpleCarryObserved = false;
    state.simplePracticeTwoSolved = false;
    bind();
    emit("tutorial_started", {page_count:PAGES.length, tutorial_mode:tutorialMode});
    if(mode === "simple") showEthicsScreen();
    else beginInteractiveTutorial();
}

window.ResearchTutorial = {
  start(options={}){
    startTutorial(options, "standard");
  },
  startSimple(options={}){
    startTutorial(options, "simple");
  },
};

})();
