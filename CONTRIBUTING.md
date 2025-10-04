# Contributing to Base Stateful wizards

Thank you for your interest in contributing! 🎉

## Development Setup

### Prerequisites

- Node.js >= 16
- pnpm >= 8

### Getting Started

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/base-stateful-wizards.git
   cd base-stateful-wizards
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development mode**
   ```bash
   pnpm dev
   ```

## Development Workflow

### Scripts

- `pnpm dev` - Start development mode with watch
- `pnpm build` - Build for production
- `pnpm clean` - Clean the dist folder
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm size-check` - Check bundle size
- `pnpm validate` - Run all quality checks (format, type-check, test)
- `pnpm prepublishOnly` - Full validation and build before publishing

### Code Quality

This project uses:

- **TypeScript** for type safety
- **Prettier** for code formatting
- **pnpm** for package management

### Before Submitting a PR

1. **Run quality checks**

   ```bash
   pnpm validate
   pnpm build
   ```

2. **Follow the PR template**
   - Fill out all sections of the PR template
   - Link related issues
   - Add screenshots if UI changes are involved

3. **Write meaningful commit messages**

   We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

   **Format**: `<type>[optional scope]: <description>`

   **Types**:
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `perf`: A code change that improves performance
   - `test`: Adding missing tests or correcting existing tests
   - `chore`: Changes to the build process or auxiliary tools
   - `ci`: Changes to CI configuration files and scripts

   **Examples**:

   ```bash
   feat(wizards): add animation support for expand/collapse
   feat(wizards): add keyboard navigation support
   feat: add multiple wizards sections support

   fix(wizards): resolve focus management issue on tab navigation
   fix(wizards): prevent content overflow in small containers
   fix: resolve TypeScript type errors in wizards props

   docs(readme): update installation instructions
   docs(contributing): add conventional commit guidelines
   docs: add wizards usage examples

   style(wizards): improve CSS formatting and comments
   style: fix prettier formatting issues

   refactor(wizards): simplify state management logic
   refactor: extract common hooks into separate files

   perf(wizards): optimize re-renders on state changes
   perf: lazy load wizards content

   test(wizards): add unit tests for keyboard interactions
   test: increase test coverage for edge cases

   chore(deps): update development dependencies
   chore: add new build scripts

   ci: add automated testing workflow
   ci: update deployment pipeline
   ```

   **Breaking Changes**: Add `!` after the type/scope and include `BREAKING CHANGE:` in the footer:

   ```bash
   feat(wizards)!: change default behavior to single-expand mode

   BREAKING CHANGE: The wizards now defaults to single-expand mode.
   Use allowMultiple={true} to restore previous behavior.
   ```

## Project Structure

```
base-stateful-wizards/
├── src/                 # Source code
│   ├── index.tsx       # Main exports
│   ├── dev.tsx         # Development playground
│   └── lib/            # Component library
│       ├── wizards.component.tsx  # Main wizards component
│       └── __test__/   # Test files
├── public/             # Static files
│   └── index.html      # Development HTML
├── dist/               # Built files (auto-generated)
├── package.json        # Package configuration
├── rollup.config.js    # Build configuration
├── tsconfig.json       # TypeScript configuration
└── jest.config.js      # Test configuration
```

## Coding Guidelines

### Tree-Shaking

**This library is fully tree-shakable. Please maintain this capability:**

✅ **DO:**

- Use **named exports only** (never default exports)
- Keep modules free of side effects
- Import dependencies cleanly
- Test bundle size impact of changes

❌ **DON'T:**

- Add default exports
- Add top-level code execution
- Create circular dependencies
- Add unnecessary dependencies

📖 **See:** [Tree-Shaking Technical Guide](docs/TREE-SHAKING-TECHNICAL.md)

### TypeScript

- Use strict TypeScript settings
- Export interfaces for public APIs
- Add JSDoc comments for public methods
- Prefer `interface` over `type` for object shapes

### React

- Use functional components with hooks
- Follow React best practices
- Ensure components are accessible
- Add proper prop validation

### Styling

- Use inline styles for simplicity (current approach)
- Consider CSS-in-JS solutions for complex styling
- Ensure responsive design
- Follow accessibility guidelines

## Testing

### Writing Tests

- Write tests for all new features
- Include edge cases
- Test accessibility features
- Use descriptive test names

### Test Structure

```typescript
describe('wizards', () => {
  it('should render with collapsed state by default', () => {
    // Test implementation
  })

  it('should expand section when header is clicked', () => {
    // Test implementation
  })

  it('should handle multiple sections correctly', () => {
    // Test implementation
  })
})
```

## Documentation

- Update README.md for new features
- Add JSDoc comments to public APIs
- Include code examples
- Update CHANGELOG.md

## Release Process

Releases are automated through GitHub Actions:

1. **Create a release** on GitHub
2. **Tag format**: `v1.0.0` (semantic versioning)
3. **CI/CD pipeline** automatically:
   - Runs quality checks
   - Builds the package
   - Publishes to npm

## Getting Help

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub discussions for questions
- **Documentation**: Check the README and code comments

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

Thank you for contributing! 🚀
