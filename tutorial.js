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

let emit = () => {};
let finish = () => {};

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

function makeScene(id, walls, agents){
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
      rows:5,
      cols:7,
      walls,
      zones:[],
      protected:[],
      items:[],
      machines:[],
      scanners:[],
      implicit_contested_gate:true,
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
  [[0,0],[0,1],[0,2],[0,4],[0,5],[0,6],[4,0],[4,1],[4,2],[4,4],[4,5],[4,6]],
  [
    carrier(0, [2,1], [2,5]),
    carrier(1, [0,3], [4,3]),
  ],
);

const RULE_REUSE_SCENE = makeScene(
  "tutorial_rule_reuse",
  [[0,0],[1,0],[2,0],[3,0],[4,0],[0,6],[1,6],[2,6],[3,6],[4,6]],
  [carrier(0, [0,3], [4,3])],
);
RULE_REUSE_SCENE.practiceMarked = [2,3];

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
      "The scene is solved only when every active robot completes its target.",
      "After a run, use the arrows to inspect the robots' positions at each time step.",
    ],
    scene:COLLISION_SCENE,
    controls:true,
    initialNote:"Both robots are heading toward the centre square.",
  },
  {
    id:"rules",
    title:"Build, test, and refine a rule",
    lead:"These routes meet at the centre. Build a waiting rule that lets the robots pass safely.",
    points:[
      "Choose an object and a fact; then select Add condition.",
      "Conditions within one rule are joined by AND, so all of them must be true.",
      "Rules are checked only when multiple robots try to enter the same square.",
    ],
    scene:RULE_PRACTICE_SCENE,
    controls:true,
    initialNote:"Press Run first, or make the eastbound robot wait when the routes meet.",
    reference:"rule",
    requires:"practice_solved",
  },
  {
    id:"library",
    title:"Save and reuse a rule",
    lead:"The library is optional. Use it when you want to carry a rule into another scene.",
    points:[
      "Save to library keeps a copy available throughout the rest of the task.",
      "A saved rule is not active in a new scene automatically.",
      "To reuse it, select Add to rulebook. You can then run the scene to test it.",
    ],
    scene:RULE_REUSE_SCENE,
    controls:true,
    initialNote:"This is a new scene. No rules are active yet.",
    reference:"library",
  },
];

// Rule carry-over is controlled by the assigned experimental condition.
// The optional library would create a second participant-controlled path.
const PAGES = ALL_PAGES.filter(page => page.id !== "library");

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
    const ring = document.createElement("div");
    ring.className = "ring";
    ring.style.left = `${target[1] * CELL}px`;
    ring.style.top = `${target[0] * CELL}px`;
    ring.style.width = `${CELL - 4}px`;
    ring.style.height = `${CELL - 4}px`;
    ring.style.borderColor = COL[agent.id % COL.length];
    ring.style.setProperty("--agent-color", COL[agent.id % COL.length]);
    ring.innerHTML = `<span class="target-label target-label-corner-0">${agentDisplayId(agent.id)}</span>`;
    host.appendChild(ring);
  });

  scene.agents.forEach(agent => {
    const position = frame?.pos?.[agent.id] || agent.pos;
    const meta = frame?.agents?.[agent.id] || frame?.agents?.[String(agent.id)] || {};
    const robot = document.createElement("div");
    robot.className = "robot";
    robot.classList.toggle("done", !!meta.done);
    robot.classList.toggle("failed", !!meta.failed);
    robot.style.left = `${position[1] * CELL + 7}px`;
    robot.style.top = `${position[0] * CELL + 7}px`;
    robot.style.width = `${CELL - 14}px`;
    robot.style.height = `${CELL - 14}px`;
    robot.style.background = COL[agent.id % COL.length];
    robot.innerHTML = icon("carrier", "robot-role") +
      `<span class="robot-id">${agentDisplayId(agent.id)}</span>` +
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
  const rules = condition?.object === "movement" && condition?.fact === "E"
    ? [{action:"MOVE", conds:[{p:"move_dir", v:"E", negated:false}]}]
    : [];
  return simulate(RULE_PRACTICE_SCENE, rules);
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
      text:`Every robot reached its destination in ${steps} steps.`,
    };
  }
  if(result.reason === "collision"){
    const event = result.frames[result.frames.length - 1]?.event;
    const names = (event?.agents || []).map(id => `Robot ${agentDisplayId(id)}`).join(" and ");
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
  state.result = page.id === "rules"
    ? rulePracticeResult()
    : page.id === "library"
      ? ruleReuseResult()
      : simulate(page.scene, []);
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
  setFeedback(null, page.initialNote || "");
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

const PRACTICE_TERMS = {
  movement:[
    {id:"E", label:"eastbound", text:"the robot is moving east"},
  ],
};

function updateContinueState(){
  const requirement = PAGES[state.page].requires;
  el("tut-continue").disabled =
    (requirement === "practice_solved" && !state.practiceSolved);
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
    ? {label:"Step 1", text:"Choose Movement and eastbound. Then click Add condition."}
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
    <div class="tut-rule-gate"><span>WHEN</span><strong>MULTIPLE ROBOTS TRY TO ENTER THE SAME SQUARE</strong></div>
    <div class="tut-rule-example tut-rule-builder" aria-label="Practice rule builder">
      <div class="tut-rule-action"><strong>A ROBOT MUST WAIT IF</strong></div>
      ${condition ? `
        <div class="tut-rule-cond completed"><span></span><b>${condition.text}</b></div>
        <div class="tut-practice-rule-actions">
          <button class="tut-change-condition" id="tut-change-condition" type="button">Change condition</button>
        </div>
      ` : `
        <div class="tut-practice-editor">
          <span></span>
          <select id="tut-practice-object" aria-label="Condition object">
            <option value="">Select object</option>
            <option value="movement">Movement</option>
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
  if(!state.practiceSaved){
    return `
      <div class="tut-library-instruction">
        <span>Optional</span>
        <strong>Save the rule from the previous scene to make it available here, or start the task without saving it.</strong>
      </div>
      <div class="tut-library-demo">
        <section>
          <h3>Rule from the previous scene</h3>
          <div class="tut-library-rule">
            <div>A ROBOT MUST WAIT IF</div>
            <div>${text}</div>
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
        ? "The saved rule is now in this scene's rulebook."
        : "The rule remains in the library. Add it to this scene's rulebook if you want to test it here."}</strong>
    </div>
    <div class="tut-library-demo">
      <section>
        <h3>Rules in this scene</h3>
        ${state.practiceUsed ? `
          <div class="tut-library-rule">
            <div>A ROBOT MUST WAIT IF</div>
            <div>${text}</div>
          </div>
        ` : '<p class="tut-library-empty">No active rules.</p>'}
      </section>
      <section>
        <h3>Saved rule library</h3>
        <div class="tut-saved-row">
          <span>A ROBOT MUST WAIT IF ${text}</span>
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
      setFeedback(null, "The saved rule is active in this scene. Press Run to test it.");
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

function renderPage(index){
  recordPageVisit();
  stopAnimation();
  state.page = Math.max(0, Math.min(index, PAGES.length - 1));
  state.pageStartedAt = Date.now();
  const page = PAGES[state.page];

  el("tut-title").textContent = page.title;
  el("tut-lead").textContent = page.lead;
  el("tut-points").innerHTML = page.points.map(point => `<li>${point}</li>`).join("");

  const visual = el("tut-visual");
  const ruleReference = el("tut-rule-reference");
  document.querySelector(".tut-panel")?.classList.toggle(
    "has-rule-practice",
    page.id === "rules" || page.id === "library",
  );
  document.querySelector(".tut-body")?.classList.toggle(
    "has-rule-practice",
    page.id === "rules" || page.id === "library",
  );
  visual.hidden = !page.scene;
  ruleReference.hidden = !page.reference;

  if(page.scene){
    el("tut-controls").hidden = !page.controls;
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
    },
  };
  emit("tutorial_completed", {
    duration_ms:window.tutorialReport.duration_ms,
    run_count:state.runs.length,
  });
  el("tutorial-screen").hidden = true;
  document.body.classList.remove("tutorial-active");
  document.querySelector(".wrap")?.removeAttribute("aria-hidden");
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
}

window.ResearchTutorial = {
  start(options={}){
    emit = options.log || (() => {});
    finish = options.onComplete || (() => {});
    const screen = el("tutorial-screen");
    if(!screen){
      finish();
      return;
    }
    state.startedAt = Date.now();
    state.pageStartedAt = 0;
    state.practiceCondition = null;
    state.practiceSolved = false;
    state.practiceSaved = false;
    state.practiceUsed = false;
    state.reuseSolved = false;
    document.body.classList.add("tutorial-active");
    document.querySelector(".wrap")?.setAttribute("aria-hidden", "true");
    screen.hidden = false;
    bind();
    emit("tutorial_started", {page_count:PAGES.length});
    renderPage(0);
    el("tut-continue").focus();
  },
};

})();
