const params = new URLSearchParams(window.location.search);
const scheduleName = "incremental";
const anchorPanel = params.get("anchor") === "2" ? "2" : "1";
const accessMode = params.get("access") === "always" ? "always" : "critical";
const skipTutorial = params.get("skipTutorial") === "1";
const debugMode = params.get("debug") === "1";
const SUCCESS_FEEDBACK_MS = 2000;

let successTimer = null;

const OPERATIONS = {
  add: { label: "Add", symbol: "UNION", arity: 2 },
  overlap: { label: "Overlap", symbol: "INTERSECTION", arity: 2 },
  invert: { label: "Invert", symbol: "INVERT", arity: 1 },
  flip_tb: { label: "Top-bottom", symbol: "FLIP-TB", arity: 1 },
  flip_lr: { label: "Left-right", symbol: "FLIP-LR", arity: 1 },
};

const state = {
  data: null,
  trials: [],
  trialIndex: 0,
  activePanel: anchorPanel,
  panels: {
    "1": { steps: [], nextId: 1 },
    "2": { steps: [], nextId: 1 },
  },
  pending: null,
  completed: [],
  trialActions: [],
  startedAt: performance.now(),
  trialStartedAt: performance.now(),
  finished: false,
};

const elements = {
  targetGrid: document.querySelector("#target-grid"),
  resultGrid: document.querySelector("#result-grid"),
  workspace: document.querySelector("#workspace"),
  previewGrid: document.querySelector("#preview-grid"),
  resultTitle: document.querySelector("#result-title"),
  resultState: document.querySelector("#result-state"),
  expressionReadout: document.querySelector("#expression-readout"),
  feedback: document.querySelector("#feedback-line"),
  trialLabel: document.querySelector("#trial-label"),
  progressCount: document.querySelector("#progress-count"),
  progressFill: document.querySelector("#progress-fill"),
  currentTrialLabel: document.querySelector("#currentTrial"),
  totalTrialsLabel: document.querySelector("#totalTrials"),
  percentComplete: document.querySelector("#percentComplete"),
  originalProgressFill: document.querySelector("#progressFill"),
  targetNumber: document.querySelector("#targetNumber"),
  phaseLabel: document.querySelector("#phase-label"),
  carryBadge: document.querySelector("#carry-badge"),
  tabs: [...document.querySelectorAll(".panel-tab")],
  operationButtons: [...document.querySelectorAll(".operation-button")],
  cancelOperation: document.querySelector("#cancel-operation"),
  builderHeading: document.querySelector("#builder-heading"),
  builderState: document.querySelector("#builder-state"),
  operandArea: document.querySelector("#binaryPreviewBody"),
  operandJoin: document.querySelector("#operand-join"),
  operandSlots: [document.querySelector("#operand-slot-1"), document.querySelector("#operand-slot-2")],
  unaryOperand: document.querySelector("#unaryOperandBox"),
  binaryPreviewBody: document.querySelector("#binaryPreviewBody"),
  unaryPreviewBody: document.querySelector("#unaryPreviewBody"),
  previewPlaceholder: document.querySelector("#binaryPreviewPlaceholder"),
  binaryOperationLabel: document.querySelector("#binaryInlineOpLabel"),
  unaryOperationLabel: document.querySelector("#unaryInlineOpLabel"),
  pendingExpression: document.querySelector("#pending-expression"),
  confirmStep: document.querySelector("#confirm-step"),
  primitiveShelf: document.querySelector("#primitive-shelf"),
  sourceHint: document.querySelector("#source-hint"),
  stepHistory: document.querySelector("#step-history"),
  stepCount: document.querySelector("#step-count"),
  undoButton: document.querySelector("#undo-button"),
  resetButton: document.querySelector("#reset-button"),
  checkButton: document.querySelector("#check-button"),
  completedStrip: document.querySelector("#completed-strip"),
  completedSummary: document.querySelector("#completed-summary"),
  helpButton: document.querySelector("#help-button"),
  tutorial: document.querySelector("#tutorial-dialog"),
  tutorialClose: document.querySelector("#tutorial-close"),
  startButton: document.querySelector("#start-button"),
  successDialog: document.querySelector("#success-dialog"),
  successTitle: document.querySelector("#success-title"),
  successCopy: document.querySelector("#success-copy"),
  resetDialog: document.querySelector("#reset-dialog"),
  resetPanelNumber: document.querySelector("#reset-panel-number"),
  keepPanelButton: document.querySelector("#keep-panel-button"),
  confirmResetButton: document.querySelector("#confirm-reset-button"),
  debugPanel: document.querySelector("#debug-panel"),
  debugContent: document.querySelector("#debug-content"),
};

function semanticPanel(physicalPanel) {
  if (anchorPanel === "1") return physicalPanel === "1" ? "local" : "compact";
  return physicalPanel === "2" ? "local" : "compact";
}

function physicalPanel(semantic) {
  if (anchorPanel === "1") return semantic === "local" ? "1" : "2";
  return semantic === "local" ? "2" : "1";
}

function currentTrial() {
  return state.trials[state.trialIndex];
}

function activePanelState() {
  return state.panels[state.activePanel];
}

function currentStep(panel = state.activePanel) {
  const steps = state.panels[panel].steps;
  return steps.length ? steps[steps.length - 1] : null;
}

function panelAvailable(panel) {
  return panel === "1" || panel === "2";
}

function panelPatterns(panel = state.activePanel) {
  return state.data.panels[semanticPanel(panel)];
}

function gridRows() {
  return state.data?.metadata.grid.rows ?? 6;
}

function gridColumns() {
  return state.data?.metadata.grid.columns ?? 6;
}

function cellCount() {
  return gridRows() * gridColumns();
}

function fullMask() {
  return (1n << BigInt(cellCount())) - 1n;
}

function maskFromCells(cells) {
  return cells.reduce((mask, index) => mask | (1n << BigInt(index)), 0n);
}

function targetMask() {
  return maskFromCells(currentTrial().target);
}

function flipMask(mask, mode) {
  let result = 0n;
  const rows = gridRows();
  const columns = gridColumns();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const source = row * columns + column;
      if (!(mask & (1n << BigInt(source)))) continue;
      const targetRow = mode === "flip_tb" ? rows - 1 - row : row;
      const targetColumn = mode === "flip_lr" ? columns - 1 - column : column;
      result |= 1n << BigInt(targetRow * columns + targetColumn);
    }
  }
  return result;
}

function applyOperation(op, masks) {
  if (op === "add") return (masks[0] | masks[1]) & fullMask();
  if (op === "overlap") return masks[0] & masks[1];
  if (op === "invert") return (~masks[0]) & fullMask();
  if (op === "flip_tb" || op === "flip_lr") return flipMask(masks[0], op);
  throw new Error(`Unknown operation: ${op}`);
}

function cloneExpression(expression) {
  return JSON.parse(JSON.stringify(expression));
}

function buildExpression(op, sources) {
  return {
    op,
    args: sources.map((source) => cloneExpression(source.expr)),
  };
}

function expressionText(expression) {
  if (expression.op === "primitive") return `P${expression.index + 1}`;
  const args = expression.args.map(expressionText);
  if (expression.op === "add") return `(${args[0]} ADD ${args[1]})`;
  if (expression.op === "overlap") return `(${args[0]} OVERLAP ${args[1]})`;
  if (expression.op === "invert") return `INVERT(${args[0]})`;
  if (expression.op === "flip_tb") return `FLIP-TB(${args[0]})`;
  if (expression.op === "flip_lr") return `FLIP-LR(${args[0]})`;
  return "Unknown expression";
}

function operationCount(expression) {
  if (expression.op === "primitive") return 0;
  return 1 + expression.args.reduce((total, argument) => total + operationCount(argument), 0);
}

function bitCount(mask) {
  let count = 0;
  let value = typeof mask === "bigint" ? mask : BigInt(mask || 0);
  while (value) {
    count += Number(value & 1n);
    value >>= 1n;
  }
  return count;
}

function mismatchCount(mask) {
  return bitCount(mask ^ targetMask());
}

function makeGrid(container) {
  container.replaceChildren();
  container.style.setProperty("--grid-columns", String(gridColumns()));
  container.style.setProperty("--grid-rows", String(gridRows()));
  for (let index = 0; index < cellCount(); index += 1) {
    const cell = document.createElement("span");
    cell.className = "pattern-cell";
    cell.setAttribute("aria-hidden", "true");
    container.append(cell);
  }
}

function setGrid(container, mask, unset = false) {
  const value = typeof mask === "bigint" ? mask : BigInt(mask || 0);
  container.classList.toggle("grid-unset", unset);
  [...container.children].forEach((cell, index) => {
    cell.classList.toggle("on", !unset && Boolean(value & (1n << BigInt(index))));
  });
}

function miniGrid(mask, extraClass = "") {
  const grid = document.createElement("span");
  grid.className = `pattern-grid pattern-grid-mini ${extraClass}`.trim();
  makeGrid(grid);
  setGrid(grid, mask);
  return grid;
}

function primitiveSources(panel = state.activePanel) {
  return panelPatterns(panel).map((pattern, index) => ({
    id: `primitive-${index + 1}`,
    kind: "primitive",
    label: `P${index + 1}`,
    detail: pattern.label,
    mask: maskFromCells(pattern.cells),
    expr: { op: "primitive", index },
  }));
}

function stepSource(step) {
  return {
    id: `step-${step.id}`,
    kind: "step",
    label: step.carried ? "Previous result" : `Step ${step.id}`,
    detail: step.text,
    mask: step.mask,
    expr: step.expr,
  };
}

function carrySubmittedExpression() {
  const submittedPanel = state.activePanel;
  const submittedStep = currentStep(submittedPanel);
  if (!submittedStep) return;

  const carriedStep = {
    ...submittedStep,
    id: 1,
    expr: cloneExpression(submittedStep.expr),
    carried: true,
  };

  state.panels = {
    "1": { steps: [], nextId: 1 },
    "2": { steps: [], nextId: 1 },
  };
  state.panels[submittedPanel] = {
    steps: [carriedStep],
    nextId: 2,
  };
  state.activePanel = submittedPanel;
}

function currentSource() {
  const step = currentStep();
  return step ? stepSource(step) : null;
}

function recordAction(action) {
  state.trialActions.push({
    ...action,
    trial: state.trialIndex + 1,
    elapsed_ms: Math.round(performance.now() - state.trialStartedAt),
  });
}

function setFeedback(message, style = "") {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback-line${style ? ` ${style}` : ""}`;
}

function pendingReady() {
  if (!state.pending) return false;
  const arity = OPERATIONS[state.pending.op].arity;
  return state.pending.operands.slice(0, arity).every(Boolean);
}

function pendingResult() {
  if (!pendingReady()) return null;
  const spec = OPERATIONS[state.pending.op];
  const sources = state.pending.operands.slice(0, spec.arity);
  const expr = buildExpression(state.pending.op, sources);
  return {
    mask: applyOperation(state.pending.op, sources.map((source) => source.mask)),
    expr,
    text: expressionText(expr),
    sources,
  };
}

function beginOperation(op) {
  const spec = OPERATIONS[op];
  if (!spec) return;
  if (state.pending?.op === op) {
    cancelPending();
    return;
  }
  state.pending = {
    op,
    operands: Array(spec.arity).fill(null),
    editingSlot: 0,
  };
  recordAction({ type: "select_operation", panel: state.activePanel, operation: op });
  renderAll();
}

function chooseSource(source) {
  if (!state.pending) return;
  const arity = OPERATIONS[state.pending.op].arity;
  let slot = state.pending.editingSlot;
  if (slot == null || slot >= arity) {
    slot = state.pending.operands.findIndex((operand) => !operand);
  }
  if (slot < 0 || slot >= arity) return;
  state.pending.operands[slot] = source;
  const nextEmpty = state.pending.operands.slice(0, arity).findIndex((operand) => !operand);
  state.pending.editingSlot = nextEmpty >= 0 ? nextEmpty : null;
  recordAction({
    type: "select_source",
    panel: state.activePanel,
    source_kind: source.kind,
    source_id: source.id,
    operation: state.pending.op,
  });
  renderAll();
}

function clearOperand(slotIndex) {
  if (!state.pending || slotIndex >= OPERATIONS[state.pending.op].arity) return;
  state.pending.operands[slotIndex] = null;
  state.pending.editingSlot = slotIndex;
  renderAll();
}

function cancelPending() {
  if (!state.pending) return;
  recordAction({ type: "cancel_pending", panel: state.activePanel, operation: state.pending.op });
  state.pending = null;
  renderAll();
}

function confirmPendingStep() {
  const result = pendingResult();
  if (!result) return;
  const panel = activePanelState();
  const step = {
    id: panel.nextId,
    mask: result.mask,
    expr: result.expr,
    text: result.text,
    operation: state.pending.op,
    operationCount: operationCount(result.expr),
    carried: false,
  };
  panel.nextId += 1;
  panel.steps.push(step);
  recordAction({
    type: "confirm_step",
    panel: state.activePanel,
    representation: semanticPanel(state.activePanel),
    step_id: step.id,
    operation: step.operation,
    expression: step.text,
    operation_count: step.operationCount,
    mask: `0x${step.mask.toString(16)}`,
  });
  state.pending = null;
  const mismatches = mismatchCount(step.mask);
  setFeedback(
    mismatches === 0
      ? "The patterns match. Check the pattern when you are ready."
      : `${mismatches} ${mismatches === 1 ? "cell differs" : "cells differ"} from the target.`,
    mismatches === 0 ? "ready" : "",
  );
  renderAll();
}

function switchPanel(panel) {
  if (panel === state.activePanel || !panelAvailable(panel)) return;
  const previous = state.activePanel;
  state.activePanel = panel;
  state.pending = null;
  recordAction({
    type: "switch_panel",
    from: previous,
    to: panel,
    from_representation: semanticPanel(previous),
    to_representation: semanticPanel(panel),
  });
  const current = currentStep();
  if (!current) {
    setFeedback(`Panel ${panel} has no saved expression yet.`, "");
  } else {
    const mismatches = mismatchCount(current.mask);
    setFeedback(
      mismatches === 0 ? `Panel ${panel} matches the target.` : `Panel ${panel} is ${mismatches} cells away from the target.`,
      mismatches === 0 ? "ready" : "",
    );
  }
  renderAll();
}

function undoLatestStep() {
  const panel = activePanelState();
  if (!panel.steps.length) return;
  const removed = panel.steps.pop();
  state.pending = null;
  recordAction({ type: "undo_step", panel: state.activePanel, removed_step: removed.id });
  const current = currentStep();
  setFeedback(current ? `Returned to Step ${current.id}.` : `Panel ${state.activePanel} is empty.`, "");
  renderAll();
}

function resetActivePanel() {
  const panel = activePanelState();
  recordAction({ type: "reset_panel", panel: state.activePanel, removed_steps: panel.steps.length });
  panel.steps = [];
  panel.nextId = 1;
  state.pending = null;
  elements.resetDialog.close();
  setFeedback(`Panel ${state.activePanel} has been reset.`, "");
  renderAll();
}

function renderTabs() {
  elements.tabs.forEach((tab) => {
    const panel = tab.dataset.panel;
    const available = panelAvailable(panel);
    tab.disabled = !available;
    tab.setAttribute("aria-selected", panel === state.activePanel ? "true" : "false");
    const status = tab.querySelector("small");
    if (panel === state.activePanel) status.textContent = "Active";
    else status.textContent = state.panels[panel].steps.length ? `${state.panels[panel].steps.length} saved steps` : "Available";
  });
}

function renderCurrentResult() {
  const step = currentStep();
  const preview = pendingResult();
  const selectedSource = state.pending?.operands.find(Boolean) ?? null;
  const displayedMask = preview?.mask ?? selectedSource?.mask ?? step?.mask ?? 0n;
  const hasDisplay = Boolean(preview || selectedSource || step);
  const isConfirmedMatch = Boolean(!state.pending && step && mismatchCount(step.mask) === 0);

  elements.resultTitle.textContent = "YOUR PATTERN";
  elements.resultState.textContent = preview
    ? "Preview"
    : selectedSource
      ? "Input selected"
      : step
        ? `Step ${step.id}`
        : "No expression yet";
  elements.expressionReadout.textContent = preview?.text
    ?? selectedSource?.detail
    ?? step?.text
    ?? "Combine patterns to match the target";
  elements.expressionReadout.title = preview?.text ?? selectedSource?.detail ?? step?.text ?? "";
  setGrid(elements.resultGrid, displayedMask);
  elements.workspace.classList.toggle("preview-glow", Boolean(preview));
  elements.resultGrid.classList.toggle("matched", isConfirmedMatch);
  elements.checkButton.disabled = !step || Boolean(state.pending) || state.finished;
  elements.checkButton.innerHTML = isConfirmedMatch
    ? '<span style="font-size:1.1rem; margin-right:0.2rem;">✓</span> Submit'
    : '<span style="font-size:1.1rem; margin-right:0.2rem;">✓</span> Check pattern';
}

function sourceIsSelected(id) {
  if (!state.pending) return false;
  return state.pending.operands.some((source) => source && source.id === id);
}

function renderPrimitiveShelf() {
  elements.primitiveShelf.replaceChildren();
  elements.sourceHint.textContent = `Panel ${state.activePanel}`;
  primitiveSources().forEach((source) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `primitive-btn${sourceIsSelected(source.id) ? " selected" : ""}`;
    button.disabled = !state.pending;
    button.dataset.sourceId = source.id;
    button.setAttribute("aria-label", `Use ${source.detail} as an input`);
    button.title = state.pending ? source.detail : "Select an operation first";
    button.append(miniGrid(source.mask));
    button.addEventListener("click", () => chooseSource(source));
    elements.primitiveShelf.append(button);
  });
}

function renderStepHistory() {
  const steps = activePanelState().steps;
  elements.stepHistory.replaceChildren();
  const hasCarriedResult = Boolean(steps[0]?.carried);
  const newStepCount = steps.length - (hasCarriedResult ? 1 : 0);
  elements.stepCount.textContent = hasCarriedResult
    ? `${newStepCount} new ${newStepCount === 1 ? "step" : "steps"}`
    : `${steps.length} ${steps.length === 1 ? "step" : "steps"}`;
  if (!steps.length) {
    const empty = document.createElement("div");
    empty.className = "empty-history";
    empty.textContent = "Confirmed results will appear here.";
    elements.stepHistory.append(empty);
    return;
  }
  steps.forEach((step, index) => {
    const source = stepSource(step);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `step-card${step.carried ? " carried" : ""}${index === steps.length - 1 ? " current" : ""}${sourceIsSelected(source.id) ? " selected" : ""}`;
    button.dataset.stepId = String(step.id);
    button.append(miniGrid(step.mask));
    const copy = document.createElement("span");
    copy.className = "step-copy";
    const label = step.carried ? "Previous result" : `Step ${step.id}`;
    const badge = step.carried ? '<em>Carried</em>' : index === steps.length - 1 ? '<em>Current</em>' : "";
    copy.innerHTML = `<span><strong>${label}</strong>${badge}</span><small>${step.text}</small>`;
    button.append(copy);
    button.addEventListener("click", () => chooseSource(source));
    elements.stepHistory.append(button);
  });
}

function renderSources() {
  renderPrimitiveShelf();
  renderStepHistory();
}

function renderOperandBox(box, source, editing, disabled = false) {
  box.replaceChildren();
  box.disabled = disabled;
  box.classList.toggle("editing", editing);
  if (source) {
    box.append(miniGrid(source.mask));
    box.title = source.detail;
  } else {
    box.removeAttribute("title");
  }
}

function renderBuilder() {
  const pending = state.pending;
  elements.operationButtons.forEach((button) => {
    button.classList.toggle("selected", Boolean(pending && pending.op === button.dataset.op));
    button.setAttribute("aria-pressed", pending && pending.op === button.dataset.op ? "true" : "false");
  });
  elements.cancelOperation.disabled = !pending;

  if (!pending) {
    elements.builderHeading.textContent = "Select an operation or pattern";
    elements.builderState.textContent = currentStep() ? "Ready for next step" : "Not started";
    elements.pendingExpression.textContent = "Nothing selected";
    elements.confirmStep.disabled = true;
    elements.previewPlaceholder.style.display = "flex";
    elements.binaryPreviewBody.style.display = "none";
    elements.unaryPreviewBody.style.display = "none";
    elements.operandSlots.forEach((slot) => renderOperandBox(slot, null, false, true));
    renderOperandBox(elements.unaryOperand, null, false, true);
    return;
  }

  const spec = OPERATIONS[pending.op];
  const isUnary = spec.arity === 1;
  elements.builderHeading.textContent = spec.label;
  elements.builderState.textContent = pendingReady() ? "Ready to confirm" : `Choose input ${(pending.editingSlot ?? 0) + 1}`;
  elements.previewPlaceholder.style.display = "none";
  elements.binaryPreviewBody.style.display = isUnary ? "none" : "flex";
  elements.unaryPreviewBody.style.display = isUnary ? "flex" : "none";

  const operationName = pending.op === "overlap" ? "intersect" : pending.op === "flip_tb" ? "flip_h" : pending.op === "flip_lr" ? "flip_v" : pending.op;
  if (isUnary) {
    elements.unaryOperationLabel.textContent = `${operationName}(`;
    renderOperandBox(
      elements.unaryOperand,
      pending.operands[0],
      pending.editingSlot === 0,
    );
  } else {
    elements.binaryOperationLabel.textContent = `${operationName}(`;
    elements.operandSlots.forEach((slot, index) => {
      renderOperandBox(slot, pending.operands[index], pending.editingSlot === index);
    });
  }

  const result = pendingResult();
  elements.confirmStep.disabled = !result;
  elements.pendingExpression.textContent = result ? result.text : `${spec.label}: waiting for input`;
  elements.pendingExpression.title = result ? result.text : "";
}

function renderCompleted() {
  elements.completedStrip.replaceChildren();
  state.trials.forEach((trial, index) => {
    const item = document.createElement("div");
    const record = state.completed[index];
    const isCurrent = index === state.trialIndex && !state.finished;
    item.className = `completed-item${record ? " done" : ""}${index === state.trialIndex && !state.finished ? " active" : ""}`;
    const preview = miniGrid(record || isCurrent ? maskFromCells(trial.target) : 0, "history-grid");
    if (!record && !isCurrent) setGrid(preview, 0, true);
    item.append(preview);
    const copy = document.createElement("span");
    copy.innerHTML = `<strong>${index + 1}</strong><small>${record ? `P${record.panel}` : index === state.trialIndex && !state.finished ? "Now" : ""}</small>`;
    item.append(copy);
    elements.completedStrip.append(item);
  });
  elements.completedSummary.textContent = state.completed.length ? `${state.completed.length} of ${state.trials.length}` : "None yet";
}

function updateDebug() {
  if (!debugMode) return;
  const trial = currentTrial();
  const localPhysical = physicalPanel("local");
  const compactPhysical = physicalPanel("compact");
  elements.debugPanel.hidden = false;
  elements.debugContent.textContent = [
    `schedule: ${scheduleName}`,
    `trial: ${trial.key}`,
    `Panel ${localPhysical} is local; minimum: ${trial.minimum_solutions.local.operations} operations`,
    `Panel ${compactPhysical} is compact; minimum: ${trial.minimum_solutions.compact.operations} operations`,
    `intended carried expression: ${trial.intended_local_text}`,
    `minimum new operations from previous final result: ${trial.minimum_new_operations}`,
    `static compact advantage: ${trial.pcfg.compact_advantage_bits.toFixed(2)} bits`,
    `local one-edit mass: ${trial.pcfg.local_one_edit_mass ?? "initial trial"}`,
  ].join("\n");
}

function renderActions() {
  const steps = activePanelState().steps;
  const hasSteps = steps.length > 0;
  const hasUndoableStep = steps.some((step) => !step.carried);
  elements.undoButton.disabled = !hasUndoableStep || state.finished;
  elements.resetButton.disabled = !hasSteps || state.finished;
}

function renderAll() {
  renderTabs();
  renderCurrentResult();
  renderBuilder();
  renderSources();
  renderCompleted();
  renderActions();
  updateDebug();
  window.__experimentState = state;
}

function renderTrial() {
  const trial = currentTrial();
  const number = state.trialIndex + 1;
  const percent = Math.round((number / state.trials.length) * 100);
  elements.trialLabel.textContent = `Pattern ${number} of ${state.trials.length}`;
  elements.progressCount.textContent = `${state.completed.length} completed`;
  elements.progressFill.style.width = `${(number / state.trials.length) * 100}%`;
  elements.currentTrialLabel.textContent = String(number);
  elements.totalTrialsLabel.textContent = String(state.trials.length);
  elements.percentComplete.textContent = `${percent}%`;
  elements.originalProgressFill.style.width = `${(number / state.trials.length) * 100}%`;
  elements.targetNumber.textContent = String(number);
  elements.phaseLabel.textContent = `Pattern ${number}`;
  elements.carryBadge.hidden = state.trialIndex === 0;
  setGrid(elements.targetGrid, targetMask());
  state.pending = null;
  state.trialActions = [];
  state.trialStartedAt = performance.now();
  if (!panelAvailable(state.activePanel)) state.activePanel = anchorPanel;

  const current = currentStep();
  if (state.trialIndex === 0 && !current) {
    setFeedback("Choose an operation and its input patterns to begin.", "");
  } else if (current) {
    const mismatches = mismatchCount(current.mask);
    setFeedback(
      mismatches === 0 ? "Your carried result already matches this target." : `Your previous result is ${mismatches} cells away from the new target.`,
      mismatches === 0 ? "ready" : "",
    );
  } else {
    setFeedback(`Panel ${state.activePanel} has no saved expression yet.`, "");
  }
  renderAll();
}

function checkPattern() {
  const step = currentStep();
  if (!step) return;
  const mismatches = mismatchCount(step.mask);
  recordAction({
    type: "check_pattern",
    panel: state.activePanel,
    representation: semanticPanel(state.activePanel),
    mismatches,
  });
  if (mismatches) {
    setFeedback(`${mismatches} ${mismatches === 1 ? "cell is" : "cells are"} still different.`, "error");
    return;
  }

  const record = {
    trial: state.trialIndex + 1,
    key: currentTrial().key,
    schedule: scheduleName,
    anchor_panel: anchorPanel,
    panel: state.activePanel,
    representation: semanticPanel(state.activePanel),
    expression: step.text,
    expression_tree: cloneExpression(step.expr),
    operation_count: step.operationCount,
    saved_steps_in_panel: activePanelState().steps.length,
    response_time_ms: Math.round(performance.now() - state.trialStartedAt),
    actions: [...state.trialActions],
  };
  state.completed.push(record);
  window.__experimentLog = state.completed;
  elements.progressCount.textContent = `${state.completed.length} completed`;
  renderCompleted();

  const isFinal = state.trialIndex === state.trials.length - 1;
  elements.successTitle.textContent = isFinal ? "All patterns complete!" : "Correct!";
  elements.successCopy.textContent = isFinal
    ? `You completed all ${state.trials.length} targets.`
    : `Target ${state.trialIndex + 1} complete. Loading Target ${state.trialIndex + 2}...`;
  elements.successDialog.classList.add("show");
  elements.successDialog.setAttribute("aria-hidden", "false");
  successTimer = window.setTimeout(continueAfterSuccess, SUCCESS_FEEDBACK_MS);
}

function continueAfterSuccess() {
  if (successTimer !== null) {
    window.clearTimeout(successTimer);
    successTimer = null;
  }
  elements.successDialog.classList.remove("show");
  elements.successDialog.setAttribute("aria-hidden", "true");
  if (state.trialIndex < state.trials.length - 1) {
    carrySubmittedExpression();
    state.trialIndex += 1;
    renderTrial();
    return;
  }
  state.finished = true;
  elements.phaseLabel.textContent = "Finished";
  document.querySelector("#task-heading").textContent = "All target patterns completed";
  elements.carryBadge.hidden = true;
  setFeedback("Your responses have been recorded.", "ready");
  renderAll();
}

function bindEvents() {
  elements.tabs.forEach((tab) => tab.addEventListener("click", () => switchPanel(tab.dataset.panel)));
  elements.operationButtons.forEach((button) => button.addEventListener("click", () => beginOperation(button.dataset.op)));
  elements.operandSlots.forEach((slot) => slot.addEventListener("click", () => clearOperand(Number(slot.dataset.slot))));
  elements.unaryOperand.addEventListener("click", () => clearOperand(0));
  elements.cancelOperation.addEventListener("click", cancelPending);
  elements.confirmStep.addEventListener("click", confirmPendingStep);
  elements.undoButton.addEventListener("click", undoLatestStep);
  elements.resetButton.addEventListener("click", () => {
    elements.resetPanelNumber.textContent = state.activePanel;
    elements.resetDialog.showModal();
  });
  elements.keepPanelButton.addEventListener("click", () => elements.resetDialog.close());
  elements.confirmResetButton.addEventListener("click", resetActivePanel);
  elements.checkButton.addEventListener("click", checkPattern);
  elements.helpButton.addEventListener("click", () => elements.tutorial.showModal());
  elements.tutorialClose.addEventListener("click", () => elements.tutorial.close());
  elements.startButton.addEventListener("click", () => elements.tutorial.close());
}

function renderTutorialGrids() {
  const primitives = panelPatterns(anchorPanel).slice(0, 2).map((pattern) => maskFromCells(pattern.cells));
  const masks = [primitives[0], primitives[1], primitives[0] | primitives[1]];
  [...document.querySelectorAll(".demo-grid")].forEach((grid, index) => {
    grid.classList.add("pattern-grid", "pattern-grid-demo");
    makeGrid(grid);
    setGrid(grid, masks[index]);
  });
}

function fitExperiment() {
  const experiment = document.querySelector("#experimentContent");
  const scale = Math.min(1, (window.innerWidth - 40) / 1200, (window.innerHeight - 40) / 750);
  experiment.style.transform = `scale(${Math.max(0.3, scale)})`;
}

async function init() {
  const response = await fetch("data/curriculum.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load curriculum (${response.status})`);
  state.data = await response.json();
  state.trials = state.data.conditions[scheduleName];
  [elements.targetGrid, elements.resultGrid, elements.previewGrid].forEach(makeGrid);
  renderTutorialGrids();
  bindEvents();
  fitExperiment();
  window.addEventListener("resize", fitExperiment);
  renderTrial();
  window.__experimentLog = state.completed;
  window.__experimentReady = true;
  if (!skipTutorial) elements.tutorial.showModal();
}

init().catch((error) => {
  console.error(error);
  setFeedback("The task could not be loaded. Please refresh the page.", "error");
});
