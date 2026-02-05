# Motori Monorepo

A high-performance monorepo for the Motori project featuring a NestJS backend API and React web dashboard.

## 🏗️ Architecture

```
motori/
├── apps/
│   ├── api/              # NestJS backend service (combustion API)
│   ├── web/              # React + Vite web dashboard (cockpit UI)
│   └── mobile-android/   # Android app (future)
├── packages/
│   ├── shared-types/     # TypeScript type definitions
│   ├── domain/           # Business logic (future)
│   └── utils/            # Utility functions (future)
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies
npm install

# Build shared types
npm run types:forge
```

### Development

```bash
# Start API server (port 4000)
npm run api:ignite

# Start web dashboard (port 3000)
npm run web:ignite
```

### Build

```bash
# Build API
npm run api:forge

# Build web app
npm run web:forge

# Build all
npm run types:forge && npm run api:forge && npm run web:forge
```

## 🔧 Development Commands

### Type Checking

```bash
# Check all workspaces
npm run typecheck:all
```

### Linting

```bash
# Check for linting issues
npm run lint:inspect

# Auto-fix linting issues
npm run lint:repair
```

### Formatting

```bash
# Check formatting
npm run style:inspect

# Auto-format all files
npm run style:repair
```

### Cleanup

```bash
# Remove all node_modules
npm run nuke:modules
```

## 📦 Workspaces

### @motori/api

NestJS-based API service with custom engine architecture:

- **Bootstrap**: Main entry point (`src/bootstrap.ts`)
- **Rotary Hub**: Core module orchestration
- **Powertrain Gateway**: REST API endpoints
- **Torque Calculator**: Business logic for power calculations

**Features:**
- Real-time torque and power calculations
- Vehicle status monitoring
- Health check endpoints
- CORS enabled for web dashboard

### @motori/web

React + Vite web dashboard:

- **Motori Cockpit**: Main dashboard component
- **Real-time metrics**: Engine configuration, power output, torque curves
- **Beautiful UI**: Gradient styling with hover effects
- **Responsive**: Mobile-friendly design

**Features:**
- Live vehicle status display
- Interactive torque curve visualization
- Connection status indicator
- One-click data refresh

### @motori/shared-types

Shared TypeScript type definitions:

- `TorqueMetrics`: Torque measurement data
- `PowerOutput`: Horsepower and kilowatt ratings
- `EngineConfiguration`: Engine specifications
- `VehicleStatus`: Complete vehicle state

## 🎨 Technology Stack

- **Runtime**: Node.js 24.x
- **Package Manager**: npm workspaces
- **Backend**: NestJS 10.x
- **Frontend**: React 18.x + Vite 5.x
- **Language**: TypeScript 5.x
- **Linting**: ESLint 8.x
- **Formatting**: Prettier 3.x

## 🔥 Custom Features

### Unique Motori Architecture

The codebase uses automotive-inspired naming:

- **Turbine/Combustion**: Core system components
- **Rotary Hub**: Module orchestration
- **Powertrain Gateway**: API routing layer
- **Torque Calculator**: Power computation engine
- **Cockpit**: User interface dashboard

### API Endpoints

- `GET /powertrain/status` - Get vehicle status
- `POST /powertrain/calculate` - Calculate power metrics
- `GET /powertrain/health` - Health check

### Custom Scripts

All npm scripts use motori-specific terminology:
- `ignite`: Start development server
- `forge`: Build for production
- `inspect`: Check code quality
- `repair`: Fix code issues

## 📝 Configuration Files

- `.eslintrc.js`: ESLint configuration with import ordering
- `.prettierrc.js`: Prettier formatting rules
- `tsconfig.json`: TypeScript configurations per workspace
- `nest-cli.json`: NestJS CLI configuration
- `vite.config.ts`: Vite build configuration

## 🤝 Contributing

1. Follow the established naming conventions
2. Run `npm run typecheck:all` before committing
3. Run `npm run lint:repair` to fix linting issues
4. Run `npm run style:repair` to format code

## 📄 License

See LICENSE file for details.

## 🎯 Future Roadmap

- [ ] Add unit tests
- [ ] Implement WebSocket for real-time updates
- [ ] Add authentication layer
- [ ] Integrate mobile-android app
- [ ] Expand shared domain logic
- [ ] Add CI/CD pipeline
