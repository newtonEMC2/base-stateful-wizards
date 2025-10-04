# Tree-Shaking: Technical Documentation

This document explains the technical implementation of tree-shaking in this library for maintainers and contributors.

## How Our Tree-Shaking Works

### 1. Package.json Configuration

```json
{
  "type": "module", // Declares this is an ESM package
  "main": "dist/index.js", // CJS for legacy compatibility
  "module": "dist/index.mjs", // ESM for modern bundlers (KEY!)
  "sideEffects": ["**/*.css"], // Only CSS has side effects
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs", // ESM path
      "require": "./dist/index.js" // CJS fallback
    }
  }
}
```

**Key Points:**

- `module` field points to ESM build - bundlers prioritize this for tree-shaking
- `sideEffects: ["**/*.css"]` tells bundlers that JS files are side-effect free
- Single entry point as designed - bundlers can still tree-shake individual exports

### 2. Build Configuration (Rollup)

```javascript
// rollup.config.js
output: {
  file: 'dist/index.mjs',
  format: 'esm',                  // ES module format
  // No preserveModules needed for single entry point
}
```

**Why this works:**

- ESM format with named exports
- Bundlers can analyze the static import/export graph
- Dead code elimination happens at the bundler level

### 3. Export Structure

All exports are **named exports** (never default):

```typescript
// src/lib/index.tsx
export * from './common'
export * from './vertical-stateful-wizard'

// Compiles to dist/index.mjs:
export { useWizardController }
export { createWizardController }
export { VerticalStatefulWizard }
// etc.
```

**Why named exports?**

- Bundlers can statically analyze which exports are used
- Default exports require importing the entire module
- Named exports allow fine-grained elimination

## How Tree-Shaking Works

### Example: User Imports One Function

**User Code:**

```tsx
import { useWizardController } from '@qcolabs/base-stateful-wizards'
```

**Process:**

1. **Resolution**: Resolves to `dist/index.mjs` (from `module` field)
2. **Parsing**: Parses ESM and builds dependency graph
3. **Marking**: Marks `useWizardController` and dependencies as "used"
4. **Elimination**: Marks all other exports as "unused" (dead code)
5. **Output**: Final bundle contains only `useWizardController` + deps

### Visual Example

**Our dist/index.mjs (simplified):**

```javascript
// Export 1
export const useWizardController = () => {
  /* 2KB */
}

// Export 2
export const createWizardController = () => {
  /* 1KB */
}

// Export 3
export const VerticalStatefulWizard = () => {
  /* 5KB */
}
```

**User imports:**

```tsx
import { useWizardController } from '@qcolabs/base-stateful-wizards'
```

**Final bundle includes:**

- ✅ `useWizardController` (2KB)
- ❌ `createWizardController` (eliminated)
- ❌ `VerticalStatefulWizard` (eliminated)

## Common Pitfalls (What NOT to Do)

### ❌ Using Default Exports

```typescript
// BAD - prevents tree-shaking
export default {
  useWizardController,
  createWizardController,
}
```

When users import this, they get the entire object, preventing tree-shaking.

### ❌ Side Effects in Modules

```typescript
// BAD - this is a side effect
console.log('Module loaded!')

export const useWizardController = () => {
  /* ... */
}
```

Bundlers can't eliminate modules with side effects, even if exports aren't used.

### ❌ Circular Dependencies

```typescript
// file1.ts
import { b } from './file2'
export const a = () => b()

// file2.ts
import { a } from './file1'
export const b = () => a()
```

Circular dependencies make static analysis harder and reduce tree-shaking effectiveness.

## Best Practices for Maintaining Tree-Shakability

### ✅ Always Use Named Exports

```typescript
// Good
export const useWizardController = () => {
  /* ... */
}
export const createWizardController = () => {
  /* ... */
}
```

### ✅ Keep Side Effects in Separate Files

```typescript
// Good - side effects isolated
// src/styles.css (marked in sideEffects)

// src/lib/index.tsx (no side effects)
export { useWizardController } from './useWizardController'
```

### ✅ Avoid Top-Level Execution

```typescript
// Bad
const config = fetchConfig() // Side effect!

// Good
export const getConfig = () => fetchConfig()
```

### ✅ Keep Dependencies Minimal

More dependencies = harder to tree-shake. We maintain zero dependencies for this reason.

## Verification

### Check Build Output

```bash
# Verify named exports
tail -1 dist/index.mjs
# Should show: export { useWizardController, createWizardController, ... }

# Check bundle size
pnpm size-check
```

### Verify Configuration

```bash
# Check sideEffects declaration
grep sideEffects package.json
# Should show: "sideEffects": ["**/*.css"]
```

## Resources

- [Rollup Tree Shaking](https://rollupjs.org/guide/en/#tree-shaking)
- [Understanding sideEffects](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)

## Maintaining This Feature

When adding new exports:

1. ✅ Use named exports
2. ✅ Avoid side effects
3. ✅ Keep modules independent
4. ✅ Test bundle size impact
5. ✅ Update documentation

When refactoring:

1. ✅ Maintain ESM format
2. ✅ Keep named exports
3. ✅ Don't add dependencies
4. ✅ Verify build output

---

**Questions?** Contact the maintainers or open an issue.
