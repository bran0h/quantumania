---
title: Deutsch–Jozsa
description: Distinguish constant from balanced functions in a single quantum query.
---

Imagine a hidden function **f** that takes one bit and returns one bit. You want to know: is f **constant** (always the same answer) or **balanced** (different answers for 0 and 1)?

Classically, you might query f(0) and f(1) — up to **two** evaluations in the worst case.

The **Deutsch–Jozsa algorithm** prepares an input qubit and an ancilla qubit, applies a [Hadamard](/learn/gates/hadamard-gate) layer to create [superposition](/learn/qubits/superposition), runs a quantum **oracle** that encodes f, then interferes the input with another Hadamard. [Measuring](/learn/qubits/measurement) the input qubit then gives:

- **|0⟩** → the function is constant
- **|1⟩** → the function is balanced

### What is an oracle?

An **oracle** is a [gate](/learn/gates/what-are-gates) that implements a hidden function without exposing its truth table directly. In Deutsch–Jozsa, the oracle applies a phase kickback trick using an ancilla qubit: the balanced case uses a [CNOT](/learn/entanglement/bell-state) (the same gate that builds the Bell state), while constant cases leave the input unchanged or flip the ancilla only.

Pick an oracle below and step through the circuit to see how interference reveals the answer in one shot.

::deutsch-jozsa
::
