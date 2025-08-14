# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Clang-Format Web UI (CFWUI)** - A sophisticated zero-backend, browser-based clang-format configuration tool that allows users to visualize and generate `.clang-format` files entirely in the browser. Built with React 19, TypeScript, and Vite, featuring real-time preview, WASM-powered formatting, and elegant UI design.

### Key Features
- **Real-time Formatting**: 300ms debounced formatting with performance metrics
- **WASM Integration**: Uses @wasm-fmt/clang-format for authentic formatting
- **Language Support**: C/C++ with syntax-aware examples and highlighting
- **Visual Configuration**: Categorized settings with type-aware controls
- **Export & Share**: Download .clang-format files or copy to clipboard
- **Offline Operation**: Works without internet connection after initial load
- **Responsive Design**: Mobile-friendly with dark/light/midnight themes

### Target Users
- C/C++ developers needing quick clang-format configuration
- CI/CD maintainers comparing different formatting configurations
- Educational environments without local clang-format installation

## Architecture

The application follows a sophisticated layered architecture with clear separation of concerns:

```
┌────────────────────────┐
│        index.html       │
└──────────┬─────────────┘
           │(ESM importmap)
┌────────────┬───────┴───────┬────────────────┐
│  表示层    │   业务层      │    基础设施层   │
├────────────┼───────────────┼────────────────┤
│  React     │  ConfigStore │  ClangFormat   │
│  Monaco    │  Formatter    │  (wasm)        │
│  UI 组件库 │  VersionMgr  │  JSON Schema   │
└────────────┴───────────────┴────────────────┘
```

### Layer Details

**UI Layer (表示层)**
- React 19 with TypeScript for type safety
- Monaco Editor for code editing with syntax highlighting
- TailwindCSS 4 + DaisyUI for elegant, responsive design
- Zustand for lightweight state management with persistence

**Business Layer (业务层)**
- **ConfigStore**: Centralized configuration management with YAML serialization
- **Formatter**: WASM-based formatting service with async operations
- **Version Management**: Extensible version switching system (planned)

**Infrastructure Layer (基础设施层)**
- **Web Worker**: Isolates WASM execution to prevent UI blocking
- **@wasm-fmt/clang-format**: Authentic clang-format WASM implementation
- **YAML Parser**: Configuration serialization and deserialization

### Directory Structure
- `src/core/` - Business logic (ConfigStore, Formatter)
- `src/ui/` - React components, hooks, and utilities
- `src/worker/` - Web Worker for WASM formatting operations
- `public/` - Static assets, WASM files, and JSON schemas
- `public/schemas/` - Clang-format configuration schemas by version

## Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev          # Start Vite dev server (http://localhost:5174)
npm run build        # Build for production (generates 2.4MB WASM)
npm run preview      # Preview production build (http://localhost:3000)
npm run lint         # Run ESLint

# Type checking
tsc --noEmit         # Check TypeScript types

# Testing (planned)
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright e2e tests
```

## Key Components

### Core Services
- **ConfigStore** (`src/core/config-store.ts`): Central state management with YAML serialization, real-time validation, and change tracking
- **Formatter** (`src/core/formatter.ts`): Web Worker-based formatting service with performance metrics and error handling

### UI Components
- **Header** (`src/ui/components/Header.tsx`): Language selection, theme switching, and export controls
- **SplitPane** (`src/ui/components/SplitPane.tsx`): Resizable layout management for editor panels
- **SourcePane** (`src/ui/components/SourcePane.tsx`): Monaco Editor with syntax highlighting and code examples
- **ConfigPane** (`src/ui/components/ConfigPane.tsx`): Categorized configuration settings with type-aware controls
- **PreviewPane** (`src/ui/components/PreviewPane.tsx`): Real-time formatted output with diff metrics and performance timing

### Utilities
- **Debounce** (`src/ui/utils/debounce.ts`): Performance optimization for real-time formatting
- **useAppStore** (`src/ui/hooks/useAppStore.ts`): Zustand state management with persistence

## Configuration

- **Build**: Vite with React plugin, configured for offline usage (`base: './'`)
- **Styling**: TailwindCSS 4 with DaisyUI components for sophisticated UI
- **State**: Zustand for React state management with persistence
- **Dependencies**: Monaco Editor, YAML parser, TypeScript, @wasm-fmt/clang-format

## Performance Requirements

- **Bundle Size**: < 700KB gzip (excluding WASM)
- **Startup Time**: < 1.5s to interactive (M3 Mac/Chrome)
- **Formatting Performance**: < 200ms for 2000 lines of code
- **Real-time Updates**: 300ms debounced formatting

## Browser Compatibility

- Chrome ≥ 96, Edge ≥ 96, Firefox ≥ 90, Safari ≥ 15
- Mobile-friendly viewing experience
- Progressive Web App (PWA) ready

## Development Notes

- The app works entirely offline - just open `dist/index.html` after build
- Web Worker handles formatting in background thread (non-blocking)
- Configuration changes trigger real-time preview updates with debouncing
- Default configuration based on Google style guide
- Export functionality generates `.clang-format` YAML files
- UI design emphasizes elegance, sophistication, and visual polish
- WASM integration provides authentic clang-format formatting
- Extensible architecture supports multiple clang-format versions