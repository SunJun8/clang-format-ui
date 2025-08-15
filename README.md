# Clang-Format 可视化工坊 (Clang Forge)

<div align="center">

**一个基于 Web 的零后端 clang-format 配置可视化工具**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-0.50.x-purple.svg)](https://microsoft.github.io/monaco-editor/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## ✨ 主要特性

- 🎯 **零后端依赖**：纯前端实现，完全在浏览器中运行
- ⚡ **实时格式化**：300ms 防抖的即时格式化预览
- 🌐 **WASM 驱动**：使用 `@wasm-fmt/clang-format` 提供真实的 clang-format 格式化
- 🎨 **精美界面**：深色宇宙背景配合极客蓝和霓虹红的沉浸式设计
- 📱 **响应式布局**：支持桌面和移动设备
- 🌓 **主题切换**：深色、浅色和系统主题支持
- 💾 **离线可用**：支持 `file://` 协议，无需网络连接
- 🔄 **滚动同步**：源代码和格式化结果的滚动位置同步
- 🎛️ **可视化配置**：分类的 clang-format 配置选项，类型感知的控件
- 📤 **导出分享**：下载 `.clang-format` 文件或复制到剪贴板

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 生产环境使用

1. **克隆仓库**
   ```bash
   git clone [repository-url]
   cd clang-format-ui
   ```

2. **构建项目**
   ```bash
   npm install
   npm run build
   ```

3. **离线使用**
   - 直接在浏览器中打开 `dist/index.html`
   - 无需 Web 服务器！

## 🎯 使用指南

### 基本工作流程

1. **选择语言**：使用单选按钮在 C 和 C++ 之间切换
2. **编辑源代码**：在左侧面板修改示例代码
3. **调整配置**：在右侧面板配置格式化选项
4. **实时预览**：查看格式化结果的实时更新
5. **导出配置**：下载生成的 `.clang-format` 文件

### 配置选项分类

配置面板按功能组织：

- **基础设置**：样式、缩进、列宽等基本格式设置
- **缩进设置**：缩进相关的选项配置
- **换行设置**：换行和大括号位置规则
- **对齐设置**：代码元素的对齐规则
- **惩罚设置**：格式化决策的惩罚权重
- **其他设置**：杂项格式化选项

### 界面布局

- **三栏布局**：源代码、格式化结果、配置面板
- **可拖动分割线**：支持调整各区域大小
- **滚动同步**：源代码和格式化结果的滚动位置自动同步

## 🏗️ 技术架构

### 核心技术栈

- **前端框架**：React 19 + TypeScript
- **代码编辑器**：Monaco Editor (VS Code 同款编辑器)
- **样式系统**：TailwindCSS + DaisyUI
- **状态管理**：Zustand
- **构建工具**：Vite
- **格式化引擎**：@wasm-fmt/clang-format (WASM)
- **数据处理**：YAML 解析和生成

### 架构设计

```
┌────────────────────────┐
│       index.html      │
└──────────┬─────────────┘
           │
┌────────────┬─────────────┬────────────────┐
│  UI 层     │  业务逻辑层  │  基础设施层     │
├────────────┼─────────────┼────────────────┤
│ React      │ ConfigStore │ Web Worker     │
│ Monaco     │ Formatter   │ WASM 格式化    │
│ Tailwind   │             │ YAML 解析      │
└────────────┴─────────────┴────────────────┘
```

### 项目结构

```
clang-format-ui/
├── public/
│   └── manifest.json          # PWA 配置
├── src/
│   ├── core/                 # 业务逻辑
│   │   ├── config-store.ts   # 配置状态管理
│   │   └── formatter.ts      # 格式化服务
│   ├── ui/                   # React 组件
│   │   ├── components/       # UI 组件
│   │   ├── examples.ts       # 示例代码
│   │   └── hooks/           # 自定义 Hook
│   ├── worker/              # Web Worker
│   └── main.tsx             # 应用入口
├── dist/                    # 构建输出
└── README.md
```

## 📦 详细功能

### 编辑器功能

- **语法高亮**：支持 C/C++ 语法高亮
- **实时格式化**：修改配置后自动格式化代码
- **滚动同步**：源代码和格式化结果滚动位置同步
- **可调布局**：支持拖动调整面板大小

### 配置管理

- **完整配置**：支持所有 clang-format 配置选项
- **分类组织**：按功能分类的配置界面
- **实时预览**：配置修改后立即看到效果
- **持久化存储**：配置自动保存到本地存储

### 导出功能

- **文件下载**：生成并下载 `.clang-format` YAML 文件
- **剪贴板复制**：一键复制配置到剪贴板
- **格式验证**：确保生成的配置文件格式正确

## 🔧 开发信息

### 环境要求

- Node.js >= 18
- npm >= 9

### 开发命令

```bash
# 开发模式
npm run dev          # 启动开发服务器

# 构建命令
npm run build        # 构建生产版本
npm run preview      # 预览生产构建

# 代码检查
npm run lint         # 运行 ESLint
npm run type-check   # 运行 TypeScript 检查
```

### 性能优化

- **代码分割**：使用 Rollup 进行代码分割
- **懒加载**：WASM 模块按需加载
- **缓存策略**：合理的资源缓存配置
- **构建优化**：Vite 的快速构建和热重载

## 🌐 浏览器兼容性

- Chrome ≥ 96
- Firefox ≥ 90
- Safari ≥ 15
- Edge ≥ 96

## 🐛 故障排除

### 常见问题

1. **构建失败**：确保所有依赖已安装 `npm install`
2. **WASM 加载问题**：检查浏览器是否支持 WASM
3. **文件协议问题**：确保使用正确的构建配置
4. **Monaco Editor 问题**：检查 Web Worker 配置

### 性能优化建议

- 启用浏览器缓存
- 使用现代浏览器
- 确保足够的内存可用

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [clang-format](https://clang.llvm.org/docs/ClangFormat.html) - LLVM 的代码格式化工具
- [@wasm-fmt/clang-format](https://github.com/jcbhmr/wasm-fmt) - WASM 版本的 clang-format
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - 微软的代码编辑器
- [React](https://react.dev/) - Facebook 的用户界面库

---

<div align="center">

**Made with ❤️ by Clang Forge Team**

</div>