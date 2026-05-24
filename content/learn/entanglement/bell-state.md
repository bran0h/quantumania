---
title: Bell State
description: Build the |Φ+⟩ entangled state with H and CNOT.
---

The **Bell state |Φ+⟩** is the hello world of entanglement: (|00⟩ + |11⟩) / √2. It is created by putting q0 in superposition, then applying **CNOT** with q0 as control and q1 as target.

CNOT means: flip the target qubit if the control qubit is |1⟩. When q0 is in superposition, that conditional flip entangles the pair.

Step through the circuit below and watch how |01⟩ and |10⟩ probabilities drop to zero.

::bell-state
::
