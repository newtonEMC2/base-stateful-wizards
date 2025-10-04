# Base Stateful Accordion

[![npm version](https://badge.fury.io/js/%40qcolabs%2Fbase-stateful-wizards.svg)](https://badge.fury.io/js/%40qcolabs%2Fbase-stateful-wizards)
[![npm downloads](https://img.shields.io/npm/dm/%40qcolabs%2Fbase-stateful-wizards.svg)](https://www.npmjs.com/package/%40qcolabs%2Fbase-stateful-wizards)
[![CI](https://github.com/newtonEMC2/base-stateful-wizards/actions/workflows/ci.yml/badge.svg)](https://github.com/newtonEMC2/base-stateful-wizards/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, accessible, and customizable React modal component library with TypeScript support. Features click-outside-to-close, responsive design, and zero dependencies.

## 🚀 Live Demo

Try it out in CodeSandbox: **[Interactive Demo](https://codesandbox.io/p/github/newtonEMC2/base-stateful-wizards/main?import=true&workspaceId=ws_XP4ZJku14x3GBrsVK3Gt5s)**

## Installation

```bash
npm install @qcolabs/base-stateful-wizards
# or
yarn add @qcolabs/base-stateful-wizards
# or
pnpm add @qcolabs/base-stateful-wizards
```

## Usage

```tsx
import React, { useState } from 'react'
import { Accordion } from '@qcolabs/base-stateful-wizards'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content!</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  )
}

export default App
```

## API

### Modal Props

| Prop       | Type              | Required | Description                                      |
| ---------- | ----------------- | -------- | ------------------------------------------------ |
| `isOpen`   | `boolean`         | ✅       | Controls whether the modal is visible            |
| `onClose`  | `() => void`      | ✅       | Function called when the modal should be closed  |
| `children` | `React.ReactNode` | ✅       | The content to display inside the modal          |
| `title`    | `string`          | ❌       | Optional title displayed at the top of the modal |

## ✨ Features

- 🎯 **Simple API** - Easy to use with minimal setup
- 📦 **Lightweight** - Zero dependencies (except React)
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- 📱 **Responsive** - Works on all screen sizes
- ♿ **Accessible** - Click outside to close, keyboard navigation
- 🎨 **Customizable** - Easy to style and theme
- 🚀 **Modern** - Built with latest React patterns
- 📊 **Tree-shakable** - Bundlers automatically eliminate unused code
- 🔄 **SSR Compatible** - Works with Next.js and other SSR frameworks

### Tree-Shaking

This library is **fully tree-shakable**. Import only what you need:

```tsx
// ✅ Import only what you need
import { useWizardController } from '@qcolabs/base-stateful-wizards'

// ❌ Avoid importing everything
import * as Everything from '@qcolabs/base-stateful-wizards'
```

📖 **[Read the Tree-Shaking Guide](./docs/TREE-SHAKING.md)** for details.

## Development

### Building

```bash
pnpm build
```

### Development Mode

```bash
pnpm dev
```

This will run tsup in watch mode, rebuilding when files change.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Start for Contributors

```bash
# Fork and clone the repo
git clone https://github.com/newtonEMC2/base-stateful-wizards.git

# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run quality checks
pnpm format:check && pnpm type-check && pnpm build
```

## 📝 Changelog

See [Releases](https://github.com/newtonEMC2/base-stateful-wizards/releases) for a detailed changelog.

## 🐛 Issues & Support

- 🐞 **Bug Reports**: [GitHub Issues](https://github.com/newtonEMC2/base-stateful-wizards/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/newtonEMC2/base-stateful-wizards/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/newtonEMC2/base-stateful-wizards/discussions)

## 📊 Bundle Size

| Format | Size (gzipped) |
| ------ | -------------- |
| ESM    | ~1.2 KB        |
| CJS    | ~1.3 KB        |

## 🌐 Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 📄 License

MIT © [Alexis Corbacho](https://github.com/alexis-corbacho)

---

<div align="center">
  <strong>⭐ Star this repo if you find it useful! ⭐</strong>
</div>
