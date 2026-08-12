window.PARADIGM_LIBRARIES = {
  "ramp-carry": {
    "experiment_version": 16,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "carry",
    "schedule": "ramp",
    "world_rules": [
      "Some robots must leave through a marked exit; others enter a single-lane branch with near and far destinations.",
      "Robots choose their shortest legal route and move at the same time.",
      "An exit is a special map square that admits one robot at a time.",
      "If multiple robots enter the same ordinary square together, they collide.",
      "At a single-lane branch, the far destination must be reached before the near destination is occupied.",
      "When two robots reach an exit together, one must wait before either robot enters.",
      "Only one of the two possible entry orders is accepted.",
      "After entering an exit, a robot leaves the work area.",
      "A rule applies to every robot in the current scene when all conditions are true."
    ],
    "rule_schema": {
      "action": {
        "id": "MOVE",
        "label": "MOVE INTO A SQUARE"
      },
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
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "machine",
              "label": "an exit"
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
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Square being entered",
        "property": "target_type",
        "predicate": "target_type",
        "value": "machine",
        "negated": false,
        "label": "an exit"
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
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Square being entered",
          "property": "target_type",
          "predicate": "target_type",
          "value": "machine",
          "negated": false,
          "label": "an exit"
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
    "ground_truth_design": {
      "role_rule": "contested + Carrier",
      "movement_minimum_primitives": [
        2,
        4,
        5,
        6,
        8,
        9
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "tree_stay_costs": [
        null,
        1,
        1,
        1,
        1,
        1
      ],
      "tree_switch_cost": 3,
      "same_final_constraints": true,
      "same_final_world": false,
      "t6_parameter_free_crossover": {
        "ramp": {
          "stay": 1,
          "switch": 3
        },
        "cliff": {
          "stay": 4,
          "switch": 3
        }
      },
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "parameter_free_hierarchical_tree_distance",
      "schedule_contrast": "one_tree_edge_at_a_time_vs_four_edges_at_once",
      "movement_anchor": "T1 begins with contested + northbound",
      "static_generation_model": "positive_only_hierarchical_grammar_v5",
      "local_transition_model": "parameter_free_semantic_tree_v1",
      "negation_available": false
    },
    "global_solver": {
      "solver": "parameter_free_tree_calibration_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "lane-blocked",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.915879,
        "t1_movement_successful_mass": 0.0061854681,
        "t1_movement_successful_mass_bits": 7.336901,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.915879,
        "t1_role_successful_mass": 0.0119804892,
        "t1_role_successful_mass_bits": 6.383169,
        "t1_role_advantage_bits": 0.953732,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 2,
        "t2_movement_minimum_primitives": 4,
        "t2_movement_static_bits": 14.233279,
        "t2_movement_successful_mass": 0.0001042802,
        "t2_movement_successful_mass_bits": 13.227247,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.915879,
        "t2_role_successful_mass": 0.0084677026,
        "t2_role_successful_mass_bits": 6.883814,
        "t2_role_advantage_bits": 6.343433,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 5,
        "t3_movement_static_bits": 15.648316,
        "t3_movement_successful_mass": 2.8073e-05,
        "t3_movement_successful_mass_bits": 15.12046,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.915879,
        "t3_role_successful_mass": 0.0084677026,
        "t3_role_successful_mass_bits": 6.883814,
        "t3_role_advantage_bits": 8.236646,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 6,
        "t4_movement_static_bits": 17.063354,
        "t4_movement_successful_mass": 7.5578e-06,
        "t4_movement_successful_mass_bits": 17.0136,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.915879,
        "t4_role_successful_mass": 0.0084677026,
        "t4_role_successful_mass_bits": 6.883814,
        "t4_role_advantage_bits": 10.129786,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 3,
        "t5_movement_minimum_primitives": 8,
        "t5_movement_static_bits": 22.72375,
        "t5_movement_successful_mass": 2.021e-07,
        "t5_movement_successful_mass_bits": 22.238694,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.915879,
        "t5_role_successful_mass": 0.0084677026,
        "t5_role_successful_mass_bits": 6.883814,
        "t5_role_advantage_bits": 15.35488,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 3,
        "t6_movement_minimum_primitives": 9,
        "t6_movement_static_bits": 24.138787,
        "t6_movement_successful_mass": 5.41e-08,
        "t6_movement_successful_mass_bits": 24.138787,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.915879,
        "t6_role_successful_mass": 0.0084677026,
        "t6_role_successful_mass_bits": 6.883814,
        "t6_role_advantage_bits": 17.254974,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          3,
          3,
          3,
          3,
          3
        ],
        "tree_preferred_updates": [
          null,
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ]
      }
    },
    "curriculum_prefixes": [],
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
        "starter_rulebook": [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Square being entered",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "N",
                "negated": false
              }
            ]
          }
        ],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Movement anchor",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.915879,
              "successful_probability_mass": 0.0061854681,
              "successful_mass_bits": 7.336901,
              "successful_rulebook_count": 306,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0119804892,
              "successful_mass_bits": 6.383169,
              "successful_rulebook_count": 23,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.953732,
          "local_search": null,
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t1",
          "rows": 7,
          "cols": 5,
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
              4
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
              4
            ],
            [
              3,
              0
            ],
            [
              3,
              4
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
              4
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
              4
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
              4
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "collision",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "collision",
                "cell": [
                  3,
                  3
                ],
                "agents": [
                  0,
                  1
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
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Extend movement account",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t2",
          "rows": 7,
          "cols": 11,
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
              10
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
              10
            ],
            [
              3,
              0
            ],
            [
              3,
              10
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
              4
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
              4,
              9
            ],
            [
              4,
              10
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 6,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Local refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 15.648316,
              "successful_probability_mass": 2.8073e-05,
              "successful_mass_bits": 15.12046,
              "successful_rulebook_count": 27,
              "static_witness": [
                "contested AND south",
                "contested AND ordinary road AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.236646,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t3",
          "rows": 7,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 8,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Local refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 6,
              "minimum_static_bits": 17.063354,
              "successful_probability_mass": 7.5578e-06,
              "successful_mass_bits": 17.0136,
              "successful_rulebook_count": 7,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.129786,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t4",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 10,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Local expansion",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 8,
              "minimum_static_bits": 22.72375,
              "successful_probability_mass": 2.021e-07,
              "successful_mass_bits": 22.238694,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND west",
                "contested AND ordinary road AND north",
                "contested AND exit AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 15.35488,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "machine:S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "W"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t5",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                9,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            },
            {
              "id": 8,
              "start": [
                9,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                11,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ],
                "8": [
                  9,
                  11
                ],
                "9": [
                  11,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
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
        "active_agent_count": 12,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Common diagnostic",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 9,
              "minimum_static_bits": 24.138787,
              "successful_probability_mass": 5.41e-08,
              "successful_mass_bits": 24.138787,
              "successful_rulebook_count": 1,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south",
                "contested AND exit AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 17.254974,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "machine:S",
              "W"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "machine:W"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t6",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
            ],
            [
              9,
              0
            ],
            [
              9,
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                9,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            },
            {
              "id": 8,
              "start": [
                9,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                11,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 10,
              "start": [
                11,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  2
                ]
              }
            },
            {
              "id": 11,
              "start": [
                9,
                5
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  1
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ],
                "8": [
                  9,
                  11
                ],
                "9": [
                  11,
                  9
                ],
                "10": [
                  11,
                  3
                ],
                "11": [
                  9,
                  5
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ],
                "10": [
                  10,
                  3
                ],
                "11": [
                  9,
                  4
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ],
                "10": [
                  10,
                  3
                ],
                "11": [
                  9,
                  4
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
              }
            }
          ]
        }
      }
    ]
  },
  "ramp-fresh": {
    "experiment_version": 16,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "fresh",
    "schedule": "ramp",
    "world_rules": [
      "Some robots must leave through a marked exit; others enter a single-lane branch with near and far destinations.",
      "Robots choose their shortest legal route and move at the same time.",
      "An exit is a special map square that admits one robot at a time.",
      "If multiple robots enter the same ordinary square together, they collide.",
      "At a single-lane branch, the far destination must be reached before the near destination is occupied.",
      "When two robots reach an exit together, one must wait before either robot enters.",
      "Only one of the two possible entry orders is accepted.",
      "After entering an exit, a robot leaves the work area.",
      "A rule applies to every robot in the current scene when all conditions are true."
    ],
    "rule_schema": {
      "action": {
        "id": "MOVE",
        "label": "MOVE INTO A SQUARE"
      },
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
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "machine",
              "label": "an exit"
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
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Square being entered",
        "property": "target_type",
        "predicate": "target_type",
        "value": "machine",
        "negated": false,
        "label": "an exit"
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
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Square being entered",
          "property": "target_type",
          "predicate": "target_type",
          "value": "machine",
          "negated": false,
          "label": "an exit"
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
    "ground_truth_design": {
      "role_rule": "contested + Carrier",
      "movement_minimum_primitives": [
        2,
        4,
        5,
        6,
        8,
        9
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "tree_stay_costs": [
        null,
        1,
        1,
        1,
        1,
        1
      ],
      "tree_switch_cost": 3,
      "same_final_constraints": true,
      "same_final_world": false,
      "t6_parameter_free_crossover": {
        "ramp": {
          "stay": 1,
          "switch": 3
        },
        "cliff": {
          "stay": 4,
          "switch": 3
        }
      },
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "parameter_free_hierarchical_tree_distance",
      "schedule_contrast": "one_tree_edge_at_a_time_vs_four_edges_at_once",
      "movement_anchor": "T1 begins with contested + northbound",
      "static_generation_model": "positive_only_hierarchical_grammar_v5",
      "local_transition_model": "parameter_free_semantic_tree_v1",
      "negation_available": false
    },
    "global_solver": {
      "solver": "parameter_free_tree_calibration_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "lane-blocked",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.915879,
        "t1_movement_successful_mass": 0.0061854681,
        "t1_movement_successful_mass_bits": 7.336901,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.915879,
        "t1_role_successful_mass": 0.0119804892,
        "t1_role_successful_mass_bits": 6.383169,
        "t1_role_advantage_bits": 0.953732,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 2,
        "t2_movement_minimum_primitives": 4,
        "t2_movement_static_bits": 14.233279,
        "t2_movement_successful_mass": 0.0001042802,
        "t2_movement_successful_mass_bits": 13.227247,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.915879,
        "t2_role_successful_mass": 0.0084677026,
        "t2_role_successful_mass_bits": 6.883814,
        "t2_role_advantage_bits": 6.343433,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 5,
        "t3_movement_static_bits": 15.648316,
        "t3_movement_successful_mass": 2.8073e-05,
        "t3_movement_successful_mass_bits": 15.12046,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.915879,
        "t3_role_successful_mass": 0.0084677026,
        "t3_role_successful_mass_bits": 6.883814,
        "t3_role_advantage_bits": 8.236646,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 6,
        "t4_movement_static_bits": 17.063354,
        "t4_movement_successful_mass": 7.5578e-06,
        "t4_movement_successful_mass_bits": 17.0136,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.915879,
        "t4_role_successful_mass": 0.0084677026,
        "t4_role_successful_mass_bits": 6.883814,
        "t4_role_advantage_bits": 10.129786,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 3,
        "t5_movement_minimum_primitives": 8,
        "t5_movement_static_bits": 22.72375,
        "t5_movement_successful_mass": 2.021e-07,
        "t5_movement_successful_mass_bits": 22.238694,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.915879,
        "t5_role_successful_mass": 0.0084677026,
        "t5_role_successful_mass_bits": 6.883814,
        "t5_role_advantage_bits": 15.35488,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 3,
        "t6_movement_minimum_primitives": 9,
        "t6_movement_static_bits": 24.138787,
        "t6_movement_successful_mass": 5.41e-08,
        "t6_movement_successful_mass_bits": 24.138787,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.915879,
        "t6_role_successful_mass": 0.0084677026,
        "t6_role_successful_mass_bits": 6.883814,
        "t6_role_advantage_bits": 17.254974,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          3,
          3,
          3,
          3,
          3
        ],
        "tree_preferred_updates": [
          null,
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ]
      }
    },
    "curriculum_prefixes": [],
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
        "starter_rulebook": [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Square being entered",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "N",
                "negated": false
              }
            ]
          }
        ],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Movement anchor",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.915879,
              "successful_probability_mass": 0.0061854681,
              "successful_mass_bits": 7.336901,
              "successful_rulebook_count": 306,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0119804892,
              "successful_mass_bits": 6.383169,
              "successful_rulebook_count": 23,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.953732,
          "local_search": null,
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t1",
          "rows": 7,
          "cols": 5,
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
              4
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
              4
            ],
            [
              3,
              0
            ],
            [
              3,
              4
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
              4
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
              4
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
              4
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "collision",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "collision",
                "cell": [
                  3,
                  3
                ],
                "agents": [
                  0,
                  1
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
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Extend movement account",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t2",
          "rows": 7,
          "cols": 11,
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
              10
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
              10
            ],
            [
              3,
              0
            ],
            [
              3,
              10
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
              4
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
              4,
              9
            ],
            [
              4,
              10
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 6,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Local refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 15.648316,
              "successful_probability_mass": 2.8073e-05,
              "successful_mass_bits": 15.12046,
              "successful_rulebook_count": 27,
              "static_witness": [
                "contested AND south",
                "contested AND ordinary road AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.236646,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t3",
          "rows": 7,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              15
            ],
            [
              6,
              16
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 8,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Local refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 6,
              "minimum_static_bits": 17.063354,
              "successful_probability_mass": 7.5578e-06,
              "successful_mass_bits": 17.0136,
              "successful_rulebook_count": 7,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.129786,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t4",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 10,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Local expansion",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 8,
              "minimum_static_bits": 22.72375,
              "successful_probability_mass": 2.021e-07,
              "successful_mass_bits": 22.238694,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND west",
                "contested AND ordinary road AND north",
                "contested AND exit AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 15.35488,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "machine:S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "W"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t5",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                9,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            },
            {
              "id": 8,
              "start": [
                9,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                11,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ],
                "8": [
                  9,
                  11
                ],
                "9": [
                  11,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
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
        "active_agent_count": 12,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Common diagnostic",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 9,
              "minimum_static_bits": 24.138787,
              "successful_probability_mass": 5.41e-08,
              "successful_mass_bits": 24.138787,
              "successful_rulebook_count": 1,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south",
                "contested AND exit AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 17.254974,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "road:N",
              "machine:S",
              "W"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "machine:W"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "ramp_pilot_t6",
          "rows": 13,
          "cols": 17,
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
              14
            ],
            [
              1,
              16
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
              14
            ],
            [
              2,
              16
            ],
            [
              3,
              0
            ],
            [
              3,
              16
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              11
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              16
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
              14
            ],
            [
              5,
              16
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
              4
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
              14
            ],
            [
              6,
              16
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
              14
            ],
            [
              7,
              16
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
              16
            ],
            [
              9,
              0
            ],
            [
              9,
              16
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
              4
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
              16
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
              4
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
              16
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
              4
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                3,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                3,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                9,
                9
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
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            },
            {
              "id": 2,
              "start": [
                1,
                9
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
                3,
                7
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
                1,
                15
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
                5,
                15
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
                11,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  14
                ]
              }
            },
            {
              "id": 7,
              "start": [
                7,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  13
                ]
              }
            },
            {
              "id": 8,
              "start": [
                9,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                11,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 10,
              "start": [
                11,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  2
                ]
              }
            },
            {
              "id": 11,
              "start": [
                9,
                5
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  1
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  1,
                  9
                ],
                "3": [
                  3,
                  7
                ],
                "4": [
                  1,
                  15
                ],
                "5": [
                  5,
                  15
                ],
                "6": [
                  11,
                  15
                ],
                "7": [
                  7,
                  15
                ],
                "8": [
                  9,
                  11
                ],
                "9": [
                  11,
                  9
                ],
                "10": [
                  11,
                  3
                ],
                "11": [
                  9,
                  5
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ],
                "10": [
                  10,
                  3
                ],
                "11": [
                  9,
                  4
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  2,
                  9
                ],
                "3": [
                  3,
                  8
                ],
                "4": [
                  2,
                  15
                ],
                "5": [
                  4,
                  15
                ],
                "6": [
                  10,
                  15
                ],
                "7": [
                  8,
                  15
                ],
                "8": [
                  9,
                  10
                ],
                "9": [
                  10,
                  9
                ],
                "10": [
                  10,
                  3
                ],
                "11": [
                  9,
                  4
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  3,
                  9
                ],
                "agents": [
                  2,
                  3
                ]
              }
            }
          ]
        }
      }
    ]
  },
  "cliff-carry": {
    "experiment_version": 16,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "carry",
    "schedule": "cliff",
    "world_rules": [
      "Some robots must leave through a marked exit; others enter a single-lane branch with near and far destinations.",
      "Robots choose their shortest legal route and move at the same time.",
      "An exit is a special map square that admits one robot at a time.",
      "If multiple robots enter the same ordinary square together, they collide.",
      "At a single-lane branch, the far destination must be reached before the near destination is occupied.",
      "When two robots reach an exit together, one must wait before either robot enters.",
      "Only one of the two possible entry orders is accepted.",
      "After entering an exit, a robot leaves the work area.",
      "A rule applies to every robot in the current scene when all conditions are true."
    ],
    "rule_schema": {
      "action": {
        "id": "MOVE",
        "label": "MOVE INTO A SQUARE"
      },
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
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "machine",
              "label": "an exit"
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
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Square being entered",
        "property": "target_type",
        "predicate": "target_type",
        "value": "machine",
        "negated": false,
        "label": "an exit"
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
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Square being entered",
          "property": "target_type",
          "predicate": "target_type",
          "value": "machine",
          "negated": false,
          "label": "an exit"
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
    "ground_truth_design": {
      "role_rule": "contested + Carrier",
      "movement_minimum_primitives": [
        2,
        4,
        4,
        4,
        4,
        9
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "tree_stay_costs": [
        null,
        1,
        0,
        0,
        0,
        4
      ],
      "tree_switch_cost": 3,
      "same_final_constraints": true,
      "same_final_world": false,
      "t6_parameter_free_crossover": {
        "ramp": {
          "stay": 1,
          "switch": 3
        },
        "cliff": {
          "stay": 4,
          "switch": 3
        }
      },
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "parameter_free_hierarchical_tree_distance",
      "schedule_contrast": "one_tree_edge_at_a_time_vs_four_edges_at_once",
      "movement_anchor": "T1 begins with contested + northbound",
      "static_generation_model": "positive_only_hierarchical_grammar_v5",
      "local_transition_model": "parameter_free_semantic_tree_v1",
      "negation_available": false
    },
    "global_solver": {
      "solver": "parameter_free_tree_calibration_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "lane-blocked",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.915879,
        "t1_movement_successful_mass": 0.0061854681,
        "t1_movement_successful_mass_bits": 7.336901,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.915879,
        "t1_role_successful_mass": 0.0119804892,
        "t1_role_successful_mass_bits": 6.383169,
        "t1_role_advantage_bits": 0.953732,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 2,
        "t2_movement_minimum_primitives": 4,
        "t2_movement_static_bits": 14.233279,
        "t2_movement_successful_mass": 0.0001042802,
        "t2_movement_successful_mass_bits": 13.227247,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.915879,
        "t2_role_successful_mass": 0.0084677026,
        "t2_role_successful_mass_bits": 6.883814,
        "t2_role_advantage_bits": 6.343433,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.233279,
        "t3_movement_successful_mass": 0.0001042802,
        "t3_movement_successful_mass_bits": 13.227247,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.915879,
        "t3_role_successful_mass": 0.0084677026,
        "t3_role_successful_mass_bits": 6.883814,
        "t3_role_advantage_bits": 6.343433,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.233279,
        "t4_movement_successful_mass": 0.0001042802,
        "t4_movement_successful_mass_bits": 13.227247,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.915879,
        "t4_role_successful_mass": 0.0084677026,
        "t4_role_successful_mass_bits": 6.883814,
        "t4_role_advantage_bits": 6.343433,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 4,
        "t5_movement_static_bits": 14.233279,
        "t5_movement_successful_mass": 0.0001042802,
        "t5_movement_successful_mass_bits": 13.227247,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.915879,
        "t5_role_successful_mass": 0.0084677026,
        "t5_role_successful_mass_bits": 6.883814,
        "t5_role_advantage_bits": 6.343433,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 3,
        "t6_movement_minimum_primitives": 9,
        "t6_movement_static_bits": 24.138787,
        "t6_movement_successful_mass": 5.41e-08,
        "t6_movement_successful_mass_bits": 24.138787,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.915879,
        "t6_role_successful_mass": 0.0084677026,
        "t6_role_successful_mass_bits": 6.883814,
        "t6_role_advantage_bits": 17.254974,
        "tree_stay_costs": [
          null,
          1,
          0,
          0,
          0,
          4
        ],
        "tree_switch_costs": [
          null,
          3,
          3,
          3,
          3,
          3
        ],
        "tree_preferred_updates": [
          null,
          "movement",
          "movement",
          "movement",
          "movement",
          "role"
        ]
      }
    },
    "curriculum_prefixes": [],
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
        "starter_rulebook": [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Square being entered",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "N",
                "negated": false
              }
            ]
          }
        ],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Movement anchor",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.915879,
              "successful_probability_mass": 0.0061854681,
              "successful_mass_bits": 7.336901,
              "successful_rulebook_count": 306,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0119804892,
              "successful_mass_bits": 6.383169,
              "successful_rulebook_count": 23,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.953732,
          "local_search": null,
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t1",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
            ],
            [
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              19
            ],
            [
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              19
            ],
            [
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              11,
              19
            ],
            [
              11,
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              19
            ],
            [
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              19
            ],
            [
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "collision",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "collision",
                "cell": [
                  3,
                  11
                ],
                "agents": [
                  0,
                  1
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
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Extend movement account",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t2",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              19
            ],
            [
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              19
            ],
            [
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              11,
              19
            ],
            [
              11,
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              19
            ],
            [
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              19
            ],
            [
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 6,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t3",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 8,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t4",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 10,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t5",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
            ],
            [
              3,
              0
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 16,
              "start": [
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 17,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ],
                "16": [
                  5,
                  3
                ],
                "17": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
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
        "active_agent_count": 18,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Common diagnostic",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 9,
              "minimum_static_bits": 24.138787,
              "successful_probability_mass": 5.41e-08,
              "successful_mass_bits": 24.138787,
              "successful_rulebook_count": 1,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south",
                "contested AND exit AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 17.254974,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "machine:W"
            ],
            "stay_cost": 4,
            "switch_cost": 3,
            "preferred_update": "role"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t6",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
            ],
            [
              3,
              0
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                11,
                3
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                19,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
                9,
                3
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
                13,
                3
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
                21,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  2
                ]
              }
            },
            {
              "id": 7,
              "start": [
                17,
                3
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  1
                ]
              }
            },
            {
              "id": 8,
              "start": [
                19,
                13
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                21,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 10,
              "start": [
                21,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  18
                ]
              }
            },
            {
              "id": 11,
              "start": [
                19,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 16,
              "start": [
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 17,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "4": [
                  9,
                  3
                ],
                "5": [
                  13,
                  3
                ],
                "6": [
                  21,
                  3
                ],
                "7": [
                  17,
                  3
                ],
                "8": [
                  19,
                  13
                ],
                "9": [
                  21,
                  11
                ],
                "10": [
                  21,
                  19
                ],
                "11": [
                  19,
                  21
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ],
                "16": [
                  5,
                  3
                ],
                "17": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "4": [
                  10,
                  3
                ],
                "5": [
                  12,
                  3
                ],
                "6": [
                  20,
                  3
                ],
                "7": [
                  18,
                  3
                ],
                "8": [
                  19,
                  12
                ],
                "9": [
                  20,
                  11
                ],
                "10": [
                  20,
                  19
                ],
                "11": [
                  19,
                  20
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "4": [
                  10,
                  3
                ],
                "5": [
                  12,
                  3
                ],
                "6": [
                  20,
                  3
                ],
                "7": [
                  18,
                  3
                ],
                "8": [
                  19,
                  12
                ],
                "9": [
                  20,
                  11
                ],
                "10": [
                  20,
                  19
                ],
                "11": [
                  19,
                  20
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
              }
            }
          ]
        }
      }
    ]
  },
  "cliff-fresh": {
    "experiment_version": 16,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "fresh",
    "schedule": "cliff",
    "world_rules": [
      "Some robots must leave through a marked exit; others enter a single-lane branch with near and far destinations.",
      "Robots choose their shortest legal route and move at the same time.",
      "An exit is a special map square that admits one robot at a time.",
      "If multiple robots enter the same ordinary square together, they collide.",
      "At a single-lane branch, the far destination must be reached before the near destination is occupied.",
      "When two robots reach an exit together, one must wait before either robot enters.",
      "Only one of the two possible entry orders is accepted.",
      "After entering an exit, a robot leaves the work area.",
      "A rule applies to every robot in the current scene when all conditions are true."
    ],
    "rule_schema": {
      "action": {
        "id": "MOVE",
        "label": "MOVE INTO A SQUARE"
      },
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
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "machine",
              "label": "an exit"
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
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Square being entered",
        "property": "target_type",
        "predicate": "target_type",
        "value": "machine",
        "negated": false,
        "label": "an exit"
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
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Square being entered",
          "property": "target_type",
          "predicate": "target_type",
          "value": "machine",
          "negated": false,
          "label": "an exit"
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
    "ground_truth_design": {
      "role_rule": "contested + Carrier",
      "movement_minimum_primitives": [
        2,
        4,
        4,
        4,
        4,
        9
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "tree_stay_costs": [
        null,
        1,
        0,
        0,
        0,
        4
      ],
      "tree_switch_cost": 3,
      "same_final_constraints": true,
      "same_final_world": false,
      "t6_parameter_free_crossover": {
        "ramp": {
          "stay": 1,
          "switch": 3
        },
        "cliff": {
          "stay": 4,
          "switch": 3
        }
      },
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "parameter_free_hierarchical_tree_distance",
      "schedule_contrast": "one_tree_edge_at_a_time_vs_four_edges_at_once",
      "movement_anchor": "T1 begins with contested + northbound",
      "static_generation_model": "positive_only_hierarchical_grammar_v5",
      "local_transition_model": "parameter_free_semantic_tree_v1",
      "negation_available": false
    },
    "global_solver": {
      "solver": "parameter_free_tree_calibration_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "lane-blocked",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.915879,
        "t1_movement_successful_mass": 0.0061854681,
        "t1_movement_successful_mass_bits": 7.336901,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.915879,
        "t1_role_successful_mass": 0.0119804892,
        "t1_role_successful_mass_bits": 6.383169,
        "t1_role_advantage_bits": 0.953732,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 2,
        "t2_movement_minimum_primitives": 4,
        "t2_movement_static_bits": 14.233279,
        "t2_movement_successful_mass": 0.0001042802,
        "t2_movement_successful_mass_bits": 13.227247,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.915879,
        "t2_role_successful_mass": 0.0084677026,
        "t2_role_successful_mass_bits": 6.883814,
        "t2_role_advantage_bits": 6.343433,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.233279,
        "t3_movement_successful_mass": 0.0001042802,
        "t3_movement_successful_mass_bits": 13.227247,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.915879,
        "t3_role_successful_mass": 0.0084677026,
        "t3_role_successful_mass_bits": 6.883814,
        "t3_role_advantage_bits": 6.343433,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.233279,
        "t4_movement_successful_mass": 0.0001042802,
        "t4_movement_successful_mass_bits": 13.227247,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.915879,
        "t4_role_successful_mass": 0.0084677026,
        "t4_role_successful_mass_bits": 6.883814,
        "t4_role_advantage_bits": 6.343433,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 4,
        "t5_movement_static_bits": 14.233279,
        "t5_movement_successful_mass": 0.0001042802,
        "t5_movement_successful_mass_bits": 13.227247,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.915879,
        "t5_role_successful_mass": 0.0084677026,
        "t5_role_successful_mass_bits": 6.883814,
        "t5_role_advantage_bits": 6.343433,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 3,
        "t6_movement_minimum_primitives": 9,
        "t6_movement_static_bits": 24.138787,
        "t6_movement_successful_mass": 5.41e-08,
        "t6_movement_successful_mass_bits": 24.138787,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.915879,
        "t6_role_successful_mass": 0.0084677026,
        "t6_role_successful_mass_bits": 6.883814,
        "t6_role_advantage_bits": 17.254974,
        "tree_stay_costs": [
          null,
          1,
          0,
          0,
          0,
          4
        ],
        "tree_switch_costs": [
          null,
          3,
          3,
          3,
          3,
          3
        ],
        "tree_preferred_updates": [
          null,
          "movement",
          "movement",
          "movement",
          "movement",
          "role"
        ]
      }
    },
    "curriculum_prefixes": [],
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
        "starter_rulebook": [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Square being entered",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "N",
                "negated": false
              }
            ]
          }
        ],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Movement anchor",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.915879,
              "successful_probability_mass": 0.0061854681,
              "successful_mass_bits": 7.336901,
              "successful_rulebook_count": 306,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0119804892,
              "successful_mass_bits": 6.383169,
              "successful_rulebook_count": 23,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.953732,
          "local_search": null,
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t1",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
            ],
            [
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              19
            ],
            [
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              19
            ],
            [
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              11,
              19
            ],
            [
              11,
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              19
            ],
            [
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              19
            ],
            [
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "collision",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "collision",
                "cell": [
                  3,
                  11
                ],
                "agents": [
                  0,
                  1
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
        "active_agent_count": 4,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Extend movement account",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 1,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t2",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              19
            ],
            [
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              19
            ],
            [
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              11,
              19
            ],
            [
              11,
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              19
            ],
            [
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              19
            ],
            [
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 6,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t3",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              19
            ],
            [
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              19
            ],
            [
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              3,
              19
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              19
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              19
            ],
            [
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              19
            ],
            [
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              19
            ],
            [
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              19
            ],
            [
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 8,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t4",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
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
              12
            ],
            [
              3,
              13
            ],
            [
              3,
              14
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
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
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
        "active_agent_count": 10,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Redundant evidence",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.233279,
              "successful_probability_mass": 0.0001042802,
              "successful_mass_bits": 13.227247,
              "successful_rulebook_count": 89,
              "static_witness": [
                "contested AND north",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.343433,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "N",
              "S"
            ],
            "stay_cost": 0,
            "switch_cost": 3,
            "preferred_update": "movement"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t5",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
            ],
            [
              3,
              0
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              4
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              3
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              1
            ],
            [
              19,
              2
            ],
            [
              19,
              3
            ],
            [
              19,
              4
            ],
            [
              19,
              5
            ],
            [
              19,
              6
            ],
            [
              19,
              7
            ],
            [
              19,
              8
            ],
            [
              19,
              9
            ],
            [
              19,
              10
            ],
            [
              19,
              11
            ],
            [
              19,
              12
            ],
            [
              19,
              13
            ],
            [
              19,
              14
            ],
            [
              19,
              15
            ],
            [
              19,
              16
            ],
            [
              19,
              17
            ],
            [
              19,
              18
            ],
            [
              19,
              19
            ],
            [
              19,
              20
            ],
            [
              19,
              21
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              3
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              11
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              19
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              3
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              11
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              19
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 16,
              "start": [
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 17,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ],
                "16": [
                  5,
                  3
                ],
                "17": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
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
        "active_agent_count": 18,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Common diagnostic",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 9,
              "minimum_static_bits": 24.138787,
              "successful_probability_mass": 5.41e-08,
              "successful_mass_bits": 24.138787,
              "successful_rulebook_count": 1,
              "static_witness": [
                "contested AND ordinary road AND north",
                "contested AND exit AND south",
                "contested AND exit AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.915879,
              "successful_probability_mass": 0.0084677026,
              "successful_mass_bits": 6.883814,
              "successful_rulebook_count": 5,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 17.254974,
          "local_search": {
            "model": "parameter_free_tree_distance",
            "start_program": [
              "N",
              "S"
            ],
            "target_movement_program": [
              "road:N",
              "machine:S",
              "machine:W"
            ],
            "stay_cost": 4,
            "switch_cost": 3,
            "preferred_update": "role"
          },
          "role_reference": "contested + Carrier"
        },
        "world": {
          "name": "cliff_pilot_t6",
          "rows": 23,
          "cols": 23,
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
              0,
              19
            ],
            [
              0,
              20
            ],
            [
              0,
              21
            ],
            [
              0,
              22
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
              12
            ],
            [
              1,
              13
            ],
            [
              1,
              14
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
              1,
              20
            ],
            [
              1,
              21
            ],
            [
              1,
              22
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
              12
            ],
            [
              2,
              13
            ],
            [
              2,
              14
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
              2,
              20
            ],
            [
              2,
              21
            ],
            [
              2,
              22
            ],
            [
              3,
              0
            ],
            [
              3,
              20
            ],
            [
              3,
              21
            ],
            [
              3,
              22
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
              4
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
              4,
              9
            ],
            [
              4,
              10
            ],
            [
              4,
              12
            ],
            [
              4,
              13
            ],
            [
              4,
              14
            ],
            [
              4,
              15
            ],
            [
              4,
              16
            ],
            [
              4,
              17
            ],
            [
              4,
              18
            ],
            [
              4,
              20
            ],
            [
              4,
              21
            ],
            [
              4,
              22
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
              12
            ],
            [
              5,
              13
            ],
            [
              5,
              14
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
              5,
              20
            ],
            [
              5,
              21
            ],
            [
              5,
              22
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
              4
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
              12
            ],
            [
              6,
              13
            ],
            [
              6,
              14
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
              6,
              20
            ],
            [
              6,
              21
            ],
            [
              6,
              22
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
              12
            ],
            [
              7,
              13
            ],
            [
              7,
              14
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
              7,
              20
            ],
            [
              7,
              21
            ],
            [
              7,
              22
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
              8,
              20
            ],
            [
              8,
              21
            ],
            [
              8,
              22
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
              4
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
              9,
              20
            ],
            [
              9,
              21
            ],
            [
              9,
              22
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
              4
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
              10,
              20
            ],
            [
              10,
              21
            ],
            [
              10,
              22
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
              20
            ],
            [
              11,
              21
            ],
            [
              11,
              22
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
              4
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
              12,
              20
            ],
            [
              12,
              21
            ],
            [
              12,
              22
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
              4
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
              13,
              20
            ],
            [
              13,
              21
            ],
            [
              13,
              22
            ],
            [
              14,
              0
            ],
            [
              14,
              1
            ],
            [
              14,
              2
            ],
            [
              14,
              4
            ],
            [
              14,
              5
            ],
            [
              14,
              6
            ],
            [
              14,
              7
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
              14,
              19
            ],
            [
              14,
              20
            ],
            [
              14,
              21
            ],
            [
              14,
              22
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
              4
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
              15,
              19
            ],
            [
              15,
              20
            ],
            [
              15,
              21
            ],
            [
              15,
              22
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
              4
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
              16,
              19
            ],
            [
              16,
              20
            ],
            [
              16,
              21
            ],
            [
              16,
              22
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
              4
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
              17,
              19
            ],
            [
              17,
              20
            ],
            [
              17,
              21
            ],
            [
              17,
              22
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
            ],
            [
              18,
              19
            ],
            [
              18,
              20
            ],
            [
              18,
              21
            ],
            [
              18,
              22
            ],
            [
              19,
              0
            ],
            [
              19,
              22
            ],
            [
              20,
              0
            ],
            [
              20,
              1
            ],
            [
              20,
              2
            ],
            [
              20,
              4
            ],
            [
              20,
              5
            ],
            [
              20,
              6
            ],
            [
              20,
              7
            ],
            [
              20,
              8
            ],
            [
              20,
              9
            ],
            [
              20,
              10
            ],
            [
              20,
              12
            ],
            [
              20,
              13
            ],
            [
              20,
              14
            ],
            [
              20,
              15
            ],
            [
              20,
              16
            ],
            [
              20,
              17
            ],
            [
              20,
              18
            ],
            [
              20,
              20
            ],
            [
              20,
              21
            ],
            [
              20,
              22
            ],
            [
              21,
              0
            ],
            [
              21,
              1
            ],
            [
              21,
              2
            ],
            [
              21,
              4
            ],
            [
              21,
              5
            ],
            [
              21,
              6
            ],
            [
              21,
              7
            ],
            [
              21,
              8
            ],
            [
              21,
              9
            ],
            [
              21,
              10
            ],
            [
              21,
              12
            ],
            [
              21,
              13
            ],
            [
              21,
              14
            ],
            [
              21,
              15
            ],
            [
              21,
              16
            ],
            [
              21,
              17
            ],
            [
              21,
              18
            ],
            [
              21,
              20
            ],
            [
              21,
              21
            ],
            [
              21,
              22
            ],
            [
              22,
              0
            ],
            [
              22,
              1
            ],
            [
              22,
              2
            ],
            [
              22,
              3
            ],
            [
              22,
              4
            ],
            [
              22,
              5
            ],
            [
              22,
              6
            ],
            [
              22,
              7
            ],
            [
              22,
              8
            ],
            [
              22,
              9
            ],
            [
              22,
              10
            ],
            [
              22,
              11
            ],
            [
              22,
              12
            ],
            [
              22,
              13
            ],
            [
              22,
              14
            ],
            [
              22,
              15
            ],
            [
              22,
              16
            ],
            [
              22,
              17
            ],
            [
              22,
              18
            ],
            [
              22,
              19
            ],
            [
              22,
              20
            ],
            [
              22,
              21
            ],
            [
              22,
              22
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [
            {
              "id": "processor_1",
              "cell": [
                11,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_2",
              "cell": [
                11,
                3
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                19,
                11
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_7",
              "cell": [
                3,
                19
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
                5,
                11
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  11
                ]
              }
            },
            {
              "id": 1,
              "start": [
                3,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  11
                ]
              }
            },
            {
              "id": 2,
              "start": [
                9,
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
                11,
                9
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
                9,
                3
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
                13,
                3
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
                21,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  2
                ]
              }
            },
            {
              "id": 7,
              "start": [
                17,
                3
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  1
                ]
              }
            },
            {
              "id": 8,
              "start": [
                19,
                13
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 9,
              "start": [
                21,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_4"
              }
            },
            {
              "id": 10,
              "start": [
                21,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  18
                ]
              }
            },
            {
              "id": 11,
              "start": [
                19,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  19,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                13,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  19
                ]
              }
            },
            {
              "id": 13,
              "start": [
                11,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  19
                ]
              }
            },
            {
              "id": 14,
              "start": [
                1,
                19
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 15,
              "start": [
                3,
                17
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_7"
              }
            },
            {
              "id": 16,
              "start": [
                5,
                3
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  3
                ]
              }
            },
            {
              "id": 17,
              "start": [
                3,
                1
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  1,
                  3
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "resource-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  5,
                  11
                ],
                "1": [
                  3,
                  9
                ],
                "2": [
                  9,
                  11
                ],
                "3": [
                  11,
                  9
                ],
                "4": [
                  9,
                  3
                ],
                "5": [
                  13,
                  3
                ],
                "6": [
                  21,
                  3
                ],
                "7": [
                  17,
                  3
                ],
                "8": [
                  19,
                  13
                ],
                "9": [
                  21,
                  11
                ],
                "10": [
                  21,
                  19
                ],
                "11": [
                  19,
                  21
                ],
                "12": [
                  13,
                  19
                ],
                "13": [
                  11,
                  17
                ],
                "14": [
                  1,
                  19
                ],
                "15": [
                  3,
                  17
                ],
                "16": [
                  5,
                  3
                ],
                "17": [
                  3,
                  1
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "4": [
                  10,
                  3
                ],
                "5": [
                  12,
                  3
                ],
                "6": [
                  20,
                  3
                ],
                "7": [
                  18,
                  3
                ],
                "8": [
                  19,
                  12
                ],
                "9": [
                  20,
                  11
                ],
                "10": [
                  20,
                  19
                ],
                "11": [
                  19,
                  20
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  4,
                  11
                ],
                "1": [
                  3,
                  10
                ],
                "2": [
                  10,
                  11
                ],
                "3": [
                  11,
                  10
                ],
                "4": [
                  10,
                  3
                ],
                "5": [
                  12,
                  3
                ],
                "6": [
                  20,
                  3
                ],
                "7": [
                  18,
                  3
                ],
                "8": [
                  19,
                  12
                ],
                "9": [
                  20,
                  11
                ],
                "10": [
                  20,
                  19
                ],
                "11": [
                  19,
                  20
                ],
                "12": [
                  12,
                  19
                ],
                "13": [
                  11,
                  18
                ],
                "14": [
                  2,
                  19
                ],
                "15": [
                  3,
                  18
                ],
                "16": [
                  4,
                  3
                ],
                "17": [
                  3,
                  2
                ]
              },
              "carry": {
                "0": "none",
                "1": "none",
                "2": "none",
                "3": "none",
                "4": "none",
                "5": "none",
                "6": "none",
                "7": "none",
                "8": "none",
                "9": "none",
                "10": "none",
                "11": "none",
                "12": "none",
                "13": "none",
                "14": "none",
                "15": "none",
                "16": "none",
                "17": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "resource-conflict",
                "cell": [
                  11,
                  11
                ],
                "agents": [
                  2,
                  3
                ]
              }
            }
          ]
        }
      }
    ]
  }
};

(() => {
  const params = new URLSearchParams(window.location.search);
  const schedule = params.get("schedule") || "ramp";
  const condition = params.get("condition") || "carry";
  const key = `${schedule}-${condition}`;
  window.PARADIGM_CONDITION = window.PARADIGM_LIBRARIES[key] ? key : "ramp-carry";
  window.TASK_LIBRARY = window.PARADIGM_LIBRARIES[window.PARADIGM_CONDITION];
})();
