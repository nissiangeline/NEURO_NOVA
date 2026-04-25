# Algorithms Used in Neuro Nova

This document explains the key algorithms and logical processes that power the Neuro Nova application. While we didn't implement complex, low-level algorithms from scratch, the intelligence of the app lies in the orchestration of several high-level algorithms and logical flows.

---

## 1. Generative AI & Prompting Algorithms

The core "brain" of Neuro Nova is not a traditional algorithm but a large language model (LLM) from Google, accessed via the Genkit framework. Our "algorithm" in this context is the structured set of instructions—the prompt—that we provide to the AI to guide its analysis.

-   **What it is:** A form of **algorithmic prompting** or "prompt engineering."
-   **Where it's used:** In all files within `src/ai/flows/`.
-   **How it works:**
    -   In files like `analyze-stroop-performance.ts`, the prompt string is not just a question; it's a carefully crafted algorithm for the AI to follow.
    -   **Input:** It takes quantitative data from the user (e.g., `score`, `timeTaken`).
    -   **Context & Benchmarking:** It provides the AI with the context and rules for analysis (e.g., "A typical performance for a healthy adult is..."). This grounds the AI's response in pre-defined benchmarks.
    -   **Structured Output:** It uses Zod schemas to instruct the AI to format its response as a specific JSON object (`outputSchema`). This forces the generative, sometimes unpredictable, nature of an LLM into a reliable and machine-readable format.

This is the most advanced algorithmic concept in the app, where we steer a powerful, pre-trained model to perform a specific, desired task reliably.

---

## 2. Cognitive Risk Scoring Algorithm

This is a custom classification algorithm that synthesizes the results from all four screening games into a single, understandable score.

-   **What it is:** A custom, multi-stage scoring and classification algorithm.
-   **Where it's used:** `src/components/risk-score-analysis.tsx`.
-   **How it works:** It follows a clear, three-step process:
    1.  **Normalization:** The algorithm first takes the heterogeneous outputs from each of the four game analyses (Voice, Maze, Stroop, Memory) and calculates an `averageScore` for each. It normalizes these scores into a consistent percentage format (0-100) by comparing the user's `actualPercentage` to the `expectedPercentage`. This creates a uniform basis for comparison.
    2.  **Aggregation (Averaging):** It then calculates a simple arithmetic **mean (average)** of the four normalized scores. This aggregates the user's performance across different cognitive domains (attention, memory, speech, planning) into a single metric.
    3.  **Threshold-Based Classification:** Finally, it uses a series of `if/else if/else` statements to classify the aggregated score into one of three distinct categories: "Low Risk," "Medium Risk," or "High Risk." This is a simple but effective form of a threshold-based classifier, making the result easy for the user to interpret.

---

## 3. Game Logic Algorithms

Each interactive game uses simple but important algorithms to function correctly.

### a. Memory Game: Shuffling Algorithm

-   **What it is:** An array shuffling algorithm.
-   **Where it's used:** `src/components/memory-game.tsx`, within the `createDeck` function.
-   **How it works:** To ensure the card layout is different for every game, the array of card icons is shuffled using the `sort()` method combined with `Math.random()`: `.sort(() => Math.random() - 0.5)`. This is a common and effective way to achieve a random-enough shuffle for non-cryptographic purposes.

### b. Stroop Test: Non-Congruent Pair Generation

-   **What it is:** A simple constraint-satisfaction algorithm.
-   **Where it's used:** `src/components/stroop-game.tsx`, within the `generateStroop` function.
-   **How it works:** The core of the Stroop test is the conflict between the written word and its color. The algorithm ensures this conflict exists by:
    1.  Randomly selecting a word (e.g., "red").
    2.  Randomly selecting an ink color (e.g., "blue").
    3.  Using a `do-while` loop to check if the color is the same as the word. If it is, the loop forces a re-selection of the color until it is different. This guarantees a non-congruent pair, which is essential for the validity of the test.

---

## 4. UI & Animation Algorithms

The user interface leverages industry-standard libraries that contain their own complex algorithms for creating a smooth user experience.

-   **What they are:** Interpolation, easing, and rendering algorithms.
-   **Where they're used:** Across various components, notably in `src/components/split-text.tsx` and `src/components/wave-animation.tsx`.
-   **How they work:**
    -   **GSAP (GreenSock Animation Platform):** When we use GSAP for effects like the animated text reveal, we are tapping into its highly optimized engine. GSAP calculates the "in-between" frames of an animation using sophisticated **easing algorithms** (like `power3.out`) that model physical motion, making animations feel natural and fluid rather than linear and robotic.
    -   **CSS Keyframe Animations:** For simpler animations, like the floating icons or the wave effect, we use CSS keyframes. The browser's rendering engine uses its own internal algorithms to **interpolate** the CSS properties (e.g., `transform`, `opacity`) between the start and end points defined in the keyframes, ensuring a smooth visual transition.
