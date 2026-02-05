# Motori

A modern monorepo platform built with NestJS and React.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development servers
npm run api:ignite  # API server on port 4000
npm run web:ignite  # Web dashboard on port 3000
```

## 📚 Documentation

For complete setup instructions and architecture details, see [MONOREPO_SETUP.md](./MONOREPO_SETUP.md).

## 🔧 Available Commands

- `npm run lint:inspect` - Check code quality
- `npm run lint:repair` - Fix linting issues
- `npm run style:inspect` - Check code formatting
- `npm run style:repair` - Auto-format all files
- `npm run typecheck:all` - Type check all workspaces

## 📦 Structure

- `apps/api` - NestJS backend API
- `apps/web` - React web dashboard
- `packages/shared-types` - Shared TypeScript types
- `docs/` - Project documentation
