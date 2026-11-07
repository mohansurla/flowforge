# FlowForge

A multi-tenant SaaS project management and workflow automation API.

## Overview

FlowForge is a backend-focused SaaS platform designed to help teams manage organizations, projects, tasks, and automated workflows.

The project is being developed as a modular monolith using Node.js, TypeScript, Express, PostgreSQL, and Prisma ORM.

## Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Testing:** Vitest and Supertest

## Current Progress

- [x] Backend project initialization
- [x] Express application and server setup
- [x] Health-check endpoint
- [x] PostgreSQL database integration
- [x] Initial database schema for users, organizations, and memberships
- [x] Organization input validation
- [x] Transactional organization creation
- [x] Unit and database smoke tests

## Planned Modules

- Authentication and authorization
- Organization management
- Project management
- Task management
- Comments and activity tracking
- Workflow automation

## Repository Structure

```text
flowforge/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── tests/
│   └── package.json
├── README.md
└── .gitignore
```

## Development Status

FlowForge is under active development. Features and documentation will evolve as the project progresses.