# Role-versus-Movement Mirror Pilot

## Research question

The experiment asks when people continue making cheap local changes to an
existing rule and when they switch to a more compact rule organized around a
different feature.

The task compares two feature families:

- **Movement direction:** eight arrow values;
- **Robot role:** eight role values.

The experiment does not assume that these are separate mental representation
spaces. They are two alternative ways to describe the same waiting behavior.

## Task

The warehouse is revealed across eight trials. Roads remain visible after they
are introduced, and each robot follows a unique shortest route to the matching
lettered destination. When two robots reach the same square together, exactly
one must wait. A robot that stops at the nearer destination blocks the shared
lane if it enters first.

Each trial contains one to four active encounters. One shared rule applies to
all of them, so a participant must find a value set that works globally rather
than repair each encounter independently.

## Rule language

The editor has one hierarchy:

```text
Choose a family: Movement direction | Robot role
Choose one or more values from that family
```

Selected values are joined by OR. For example:

```text
A robot waits if its movement is north OR south.
```

Mixed rules, AND, negation, and additional context features are outside the
experimental language.

## Mirror curricula

T1 has one encounter and admits matched one-value solutions:

```text
Movement = north
Role = Carrier
```

The family used in the participant's first successful T1 rule selects one
curriculum branch.

### Movement-local branch

The minimum Movement solution follows:

| Trial | Values | Edit | Compact alternative |
| --- | --- | --- | --- |
| T1 | N | start | Carrier |
| T2 | N, NE | add NE | Carrier |
| T3 | NE, E | replace N with E | Carrier |
| T4 | NE, E, SE | add SE | Carrier |
| T5 | E, SE, S | replace NE with S | Carrier |
| T6 | E, SE, S, SW | add SW | Carrier |
| T7 | SE, S, SW, W | replace E with W | Carrier |
| T8 | S, SW, W, NW | replace SE with NW | Carrier |

### Role-local branch

The Role branch has the same edit trajectory. Its minimum Role solution grows
from one to four values, while `Movement = north` remains a one-value
alternative.

The two branches use the same number of trials, active encounters, values,
local edit types, route lengths, and destination structure.

## Why this is a problem-solving task

Difficulty comes from integrating several visible constraints. A selected
value must identify the waiting robot in every active encounter without also
selecting the robot that must pass first. Adding an old value can therefore
solve one encounter but create a deadlock at another.

In the carry-over condition, the successful rule from the previous trial is
automatically tested on the new map. The resulting animation and failure
message show where the old rule breaks, but do not state which value to add,
remove, or replace.

## Solver checks

The generator exhaustively evaluates every nonempty subset of all eight Role
values and all eight Movement values. For every trial it verifies that:

1. the empty rule fails;
2. the intended local rule succeeds;
3. the one-value compact alternative succeeds;
4. the preceding local rule fails;
5. the intended local target is the unique minimum solution in its family;
6. the next local target is one add or one replacement away;
7. Role and Movement have the same number of successful value sets;
8. all robots follow the intended unique shortest routes; and
9. both diagonal and orthogonal movement execute in the browser engine.

The minimum local length is:

```text
1, 2, 2, 3, 3, 4, 4, 4
```

and the transition sequence is:

```text
add, replace, add, replace, add, replace, replace
```

## Model compatibility

The rule remains a hierarchical object: choose a family, then choose OR-linked
values. A parameter-free PCFG can assign probabilities to complete rules, and
the carry-over model can assign conditional regeneration probability from the
previous trial's rule. Static simplicity and transition accessibility can
therefore be compared without changing the modeling framework.

This is a validated pilot stimulus set, not yet a confirmatory design. T1 makes
the branch endogenous to the participant's first successful choice, so a later
causal study should randomize the initial anchor.
