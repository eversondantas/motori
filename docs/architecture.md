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

- Frontend: React (TypeScript) web application
- Backend: Node.js REST API (TypeScript)
- Mobile: Android (Kotlin/Java)
- Infrastructure: Cloud-based (e.g., AWS) with containerized services, managed database, and IaC (e.g., Terraform)

## Architectural Decisions

### Monorepo

We use a monorepo structure to:
- Share code easily between applications
- Maintain consistency across projects
- Simplify dependency management
- Enable atomic changes across multiple packages
