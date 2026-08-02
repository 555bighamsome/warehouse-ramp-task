window.PARADIGM_LIBRARIES = {
  "ramp-carry": {
    "experiment_version": 6,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "carry",
    "schedule": "ramp",
    "world_rules": [
      "Some robots must use a marked machine square; others enter a single-lane branch with near and far destinations.",
      "Robots choose their shortest legal route and move at the same time.",
      "A machine square is a special map square that can serve one robot at a time.",
      "If multiple robots enter the same ordinary square together, they collide.",
      "At a single-lane branch, the far destination must be reached before the near destination is occupied.",
      "When two robots reach a machine square together, one must wait before the square can be used.",
      "Only one of the two possible entry orders is accepted.",
      "After using a machine square, a robot leaves the work area.",
      "A rule applies to every robot in the current scene when all conditions are true."
    ],
    "rule_schema": {
      "action": {
        "id": "MOVE",
        "label": "MOVE INTO A SQUARE"
      },
      "operators": [
        {
          "id": "IS",
          "label": "IS"
        },
        {
          "id": "IS_NOT",
          "label": "IS NOT"
        }
      ],
      "fields": [
        {
          "id": "contested",
          "object": "Square being entered",
          "predicate": "contested",
          "values": [
            {
              "id": true,
              "label": "being entered by multiple robots"
            }
          ]
        },
        {
          "id": "target_type",
          "object": "Square being entered",
          "predicate": "target_type",
          "values": [
            {
              "id": "machine",
              "label": "a machine square"
            }
          ]
        },
        {
          "id": "role",
          "object": "Robot role",
          "predicate": "role",
          "values": [
            {
              "id": "carrier",
              "label": "Carrier"
            },
            {
              "id": "operator",
              "label": "Operator"
            }
          ]
        },
        {
          "id": "move_dir",
          "object": "Movement",
          "predicate": "move_dir",
          "values": [
            {
              "id": "N",
              "label": "northbound"
            },
            {
              "id": "S",
              "label": "southbound"
            },
            {
              "id": "E",
              "label": "eastbound"
            },
            {
              "id": "W",
              "label": "westbound"
            }
          ]
        }
      ],
      "max_conditions": 3,
      "one_condition_per_property": true
    },
    "global_actions": [
      {
        "id": "MOVE",
        "label": "move into a square"
      }
    ],
    "global_vocabulary": [
      {
        "object": "Square being entered",
        "property": "contested",
        "predicate": "contested",
        "value": true,
        "negated": false,
        "label": "being entered by multiple robots"
      },
      {
        "object": "Square being entered",
        "property": "target_type",
        "predicate": "target_type",
        "value": "machine",
        "negated": false,
        "label": "a machine square"
      },
      {
        "object": "Robot role",
        "property": "role",
        "predicate": "role",
        "value": "carrier",
        "negated": false,
        "label": "Carrier"
      },
      {
        "object": "Robot role",
        "property": "role",
        "predicate": "role",
        "value": "operator",
        "negated": false,
        "label": "Operator"
      },
      {
        "object": "Movement",
        "property": "move_dir",
        "predicate": "move_dir",
        "value": "N",
        "negated": false,
        "label": "northbound"
      },
      {
        "object": "Movement",
        "property": "move_dir",
        "predicate": "move_dir",
        "value": "S",
        "negated": false,
        "label": "southbound"
      },
      {
        "object": "Movement",
        "property": "move_dir",
        "predicate": "move_dir",
        "value": "E",
        "negated": false,
        "label": "eastbound"
      },
      {
        "object": "Movement",
        "property": "move_dir",
        "predicate": "move_dir",
        "value": "W",
        "negated": false,
        "label": "westbound"
      }
    ],
    "action_condition_space": {
      "MOVE": [
        {
          "object": "Square being entered",
          "property": "contested",
          "predicate": "contested",
          "value": true,
          "negated": false,
          "label": "being entered by multiple robots"
        },
        {
          "object": "Square being entered",
          "property": "target_type",
          "predicate": "target_type",
          "value": "machine",
          "negated": false,
          "label": "a machine square"
        },
        {
          "object": "Robot role",
          "property": "role",
          "predicate": "role",
          "value": "carrier",
          "negated": false,
          "label": "Carrier"
        },
        {
          "object": "Robot role",
          "property": "role",
          "predicate": "role",
          "value": "operator",
          "negated": false,
          "label": "Operator"
        },
        {
          "object": "Movement",
          "property": "move_dir",
          "predicate": "move_dir",
          "value": "N",
          "negated": false,
          "label": "northbound"
        },
        {
          "object": "Movement",
          "property": "move_dir",
          "predicate": "move_dir",
          "value": "S",
          "negated": false,
          "label": "southbound"
        },
        {
          "object": "Movement",
          "property": "move_dir",
          "predicate": "move_dir",
          "value": "E",
          "negated": false,
          "label": "eastbound"
        },
        {
          "object": "Movement",
          "property": "move_dir",
          "predicate": "move_dir",
          "value": "W",
          "negated": false,
          "label": "westbound"
        }
      ]
    },
    "tasks": [
      {
        "id": "trial_1",
        "label": "T1",
        "level": 1,
        "layer": 1,
        "prerequisites": [],
        "family": "machine_context_movement_shift",
        "active_agent_count": 2,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "ramp_machine_context_t1",
          "rows": 6,
          "cols": 9,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              1,
              0
            ],
            [
              1,
              8
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              7
            ],
            [
              2,
              8
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              3,
              7
            ],
            [
              3,
              8
            ],
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              4,
              2
            ],
            [
              4,
              3
            ],
            [
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              4,
              7
            ],
            [
              4,
              8
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              4
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                1,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  4
                ]
              }
            },
            {
              "id": 1,
              "start": [
                1,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  3,
                  4
                ]
              }
            }
          ]
        }
      },
      {
        "id": "trial_2",
        "label": "T2",
        "level": 2,
        "layer": 2,
        "prerequisites": [
          "trial_1"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 2,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "ramp_machine_context_t2",
          "rows": 9,
          "cols": 9,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              1,
              7
            ],
            [
              1,
              8
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              8
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              5
            ],
            [
              3,
              8
            ],
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              4,
              7
            ],
            [
              4,
              8
            ],
            [
              5,
              0
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ],
            [
              6,
              0
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              6
            ],
            [
              6,
              7
            ],
            [
              6,
              8
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              4
            ],
            [
              7,
              7
            ],
            [
              7,
              8
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              4
            ],
            [
              8,
              5
            ],
            [
              8,
              6
            ],
            [
              8,
              7
            ],
            [
              8,
              8
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_0",
              "cell": [
                4,
                4
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                2,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_0"
              }
            },
            {
              "id": 1,
              "start": [
                7,
                6
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_0"
              }
            }
          ]
        }
      },
      {
        "id": "trial_3",
        "label": "T3",
        "level": 3,
        "layer": 3,
        "prerequisites": [
          "trial_2"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "ramp_machine_context_t3",
          "rows": 9,
          "cols": 19,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              0,
              9
            ],
            [
              0,
              10
            ],
            [
              0,
              11
            ],
            [
              0,
              12
            ],
            [
              0,
              13
            ],
            [
              0,
              14
            ],
            [
              0,
              15
            ],
            [
              0,
              16
            ],
            [
              0,
              17
            ],
            [
              0,
              18
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              1,
              7
            ],
            [
              1,
              8
            ],
            [
              1,
              9
            ],
            [
              1,
              10
            ],
            [
              1,
              11
            ],
            [
              1,
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              15
            ],
            [
              1,
              16
            ],
            [
              1,
              17
            ],
            [
              1,
              18
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              7
            ],
            [
              2,
              8
            ],
            [
              2,
              9
            ],
            [
              2,
              10
            ],
            [
              2,
              11
            ],
            [
              2,
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              15
            ],
            [
              2,
              16
            ],
            [
              2,
              17
            ],
            [
              2,
              18
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              3,
              7
            ],
            [
              3,
              8
            ],
            [
              3,
              9
            ],
            [
              3,
              10
            ],
            [
              3,
              11
            ],
            [
              3,
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              15
            ],
            [
              3,
              16
            ],
            [
              3,
              17
            ],
            [
              3,
              18
            ],
            [
              4,
              0
            ],
            [
              4,
              18
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ],
            [
              5,
              9
            ],
            [
              5,
              10
            ],
            [
              5,
              11
            ],
            [
              5,
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              15
            ],
            [
              5,
              16
            ],
            [
              5,
              17
            ],
            [
              5,
              18
            ],
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              6,
              7
            ],
            [
              6,
              8
            ],
            [
              6,
              9
            ],
            [
              6,
              10
            ],
            [
              6,
              11
            ],
            [
              6,
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ],
            [
              6,
              17
            ],
            [
              6,
              18
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              5
            ],
            [
              7,
              6
            ],
            [
              7,
              7
            ],
            [
              7,
              8
            ],
            [
              7,
              9
            ],
            [
              7,
              10
            ],
            [
              7,
              11
            ],
            [
              7,
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              15
            ],
            [
              7,
              16
            ],
            [
              7,
              17
            ],
            [
              7,
              18
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              4
            ],
            [
              8,
              5
            ],
            [
              8,
              6
            ],
            [
              8,
              7
            ],
            [
              8,
              8
            ],
            [
              8,
              9
            ],
            [
              8,
              10
            ],
            [
              8,
              11
            ],
            [
              8,
              12
            ],
            [
              8,
              13
            ],
            [
              8,
              14
            ],
            [
              8,
              15
            ],
            [
              8,
              16
            ],
            [
              8,
              17
            ],
            [
              8,
              18
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                4,
                14
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                4,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  4
                ]
              }
            },
            {
              "id": 1,
              "start": [
                4,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  4
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                14
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 3,
              "start": [
                7,
                14
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            }
          ]
        }
      },
      {
        "id": "trial_4",
        "label": "T4",
        "level": 4,
        "layer": 4,
        "prerequisites": [
          "trial_3"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 6,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "ramp_machine_context_t4",
          "rows": 19,
          "cols": 19,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              0,
              9
            ],
            [
              0,
              10
            ],
            [
              0,
              11
            ],
            [
              0,
              12
            ],
            [
              0,
              13
            ],
            [
              0,
              14
            ],
            [
              0,
              15
            ],
            [
              0,
              16
            ],
            [
              0,
              17
            ],
            [
              0,
              18
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              1,
              7
            ],
            [
              1,
              8
            ],
            [
              1,
              9
            ],
            [
              1,
              10
            ],
            [
              1,
              11
            ],
            [
              1,
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              15
            ],
            [
              1,
              16
            ],
            [
              1,
              17
            ],
            [
              1,
              18
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              7
            ],
            [
              2,
              8
            ],
            [
              2,
              9
            ],
            [
              2,
              10
            ],
            [
              2,
              11
            ],
            [
              2,
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              15
            ],
            [
              2,
              16
            ],
            [
              2,
              17
            ],
            [
              2,
              18
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              3,
              7
            ],
            [
              3,
              8
            ],
            [
              3,
              9
            ],
            [
              3,
              10
            ],
            [
              3,
              11
            ],
            [
              3,
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              15
            ],
            [
              3,
              16
            ],
            [
              3,
              17
            ],
            [
              3,
              18
            ],
            [
              4,
              0
            ],
            [
              4,
              18
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ],
            [
              5,
              9
            ],
            [
              5,
              10
            ],
            [
              5,
              11
            ],
            [
              5,
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              15
            ],
            [
              5,
              16
            ],
            [
              5,
              17
            ],
            [
              5,
              18
            ],
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              6,
              7
            ],
            [
              6,
              8
            ],
            [
              6,
              9
            ],
            [
              6,
              10
            ],
            [
              6,
              11
            ],
            [
              6,
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ],
            [
              6,
              17
            ],
            [
              6,
              18
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              5
            ],
            [
              7,
              6
            ],
            [
              7,
              7
            ],
            [
              7,
              8
            ],
            [
              7,
              9
            ],
            [
              7,
              10
            ],
            [
              7,
              11
            ],
            [
              7,
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              15
            ],
            [
              7,
              16
            ],
            [
              7,
              17
            ],
            [
              7,
              18
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              5
            ],
            [
              8,
              6
            ],
            [
              8,
              7
            ],
            [
              8,
              8
            ],
            [
              8,
              9
            ],
            [
              8,
              10
            ],
            [
              8,
              11
            ],
            [
              8,
              12
            ],
            [
              8,
              13
            ],
            [
              8,
              14
            ],
            [
              8,
              15
            ],
            [
              8,
              16
            ],
            [
              8,
              17
            ],
            [
              8,
              18
            ],
            [
              9,
              0
            ],
            [
              9,
              1
            ],
            [
              9,
              2
            ],
            [
              9,
              3
            ],
            [
              9,
              5
            ],
            [
              9,
              6
            ],
            [
              9,
              7
            ],
            [
              9,
              8
            ],
            [
              9,
              9
            ],
            [
              9,
              10
            ],
            [
              9,
              11
            ],
            [
              9,
              12
            ],
            [
              9,
              13
            ],
            [
              9,
              14
            ],
            [
              9,
              15
            ],
            [
              9,
              16
            ],
            [
              9,
              17
            ],
            [
              9,
              18
            ],
            [
              10,
              0
            ],
            [
              10,
              1
            ],
            [
              10,
              2
            ],
            [
              10,
              3
            ],
            [
              10,
              5
            ],
            [
              10,
              6
            ],
            [
              10,
              7
            ],
            [
              10,
              8
            ],
            [
              10,
              9
            ],
            [
              10,
              10
            ],
            [
              10,
              11
            ],
            [
              10,
              12
            ],
            [
              10,
              13
            ],
            [
              10,
              14
            ],
            [
              10,
              15
            ],
            [
              10,
              16
            ],
            [
              10,
              17
            ],
            [
              10,
              18
            ],
            [
              11,
              0
            ],
            [
              11,
              1
            ],
            [
              11,
              2
            ],
            [
              11,
              3
            ],
            [
              11,
              5
            ],
            [
              11,
              6
            ],
            [
              11,
              7
            ],
            [
              11,
              8
            ],
            [
              11,
              9
            ],
            [
              11,
              10
            ],
            [
              11,
              11
            ],
            [
              11,
              12
            ],
            [
              11,
              13
            ],
            [
              11,
              14
            ],
            [
              11,
              15
            ],
            [
              11,
              16
            ],
            [
              11,
              17
            ],
            [
              11,
              18
            ],
            [
              12,
              0
            ],
            [
              12,
              1
            ],
            [
              12,
              2
            ],
            [
              12,
              3
            ],
            [
              12,
              5
            ],
            [
              12,
              6
            ],
            [
              12,
              7
            ],
            [
              12,
              8
            ],
            [
              12,
              9
            ],
            [
              12,
              10
            ],
            [
              12,
              11
            ],
            [
              12,
              12
            ],
            [
              12,
              13
            ],
            [
              12,
              14
            ],
            [
              12,
              15
            ],
            [
              12,
              16
            ],
            [
              12,
              17
            ],
            [
              12,
              18
            ],
            [
              13,
              0
            ],
            [
              13,
              1
            ],
            [
              13,
              2
            ],
            [
              13,
              3
            ],
            [
              13,
              5
            ],
            [
              13,
              6
            ],
            [
              13,
              7
            ],
            [
              13,
              8
            ],
            [
              13,
              9
            ],
            [
              13,
              10
            ],
            [
              13,
              11
            ],
            [
              13,
              12
            ],
            [
              13,
              13
            ],
            [
              13,
              14
            ],
            [
              13,
              15
            ],
            [
              13,
              16
            ],
            [
              13,
              17
            ],
            [
              13,
              18
            ],
            [
              14,
              0
            ],
            [
              14,
              8
            ],
            [
              14,
              9
            ],
            [
              14,
              10
            ],
            [
              14,
              11
            ],
            [
              14,
              12
            ],
            [
              14,
              13
            ],
            [
              14,
              14
            ],
            [
              14,
              15
            ],
            [
              14,
              16
            ],
            [
              14,
              17
            ],
            [
              14,
              18
            ],
            [
              15,
              0
            ],
            [
              15,
              1
            ],
            [
              15,
              2
            ],
            [
              15,
              3
            ],
            [
              15,
              5
            ],
            [
              15,
              6
            ],
            [
              15,
              7
            ],
            [
              15,
              8
            ],
            [
              15,
              9
            ],
            [
              15,
              10
            ],
            [
              15,
              11
            ],
            [
              15,
              12
            ],
            [
              15,
              13
            ],
            [
              15,
              14
            ],
            [
              15,
              15
            ],
            [
              15,
              16
            ],
            [
              15,
              17
            ],
            [
              15,
              18
            ],
            [
              16,
              0
            ],
            [
              16,
              1
            ],
            [
              16,
              2
            ],
            [
              16,
              3
            ],
            [
              16,
              5
            ],
            [
              16,
              6
            ],
            [
              16,
              7
            ],
            [
              16,
              8
            ],
            [
              16,
              9
            ],
            [
              16,
              10
            ],
            [
              16,
              11
            ],
            [
              16,
              12
            ],
            [
              16,
              13
            ],
            [
              16,
              14
            ],
            [
              16,
              15
            ],
            [
              16,
              16
            ],
            [
              16,
              17
            ],
            [
              16,
              18
            ],
            [
              17,
              0
            ],
            [
              17,
              1
            ],
            [
              17,
              2
            ],
            [
              17,
              3
            ],
            [
              17,
              5
            ],
            [
              17,
              6
            ],
            [
              17,
              7
            ],
            [
              17,
              8
            ],
            [
              17,
              9
            ],
            [
              17,
              10
            ],
            [
              17,
              11
            ],
            [
              17,
              12
            ],
            [
              17,
              13
            ],
            [
              17,
              14
            ],
            [
              17,
              15
            ],
            [
              17,
              16
            ],
            [
              17,
              17
            ],
            [
              17,
              18
            ],
            [
              18,
              0
            ],
            [
              18,
              1
            ],
            [
              18,
              2
            ],
            [
              18,
              3
            ],
            [
              18,
              4
            ],
            [
              18,
              5
            ],
            [
              18,
              6
            ],
            [
              18,
              7
            ],
            [
              18,
              8
            ],
            [
              18,
              9
            ],
            [
              18,
              10
            ],
            [
              18,
              11
            ],
            [
              18,
              12
            ],
            [
              18,
              13
            ],
            [
              18,
              14
            ],
            [
              18,
              15
            ],
            [
              18,
              16
            ],
            [
              18,
              17
            ],
            [
              18,
              18
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                4,
                14
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                14,
                4
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                4,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  4
                ]
              }
            },
            {
              "id": 1,
              "start": [
                4,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  4
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                14
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 3,
              "start": [
                7,
                14
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 4,
              "start": [
                14,
                1
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_2"
              }
            },
            {
              "id": 5,
              "start": [
                14,
                7
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_2"
              }
            }
          ]
        }
      },
      {
        "id": "trial_5",
        "label": "T5",
        "level": 5,
        "layer": 5,
        "prerequisites": [
          "trial_4"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 8,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "ramp_machine_context_t5",
          "rows": 19,
          "cols": 19,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              0,
              9
            ],
            [
              0,
              10
            ],
            [
              0,
              11
            ],
            [
              0,
              12
            ],
            [
              0,
              13
            ],
            [
              0,
              14
            ],
            [
              0,
              15
            ],
            [
              0,
              16
            ],
            [
              0,
              17
            ],
            [
              0,
              18
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              1,
              7
            ],
            [
              1,
              8
            ],
            [
              1,
              9
            ],
            [
              1,
              10
            ],
            [
              1,
              11
            ],
            [
              1,
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              15
            ],
            [
              1,
              16
            ],
            [
              1,
              17
            ],
            [
              1,
              18
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              7
            ],
            [
              2,
              8
            ],
            [
              2,
              9
            ],
            [
              2,
              10
            ],
            [
              2,
              11
            ],
            [
              2,
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              15
            ],
            [
              2,
              16
            ],
            [
              2,
              17
            ],
            [
              2,
              18
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              3,
              7
            ],
            [
              3,
              8
            ],
            [
              3,
              9
            ],
            [
              3,
              10
            ],
            [
              3,
              11
            ],
            [
              3,
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              15
            ],
            [
              3,
              16
            ],
            [
              3,
              17
            ],
            [
              3,
              18
            ],
            [
              4,
              0
            ],
            [
              4,
              18
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ],
            [
              5,
              9
            ],
            [
              5,
              10
            ],
            [
              5,
              11
            ],
            [
              5,
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              15
            ],
            [
              5,
              16
            ],
            [
              5,
              17
            ],
            [
              5,
              18
            ],
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              6,
              7
            ],
            [
              6,
              8
            ],
            [
              6,
              9
            ],
            [
              6,
              10
            ],
            [
              6,
              11
            ],
            [
              6,
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ],
            [
              6,
              17
            ],
            [
              6,
              18
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              5
            ],
            [
              7,
              6
            ],
            [
              7,
              7
            ],
            [
              7,
              8
            ],
            [
              7,
              9
            ],
            [
              7,
              10
            ],
            [
              7,
              11
            ],
            [
              7,
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              15
            ],
            [
              7,
              16
            ],
            [
              7,
              17
            ],
            [
              7,
              18
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              5
            ],
            [
              8,
              6
            ],
            [
              8,
              7
            ],
            [
              8,
              8
            ],
            [
              8,
              9
            ],
            [
              8,
              10
            ],
            [
              8,
              11
            ],
            [
              8,
              12
            ],
            [
              8,
              13
            ],
            [
              8,
              15
            ],
            [
              8,
              16
            ],
            [
              8,
              17
            ],
            [
              8,
              18
            ],
            [
              9,
              0
            ],
            [
              9,
              1
            ],
            [
              9,
              2
            ],
            [
              9,
              3
            ],
            [
              9,
              5
            ],
            [
              9,
              6
            ],
            [
              9,
              7
            ],
            [
              9,
              8
            ],
            [
              9,
              9
            ],
            [
              9,
              10
            ],
            [
              9,
              11
            ],
            [
              9,
              12
            ],
            [
              9,
              13
            ],
            [
              9,
              15
            ],
            [
              9,
              16
            ],
            [
              9,
              17
            ],
            [
              9,
              18
            ],
            [
              10,
              0
            ],
            [
              10,
              1
            ],
            [
              10,
              2
            ],
            [
              10,
              3
            ],
            [
              10,
              5
            ],
            [
              10,
              6
            ],
            [
              10,
              7
            ],
            [
              10,
              8
            ],
            [
              10,
              9
            ],
            [
              10,
              10
            ],
            [
              10,
              11
            ],
            [
              10,
              12
            ],
            [
              10,
              13
            ],
            [
              10,
              15
            ],
            [
              10,
              16
            ],
            [
              10,
              17
            ],
            [
              10,
              18
            ],
            [
              11,
              0
            ],
            [
              11,
              1
            ],
            [
              11,
              2
            ],
            [
              11,
              3
            ],
            [
              11,
              5
            ],
            [
              11,
              6
            ],
            [
              11,
              7
            ],
            [
              11,
              8
            ],
            [
              11,
              9
            ],
            [
              11,
              10
            ],
            [
              11,
              11
            ],
            [
              11,
              12
            ],
            [
              11,
              13
            ],
            [
              11,
              15
            ],
            [
              11,
              16
            ],
            [
              11,
              17
            ],
            [
              11,
              18
            ],
            [
              12,
              0
            ],
            [
              12,
              1
            ],
            [
              12,
              2
            ],
            [
              12,
              3
            ],
            [
              12,
              5
            ],
            [
              12,
              6
            ],
            [
              12,
              7
            ],
            [
              12,
              8
            ],
            [
              12,
              9
            ],
            [
              12,
              10
            ],
            [
              12,
              11
            ],
            [
              12,
              12
            ],
            [
              12,
              13
            ],
            [
              12,
              15
            ],
            [
              12,
              16
            ],
            [
              12,
              17
            ],
            [
              12,
              18
            ],
            [
              13,
              0
            ],
            [
              13,
              1
            ],
            [
              13,
              2
            ],
            [
              13,
              3
            ],
            [
              13,
              5
            ],
            [
              13,
              6
            ],
            [
              13,
              7
            ],
            [
              13,
              8
            ],
            [
              13,
              9
            ],
            [
              13,
              10
            ],
            [
              13,
              11
            ],
            [
              13,
              12
            ],
            [
              13,
              13
            ],
            [
              13,
              15
            ],
            [
              13,
              16
            ],
            [
              13,
              17
            ],
            [
              13,
              18
            ],
            [
              14,
              0
            ],
            [
              14,
              15
            ],
            [
              14,
              16
            ],
            [
              14,
              17
            ],
            [
              14,
              18
            ],
            [
              15,
              0
            ],
            [
              15,
              1
            ],
            [
              15,
              2
            ],
            [
              15,
              3
            ],
            [
              15,
              5
            ],
            [
              15,
              6
            ],
            [
              15,
              7
            ],
            [
              15,
              8
            ],
            [
              15,
              9
            ],
            [
              15,
              10
            ],
            [
              15,
              11
            ],
            [
              15,
              12
            ],
            [
              15,
              13
            ],
            [
              15,
              15
            ],
            [
              15,
              16
            ],
            [
              15,
              17
            ],
            [
              15,
              18
            ],
            [
              16,
              0
            ],
            [
              16,
              1
            ],
            [
              16,
              2
            ],
            [
              16,
              3
            ],
            [
              16,
              5
            ],
            [
              16,
              6
            ],
            [
              16,
              7
            ],
            [
              16,
              8
            ],
            [
              16,
              9
            ],
            [
              16,
              10
            ],
            [
              16,
              11
            ],
            [
              16,
              12
            ],
            [
              16,
              13
            ],
            [
              16,
              15
            ],
            [
              16,
              16
            ],
            [
              16,
              17
            ],
            [
              16,
              18
            ],
            [
              17,
              0
            ],
            [
              17,
              1
            ],
            [
              17,
              2
            ],
            [
              17,
              3
            ],
            [
              17,
              5
            ],
            [
              17,
              6
            ],
            [
              17,
              7
            ],
            [
              17,
              8
            ],
            [
              17,
              9
            ],
            [
              17,
              10
            ],
            [
              17,
              11
            ],
            [
              17,
              12
            ],
            [
              17,
              13
            ],
            [
              17,
              15
            ],
            [
              17,
              16
            ],
            [
              17,
              17
            ],
            [
              17,
              18
            ],
            [
              18,
              0
            ],
            [
              18,
              1
            ],
            [
              18,
              2
            ],
            [
              18,
              3
            ],
            [
              18,
              4
            ],
            [
              18,
              5
            ],
            [
              18,
              6
            ],
            [
              18,
              7
            ],
            [
              18,
              8
            ],
            [
              18,
              9
            ],
            [
              18,
              10
            ],
            [
              18,
              11
            ],
            [
              18,
              12
            ],
            [
              18,
              13
            ],
            [
              18,
              14
            ],
            [
              18,
              15
            ],
            [
              18,
              16
            ],
            [
              18,
              17
            ],
            [
              18,
              18
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                4,
                14
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                14,
                4
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                4,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  4
                ]
              }
            },
            {
              "id": 1,
              "start": [
                4,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  4
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                14
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 3,
              "start": [
                7,
                14
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 4,
              "start": [
                14,
                1
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_2"
              }
            },
            {
              "id": 5,
              "start": [
                14,
                7
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_2"
              }
            },
            {
              "id": 6,
              "start": [
                17,
                14
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  14,
                  13
                ]
              }
            },
            {
              "id": 7,
              "start": [
                11,
                14
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  14,
                  12
                ]
              }
            }
          ]
        }
      },
      {
        "id": "trial_6",
        "label": "T6",
        "level": 6,
        "layer": 6,
        "prerequisites": [
          "trial_5"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "common_machine_crossover",
          "rows": 9,
          "cols": 19,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              0,
              7
            ],
            [
              0,
              8
            ],
            [
              0,
              9
            ],
            [
              0,
              10
            ],
            [
              0,
              11
            ],
            [
              0,
              12
            ],
            [
              0,
              13
            ],
            [
              0,
              14
            ],
            [
              0,
              15
            ],
            [
              0,
              16
            ],
            [
              0,
              17
            ],
            [
              0,
              18
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              1,
              7
            ],
            [
              1,
              8
            ],
            [
              1,
              9
            ],
            [
              1,
              10
            ],
            [
              1,
              11
            ],
            [
              1,
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              15
            ],
            [
              1,
              16
            ],
            [
              1,
              17
            ],
            [
              1,
              18
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              2,
              8
            ],
            [
              2,
              9
            ],
            [
              2,
              10
            ],
            [
              2,
              11
            ],
            [
              2,
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              15
            ],
            [
              2,
              16
            ],
            [
              2,
              17
            ],
            [
              2,
              18
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              5
            ],
            [
              3,
              8
            ],
            [
              3,
              9
            ],
            [
              3,
              10
            ],
            [
              3,
              11
            ],
            [
              3,
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              15
            ],
            [
              3,
              16
            ],
            [
              3,
              17
            ],
            [
              3,
              18
            ],
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              4,
              18
            ],
            [
              5,
              0
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              5,
              6
            ],
            [
              5,
              7
            ],
            [
              5,
              8
            ],
            [
              5,
              9
            ],
            [
              5,
              10
            ],
            [
              5,
              11
            ],
            [
              5,
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              15
            ],
            [
              5,
              16
            ],
            [
              5,
              17
            ],
            [
              5,
              18
            ],
            [
              6,
              0
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              6
            ],
            [
              6,
              7
            ],
            [
              6,
              8
            ],
            [
              6,
              9
            ],
            [
              6,
              10
            ],
            [
              6,
              11
            ],
            [
              6,
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ],
            [
              6,
              17
            ],
            [
              6,
              18
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              4
            ],
            [
              7,
              7
            ],
            [
              7,
              8
            ],
            [
              7,
              9
            ],
            [
              7,
              10
            ],
            [
              7,
              11
            ],
            [
              7,
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              15
            ],
            [
              7,
              16
            ],
            [
              7,
              17
            ],
            [
              7,
              18
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              4
            ],
            [
              8,
              5
            ],
            [
              8,
              6
            ],
            [
              8,
              7
            ],
            [
              8,
              8
            ],
            [
              8,
              9
            ],
            [
              8,
              10
            ],
            [
              8,
              11
            ],
            [
              8,
              12
            ],
            [
              8,
              13
            ],
            [
              8,
              14
            ],
            [
              8,
              15
            ],
            [
              8,
              16
            ],
            [
              8,
              17
            ],
            [
              8,
              18
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_0",
              "cell": [
                4,
                4
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_1",
              "cell": [
                4,
                14
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                2,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_0"
              }
            },
            {
              "id": 1,
              "start": [
                6,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_0"
              }
            },
            {
              "id": 2,
              "start": [
                4,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            },
            {
              "id": 3,
              "start": [
                4,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_1"
              }
            }
          ]
        }
      },
      {
        "id": "trial_7",
        "label": "T7",
        "level": 7,
        "layer": 7,
        "prerequisites": [
          "trial_6"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "world": {
          "name": "common_road_transfer",
          "rows": 19,
          "cols": 6,
          "walls": [
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              1,
              5
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              5
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              5
            ],
            [
              4,
              0
            ],
            [
              4,
              5
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              5
            ],
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              5
            ],
            [
              7,
              0
            ],
            [
              7,
              1
            ],
            [
              7,
              2
            ],
            [
              7,
              3
            ],
            [
              7,
              5
            ],
            [
              8,
              0
            ],
            [
              8,
              1
            ],
            [
              8,
              2
            ],
            [
              8,
              3
            ],
            [
              8,
              5
            ],
            [
              9,
              0
            ],
            [
              9,
              1
            ],
            [
              9,
              2
            ],
            [
              9,
              3
            ],
            [
              9,
              5
            ],
            [
              10,
              0
            ],
            [
              10,
              1
            ],
            [
              10,
              2
            ],
            [
              10,
              3
            ],
            [
              10,
              5
            ],
            [
              11,
              0
            ],
            [
              11,
              1
            ],
            [
              11,
              2
            ],
            [
              11,
              3
            ],
            [
              11,
              5
            ],
            [
              12,
              0
            ],
            [
              12,
              1
            ],
            [
              12,
              2
            ],
            [
              12,
              3
            ],
            [
              12,
              5
            ],
            [
              13,
              0
            ],
            [
              13,
              1
            ],
            [
              13,
              2
            ],
            [
              13,
              3
            ],
            [
              13,
              5
            ],
            [
              14,
              0
            ],
            [
              14,
              5
            ],
            [
              15,
              0
            ],
            [
              15,
              1
            ],
            [
              15,
              2
            ],
            [
              15,
              3
            ],
            [
              15,
              5
            ],
            [
              16,
              0
            ],
            [
              16,
              1
            ],
            [
              16,
              2
            ],
            [
              16,
              3
            ],
            [
              16,
              5
            ],
            [
              17,
              0
            ],
            [
              17,
              1
            ],
            [
              17,
              2
            ],
            [
              17,
              3
            ],
            [
              17,
              5
            ],
            [
              18,
              0
            ],
            [
              18,
              1
            ],
            [
              18,
              2
            ],
            [
              18,
              3
            ],
            [
              18,
              4
            ],
            [
              18,
              5
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                7,
                4
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  4,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                1,
                4
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  4,
                  2
                ]
              }
            },
            {
              "id": 2,
              "start": [
                11,
                4
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  14,
                  3
                ]
              }
            },
            {
              "id": 3,
              "start": [
                17,
                4
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  14,
                  2
                ]
              }
            }
          ]
        }
      }
    ]
  }
};

window.PARADIGM_CONDITION = "ramp-carry";
window.TASK_LIBRARY = window.PARADIGM_LIBRARIES[window.PARADIGM_CONDITION];
