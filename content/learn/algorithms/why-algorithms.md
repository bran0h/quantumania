---
title: Why Quantum Algorithms?
description: Compare classical and quantum query counts for structured problems.
---

Classical algorithms are excellent at most everyday computing. Quantum algorithms shine on **specific problems** where [superposition](/learn/qubits/superposition) and interference let you extract global information in fewer steps.

Two famous early examples:

**Deutsch–Jozsa** asks whether a function is *constant* (same output for every input) or *balanced* (half 0, half 1). Classically you may need two queries on a one-bit function. The quantum circuit needs **one** — using an **oracle** gate that encodes the function (explained in the next lesson).

**Grover's search** finds a marked item in an unstructured list of N entries. Classically you might need up to N tries. Grover needs about **√N** queries — a quadratic speedup built from repeated oracle + diffuser steps.

Try the comparison below. Notice how the gap widens as the search space grows, but also that each algorithm only helps its own problem type.

::why-algorithms
::
