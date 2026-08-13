window.PARADIGM_LIBRARIES = {
  "ramp-carry": {
    "experiment_version": 25,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "carry",
    "schedule": "ramp",
    "world_rules": [
      "Robots choose their shortest legal route and move at the same time.",
      "If two robots enter the same square together, they collide.",
      "A narrow passage allows traffic from only one end at a time. If robots arrive from both ends together, one waits outside until the passage is clear.",
      "A rule can decide narrow-passage entry only when it names the narrow-passage square.",
      "An exit admits one robot at a time, and only one entry order is accepted.",
      "A robot leaves the work area after entering its exit.",
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
          "object": "Traffic",
          "predicate": "contested",
          "values": [
            {
              "id": true,
              "label": "conflicts with another robot"
            }
          ]
        },
        {
          "id": "target_type",
          "object": "Next square",
          "predicate": "target_type",
          "values": [
            {
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "passage",
              "label": "a narrow-passage square"
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
        "object": "Traffic",
        "property": "contested",
        "predicate": "contested",
        "value": true,
        "negated": false,
        "label": "conflicts with another robot"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "passage",
        "negated": false,
        "label": "a narrow-passage square"
      },
      {
        "object": "Next square",
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
          "object": "Traffic",
          "property": "contested",
          "predicate": "contested",
          "value": true,
          "negated": false,
          "label": "conflicts with another robot"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "passage",
          "negated": false,
          "label": "a narrow-passage square"
        },
        {
          "object": "Next square",
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
      "role_rule": [
        "contested + Carrier",
        "narrow passage + Carrier when a passage is present"
      ],
      "movement_minimum_primitives": [
        2,
        2,
        4,
        4,
        5,
        5,
        7,
        7
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2,
        4,
        4
      ],
      "local_edit_depths": [
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "one_step_role_available": [
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      "same_final_constraints": true,
      "same_final_world": true,
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "hierarchical_conditional_edit_surprisal",
      "schedule_contrast": "Ramp calibrated; Cliff ordering pending",
      "movement_anchor": [
        "contested AND north"
      ],
      "intended_movement_rulebooks": [
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ]
      ],
      "stimulus_selection": {
        "generator": "physical_outcome_local_repair_search_v1",
        "candidate_event_count": 36,
        "candidates_examined": 324,
        "criteria": [
          "all previously revealed conflicts remain active",
          "the previous movement rulebook fails on every new prefix",
          "one editor operation reaches a minimum-complexity movement repair",
          "T2 is a one-rule direction replacement",
          "T3 through T6 retain exactly two movement rules",
          "no movement witness uses more than three rules",
          "role rules must name the Narrow passage when arbitrating it",
          "every narrow-passage decision is made by a Narrow passage rule",
          "no bounded movement solution can bypass the Narrow passage feature"
        ],
        "events": [
          [
            "road",
            "N",
            "E"
          ],
          [
            "machine",
            "E",
            "N"
          ],
          [
            "road",
            "S",
            "W"
          ],
          [
            "machine",
            "E",
            "S"
          ],
          [
            "machine",
            "E",
            "W"
          ],
          [
            "road",
            "N",
            "S"
          ],
          [
            "passage",
            "N",
            "E"
          ],
          [
            "passage",
            "E",
            "S"
          ]
        ],
        "movement_primitive_curve": [
          2,
          2,
          4,
          4,
          5,
          5,
          7,
          7
        ],
        "movement_rule_curve": [
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        "ramp_transitions": [
          {
            "event": [
              "machine",
              "E",
              "N"
            ],
            "movement_probability_mass": 0.037037037,
            "selected_edit_probability": 0.037037037,
            "selected_edit_cost_bits": 4.754888
          },
          {
            "event": [
              "road",
              "S",
              "W"
            ],
            "movement_probability_mass": 0.0768203073,
            "selected_edit_probability": 0.0381503748,
            "selected_edit_cost_bits": 4.712159
          },
          {
            "event": [
              "machine",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0416666667,
            "selected_edit_probability": 0.03125,
            "selected_edit_cost_bits": 5.0
          },
          {
            "event": [
              "machine",
              "E",
              "W"
            ],
            "movement_probability_mass": 0.0104166667,
            "selected_edit_probability": 0.0104166667,
            "selected_edit_cost_bits": 6.584963
          },
          {
            "event": [
              "road",
              "N",
              "S"
            ],
            "movement_probability_mass": 0.0208333333,
            "selected_edit_probability": 0.0208333333,
            "selected_edit_cost_bits": 5.584963
          },
          {
            "event": [
              "passage",
              "N",
              "E"
            ],
            "movement_probability_mass": 0.0007114161,
            "selected_edit_probability": 0.00020924,
            "selected_edit_cost_bits": 12.222553
          },
          {
            "event": [
              "passage",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0175438596,
            "selected_edit_probability": 0.0175438596,
            "selected_edit_cost_bits": 5.83289
          }
        ],
        "selected_movement_rulebooks": [
          [
            "contested AND north"
          ],
          [
            "contested AND east"
          ],
          [
            "contested AND east",
            "contested AND south"
          ],
          [
            "contested AND east",
            "contested AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND north"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND east"
          ]
        ],
        "role_primitive_curve": [
          2,
          2,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        "role_witnesses": [
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ]
        ],
        "mixed_is_allowed": true,
        "confirmatory_stimulus_ready": false
      },
      "static_generation_model": "physical_outcome_hierarchical_grammar_v6",
      "local_transition_model": "editor_grounded_copy_modify_first_success_v3",
      "negation_available": false,
      "passage_rule_gate": "only passage-explicit rules are checked when robots arrive from both ends together"
    },
    "global_solver": {
      "solver": "editor_grounded_rulebook_search_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "ok",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.851749,
        "t1_movement_successful_mass": 0.0127217425,
        "t1_movement_successful_mass_bits": 6.29656,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.851749,
        "t1_role_successful_mass": 0.0246842141,
        "t1_role_successful_mass_bits": 5.340267,
        "t1_role_advantage_bits": 0.956292,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 1,
        "t2_movement_minimum_primitives": 2,
        "t2_movement_static_bits": 7.851749,
        "t2_movement_successful_mass": 0.0049955931,
        "t2_movement_successful_mass_bits": 7.645128,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.851749,
        "t2_role_successful_mass": 0.0096844883,
        "t2_role_successful_mass_bits": 6.690108,
        "t2_role_advantage_bits": 0.95502,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.17559,
        "t3_movement_successful_mass": 0.0001588985,
        "t3_movement_successful_mass_bits": 12.619607,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.851749,
        "t3_role_successful_mass": 0.0096844883,
        "t3_role_successful_mass_bits": 6.690108,
        "t3_role_advantage_bits": 5.929499,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.17559,
        "t4_movement_successful_mass": 9.48892e-05,
        "t4_movement_successful_mass_bits": 13.363397,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.851749,
        "t4_role_successful_mass": 0.0096844883,
        "t4_role_successful_mass_bits": 6.690108,
        "t4_role_advantage_bits": 6.673288,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 5,
        "t5_movement_static_bits": 16.17559,
        "t5_movement_successful_mass": 3.14092e-05,
        "t5_movement_successful_mass_bits": 14.958454,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.851749,
        "t5_role_successful_mass": 0.0096844883,
        "t5_role_successful_mass_bits": 6.690108,
        "t5_role_advantage_bits": 8.268346,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 2,
        "t6_movement_minimum_primitives": 5,
        "t6_movement_static_bits": 16.17559,
        "t6_movement_successful_mass": 1.57046e-05,
        "t6_movement_successful_mass_bits": 15.958454,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.851749,
        "t6_role_successful_mass": 0.0096844883,
        "t6_role_successful_mass_bits": 6.690108,
        "t6_role_advantage_bits": 9.268346,
        "t7_type": true,
        "t7_wrong_type_reason": "priority-violation",
        "t7_baseline_reason": "passage-conflict",
        "t7_movement_minimum_rules": 3,
        "t7_movement_minimum_primitives": 7,
        "t7_movement_static_bits": 23.43438,
        "t7_movement_successful_mass": 3.088e-07,
        "t7_movement_successful_mass_bits": 21.627025,
        "t7_role_minimum_rules": 2,
        "t7_role_minimum_primitives": 4,
        "t7_role_static_bits": 13.760553,
        "t7_role_successful_mass": 0.0002597772,
        "t7_role_successful_mass_bits": 11.910437,
        "t7_role_advantage_bits": 9.716587,
        "t8_type": true,
        "t8_wrong_type_reason": "priority-violation",
        "t8_baseline_reason": "passage-conflict",
        "t8_movement_minimum_rules": 3,
        "t8_movement_minimum_primitives": 7,
        "t8_movement_static_bits": 23.43438,
        "t8_movement_successful_mass": 1.544e-07,
        "t8_movement_successful_mass_bits": 22.627025,
        "t8_role_minimum_rules": 2,
        "t8_role_minimum_primitives": 4,
        "t8_role_static_bits": 13.760553,
        "t8_role_successful_mass": 0.0002597772,
        "t8_role_successful_mass_bits": 11.910437,
        "t8_role_advantage_bits": 10.716587,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          1,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        "tree_preferred_updates": [
          null,
          "tie",
          "tie",
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ],
        "editor_search": [
          null,
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          }
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
                "object": "Traffic",
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
          "stage": "Road introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0127217425,
              "successful_mass_bits": 6.29656,
              "successful_rulebook_count": 804,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0246842141,
              "successful_mass_bits": 5.340267,
              "successful_rulebook_count": 204,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.956292,
          "local_search": null,
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
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
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t1",
          "rows": 7,
          "cols": 7,
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
              3,
              0
            ],
            [
              3,
              6
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "passages": [],
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
                  1,
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
                  3,
                  5
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
          "stage": "Exit introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0049955931,
              "successful_mass_bits": 7.645128,
              "successful_rulebook_count": 206,
              "static_witness": [
                "contested AND east"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.95502,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
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
              9
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
              9
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  3,
                  7
                ],
                "3": [
                  5,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
          "stage": "Second movement rule",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 0.0001588985,
              "successful_mass_bits": 12.619607,
              "successful_rulebook_count": 70,
              "static_witness": [
                "contested AND east",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 5.929499,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t3",
          "rows": 13,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
          "stage": "Direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 9.48892e-05,
              "successful_mass_bits": 13.363397,
              "successful_rulebook_count": 49,
              "static_witness": [
                "contested AND east",
                "contested AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.673288,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t4",
          "rows": 17,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
          "stage": "Road-specific refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 3.14092e-05,
              "successful_mass_bits": 14.958454,
              "successful_rulebook_count": 30,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t5",
          "rows": 17,
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
          "stage": "Local direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 1.57046e-05,
              "successful_mass_bits": 15.958454,
              "successful_rulebook_count": 15,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t6",
          "rows": 17,
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
        "active_agent_count": 14,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Narrow-passage introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 3.088e-07,
              "successful_mass_bits": 21.627025,
              "successful_rulebook_count": 4,
              "static_witness": [
                "contested AND east",
                "narrow passage AND north",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
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
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t7",
          "rows": 17,
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
              11
            ],
            [
              2,
              12
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
              3,
              0
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
              4,
              17
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  4,
                  15
                ],
                [
                  5,
                  15
                ]
              ],
              "entrances": [
                [
                  3,
                  13
                ],
                [
                  5,
                  15
                ]
              ]
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                6,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                3,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  16
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  3,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      },
      {
        "id": "trial_8",
        "label": "T8",
        "level": 8,
        "layer": 8,
        "prerequisites": [
          "trial_7"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 16,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "carry",
          "stage": "Narrow-passage direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 1.544e-07,
              "successful_mass_bits": 22.627025,
              "successful_rulebook_count": 2,
              "static_witness": [
                "contested AND east",
                "narrow passage AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "common_pilot_t8",
          "rows": 18,
          "cols": 24,
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
              0,
              23
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
              22
            ],
            [
              1,
              23
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
              23
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
              22
            ],
            [
              3,
              23
            ],
            [
              4,
              0
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
              22
            ],
            [
              4,
              23
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
              5,
              23
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
              6,
              23
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
              7,
              23
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
              8,
              23
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
              9,
              23
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
              12
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
              10,
              23
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
              11,
              23
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
              12,
              23
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
              13,
              23
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
              14,
              23
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
              15,
              23
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
              16,
              23
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
              17,
              23
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
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_3",
              "cell": [
                16,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                16,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  5,
                  15
                ],
                [
                  6,
                  15
                ]
              ],
              "entrances": [
                [
                  4,
                  13
                ],
                [
                  6,
                  15
                ]
              ]
            },
            {
              "id": "passage_7",
              "cells": [
                [
                  2,
                  21
                ],
                [
                  3,
                  21
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
                ]
              ],
              "entrances": [
                [
                  2,
                  21
                ],
                [
                  4,
                  19
                ]
              ]
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                6,
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
                  4,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                4,
                7
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
                6,
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
                8,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  12,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                10,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                16,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                14,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                16,
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
                16,
                17
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
                12,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  13
                ]
              }
            },
            {
              "id": 11,
              "start": [
                8,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                7,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  3,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                4,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  16
                ]
              }
            },
            {
              "id": 14,
              "start": [
                4,
                18
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  22
                ]
              }
            },
            {
              "id": 15,
              "start": [
                1,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  4,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      }
    ]
  },
  "ramp-fresh": {
    "experiment_version": 25,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "fresh",
    "schedule": "ramp",
    "world_rules": [
      "Robots choose their shortest legal route and move at the same time.",
      "If two robots enter the same square together, they collide.",
      "A narrow passage allows traffic from only one end at a time. If robots arrive from both ends together, one waits outside until the passage is clear.",
      "A rule can decide narrow-passage entry only when it names the narrow-passage square.",
      "An exit admits one robot at a time, and only one entry order is accepted.",
      "A robot leaves the work area after entering its exit.",
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
          "object": "Traffic",
          "predicate": "contested",
          "values": [
            {
              "id": true,
              "label": "conflicts with another robot"
            }
          ]
        },
        {
          "id": "target_type",
          "object": "Next square",
          "predicate": "target_type",
          "values": [
            {
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "passage",
              "label": "a narrow-passage square"
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
        "object": "Traffic",
        "property": "contested",
        "predicate": "contested",
        "value": true,
        "negated": false,
        "label": "conflicts with another robot"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "passage",
        "negated": false,
        "label": "a narrow-passage square"
      },
      {
        "object": "Next square",
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
          "object": "Traffic",
          "property": "contested",
          "predicate": "contested",
          "value": true,
          "negated": false,
          "label": "conflicts with another robot"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "passage",
          "negated": false,
          "label": "a narrow-passage square"
        },
        {
          "object": "Next square",
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
      "role_rule": [
        "contested + Carrier",
        "narrow passage + Carrier when a passage is present"
      ],
      "movement_minimum_primitives": [
        2,
        2,
        4,
        4,
        5,
        5,
        7,
        7
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2,
        4,
        4
      ],
      "local_edit_depths": [
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "one_step_role_available": [
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      "same_final_constraints": true,
      "same_final_world": true,
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "hierarchical_conditional_edit_surprisal",
      "schedule_contrast": "Ramp calibrated; Cliff ordering pending",
      "movement_anchor": [
        "contested AND north"
      ],
      "intended_movement_rulebooks": [
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ]
      ],
      "stimulus_selection": {
        "generator": "physical_outcome_local_repair_search_v1",
        "candidate_event_count": 36,
        "candidates_examined": 324,
        "criteria": [
          "all previously revealed conflicts remain active",
          "the previous movement rulebook fails on every new prefix",
          "one editor operation reaches a minimum-complexity movement repair",
          "T2 is a one-rule direction replacement",
          "T3 through T6 retain exactly two movement rules",
          "no movement witness uses more than three rules",
          "role rules must name the Narrow passage when arbitrating it",
          "every narrow-passage decision is made by a Narrow passage rule",
          "no bounded movement solution can bypass the Narrow passage feature"
        ],
        "events": [
          [
            "road",
            "N",
            "E"
          ],
          [
            "machine",
            "E",
            "N"
          ],
          [
            "road",
            "S",
            "W"
          ],
          [
            "machine",
            "E",
            "S"
          ],
          [
            "machine",
            "E",
            "W"
          ],
          [
            "road",
            "N",
            "S"
          ],
          [
            "passage",
            "N",
            "E"
          ],
          [
            "passage",
            "E",
            "S"
          ]
        ],
        "movement_primitive_curve": [
          2,
          2,
          4,
          4,
          5,
          5,
          7,
          7
        ],
        "movement_rule_curve": [
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        "ramp_transitions": [
          {
            "event": [
              "machine",
              "E",
              "N"
            ],
            "movement_probability_mass": 0.037037037,
            "selected_edit_probability": 0.037037037,
            "selected_edit_cost_bits": 4.754888
          },
          {
            "event": [
              "road",
              "S",
              "W"
            ],
            "movement_probability_mass": 0.0768203073,
            "selected_edit_probability": 0.0381503748,
            "selected_edit_cost_bits": 4.712159
          },
          {
            "event": [
              "machine",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0416666667,
            "selected_edit_probability": 0.03125,
            "selected_edit_cost_bits": 5.0
          },
          {
            "event": [
              "machine",
              "E",
              "W"
            ],
            "movement_probability_mass": 0.0104166667,
            "selected_edit_probability": 0.0104166667,
            "selected_edit_cost_bits": 6.584963
          },
          {
            "event": [
              "road",
              "N",
              "S"
            ],
            "movement_probability_mass": 0.0208333333,
            "selected_edit_probability": 0.0208333333,
            "selected_edit_cost_bits": 5.584963
          },
          {
            "event": [
              "passage",
              "N",
              "E"
            ],
            "movement_probability_mass": 0.0007114161,
            "selected_edit_probability": 0.00020924,
            "selected_edit_cost_bits": 12.222553
          },
          {
            "event": [
              "passage",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0175438596,
            "selected_edit_probability": 0.0175438596,
            "selected_edit_cost_bits": 5.83289
          }
        ],
        "selected_movement_rulebooks": [
          [
            "contested AND north"
          ],
          [
            "contested AND east"
          ],
          [
            "contested AND east",
            "contested AND south"
          ],
          [
            "contested AND east",
            "contested AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND north"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND east"
          ]
        ],
        "role_primitive_curve": [
          2,
          2,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        "role_witnesses": [
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ]
        ],
        "mixed_is_allowed": true,
        "confirmatory_stimulus_ready": false
      },
      "static_generation_model": "physical_outcome_hierarchical_grammar_v6",
      "local_transition_model": "editor_grounded_copy_modify_first_success_v3",
      "negation_available": false,
      "passage_rule_gate": "only passage-explicit rules are checked when robots arrive from both ends together"
    },
    "global_solver": {
      "solver": "editor_grounded_rulebook_search_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "ok",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.851749,
        "t1_movement_successful_mass": 0.0127217425,
        "t1_movement_successful_mass_bits": 6.29656,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.851749,
        "t1_role_successful_mass": 0.0246842141,
        "t1_role_successful_mass_bits": 5.340267,
        "t1_role_advantage_bits": 0.956292,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 1,
        "t2_movement_minimum_primitives": 2,
        "t2_movement_static_bits": 7.851749,
        "t2_movement_successful_mass": 0.0049955931,
        "t2_movement_successful_mass_bits": 7.645128,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.851749,
        "t2_role_successful_mass": 0.0096844883,
        "t2_role_successful_mass_bits": 6.690108,
        "t2_role_advantage_bits": 0.95502,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.17559,
        "t3_movement_successful_mass": 0.0001588985,
        "t3_movement_successful_mass_bits": 12.619607,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.851749,
        "t3_role_successful_mass": 0.0096844883,
        "t3_role_successful_mass_bits": 6.690108,
        "t3_role_advantage_bits": 5.929499,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.17559,
        "t4_movement_successful_mass": 9.48892e-05,
        "t4_movement_successful_mass_bits": 13.363397,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.851749,
        "t4_role_successful_mass": 0.0096844883,
        "t4_role_successful_mass_bits": 6.690108,
        "t4_role_advantage_bits": 6.673288,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 5,
        "t5_movement_static_bits": 16.17559,
        "t5_movement_successful_mass": 3.14092e-05,
        "t5_movement_successful_mass_bits": 14.958454,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.851749,
        "t5_role_successful_mass": 0.0096844883,
        "t5_role_successful_mass_bits": 6.690108,
        "t5_role_advantage_bits": 8.268346,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 2,
        "t6_movement_minimum_primitives": 5,
        "t6_movement_static_bits": 16.17559,
        "t6_movement_successful_mass": 1.57046e-05,
        "t6_movement_successful_mass_bits": 15.958454,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.851749,
        "t6_role_successful_mass": 0.0096844883,
        "t6_role_successful_mass_bits": 6.690108,
        "t6_role_advantage_bits": 9.268346,
        "t7_type": true,
        "t7_wrong_type_reason": "priority-violation",
        "t7_baseline_reason": "passage-conflict",
        "t7_movement_minimum_rules": 3,
        "t7_movement_minimum_primitives": 7,
        "t7_movement_static_bits": 23.43438,
        "t7_movement_successful_mass": 3.088e-07,
        "t7_movement_successful_mass_bits": 21.627025,
        "t7_role_minimum_rules": 2,
        "t7_role_minimum_primitives": 4,
        "t7_role_static_bits": 13.760553,
        "t7_role_successful_mass": 0.0002597772,
        "t7_role_successful_mass_bits": 11.910437,
        "t7_role_advantage_bits": 9.716587,
        "t8_type": true,
        "t8_wrong_type_reason": "priority-violation",
        "t8_baseline_reason": "passage-conflict",
        "t8_movement_minimum_rules": 3,
        "t8_movement_minimum_primitives": 7,
        "t8_movement_static_bits": 23.43438,
        "t8_movement_successful_mass": 1.544e-07,
        "t8_movement_successful_mass_bits": 22.627025,
        "t8_role_minimum_rules": 2,
        "t8_role_minimum_primitives": 4,
        "t8_role_static_bits": 13.760553,
        "t8_role_successful_mass": 0.0002597772,
        "t8_role_successful_mass_bits": 11.910437,
        "t8_role_advantage_bits": 10.716587,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          1,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        "tree_preferred_updates": [
          null,
          "tie",
          "tie",
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ],
        "editor_search": [
          null,
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          }
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
                "object": "Traffic",
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
          "stage": "Road introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0127217425,
              "successful_mass_bits": 6.29656,
              "successful_rulebook_count": 804,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0246842141,
              "successful_mass_bits": 5.340267,
              "successful_rulebook_count": 204,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.956292,
          "local_search": null,
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
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
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t1",
          "rows": 7,
          "cols": 7,
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
              3,
              0
            ],
            [
              3,
              6
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "passages": [],
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
                  1,
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
                  3,
                  5
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
          "stage": "Exit introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0049955931,
              "successful_mass_bits": 7.645128,
              "successful_rulebook_count": 206,
              "static_witness": [
                "contested AND east"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.95502,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
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
              9
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
              9
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  3,
                  7
                ],
                "3": [
                  5,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
          "stage": "Second movement rule",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 0.0001588985,
              "successful_mass_bits": 12.619607,
              "successful_rulebook_count": 70,
              "static_witness": [
                "contested AND east",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 5.929499,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t3",
          "rows": 13,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
          "stage": "Direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 9.48892e-05,
              "successful_mass_bits": 13.363397,
              "successful_rulebook_count": 49,
              "static_witness": [
                "contested AND east",
                "contested AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.673288,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t4",
          "rows": 17,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
          "stage": "Road-specific refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 3.14092e-05,
              "successful_mass_bits": 14.958454,
              "successful_rulebook_count": 30,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t5",
          "rows": 17,
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
          "stage": "Local direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 1.57046e-05,
              "successful_mass_bits": 15.958454,
              "successful_rulebook_count": 15,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t6",
          "rows": 17,
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
        "active_agent_count": 14,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Narrow-passage introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 3.088e-07,
              "successful_mass_bits": 21.627025,
              "successful_rulebook_count": 4,
              "static_witness": [
                "contested AND east",
                "narrow passage AND north",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
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
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "ramp_pilot_t7",
          "rows": 17,
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
              11
            ],
            [
              2,
              12
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
              3,
              0
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
              4,
              17
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  4,
                  15
                ],
                [
                  5,
                  15
                ]
              ],
              "entrances": [
                [
                  3,
                  13
                ],
                [
                  5,
                  15
                ]
              ]
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                6,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                3,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  16
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  3,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      },
      {
        "id": "trial_8",
        "label": "T8",
        "level": 8,
        "layer": 8,
        "prerequisites": [
          "trial_7"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 16,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "ramp",
          "condition": "fresh",
          "stage": "Narrow-passage direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 1.544e-07,
              "successful_mass_bits": 22.627025,
              "successful_rulebook_count": 2,
              "static_witness": [
                "contested AND east",
                "narrow passage AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "common_pilot_t8",
          "rows": 18,
          "cols": 24,
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
              0,
              23
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
              22
            ],
            [
              1,
              23
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
              23
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
              22
            ],
            [
              3,
              23
            ],
            [
              4,
              0
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
              22
            ],
            [
              4,
              23
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
              5,
              23
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
              6,
              23
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
              7,
              23
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
              8,
              23
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
              9,
              23
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
              12
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
              10,
              23
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
              11,
              23
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
              12,
              23
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
              13,
              23
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
              14,
              23
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
              15,
              23
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
              16,
              23
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
              17,
              23
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
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_3",
              "cell": [
                16,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                16,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  5,
                  15
                ],
                [
                  6,
                  15
                ]
              ],
              "entrances": [
                [
                  4,
                  13
                ],
                [
                  6,
                  15
                ]
              ]
            },
            {
              "id": "passage_7",
              "cells": [
                [
                  2,
                  21
                ],
                [
                  3,
                  21
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
                ]
              ],
              "entrances": [
                [
                  2,
                  21
                ],
                [
                  4,
                  19
                ]
              ]
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                6,
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
                  4,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                4,
                7
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
                6,
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
                8,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  12,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                10,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                16,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                14,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                16,
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
                16,
                17
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
                12,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  13
                ]
              }
            },
            {
              "id": 11,
              "start": [
                8,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                7,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  3,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                4,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  16
                ]
              }
            },
            {
              "id": 14,
              "start": [
                4,
                18
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  22
                ]
              }
            },
            {
              "id": 15,
              "start": [
                1,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  4,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      }
    ]
  },
  "cliff-carry": {
    "experiment_version": 25,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "carry",
    "schedule": "cliff",
    "world_rules": [
      "Robots choose their shortest legal route and move at the same time.",
      "If two robots enter the same square together, they collide.",
      "A narrow passage allows traffic from only one end at a time. If robots arrive from both ends together, one waits outside until the passage is clear.",
      "A rule can decide narrow-passage entry only when it names the narrow-passage square.",
      "An exit admits one robot at a time, and only one entry order is accepted.",
      "A robot leaves the work area after entering its exit.",
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
          "object": "Traffic",
          "predicate": "contested",
          "values": [
            {
              "id": true,
              "label": "conflicts with another robot"
            }
          ]
        },
        {
          "id": "target_type",
          "object": "Next square",
          "predicate": "target_type",
          "values": [
            {
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "passage",
              "label": "a narrow-passage square"
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
        "object": "Traffic",
        "property": "contested",
        "predicate": "contested",
        "value": true,
        "negated": false,
        "label": "conflicts with another robot"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "passage",
        "negated": false,
        "label": "a narrow-passage square"
      },
      {
        "object": "Next square",
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
          "object": "Traffic",
          "property": "contested",
          "predicate": "contested",
          "value": true,
          "negated": false,
          "label": "conflicts with another robot"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "passage",
          "negated": false,
          "label": "a narrow-passage square"
        },
        {
          "object": "Next square",
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
      "role_rule": [
        "contested + Carrier",
        "narrow passage + Carrier when a passage is present"
      ],
      "movement_minimum_primitives": [
        2,
        2,
        4,
        4,
        5,
        5,
        7,
        7
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2,
        4,
        4
      ],
      "local_edit_depths": [
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "one_step_role_available": [
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      "same_final_constraints": true,
      "same_final_world": true,
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "hierarchical_conditional_edit_surprisal",
      "schedule_contrast": "Ramp calibrated; Cliff ordering pending",
      "movement_anchor": [
        "contested AND north"
      ],
      "intended_movement_rulebooks": [
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ]
      ],
      "stimulus_selection": {
        "generator": "physical_outcome_local_repair_search_v1",
        "candidate_event_count": 36,
        "candidates_examined": 324,
        "criteria": [
          "all previously revealed conflicts remain active",
          "the previous movement rulebook fails on every new prefix",
          "one editor operation reaches a minimum-complexity movement repair",
          "T2 is a one-rule direction replacement",
          "T3 through T6 retain exactly two movement rules",
          "no movement witness uses more than three rules",
          "role rules must name the Narrow passage when arbitrating it",
          "every narrow-passage decision is made by a Narrow passage rule",
          "no bounded movement solution can bypass the Narrow passage feature"
        ],
        "events": [
          [
            "road",
            "N",
            "E"
          ],
          [
            "machine",
            "E",
            "N"
          ],
          [
            "road",
            "S",
            "W"
          ],
          [
            "machine",
            "E",
            "S"
          ],
          [
            "machine",
            "E",
            "W"
          ],
          [
            "road",
            "N",
            "S"
          ],
          [
            "passage",
            "N",
            "E"
          ],
          [
            "passage",
            "E",
            "S"
          ]
        ],
        "movement_primitive_curve": [
          2,
          2,
          4,
          4,
          5,
          5,
          7,
          7
        ],
        "movement_rule_curve": [
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        "ramp_transitions": [
          {
            "event": [
              "machine",
              "E",
              "N"
            ],
            "movement_probability_mass": 0.037037037,
            "selected_edit_probability": 0.037037037,
            "selected_edit_cost_bits": 4.754888
          },
          {
            "event": [
              "road",
              "S",
              "W"
            ],
            "movement_probability_mass": 0.0768203073,
            "selected_edit_probability": 0.0381503748,
            "selected_edit_cost_bits": 4.712159
          },
          {
            "event": [
              "machine",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0416666667,
            "selected_edit_probability": 0.03125,
            "selected_edit_cost_bits": 5.0
          },
          {
            "event": [
              "machine",
              "E",
              "W"
            ],
            "movement_probability_mass": 0.0104166667,
            "selected_edit_probability": 0.0104166667,
            "selected_edit_cost_bits": 6.584963
          },
          {
            "event": [
              "road",
              "N",
              "S"
            ],
            "movement_probability_mass": 0.0208333333,
            "selected_edit_probability": 0.0208333333,
            "selected_edit_cost_bits": 5.584963
          },
          {
            "event": [
              "passage",
              "N",
              "E"
            ],
            "movement_probability_mass": 0.0007114161,
            "selected_edit_probability": 0.00020924,
            "selected_edit_cost_bits": 12.222553
          },
          {
            "event": [
              "passage",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0175438596,
            "selected_edit_probability": 0.0175438596,
            "selected_edit_cost_bits": 5.83289
          }
        ],
        "selected_movement_rulebooks": [
          [
            "contested AND north"
          ],
          [
            "contested AND east"
          ],
          [
            "contested AND east",
            "contested AND south"
          ],
          [
            "contested AND east",
            "contested AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND north"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND east"
          ]
        ],
        "role_primitive_curve": [
          2,
          2,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        "role_witnesses": [
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ]
        ],
        "mixed_is_allowed": true,
        "confirmatory_stimulus_ready": false
      },
      "static_generation_model": "physical_outcome_hierarchical_grammar_v6",
      "local_transition_model": "editor_grounded_copy_modify_first_success_v3",
      "negation_available": false,
      "passage_rule_gate": "only passage-explicit rules are checked when robots arrive from both ends together"
    },
    "global_solver": {
      "solver": "editor_grounded_rulebook_search_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "ok",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.851749,
        "t1_movement_successful_mass": 0.0127217425,
        "t1_movement_successful_mass_bits": 6.29656,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.851749,
        "t1_role_successful_mass": 0.0246842141,
        "t1_role_successful_mass_bits": 5.340267,
        "t1_role_advantage_bits": 0.956292,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 1,
        "t2_movement_minimum_primitives": 2,
        "t2_movement_static_bits": 7.851749,
        "t2_movement_successful_mass": 0.0049955931,
        "t2_movement_successful_mass_bits": 7.645128,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.851749,
        "t2_role_successful_mass": 0.0096844883,
        "t2_role_successful_mass_bits": 6.690108,
        "t2_role_advantage_bits": 0.95502,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.17559,
        "t3_movement_successful_mass": 0.0001588985,
        "t3_movement_successful_mass_bits": 12.619607,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.851749,
        "t3_role_successful_mass": 0.0096844883,
        "t3_role_successful_mass_bits": 6.690108,
        "t3_role_advantage_bits": 5.929499,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.17559,
        "t4_movement_successful_mass": 9.48892e-05,
        "t4_movement_successful_mass_bits": 13.363397,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.851749,
        "t4_role_successful_mass": 0.0096844883,
        "t4_role_successful_mass_bits": 6.690108,
        "t4_role_advantage_bits": 6.673288,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 5,
        "t5_movement_static_bits": 16.17559,
        "t5_movement_successful_mass": 3.14092e-05,
        "t5_movement_successful_mass_bits": 14.958454,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.851749,
        "t5_role_successful_mass": 0.0096844883,
        "t5_role_successful_mass_bits": 6.690108,
        "t5_role_advantage_bits": 8.268346,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 2,
        "t6_movement_minimum_primitives": 5,
        "t6_movement_static_bits": 16.17559,
        "t6_movement_successful_mass": 1.57046e-05,
        "t6_movement_successful_mass_bits": 15.958454,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.851749,
        "t6_role_successful_mass": 0.0096844883,
        "t6_role_successful_mass_bits": 6.690108,
        "t6_role_advantage_bits": 9.268346,
        "t7_type": true,
        "t7_wrong_type_reason": "priority-violation",
        "t7_baseline_reason": "passage-conflict",
        "t7_movement_minimum_rules": 3,
        "t7_movement_minimum_primitives": 7,
        "t7_movement_static_bits": 23.43438,
        "t7_movement_successful_mass": 3.088e-07,
        "t7_movement_successful_mass_bits": 21.627025,
        "t7_role_minimum_rules": 2,
        "t7_role_minimum_primitives": 4,
        "t7_role_static_bits": 13.760553,
        "t7_role_successful_mass": 0.0002597772,
        "t7_role_successful_mass_bits": 11.910437,
        "t7_role_advantage_bits": 9.716587,
        "t8_type": true,
        "t8_wrong_type_reason": "priority-violation",
        "t8_baseline_reason": "passage-conflict",
        "t8_movement_minimum_rules": 3,
        "t8_movement_minimum_primitives": 7,
        "t8_movement_static_bits": 23.43438,
        "t8_movement_successful_mass": 1.544e-07,
        "t8_movement_successful_mass_bits": 22.627025,
        "t8_role_minimum_rules": 2,
        "t8_role_minimum_primitives": 4,
        "t8_role_static_bits": 13.760553,
        "t8_role_successful_mass": 0.0002597772,
        "t8_role_successful_mass_bits": 11.910437,
        "t8_role_advantage_bits": 10.716587,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          1,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        "tree_preferred_updates": [
          null,
          "tie",
          "tie",
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ],
        "editor_search": [
          null,
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          }
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
                "object": "Traffic",
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
          "stage": "Road introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0127217425,
              "successful_mass_bits": 6.29656,
              "successful_rulebook_count": 804,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0246842141,
              "successful_mass_bits": 5.340267,
              "successful_rulebook_count": 204,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.956292,
          "local_search": null,
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
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
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t1",
          "rows": 7,
          "cols": 7,
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
              3,
              0
            ],
            [
              3,
              6
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "passages": [],
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
                  1,
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
                  3,
                  5
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
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Exit introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0049955931,
              "successful_mass_bits": 7.645128,
              "successful_rulebook_count": 206,
              "static_witness": [
                "contested AND east"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.95502,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t2",
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
              9
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
              9
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  3,
                  7
                ],
                "3": [
                  5,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Second movement rule",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 0.0001588985,
              "successful_mass_bits": 12.619607,
              "successful_rulebook_count": 70,
              "static_witness": [
                "contested AND east",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 5.929499,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t3",
          "rows": 13,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 9.48892e-05,
              "successful_mass_bits": 13.363397,
              "successful_rulebook_count": 49,
              "static_witness": [
                "contested AND east",
                "contested AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.673288,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t4",
          "rows": 17,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Road-specific refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 3.14092e-05,
              "successful_mass_bits": 14.958454,
              "successful_rulebook_count": 30,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t5",
          "rows": 17,
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Local direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 1.57046e-05,
              "successful_mass_bits": 15.958454,
              "successful_rulebook_count": 15,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t6",
          "rows": 17,
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
        "active_agent_count": 14,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Narrow-passage introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 3.088e-07,
              "successful_mass_bits": 21.627025,
              "successful_rulebook_count": 4,
              "static_witness": [
                "contested AND east",
                "narrow passage AND north",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
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
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t7",
          "rows": 17,
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
              11
            ],
            [
              2,
              12
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
              3,
              0
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
              4,
              17
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  4,
                  15
                ],
                [
                  5,
                  15
                ]
              ],
              "entrances": [
                [
                  3,
                  13
                ],
                [
                  5,
                  15
                ]
              ]
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                6,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                3,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  16
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  3,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      },
      {
        "id": "trial_8",
        "label": "T8",
        "level": 8,
        "layer": 8,
        "prerequisites": [
          "trial_7"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 16,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "carry",
          "stage": "Narrow-passage direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 1.544e-07,
              "successful_mass_bits": 22.627025,
              "successful_rulebook_count": 2,
              "static_witness": [
                "contested AND east",
                "narrow passage AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "common_pilot_t8",
          "rows": 18,
          "cols": 24,
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
              0,
              23
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
              22
            ],
            [
              1,
              23
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
              23
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
              22
            ],
            [
              3,
              23
            ],
            [
              4,
              0
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
              22
            ],
            [
              4,
              23
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
              5,
              23
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
              6,
              23
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
              7,
              23
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
              8,
              23
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
              9,
              23
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
              12
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
              10,
              23
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
              11,
              23
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
              12,
              23
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
              13,
              23
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
              14,
              23
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
              15,
              23
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
              16,
              23
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
              17,
              23
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
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_3",
              "cell": [
                16,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                16,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  5,
                  15
                ],
                [
                  6,
                  15
                ]
              ],
              "entrances": [
                [
                  4,
                  13
                ],
                [
                  6,
                  15
                ]
              ]
            },
            {
              "id": "passage_7",
              "cells": [
                [
                  2,
                  21
                ],
                [
                  3,
                  21
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
                ]
              ],
              "entrances": [
                [
                  2,
                  21
                ],
                [
                  4,
                  19
                ]
              ]
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                6,
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
                  4,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                4,
                7
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
                6,
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
                8,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  12,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                10,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                16,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                14,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                16,
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
                16,
                17
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
                12,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  13
                ]
              }
            },
            {
              "id": 11,
              "start": [
                8,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                7,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  3,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                4,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  16
                ]
              }
            },
            {
              "id": 14,
              "start": [
                4,
                18
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  22
                ]
              }
            },
            {
              "id": 15,
              "start": [
                1,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  4,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      }
    ]
  },
  "cliff-fresh": {
    "experiment_version": 25,
    "title": "Warehouse Right-of-Way",
    "objective": "Write rules that let every robot complete its assigned task safely.",
    "condition": "fresh",
    "schedule": "cliff",
    "world_rules": [
      "Robots choose their shortest legal route and move at the same time.",
      "If two robots enter the same square together, they collide.",
      "A narrow passage allows traffic from only one end at a time. If robots arrive from both ends together, one waits outside until the passage is clear.",
      "A rule can decide narrow-passage entry only when it names the narrow-passage square.",
      "An exit admits one robot at a time, and only one entry order is accepted.",
      "A robot leaves the work area after entering its exit.",
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
          "object": "Traffic",
          "predicate": "contested",
          "values": [
            {
              "id": true,
              "label": "conflicts with another robot"
            }
          ]
        },
        {
          "id": "target_type",
          "object": "Next square",
          "predicate": "target_type",
          "values": [
            {
              "id": "road",
              "label": "an ordinary road square"
            },
            {
              "id": "passage",
              "label": "a narrow-passage square"
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
        "object": "Traffic",
        "property": "contested",
        "predicate": "contested",
        "value": true,
        "negated": false,
        "label": "conflicts with another robot"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "road",
        "negated": false,
        "label": "an ordinary road square"
      },
      {
        "object": "Next square",
        "property": "target_type",
        "predicate": "target_type",
        "value": "passage",
        "negated": false,
        "label": "a narrow-passage square"
      },
      {
        "object": "Next square",
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
          "object": "Traffic",
          "property": "contested",
          "predicate": "contested",
          "value": true,
          "negated": false,
          "label": "conflicts with another robot"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "road",
          "negated": false,
          "label": "an ordinary road square"
        },
        {
          "object": "Next square",
          "property": "target_type",
          "predicate": "target_type",
          "value": "passage",
          "negated": false,
          "label": "a narrow-passage square"
        },
        {
          "object": "Next square",
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
      "role_rule": [
        "contested + Carrier",
        "narrow passage + Carrier when a passage is present"
      ],
      "movement_minimum_primitives": [
        2,
        2,
        4,
        4,
        5,
        5,
        7,
        7
      ],
      "role_minimum_primitives": [
        2,
        2,
        2,
        2,
        2,
        2,
        4,
        4
      ],
      "local_edit_depths": [
        null,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "one_step_role_available": [
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      "same_final_constraints": true,
      "same_final_world": true,
      "confirmatory_stimulus_ready": false,
      "primary_design_metric": "hierarchical_conditional_edit_surprisal",
      "schedule_contrast": "Ramp calibrated; Cliff ordering pending",
      "movement_anchor": [
        "contested AND north"
      ],
      "intended_movement_rulebooks": [
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "W",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          }
        ],
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
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
        [
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Traffic",
                "property": "contested",
                "p": "contested",
                "v": true,
                "negated": false
              },
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "road",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "S",
                "negated": false
              }
            ]
          },
          {
            "action": "MOVE",
            "conds": [
              {
                "object": "Next square",
                "property": "target_type",
                "p": "target_type",
                "v": "passage",
                "negated": false
              },
              {
                "object": "Movement",
                "property": "move_dir",
                "p": "move_dir",
                "v": "E",
                "negated": false
              }
            ]
          }
        ]
      ],
      "stimulus_selection": {
        "generator": "physical_outcome_local_repair_search_v1",
        "candidate_event_count": 36,
        "candidates_examined": 324,
        "criteria": [
          "all previously revealed conflicts remain active",
          "the previous movement rulebook fails on every new prefix",
          "one editor operation reaches a minimum-complexity movement repair",
          "T2 is a one-rule direction replacement",
          "T3 through T6 retain exactly two movement rules",
          "no movement witness uses more than three rules",
          "role rules must name the Narrow passage when arbitrating it",
          "every narrow-passage decision is made by a Narrow passage rule",
          "no bounded movement solution can bypass the Narrow passage feature"
        ],
        "events": [
          [
            "road",
            "N",
            "E"
          ],
          [
            "machine",
            "E",
            "N"
          ],
          [
            "road",
            "S",
            "W"
          ],
          [
            "machine",
            "E",
            "S"
          ],
          [
            "machine",
            "E",
            "W"
          ],
          [
            "road",
            "N",
            "S"
          ],
          [
            "passage",
            "N",
            "E"
          ],
          [
            "passage",
            "E",
            "S"
          ]
        ],
        "movement_primitive_curve": [
          2,
          2,
          4,
          4,
          5,
          5,
          7,
          7
        ],
        "movement_rule_curve": [
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3
        ],
        "ramp_transitions": [
          {
            "event": [
              "machine",
              "E",
              "N"
            ],
            "movement_probability_mass": 0.037037037,
            "selected_edit_probability": 0.037037037,
            "selected_edit_cost_bits": 4.754888
          },
          {
            "event": [
              "road",
              "S",
              "W"
            ],
            "movement_probability_mass": 0.0768203073,
            "selected_edit_probability": 0.0381503748,
            "selected_edit_cost_bits": 4.712159
          },
          {
            "event": [
              "machine",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0416666667,
            "selected_edit_probability": 0.03125,
            "selected_edit_cost_bits": 5.0
          },
          {
            "event": [
              "machine",
              "E",
              "W"
            ],
            "movement_probability_mass": 0.0104166667,
            "selected_edit_probability": 0.0104166667,
            "selected_edit_cost_bits": 6.584963
          },
          {
            "event": [
              "road",
              "N",
              "S"
            ],
            "movement_probability_mass": 0.0208333333,
            "selected_edit_probability": 0.0208333333,
            "selected_edit_cost_bits": 5.584963
          },
          {
            "event": [
              "passage",
              "N",
              "E"
            ],
            "movement_probability_mass": 0.0007114161,
            "selected_edit_probability": 0.00020924,
            "selected_edit_cost_bits": 12.222553
          },
          {
            "event": [
              "passage",
              "E",
              "S"
            ],
            "movement_probability_mass": 0.0175438596,
            "selected_edit_probability": 0.0175438596,
            "selected_edit_cost_bits": 5.83289
          }
        ],
        "selected_movement_rulebooks": [
          [
            "contested AND north"
          ],
          [
            "contested AND east"
          ],
          [
            "contested AND east",
            "contested AND south"
          ],
          [
            "contested AND east",
            "contested AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND west"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND north"
          ],
          [
            "contested AND east",
            "contested AND ordinary road AND south",
            "narrow passage AND east"
          ]
        ],
        "role_primitive_curve": [
          2,
          2,
          2,
          2,
          2,
          2,
          4,
          4
        ],
        "role_witnesses": [
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ],
          [
            "contested AND Carrier",
            "narrow passage AND Carrier"
          ]
        ],
        "mixed_is_allowed": true,
        "confirmatory_stimulus_ready": false
      },
      "static_generation_model": "physical_outcome_hierarchical_grammar_v6",
      "local_transition_model": "editor_grounded_copy_modify_first_success_v3",
      "negation_available": false,
      "passage_rule_gate": "only passage-explicit rules are checked when robots arrive from both ends together"
    },
    "global_solver": {
      "solver": "editor_grounded_rulebook_search_v1",
      "calibration": {
        "t1_type": true,
        "t1_wrong_type_reason": "ok",
        "t1_baseline_reason": "collision",
        "t1_movement_minimum_rules": 1,
        "t1_movement_minimum_primitives": 2,
        "t1_movement_static_bits": 7.851749,
        "t1_movement_successful_mass": 0.0127217425,
        "t1_movement_successful_mass_bits": 6.29656,
        "t1_role_minimum_rules": 1,
        "t1_role_minimum_primitives": 2,
        "t1_role_static_bits": 6.851749,
        "t1_role_successful_mass": 0.0246842141,
        "t1_role_successful_mass_bits": 5.340267,
        "t1_role_advantage_bits": 0.956292,
        "t2_type": true,
        "t2_wrong_type_reason": "priority-violation",
        "t2_baseline_reason": "resource-conflict",
        "t2_movement_minimum_rules": 1,
        "t2_movement_minimum_primitives": 2,
        "t2_movement_static_bits": 7.851749,
        "t2_movement_successful_mass": 0.0049955931,
        "t2_movement_successful_mass_bits": 7.645128,
        "t2_role_minimum_rules": 1,
        "t2_role_minimum_primitives": 2,
        "t2_role_static_bits": 6.851749,
        "t2_role_successful_mass": 0.0096844883,
        "t2_role_successful_mass_bits": 6.690108,
        "t2_role_advantage_bits": 0.95502,
        "t3_type": true,
        "t3_wrong_type_reason": "priority-violation",
        "t3_baseline_reason": "resource-conflict",
        "t3_movement_minimum_rules": 2,
        "t3_movement_minimum_primitives": 4,
        "t3_movement_static_bits": 14.17559,
        "t3_movement_successful_mass": 0.0001588985,
        "t3_movement_successful_mass_bits": 12.619607,
        "t3_role_minimum_rules": 1,
        "t3_role_minimum_primitives": 2,
        "t3_role_static_bits": 6.851749,
        "t3_role_successful_mass": 0.0096844883,
        "t3_role_successful_mass_bits": 6.690108,
        "t3_role_advantage_bits": 5.929499,
        "t4_type": true,
        "t4_wrong_type_reason": "priority-violation",
        "t4_baseline_reason": "resource-conflict",
        "t4_movement_minimum_rules": 2,
        "t4_movement_minimum_primitives": 4,
        "t4_movement_static_bits": 14.17559,
        "t4_movement_successful_mass": 9.48892e-05,
        "t4_movement_successful_mass_bits": 13.363397,
        "t4_role_minimum_rules": 1,
        "t4_role_minimum_primitives": 2,
        "t4_role_static_bits": 6.851749,
        "t4_role_successful_mass": 0.0096844883,
        "t4_role_successful_mass_bits": 6.690108,
        "t4_role_advantage_bits": 6.673288,
        "t5_type": true,
        "t5_wrong_type_reason": "priority-violation",
        "t5_baseline_reason": "resource-conflict",
        "t5_movement_minimum_rules": 2,
        "t5_movement_minimum_primitives": 5,
        "t5_movement_static_bits": 16.17559,
        "t5_movement_successful_mass": 3.14092e-05,
        "t5_movement_successful_mass_bits": 14.958454,
        "t5_role_minimum_rules": 1,
        "t5_role_minimum_primitives": 2,
        "t5_role_static_bits": 6.851749,
        "t5_role_successful_mass": 0.0096844883,
        "t5_role_successful_mass_bits": 6.690108,
        "t5_role_advantage_bits": 8.268346,
        "t6_type": true,
        "t6_wrong_type_reason": "priority-violation",
        "t6_baseline_reason": "resource-conflict",
        "t6_movement_minimum_rules": 2,
        "t6_movement_minimum_primitives": 5,
        "t6_movement_static_bits": 16.17559,
        "t6_movement_successful_mass": 1.57046e-05,
        "t6_movement_successful_mass_bits": 15.958454,
        "t6_role_minimum_rules": 1,
        "t6_role_minimum_primitives": 2,
        "t6_role_static_bits": 6.851749,
        "t6_role_successful_mass": 0.0096844883,
        "t6_role_successful_mass_bits": 6.690108,
        "t6_role_advantage_bits": 9.268346,
        "t7_type": true,
        "t7_wrong_type_reason": "priority-violation",
        "t7_baseline_reason": "passage-conflict",
        "t7_movement_minimum_rules": 3,
        "t7_movement_minimum_primitives": 7,
        "t7_movement_static_bits": 23.43438,
        "t7_movement_successful_mass": 3.088e-07,
        "t7_movement_successful_mass_bits": 21.627025,
        "t7_role_minimum_rules": 2,
        "t7_role_minimum_primitives": 4,
        "t7_role_static_bits": 13.760553,
        "t7_role_successful_mass": 0.0002597772,
        "t7_role_successful_mass_bits": 11.910437,
        "t7_role_advantage_bits": 9.716587,
        "t8_type": true,
        "t8_wrong_type_reason": "priority-violation",
        "t8_baseline_reason": "passage-conflict",
        "t8_movement_minimum_rules": 3,
        "t8_movement_minimum_primitives": 7,
        "t8_movement_static_bits": 23.43438,
        "t8_movement_successful_mass": 1.544e-07,
        "t8_movement_successful_mass_bits": 22.627025,
        "t8_role_minimum_rules": 2,
        "t8_role_minimum_primitives": 4,
        "t8_role_static_bits": 13.760553,
        "t8_role_successful_mass": 0.0002597772,
        "t8_role_successful_mass_bits": 11.910437,
        "t8_role_advantage_bits": 10.716587,
        "tree_stay_costs": [
          null,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        "tree_switch_costs": [
          null,
          1,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        "tree_preferred_updates": [
          null,
          "tie",
          "tie",
          "movement",
          "movement",
          "movement",
          "movement",
          "movement"
        ],
        "editor_search": [
          null,
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          },
          {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement"
          }
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
                "object": "Traffic",
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
          "stage": "Road introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0127217425,
              "successful_mass_bits": 6.29656,
              "successful_rulebook_count": 804,
              "static_witness": [
                "contested AND north"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0246842141,
              "successful_mass_bits": 5.340267,
              "successful_rulebook_count": 204,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.956292,
          "local_search": null,
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
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
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t1",
          "rows": 7,
          "cols": 7,
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
              3,
              0
            ],
            [
              3,
              6
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
            ]
          ],
          "zones": [],
          "protected": [],
          "items": [],
          "machines": [],
          "passages": [],
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
                  1,
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
                  3,
                  5
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
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Exit introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 7.851749,
              "successful_probability_mass": 0.0049955931,
              "successful_mass_bits": 7.645128,
              "successful_rulebook_count": 206,
              "static_witness": [
                "contested AND east"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 0.95502,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.037037037,
                "cost_bits": 4.754888,
                "witness": [
                  "contested AND east"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.037037037
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t2",
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
              9
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
              9
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                  3
                ],
                "1": [
                  3,
                  1
                ],
                "2": [
                  3,
                  7
                ],
                "3": [
                  5,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
                  3
                ],
                "1": [
                  3,
                  2
                ],
                "2": [
                  3,
                  8
                ],
                "3": [
                  4,
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
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Second movement rule",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 0.0001588985,
              "successful_mass_bits": 12.619607,
              "successful_rulebook_count": 70,
              "static_witness": [
                "contested AND east",
                "contested AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 5.929499,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0768203073,
                "cost_bits": 3.702368,
                "witness": [
                  "contested AND east",
                  "contested AND south"
                ]
              },
              "role": {
                "depth": 1,
                "probability_mass": 0.0277777778,
                "cost_bits": 5.169925,
                "witness": [
                  "contested AND Carrier"
                ]
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0017442292,
                "cost_bits": 9.163195,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0785645365
            },
            "pure_role_shift": {
              "depth": 1,
              "probability_mass": 0.0277777778
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": 1,
              "preferred_update": "tie"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t3",
          "rows": 13,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
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
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 14.17559,
              "successful_probability_mass": 9.48892e-05,
              "successful_mass_bits": 13.363397,
              "successful_rulebook_count": 49,
              "static_witness": [
                "contested AND east",
                "contested AND west"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 6.673288,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0416666667,
                "cost_bits": 4.584963,
                "witness": [
                  "contested AND east",
                  "contested AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.015625,
                "cost_bits": 6.0,
                "witness": [
                  "contested AND east",
                  "contested AND Carrier AND south"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0572916667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t4",
          "rows": 17,
          "cols": 13,
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
              11
            ],
            [
              1,
              12
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
              11
            ],
            [
              2,
              12
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
              3,
              11
            ],
            [
              3,
              12
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
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
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Road-specific refinement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 3.14092e-05,
              "successful_mass_bits": 14.958454,
              "successful_rulebook_count": 30,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 8.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0104166667,
                "cost_bits": 6.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND west"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0104166667
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "W",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t5",
          "rows": 17,
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
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
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Local direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 2,
              "minimum_primitives": 5,
              "minimum_static_bits": 16.17559,
              "successful_probability_mass": 1.57046e-05,
              "successful_mass_bits": 15.958454,
              "successful_rulebook_count": 15,
              "static_witness": [
                "contested AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 1,
              "minimum_primitives": 2,
              "minimum_static_bits": 6.851749,
              "successful_probability_mass": 0.0096844883,
              "successful_mass_bits": 6.690108,
              "successful_rulebook_count": 51,
              "static_witness": [
                "contested AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.268346,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND west"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0208333333,
                "cost_bits": 5.584963,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0315429361,
                "cost_bits": 4.986539,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND Operator"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0523762694
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t6",
          "rows": 17,
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [],
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
                  3,
                  8
                ],
                "3": [
                  4,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  9,
                  10
                ],
                "6": [
                  15,
                  8
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  15,
                  14
                ],
                "9": [
                  15,
                  16
                ],
                "10": [
                  10,
                  15
                ],
                "11": [
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
        "active_agent_count": 14,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Narrow-passage introduction",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 3.088e-07,
              "successful_mass_bits": 21.627025,
              "successful_rulebook_count": 4,
              "static_witness": [
                "contested AND east",
                "narrow passage AND north",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 9.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0007114161,
                "cost_bits": 10.457019,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND north"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0016529963,
                "cost_bits": 9.240701,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0023644125
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
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
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "cliff_pilot_t7",
          "rows": 17,
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
              11
            ],
            [
              2,
              12
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
              3,
              0
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
              4,
              17
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
              12
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
              "id": "processor_3",
              "cell": [
                15,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                15,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  4,
                  15
                ],
                [
                  5,
                  15
                ]
              ],
              "entrances": [
                [
                  3,
                  13
                ],
                [
                  5,
                  15
                ]
              ]
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
                  1,
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
                  3,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                3,
                7
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
                5,
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
                7,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  11,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                9,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  9,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                15,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                13,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                15,
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
                15,
                17
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
                  13
                ]
              }
            },
            {
              "id": 11,
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
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                6,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                3,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  16
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
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
                  3,
                  7
                ],
                "3": [
                  5,
                  9
                ],
                "4": [
                  7,
                  9
                ],
                "5": [
                  9,
                  11
                ],
                "6": [
                  15,
                  7
                ],
                "7": [
                  13,
                  9
                ],
                "8": [
                  15,
                  13
                ],
                "9": [
                  15,
                  17
                ],
                "10": [
                  11,
                  15
                ],
                "11": [
                  7,
                  15
                ],
                "12": [
                  6,
                  15
                ],
                "13": [
                  3,
                  12
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
                "13": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  3,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
              }
            }
          ]
        }
      },
      {
        "id": "trial_8",
        "label": "T8",
        "level": 8,
        "layer": 8,
        "prerequisites": [
          "trial_7"
        ],
        "family": "machine_context_movement_shift",
        "active_agent_count": 16,
        "description": "",
        "participant_prompt": "",
        "starter_rulebook": [],
        "analysis": {
          "schedule": "cliff",
          "condition": "fresh",
          "stage": "Narrow-passage direction replacement",
          "representation_scores": {
            "movement": {
              "minimum_rules": 3,
              "minimum_primitives": 7,
              "minimum_static_bits": 23.43438,
              "successful_probability_mass": 1.544e-07,
              "successful_mass_bits": 22.627025,
              "successful_rulebook_count": 2,
              "static_witness": [
                "contested AND east",
                "narrow passage AND east",
                "contested AND ordinary road AND south"
              ]
            },
            "role": {
              "minimum_rules": 2,
              "minimum_primitives": 4,
              "minimum_static_bits": 13.760553,
              "successful_probability_mass": 0.0002597772,
              "successful_mass_bits": 11.910437,
              "successful_rulebook_count": 22,
              "static_witness": [
                "contested AND Carrier",
                "narrow passage AND Carrier"
              ]
            }
          },
          "role_advantage_bits": 10.716587,
          "local_search": {
            "model": "editor_grounded_copy_modify_first_success_v2",
            "max_depth": 1,
            "start_rulebook": [
              "contested AND east",
              "contested AND ordinary road AND south",
              "narrow passage AND north"
            ],
            "categories": {
              "movement": {
                "depth": 1,
                "probability_mass": 0.0175438596,
                "cost_bits": 5.83289,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND east"
                ]
              },
              "role": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              },
              "mixed": {
                "depth": 1,
                "probability_mass": 0.0263157895,
                "cost_bits": 5.247928,
                "witness": [
                  "contested AND east",
                  "contested AND ordinary road AND south",
                  "narrow passage AND Carrier"
                ]
              },
              "context_only": {
                "depth": null,
                "probability_mass": 0.0,
                "cost_bits": null,
                "witness": []
              }
            },
            "movement_retaining": {
              "depth": 1,
              "probability_mass": 0.0438596491
            },
            "pure_role_shift": {
              "depth": null,
              "probability_mass": 0.0
            },
            "prediction": "retain_movement",
            "selected_update": {
              "stay_cost": 1,
              "switch_cost": null,
              "preferred_update": "movement"
            }
          },
          "intended_movement_rulebook": [
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Traffic",
                  "property": "contested",
                  "p": "contested",
                  "v": true,
                  "negated": false
                },
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "road",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "S",
                  "negated": false
                }
              ]
            },
            {
              "action": "MOVE",
              "conds": [
                {
                  "object": "Next square",
                  "property": "target_type",
                  "p": "target_type",
                  "v": "passage",
                  "negated": false
                },
                {
                  "object": "Movement",
                  "property": "move_dir",
                  "p": "move_dir",
                  "v": "E",
                  "negated": false
                }
              ]
            }
          ],
          "role_reference": [
            "contested + Carrier",
            "narrow passage + Carrier"
          ]
        },
        "world": {
          "name": "common_pilot_t8",
          "rows": 18,
          "cols": 24,
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
              0,
              23
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
              22
            ],
            [
              1,
              23
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
              23
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
              22
            ],
            [
              3,
              23
            ],
            [
              4,
              0
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
              22
            ],
            [
              4,
              23
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
              5,
              23
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
              6,
              23
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
              7,
              23
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
              8,
              23
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
              9,
              23
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
              12
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
              10,
              23
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
              11,
              23
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
              12,
              23
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
              13,
              23
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
              14,
              23
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
              15,
              23
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
              16,
              23
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
              17,
              23
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
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_3",
              "cell": [
                16,
                9
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            },
            {
              "id": "processor_4",
              "cell": [
                16,
                15
              ],
              "needs_permit": false,
              "setup_role": null,
              "marker": "plain"
            }
          ],
          "passages": [
            {
              "id": "passage_6",
              "cells": [
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
                  5,
                  15
                ],
                [
                  6,
                  15
                ]
              ],
              "entrances": [
                [
                  4,
                  13
                ],
                [
                  6,
                  15
                ]
              ]
            },
            {
              "id": "passage_7",
              "cells": [
                [
                  2,
                  21
                ],
                [
                  3,
                  21
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
                ]
              ],
              "entrances": [
                [
                  2,
                  21
                ],
                [
                  4,
                  19
                ]
              ]
            }
          ],
          "scanners": [],
          "priority_role": "operator",
          "agents": [
            {
              "id": 0,
              "start": [
                6,
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
                  4,
                  5
                ]
              }
            },
            {
              "id": 2,
              "start": [
                4,
                7
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
                6,
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
                8,
                9
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  12,
                  9
                ]
              }
            },
            {
              "id": 5,
              "start": [
                10,
                11
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  7
                ]
              }
            },
            {
              "id": 6,
              "start": [
                16,
                7
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 7,
              "start": [
                14,
                9
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "operate",
                "machine": "processor_3"
              }
            },
            {
              "id": 8,
              "start": [
                16,
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
                16,
                17
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
                12,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  13
                ]
              }
            },
            {
              "id": 11,
              "start": [
                8,
                15
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  10,
                  17
                ]
              }
            },
            {
              "id": 12,
              "start": [
                7,
                15
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  3,
                  13
                ]
              }
            },
            {
              "id": 13,
              "start": [
                4,
                12
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  6,
                  16
                ]
              }
            },
            {
              "id": 14,
              "start": [
                4,
                18
              ],
              "role": "carrier",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  2,
                  22
                ]
              }
            },
            {
              "id": 15,
              "start": [
                1,
                21
              ],
              "role": "operator",
              "carrying": "none",
              "active": true,
              "tokens": [],
              "goal": {
                "kind": "reach",
                "target": [
                  5,
                  19
                ]
              }
            }
          ]
        },
        "baseline": {
          "ok": false,
          "reason": "passage-conflict",
          "frames": [
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": null
            },
            {
              "pos": {
                "0": [
                  6,
                  3
                ],
                "1": [
                  4,
                  1
                ],
                "2": [
                  4,
                  7
                ],
                "3": [
                  6,
                  9
                ],
                "4": [
                  8,
                  9
                ],
                "5": [
                  10,
                  11
                ],
                "6": [
                  16,
                  7
                ],
                "7": [
                  14,
                  9
                ],
                "8": [
                  16,
                  13
                ],
                "9": [
                  16,
                  17
                ],
                "10": [
                  12,
                  15
                ],
                "11": [
                  8,
                  15
                ],
                "12": [
                  7,
                  15
                ],
                "13": [
                  4,
                  12
                ],
                "14": [
                  4,
                  18
                ],
                "15": [
                  1,
                  21
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
                "15": "none"
              },
              "released": [],
              "prepared_machines": [],
              "event": {
                "type": "passage-conflict",
                "cell": [
                  4,
                  15
                ],
                "agents": [
                  12,
                  13
                ],
                "passage": "passage_6"
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
