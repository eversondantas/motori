# Architecture

## System Overview

Motori is structured as a monorepo containing multiple applications and shared packages.

## Structure

### Apps

- **api**: Backend API application
- **web**: Web frontend application
- **mobile-android**: Android mobile application

### Packages

- **shared-types**: Common TypeScript types and interfaces
- **domain**: Business logic and domain models
- **utils**: Shared utility functions

## Technology Stack

- Frontend: [To be defined]
- Backend: [To be defined]
- Mobile: Android (Kotlin/Java)
- Infrastructure: [To be defined]

## Architectural Decisions

### Monorepo

We use a monorepo structure to:
- Share code easily between applications
- Maintain consistency across projects
- Simplify dependency management
- Enable atomic changes across multiple packages
