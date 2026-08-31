"use strict";

const stage = document.body.dataset.stage;
const params = new URLSearchParams(window.location.search);
params.set("stage", stage);
window.location.replace(`index.html?${params.toString()}`);
