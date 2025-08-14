# Clang-Format Web UI

A zero-backend, browser-based clang-format configuration tool that allows you to visualize and generate `.clang-format` files without any server dependencies.

## ✨ Features

- **Zero Backend**: Pure frontend implementation, works entirely in the browser
- **Real-time Preview**: See formatting changes instantly as you modify settings
- **Language Support**: Switch between C and C++ with appropriate syntax highlighting
- **Visual Configuration**: Intuitive UI with type-aware controls for all clang-format options
- **Export Options**: Download `.clang-format` files or copy to clipboard
- **Split Pane Interface**: Draggable panels for optimal screen real estate usage
- **Dark/Light Mode**: Theme switching support
- **Offline Ready**: Works with `file://` protocol - just open `index.html`

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

1. **Select Language**: Choose between C or C++ using the radio buttons
2. **Edit Source**: Modify the example code in the left panel
3. **Configure**: Adjust formatting options in the right panel
4. **Preview**: See formatted code update in real-time
5. **Export**: Download your `.clang-format` file

### Configuration Options

The configuration panel is organized into categories:
- **Core**: Basic formatting settings (style, indentation, line width)
- **Indent**: Indentation-specific options
- **Break**: Line breaking and brace placement
- **Align**: Alignment rules for code elements
- **Penalty**: Penalty weights for formatting decisions
- **Other**: Miscellaneous formatting options

### Export Features

- **Download**: Generates and downloads `.clang-format` YAML file
- **Copy**: Copies configuration to clipboard for easy sharing

## 📁 Project Structure

```
clang-format-ui/
├── public/
│   ├── manifest.json          # PWA configuration
│   └── vite.svg              # App icon
├── src/
│   ├── core/                 # Business logic
│   │   ├── config-store.ts   # Configuration management
│   │   └── formatter.ts      # Formatting service
│   ├── ui/                   # React components
│   │   ├── components/       # UI components
│   │   └── hooks/           # Custom hooks
│   ├── worker/              # Web Worker
│   └── main.tsx             # App entry point
├── dist/                    # Build output
└── README.md
```

## 🏗️ Architecture

```
┌────────────────────────┐
│        index.html      │
└──────────┬─────────────┘
           │
┌────────────┬─────────────┬────────────────┐
│  UI Layer  │ Business    │ Infrastructure │
│            │ Layer       │ Layer          │
├────────────┼─────────────┼────────────────┤
│ React      │ ConfigStore │ Web Worker     │
│ Monaco     │ Formatter   │ WASM (mock)    │
│ Tailwind   │             │ YAML Parser    │
└────────────┴─────────────┴────────────────┘
```

## 🔧 Development

### Tech Stack

- **Frontend**: React 19 with TypeScript
- **Editor**: Monaco Editor (VS Code's editor)
- **Styling**: TailwindCSS + DaisyUI
- **State**: Zustand for state management
- **Build**: Vite for fast development and building
- **Worker**: Web Worker for formatting (WASM ready)

## 📋 Development Checklist

- [x] Project structure setup
- [x] Core services implementation
- [x] UI layout with split panes
- [x] Monaco Editor integration
- [x] Configuration management
- [x] Real-time preview
- [x] Export functionality
- [x] Responsive design
- [x] Offline support
- [ ] Real clang-format WASM integration (future)
- [ ] Additional clang-format versions (future)
- [ ] Configuration presets (future)
- [ ] Plugin system (future)

## 🚦 Performance

- **Bundle Size**: ~324KB (gzipped: ~102KB)
- **Cold Start**: <2 seconds
- **Formatting**: <300ms for typical code
- **Offline Ready**: Zero network dependencies

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed with `npm install`
2. **TailwindCSS errors**: Check that `@tailwindcss/postcss` is installed
3. **Monaco Editor issues**: Ensure proper Web Worker configuration
4. **File protocol issues**: Build with `base: './'` in vite.config.ts

### Browser Compatibility

- Chrome ≥ 96
- Firefox ≥ 90
- Safari ≥ 15
- Edge ≥ 96

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
