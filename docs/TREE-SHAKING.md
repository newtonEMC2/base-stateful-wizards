# Tree-Shaking Guide

This library is **fully optimized for tree-shaking**. Your bundler automatically eliminates unused code, minimizing bundle size.

## Usage

### ✅ Import Only What You Need

```tsx
// Import specific exports - bundler eliminates unused code
import { useWizardController } from '@qcolabs/base-stateful-wizards'

// Or multiple exports
import {
  useWizardController,
  createWizardController,
  VerticalStatefulWizard,
} from '@qcolabs/base-stateful-wizards'
```

### ❌ Avoid Namespace Imports

```tsx
// This prevents tree-shaking
import * as Everything from '@qcolabs/base-stateful-wizards'
const wizard = Everything.useWizardController()
```

## How It Works

When you import specific exports:

```tsx
import { useWizardController } from '@qcolabs/base-stateful-wizards'
```

Your bundler:

1. Analyzes which exports you use
2. Marks unused exports as dead code
3. Eliminates unused code in production
4. Outputs only what you need

## Bundle Sizes

| What You Import               | Approximate Size (gzipped)  |
| ----------------------------- | --------------------------- |
| `useWizardController` only    | ~2-3 KB                     |
| `createWizardController` only | ~1-2 KB                     |
| `VerticalStatefulWizard` only | ~4-6 KB                     |
| All exports (used)            | ~15-20 KB                   |
| Namespace import (`import *`) | ~15-20 KB (no tree-shaking) |

**Savings: 70-85% when importing specific exports**

## Best Practices

**✅ DO:**

```tsx
// Use ES imports
import { useWizardController } from '@qcolabs/base-stateful-wizards'
```

**❌ DON'T:**

```tsx
// CommonJS (can't tree-shake)
const { useWizardController } = require('@qcolabs/base-stateful-wizards')

// Namespace import (prevents tree-shaking)
import * as Lib from '@qcolabs/base-stateful-wizards'
```

## Technical Details

For implementation details, see [Tree-Shaking Technical Documentation](./TREE-SHAKING-TECHNICAL.md)

---

**Questions?** Open an issue on [GitHub](https://github.com/newtonEMC2/base-stateful-wizards/issues)
