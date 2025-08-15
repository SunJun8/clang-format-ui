# Clang-Format Visualizer (Clang Forge)

<div align="center">

**A zero-backend, browser-based clang-format configuration visualization tool**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-0.50.x-purple.svg)](https://microsoft.github.io/monaco-editor/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## ✨ Key Features

- 🎯 **Zero Backend**: Pure frontend implementation, works entirely in the browser
- ⚡ **Real-time Formatting**: 300ms debounced instant formatting preview
- 🌐 **WASM Powered**: Uses `@wasm-fmt/clang-format` for authentic clang-format formatting
- 🎨 **Elegant Interface**: Dark cosmic background with geeky blue and neon red accents
- 📱 **Responsive Design**: Supports both desktop and mobile devices
- 🌓 **Theme Support**: Dark, Light, and System theme modes
- 💾 **Offline Ready**: Works with `file://` protocol - no internet connection required
- 🔄 **Scroll Sync**: Synchronized scrolling between source and formatted code
- 🎛️ **Visual Configuration**: Categorized clang-format options with type-aware controls
- 📤 **Export & Share**: Download `.clang-format` files or copy to clipboard

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Production Usage

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd clang-format-ui
   ```

2. **Build the project**
   ```bash
   npm install
   npm run build
   ```

3. **Use offline**
   - Simply open `dist/index.html` in your browser
   - No web server required!

## 🎯 Usage Guide

### Basic Workflow

1. **Select Language**: Choose between C and C++ using radio buttons
2. **Edit Source**: Modify example code in the left panel
3. **Configure**: Adjust formatting options in the right panel
4. **Preview**: See formatted code update in real-time
5. **Export**: Download your `.clang-format` file

### Configuration Categories

The configuration panel is organized into categories:

- **Basic Settings**: Style, indentation, column width and other basic formatting settings
- **Indentation**: Indentation-specific options
- **Line Breaking**: Line breaking and brace placement rules
- **Alignment**: Alignment rules for code elements
- **Penalty**: Penalty weights for formatting decisions
- **Other**: Miscellaneous formatting options

### Interface Layout

- **Three-Column Layout**: Source code, formatted result, and configuration panel
- **Draggable Splitters**: Support for adjusting panel sizes
- **Scroll Synchronization**: Automatic scrolling position sync between source and formatted code

## 🏗️ Technical Architecture

### Core Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Styling**: TailwindCSS + DaisyUI
- **State Management**: Zustand
- **Build Tool**: Vite
- **Formatting Engine**: @wasm-fmt/clang-format (WASM)
- **Data Processing**: YAML parsing and generation

### Architecture Design

```
┌────────────────────────┐
│       index.html      │
└──────────┬─────────────┘
           │
┌────────────┬─────────────┬────────────────┐
│   UI Layer │ Business    │ Infrastructure │
│            │ Layer       │ Layer          │
├────────────┼─────────────┼────────────────┤
│ React      │ ConfigStore │ Web Worker     │
│ Monaco     │ Formatter   │ WASM Format    │
│ Tailwind   │             │ YAML Parser    │
└────────────┴─────────────┴────────────────┘
```

### Project Structure

```
clang-format-ui/
├── public/
│   └── manifest.json          # PWA configuration
├── src/
│   ├── core/                 # Business logic
│   │   ├── config-store.ts   # Configuration management
│   │   └── formatter.ts      # Formatting service
│   ├── ui/                   # React components
│   │   ├── components/       # UI components
│   │   ├── examples.ts       # Example code
│   │   └── hooks/           # Custom hooks
│   ├── worker/              # Web Worker
│   └── main.tsx             # App entry point
├── dist/                    # Build output
└── README.md
```

## 📦 Detailed Features

### Editor Features

- **Syntax Highlighting**: C/C++ syntax highlighting support
- **Real-time Formatting**: Automatic code formatting after configuration changes
- **Scroll Sync**: Synchronized scrolling between source and formatted code
- **Adjustable Layout**: Draggable panel size adjustment

### Configuration Management

- **Complete Configuration**: Support for all clang-format configuration options
- **Categorized Organization**: Configuration interface organized by function
- **Real-time Preview**: Immediate visual feedback after configuration changes
- **Persistent Storage**: Configuration automatically saved to local storage

### Export Features

- **File Download**: Generate and download `.clang-format` YAML files
- **Clipboard Copy**: One-click configuration copy to clipboard
- **Format Validation**: Ensure generated configuration files are properly formatted

## 🔧 Development Information

### Environment Requirements

- Node.js >= 18
- npm >= 9

### Development Commands

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build production version
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

### Performance Optimization

- **Code Splitting**: Using Rollup for code splitting
- **Lazy Loading**: WASM modules loaded on demand
- **Caching Strategy**: Reasonable resource caching configuration
- **Build Optimization**: Vite's fast build and hot reload

## 🌐 Browser Compatibility

- Chrome ≥ 96
- Firefox ≥ 90
- Safari ≥ 15
- Edge ≥ 96

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed with `npm install`
2. **WASM loading issues**: Check if browser supports WASM
3. **File protocol issues**: Ensure correct build configuration
4. **Monaco Editor issues**: Check Web Worker configuration

### Performance Optimization Tips

- Enable browser caching
- Use modern browsers
- Ensure sufficient memory is available

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [clang-format](https://clang.llvm.org/docs/ClangFormat.html) - LLVM's code formatting tool
- [@wasm-fmt/clang-format](https://github.com/jcbhmr/wasm-fmt) - WASM version of clang-format
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Microsoft's code editor
- [React](https://react.dev/) - Facebook's user interface library

---

<div align="center">

**Made with ❤️ by Clang Forge Team**

</div>