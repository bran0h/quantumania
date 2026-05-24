---
title: Grover's Search
description: Amplify the amplitude of a marked item in an unstructured search.
---

Suppose four items are in [superposition](/learn/qubits/superposition) and exactly one is **marked**. How do you boost the marked item's [measurement](/learn/qubits/measurement) probability without checking every item classically?

**Grover's algorithm** repeats two steps:

1. **Oracle** — a black-box gate that flips the *phase* of the marked state's amplitude (multiplies it by −1). The oracle does not tell you *which* item is marked directly — it encodes that information as a sign change that only becomes useful after interference.
2. **Diffuser** — reflect all amplitudes about their average, amplifying the marked state

### What is an oracle?

In quantum algorithms, an **oracle** is a subroutine that encodes problem-specific information into the quantum state. Think of it as a locked box: you feed in a superposition of inputs and the oracle applies the rules of the problem (mark an item, encode a function, etc.) without revealing the answer in plain form.

Grover's oracle marks one of the [two-qubit basis states](/learn/entanglement/two-qubits) with a negative phase. On its own, a phase flip does not change measurement probabilities — you need the diffuser and [interference from superposition](/learn/qubits/superposition) to amplify the marked item.

On a two-qubit search space (four items), a single Grover iteration can push the marked probability close to 100%.

Choose a marked state and run iterations below. Watch how the marked bar grows while the others shrink.

::grover-search
::
