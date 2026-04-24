# Neuro Nova: Technical Overview

This document provides a comprehensive overview of the core technologies and architectural decisions used in the Neuro Nova application. It's designed to explain the "why" and "how" behind the stack.

---

## 1. Core Framework: Next.js & React

### Why Next.js & React?

- **React** is the foundation for building the user interface. Its **component-based architecture** allows us to create reusable UI pieces (like buttons, cards, and game widgets), making the code clean, manageable, and easy to debug.
- **Next.js** is a framework built on top of React. It provides a robust structure for production-grade applications with several key advantages:
  - **Performance:** Next.js uses features like Server-Side Rendering (SSR) and static generation to deliver pages to the user much faster than a standard client-side React app.
  - **App Router:** We use the modern App Router for file-based routing. This means creating a new page is as simple as adding a file in the `src/app` directory (e.g., `src/app/about-dementia/page.tsx` creates the `/about-dementia` route).
  - **Server & Client Components:** This is a powerful feature of the App Router. It allows us to decide *where* our code runs.
    - **Server Components (Default):** These run on the server. They are great for fetching data and reducing the amount of JavaScript sent to the browser, which speeds up initial page load. Most of the page structure is built with Server Components.
    - **Client Components (`'use client'`):** These run in the browser. We use them whenever we need interactivity, such as handling button clicks (`onClick`), managing state (`useState`), or using browser-specific features. All the interactive game components are Client Components.

---

## 2. Styling: Tailwind CSS & ShadCN/UI

### Why this combination?

This stack was chosen for its balance of rapid development, design consistency, and complete control.

- **Tailwind CSS:** A utility-first CSS framework. Instead of writing custom CSS files, we build designs directly in our HTML/JSX using classes like `p-4` (padding), `flex` (flexbox), and `text-primary`.
  - **Why?** It's extremely fast for prototyping, enforces design consistency (using a predefined theme for spacing, colors, etc.), and avoids the need to switch between different files to style a component.
- **ShadCN/UI:** This is **not a traditional component library**. Instead, it's a collection of beautifully designed, accessible components (like `Card`, `Button`, `Dialog`) that you can copy directly into your project.
  - **Why?** We "own" the code. This means we have full control to customize the appearance and behavior of every component without fighting against the styles of an external library. The components are built using Tailwind CSS, so they fit perfectly into our styling system.
  - **How?** The components reside in `src/components/ui`. The theme and base colors are configured in `src/app/globals.css` and `tailwind.config.ts`, allowing for consistent branding across the entire app.

---

## 3. Artificial Intelligence: Google's Genkit

### Why Genkit?

Genkit is a framework specifically designed for building production-ready generative AI features. It helps structure our interactions with AI models like Gemini.

- **Organized AI Logic:** Genkit allows us to define "flows" (`ai.defineFlow`). A flow is a structured, server-side function that performs an AI-related task. This keeps our AI logic separate from our UI code. All our flows are in the `src/ai/flows` directory.
- **Structured I/O with Zod:** We use **Zod**, a schema validation library, to define the exact structure of the data we send to the AI (`inputSchema`) and the data we expect back (`outputSchema`).
  - **Why?** This is crucial for reliability. It forces the AI model to return data in a consistent JSON format, preventing errors and making the data easy to use in our components.
- **Prompt Templating:** Genkit uses Handlebars (`{{{...}}}`) for templating prompts, which makes it easy to dynamically insert user data (like game scores) into the instructions we send to the AI.
- **How it works in Neuro Nova:**
  1. A user completes a game (e.g., the Stroop Test).
  2. The component (`StroopGame.tsx`) calls a server function (e.g., `analyzeStroopPerformance`).
  3. This function executes the Genkit flow, sending the user's score and time to the Gemini model with a structured prompt.
  4. Genkit ensures the model's response is formatted correctly (as defined by our Zod schema).
  5. The structured analysis is returned to the component and displayed to the user.

---

## 4. Database & User Management: Firebase

### Why Firebase?

Firebase is a Backend-as-a-Service (BaaS) platform from Google. It's an excellent choice for rapid development and hackathons for several reasons:

- **Authentication:** Firebase Auth provides a complete, secure user login and signup system out of the box. We use email/password authentication, which is implemented in the `/login` and `/signup` pages. `useAuth` hook in `src/hooks/use-auth.tsx` manages the user's login state throughout the app.
- **Realtime Database:** We use Firebase's Realtime Database to store user information (like name, age, and location type).
  - **Why?** It's a simple, NoSQL JSON database that is incredibly easy to set up and use. For an application like this where we need to quickly save and retrieve user profile data, it's a perfect fit. The `user-info` page writes to the database, and the `dashboard` page reads from it.
- **Easy Integration:** The Firebase SDK is straightforward to integrate into a Next.js app. The configuration is centralized in `src/lib/firebase.ts`.

---

## 5. Internationalization (i18next)

### Why i18next?

To make the application accessible to a wider audience in India, we needed to support multiple languages.

- **i18next** is a powerful and popular internationalization (i18n) framework for JavaScript.
- **How it works:**
  - We define translation strings (in English, Hindi, and Telugu) in the `src/lib/i18n.ts` file.
  - The `useTranslation` hook from `react-i18next` allows any component to access the appropriate text for the currently selected language.
  - The `LanguageToggle` component in the header provides the UI for switching between languages.
- **Benefit:** This setup allows us to add or modify text in one central place and have it reflected across the entire application in all supported languages.

---

## 6. Ethical AI & Responsible Design

This project was built with a strong ethical framework from the start. The goal is not to replace clinicians, but to empower users with a private, accessible, and compassionate tool for cognitive health awareness.

### Core Ethical Principles:

1.  **Screening, Not Diagnosis:** This is the most critical distinction. The application is explicitly framed as a **screening tool**.
    - **How?** Clear disclaimers are placed with the results. The language used throughout the app avoids definitive or alarming medical terminology. The purpose is to provide users with a "snapshot" of their cognitive patterns, which might encourage them to seek professional medical advice if they have concerns.

2.  **Compassionate & Non-Alarming Language:** The AI prompts have been carefully engineered to be gentle, supportive, and encouraging.
    - **How?** In files like `src/ai/flows/calculate-risk-score.ts`, the prompt instructs the AI: *"You are a compassionate cognitive health coach... Do NOT use alarming language. This is a screening tool, not a diagnosis. Your tone should be supportive and encouraging."* This ensures the user's emotional well-being is prioritized.

3.  **Grounded in Scientific Benchmarks:** To ensure the results are meaningful and responsible, the final risk score is contextualized using the **LASI-DAD (Longitudinal Aging Study in India – Diagnostic Assessment of Dementia)** study.
    - **How?** The `RiskScoreAnalysis` component explicitly cites the LASI-DAD study. The AI is prompted to consider these norms, adding a layer of scientific grounding to its analysis rather than generating arbitrary feedback.

4.  **User Privacy and Control:** The application uses Firebase Authentication, ensuring that a user's results and personal information are tied to their own secure account. The screening process is entirely private, reducing the stigma that can be associated with cognitive health.

### From Simple Games to Meaningful Insights: The Science Behind the Screening

When asked, *"Aren't these just simple games?"*—the answer is yes, their simplicity is intentional. They are accessible and non-intimidating versions of validated neuropsychological tests. Each "game" is designed to probe specific cognitive domains.

-   **Stroop Test (Selective Attention & Processing Speed):**
    -   **What it measures:** The Stroop test is a classic assessment of **Executive Function**. It measures how well a person can inhibit a cognitive interference. The automatic instinct is to read the word, but the task requires you to name the ink color. The conflict between these two tasks stresses the brain's "executive" or "control" systems. A slower time or more errors can indicate a decline in selective attention and processing speed.

-   **Memory Game (Working & Visuospatial Memory):**
    -   **What it measures:** This pair-matching game is a direct test of **Working Memory**. The user must hold the location and identity of multiple cards in their mind simultaneously to make a match. The number of moves needed to complete the grid is a clear quantitative measure of short-term memory efficiency and attention.

-   **Maze Game (Planning & Visuospatial Navigation):**
    -   **What it measures:** Navigating a maze requires **Planning** and **Visuospatial Skills**. It's not just about reaction time; it's about forming a mental map, anticipating dead ends, and executing a sequence of moves. This is a proxy for real-world problem-solving and navigational abilities, which can be affected by cognitive decline.

-   **Voice Test (Verbal Fluency & Lexical Diversity):**
    -   **What it measures:** The AI analyzes the audio for patterns beyond just the words spoken. It assesses **Verbal Fluency** (how easily and smoothly one can speak), **Pause Frequency** (unusual or long pauses can indicate word-finding difficulties), and **Lexical Diversity** (the variety of words used). Subtle changes in these areas are often early indicators of cognitive change.

By combining the results from these varied tests, Neuro Nova gathers signals from multiple cognitive domains, providing a more holistic and meaningful "snapshot" of a user's current cognitive patterns. It's a powerful demonstration of how accessible technology can be used for responsible, early-stage cognitive health screening.
