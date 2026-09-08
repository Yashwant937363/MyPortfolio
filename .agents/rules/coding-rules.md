---
name: code-style
description: Enforce project styling and documentation guidelines
activation: always_on
---

# Coding Rules

## 1. General Principles

- Write clean, readable, maintainable code.
- Prefer simple solutions over unnecessary abstractions.
- Do not introduce a library or dependency unless it provides meaningful value.
- Reuse existing utilities, components, hooks, and helpers before creating new ones.
- Keep components focused on a single responsibility.
- Avoid duplicated logic.
- Do not over-engineer simple functionality.

## 2. TypeScript

- Use TypeScript throughout the project.
- Prefer explicit types for component props, function parameters, and important data structures.
- Avoid `any` unless there is a strong technical reason.
- Prefer `unknown` over `any` when the type is genuinely unknown.
- Define reusable types/interfaces in appropriate locations rather than duplicating them.
- Do not use type assertions to silence TypeScript errors without understanding the underlying issue.
- Let TypeScript infer types when the inferred type is clear.

## 3. React

- Use functional components and React hooks.
- Keep components small and focused.
- Do not put large amounts of business logic directly inside JSX.
- Extract reusable logic into custom hooks or utility functions when appropriate.
- Avoid unnecessary `useEffect`.
- Do not use `useEffect` to derive values that can be calculated directly during rendering.
- Keep refs focused on DOM interaction, animation, or imperative APIs.
- Avoid unnecessary state. Prefer derived values when possible.

## 4. Component Structure

- Organize components by feature or responsibility rather than creating one large components directory.
- Separate presentation, animation, and application logic when the separation improves readability.
- Components should have clear and descriptive names.
- Avoid generic names such as `Box`, `Thing`, `Component`, or `Data` when a more meaningful name exists.
- Do not create a new component only to reduce a file by a few lines.
- Create reusable components when the same behavior or visual structure appears multiple times.

## 5. Styling

- Follow the existing project's styling system.
- Do not introduce another CSS framework or styling library without a clear reason.
- Prefer existing design tokens, variables, utilities, and components.
- Avoid hardcoding the same value in multiple places.
- Keep responsive behavior in mind when creating UI.
- Do not use inline styles when the project's existing styling approach can handle the requirement cleanly.

## 6. GSAP and Animation

- Use GSAP for complex timeline-based animations.
- Use `MotionPathPlugin` when an object needs to travel along a defined path.
- Keep animation code separate from normal application logic when practical.
- Store important animation references using React refs.
- Properly clean up GSAP animations, timelines, and contexts when components unmount.
- Prefer a single well-structured timeline over many independent animations when the animation represents one conceptual sequence.
- Do not animate elements simply because animation is possible.
- Every major animation should communicate something about the technical concept being demonstrated.
- Avoid excessive animation that makes the interface difficult to understand.
- Respect reduced-motion preferences where practical.

## 7. SVG

- Prefer SVG when creating technical diagrams, network architecture, request flows, packets, paths, or infrastructure visualizations.
- Give SVG elements meaningful identifiers/classes when they need to be targeted by animation.
- Keep SVG structure understandable rather than generating unnecessarily complex paths.
- Separate visual elements from animated elements when possible.
- Do not convert a technically meaningful visualization into a generic decorative graphic.

## 8. Performance

- Avoid unnecessary re-renders.
- Do not run expensive calculations on every render when they can be cached or moved elsewhere.
- Avoid creating unnecessary objects, arrays, or functions inside frequently rendered components.
- Prefer GPU-friendly animation properties such as `transform` and `opacity`.
- Do not continuously animate expensive layout properties unless required.
- Be careful with scroll-based animations and event listeners.
- Clean up event listeners, timers, observers, WebSocket connections, and animation instances.

## 9. Error Handling

- Handle expected errors explicitly.
- Do not silently swallow errors.
- Error messages should provide useful debugging information.
- Do not expose sensitive information in client-side error messages.
- Avoid using `console.log` as permanent application logging.
- Use the project's existing logging/error-handling approach.

## 11. File Organization

- Keep files reasonably small.
- Split files when a single file contains multiple unrelated responsibilities.
- Use descriptive filenames.
- Keep related files close to the feature that uses them.
- Do not create unnecessary folder hierarchies.
- Follow the existing project structure before introducing a new organizational pattern.

## 12. Dependencies

Before adding a dependency:

1. Check whether the functionality already exists in the project.
2. Check whether it can be implemented simply without a dependency.
3. Check whether an existing dependency can solve the problem.
4. Only then introduce a new dependency.

Do not install packages automatically when they are not necessary.

## 13. Existing Code

- Understand existing code before modifying it.
- Do not rewrite working code unnecessarily.
- Preserve existing behavior unless the task explicitly requires changing it.
- When fixing a bug, make the smallest reasonable change.
- Do not refactor unrelated code while implementing a feature.
- Follow existing naming and architectural conventions unless there is a clear reason to improve them.

## 14. Accessibility

- Use semantic HTML where appropriate.
- Interactive elements must be keyboard accessible.
- Provide meaningful labels for controls.
- Do not rely solely on color to communicate information.
- Ensure animations do not prevent users from understanding or interacting with the interface.

## 15. Responsive Design

- The portfolio must work across desktop, tablet, and mobile layouts.
- Do not assume a fixed viewport size.
- Avoid hardcoded dimensions that unnecessarily break responsive layouts.
- Test animations and visualizations at different viewport sizes.
- If a complex visualization cannot reasonably fit on mobile, provide an intentional mobile representation rather than allowing it to overflow.

## 16. Comments

- Write comments only when they explain **why**, not obvious **what**.
- Do not add comments that simply restate the code.
- Document complex animation logic and non-obvious technical decisions.
- Remove outdated comments when modifying code.

## 17. Before Finishing a Task

Before considering a task complete:

- Check TypeScript errors.
- Check lint errors if linting is configured.
- Run relevant tests.
- Verify that existing functionality still works.
- Check responsive behavior for UI changes.
- Check animation cleanup for GSAP changes.
- Remove temporary debugging code.
- Do not leave unused imports, variables, components, or dependencies.
- Do not claim a task is complete if there are known unresolved errors.

## 18. Agent Behavior

- Read the relevant project files before making architectural decisions.
- Follow existing project conventions.
- Do not replace technologies or frameworks without explicit approval.
- Do not modify unrelated files.
- Explain significant architectural changes before making them.
- When multiple approaches are possible, prefer the simplest approach consistent with the project's architecture.
- If a requirement is ambiguous and the decision could significantly affect architecture, ask before implementing it.
- Never delete working functionality merely to simplify implementation.
