# Eterna Design - Atomic Design Structure

This document outlines the Atomic Design methodology implemented in the Eterna Design project. This approach provides a systematic way to build component libraries and user interfaces, making the codebase more maintainable and scalable.

## Overview

Atomic Design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner. The five stages are:

1. **Atoms**
2. **Molecules**
3. **Organisms**
4. **Templates**
5. **Pages**

## Directory Structure

```
components/
├── atoms/          # Fundamental building blocks
├── molecules/      # Groups of atoms functioning together
├── organisms/      # Groups of molecules/atoms forming complex components
├── templates/      # Page-level objects that place components
└── pages/          # Specific instances of templates
```

## Component Categories

### Atoms

Atoms are the basic building blocks of matter. In our interfaces, atoms are our basic HTML elements like form inputs, buttons, labels, etc. They can also include more abstract elements like color palettes, fonts, and animations.

**Examples:**
- Button
- Input
- Checkbox
- Typography
- Icon

**Usage Guidelines:**
- Each atom should be placed in its own directory under `components/atoms/`
- Each atom should have its own test file
- Atoms should not depend on other components

### Molecules

Molecules are groups of atoms bonded together that take on new properties. In interfaces, molecules are relatively simple groups of UI elements functioning together.

**Examples:**
- Form input group (label + input + error message)
- Product Card (image + title + price + button)
- Navigation item (icon + text)

**Usage Guidelines:**
- Each molecule should be placed in its own directory under `components/molecules/`
- Molecules can import and use atoms
- Molecules should be focused on a single responsibility

### Organisms

Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

**Examples:**
- Product List
- Navigation bar
- Footer
- Comment section

**Usage Guidelines:**
- Each organism should be placed in its own directory under `components/organisms/`
- Organisms can import and use molecules and atoms
- Organisms may maintain their own local state

### Templates

Templates consist mostly of groups of organisms stitched together to form pages. Templates are page-level objects that place components within a layout.

**Examples:**
- Product page template
- Home page template
- Blog post template

**Usage Guidelines:**
- Each template should be placed in its own directory under `components/templates/`
- Templates define the content structure, not the content itself
- Templates should be highly reusable across different pages

### Pages

Pages are specific instances of templates. They represent a real user interface with real content in place.

**Examples:**
- Home page
- Product detail page
- About us page

**Implementation:**
- In our Next.js app, pages are defined in the `app/` directory
- Pages import templates and provide them with real content/data

## Best Practices

1. **Component Encapsulation:**
   - Each component should have its own directory
   - Include an index.ts file for proper exports
   - Include a test file for each component

2. **Testing:**
   - Follow TDD (Test-Driven Development) principles
   - Write tests before implementing components
   - Ensure all components have adequate test coverage

3. **Reusability:**
   - Design components to be reusable whenever possible
   - Use props to customize component behavior
   - Avoid hardcoding values that should be configurable

4. **Documentation:**
   - Document component props and behavior
   - Keep this guide updated as the design system evolves

5. **State Management:**
   - Atoms and molecules should generally be stateless
   - Organisms may contain local state when necessary
   - Templates and pages may use global state or data fetching

## Example Flow

1. Create atomic components (atoms & molecules)
2. Combine them into organisms
3. Create templates using organisms
4. Implement pages using templates and real content

## Development Process

1. Start with identifying the atoms needed for a new feature
2. Build up to molecules, then organisms
3. Create or update templates as needed
4. Implement specific pages

By following this structure, we maintain a consistent, modular, and scalable codebase that aligns with best practices in modern front-end development.