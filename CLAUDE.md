# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A zero-backend, browser-based clang-format configuration tool that allows users to visualize and generate `.clang-format` files entirely in the browser. Built with React 19, TypeScript, and Vite.

## Architecture

The application follows a layered architecture:

- **UI Layer**: React components with Monaco Editor for code editing
- **Business Layer**: ConfigStore for state management, Formatter service for code formatting
- **Infrastructure Layer**: Web Worker for formatting operations, YAML parser for config serialization

Key directories:
- `src/core/` - Business logic (ConfigStore, Formatter)
- `src/ui/` - React components and hooks
- `src/worker/` - Web Worker for formatting operations
- `public/` - Static assets and WASM files

## Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
tsc --noEmit         # Check TypeScript types
```

## Key Components

- **ConfigStore** (`src/core/config-store.ts`): Central state management for clang-format configuration with YAML serialization
- **Formatter** (`src/core/formatter.ts`): Web Worker-based formatting service with async operations
- **ConfigPane** (`src/ui/components/ConfigPane.tsx`): Configuration panel with categorized settings
- **Monaco Editor**: Integrated for code editing with syntax highlighting for C/C++

## Configuration

- **Build**: Vite with React plugin, configured for offline usage (`base: './'`)
- **Styling**: TailwindCSS 4 with DaisyUI components
- **State**: Zustand for React state management
- **Dependencies**: Monaco Editor, YAML parser, TypeScript

## Development Notes

- The app works entirely offline - just open `dist/index.html` after build
- Web Worker handles formatting in background thread
- Configuration changes trigger real-time preview updates
- Default configuration based on Google style guide
- Export functionality generates `.clang-format` YAML files