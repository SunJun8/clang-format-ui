以下是一份可直接交付给前端开发团队的「纯前端 clang-format Web UI」完整需求文档，包含功能、非功能、架构、接口、可扩展、交付及验收等全部要素，可作为 PRD + 技术方案 + 测试用例的统一蓝本。

————————————————————
一、项目定位
————————————————————
产品名称：Clang-Format Web UI（CFWUI）
一句话描述：纯前端、零后端、浏览器内即可运行、可实时预览并导出 .clang-format 的可视化配置器。

————————————————————
二、目标用户
————————————————————
1. C/C++ 开发者
2. 需要快速生成并比对不同 clang-format 配置的 CI/CD 维护者
3. 不方便安装本地 clang-format 的环境（教学、面试、临时演示）

————————————————————
三、功能需求（FR）
————————————————————
FR-1 语言选择
• 顶部单选：C / C++（默认 C++）

FR-2 示例代码区
• 左侧 Monaco Editor（或 CodeMirror6）展示示例代码。
• 支持语法高亮、行号、只读/可编辑切换、重置默认示例。
• 默认示例：
  – C：K&R hello world + 故意乱格式
  – C++：Google Abseil style 片段 + 故意乱格式

FR-3 配置区
• 右侧可折叠面板分组（Core、Indent、Break、Align、Penalty、Language、Other…）
• 每项配置包含：
  – 名称（可点击跳转官方文档）
  – 类型感知控件：
    • bool → checkbox
    • int → number input + range slider
    • enum → select / radio
    • list<string> → tag 输入框
  – 实时校验（合法值范围、枚举值）
  – 重置按钮（恢复默认值）
• 全局“恢复出厂设置”按钮

FR-4 实时预览区
• 下方第二块 Monaco Editor，只读，显示格式化后结果。
• 延迟 300 ms debounce；若配置非法则提示错误。
• 预览区右上角显示：
  – 格式化耗时（ms）
  – 与源码 diff 行数

FR-5 导出与分享
• “下载 .clang-format”按钮：生成 YAML 文件并触发浏览器下载。
• “复制到剪贴板”按钮。
• 可选：生成 URL（将配置序列化到 query 或 hash），一键分享。

FR-6 版本管理（预留扩展）
• 下拉框切换 clang-format 版本（当前仅内置 18.1.0，后续可热插更多）。
• Config schema 与版本解耦：
  – 每个版本对应一份 JSON Schema，UI 动态加载。
  – 若新版新增/废弃字段，UI 自动隐藏或提示迁移脚本。

FR-7 离线运行
• 整个仓库 clone 后 `index.html` 双击即可打开，无需 http server。
• 所有资源（wasm、js、css）使用相对路径。

————————————————————
四、非功能需求（NFR）
————————————————————
NFR-1 性能
• 首包 < 700 KB gzip（不含 wasm）。
• 冷启动到可交互 < 1.5 s（M3 Mac/Chrome）。
• 格式化 2000 行代码 < 200 ms。

NFR-2 兼容性
• Chrome ≥ 96、Edge ≥ 96、Firefox ≥ 90、Safari ≥ 15。
• 支持移动端查看（不强制编辑）。

NFR-3 可维护性
• 代码分层（见架构）。
• 单测覆盖 > 60%（业务逻辑 + 配置校验）。
• 文档化：README、CHANGELOG、ARCHITECTURE。

NFR-4 安全
• 零后端，无网络请求即无 XSS/CSRF 面。
• 若使用 CDN 资源，提供 SRI hash；默认使用本地文件。

————————————————————
五、整体架构
————————————————————
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

分层说明
1. 基础设施层
   • `clang-format.wasm`：官方 wasm build（llvm-project releases）。
   • `schemas/v*.json`：每个版本一份配置 schema（自动生成脚本）。
   • `worker.ts`：独立 WebWorker，隔离 wasm 执行，防阻塞主线程。

2. 业务层（纯 TypeScript，零 UI）
   • `ConfigStore`：
     – 保存当前版本、所有键值、脏标志。
     – 支持 import/export YAML 字符串。
     – 支持 diff（与默认配置比对，高亮改动）。
   • `Formatter`：
     – 暴露 `format(code, configYaml): Promise<string>`。
     – 内部 postMessage 给 worker，返回格式化结果或错误。
   • `VersionMgr`：
     – 懒加载 wasm & schema。
     – 提供 `listVersions(): string[]`、`switchVersion(v)`。

3. 表示层（React + Vite）
   • 组件树：
     App
     ├─ HeaderBar（语言切换 | 版本切换 | 导出 | 分享）
     ├─ SplitPane（左右拖拽）
     │   ├─ SourcePane
     │   └─ ConfigPane（折叠面板）
     └─ PreviewPane
   • 状态管理：Zustand（轻量，支持持久化到 URL hash）。
   • 样式：TailwindCSS + DaisyUI，暗黑模式开关。

————————————————————
六、目录设计
————————————————————
clang-format-webui/
├── public/
│   ├── wasm/
│   │   ├── clang-format-18.1.0.wasm
│   │   └── clang-format-18.1.0.js   (glue)
│   └── schemas/
│       ├── v18.1.0.json
│       └── …
├── src/
│   ├── main.tsx               (入口)
│   ├── worker/
│   │   └── formatter.worker.ts
│   ├── core/
│   │   ├── config-store.ts
│   │   ├── formatter.ts
│   │   └── version-mgr.ts
│   ├── ui/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── styles/
│   └── tests/
├── tests-e2e/                 (Playwright)
└── README.md

————————————————————
七、接口约定
————————————————————
1. worker.ts
   onmessage({ id, code, yamlConfig })
   postMessage({ id, result?, error? })

2. ConfigStore API
   load(yaml: string): boolean
   set(key, value)
   toYaml(): string
   reset()
   diff(): DiffResult

3. 版本切换流程
   VersionMgr.switchVersion(v) → 下载 wasm & schema → 热替换 Formatter → 触发 ConfigStore reload schema → UI 重新渲染控件。

————————————————————
八、可扩展预留
————————————————————
EXT-1 新 clang-format 版本
• 仅放置新 wasm + schema → 自动识别。
• 若字段重命名，提供 migration.ts（可链式）。

EXT-2 自定义主题 / 本地化
• 语言包：i18n JSON，key=配置项名。
• 主题：CSS 变量即可。

EXT-3 插件系统（未来）
• 预留 `extensions/` 目录，动态 import；例如新增“Google Style”一键预设。

————————————————————
九、交付物清单
————————————————————
1. 完整源码（含构建脚本、测试、文档）。
2. `.github/workflows/ci.yml`：lint + typecheck + unit test + e2e。
3. 预编译 Release：GitHub Pages 托管，提供 zip 下载。
4. 使用手册：
   • 本地运行：`git clone …` → 双击 `index.html`。
   • 如何升级 wasm：脚本 `scripts/update-wasm.sh 19.1.0`。

————————————————————
十、验收标准
————————————————————
✅ AC-1：打开 index.html 无需服务器即可格式化。
✅ AC-2：修改任一配置，预览区 500 ms 内更新。
✅ AC-3：点击“下载 .clang-format”得到 YAML，与 `clang-format -dump-config` 结果一致。
✅ AC-4：切换语言 C → C++，示例代码与语法高亮同步更新。
✅ AC-5：Playwright e2e：录制 3 条场景（默认、修改、导出）。
✅ AC-6：Lighthouse 性能评分 PWA ≥ 90。