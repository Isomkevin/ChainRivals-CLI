# Contributing to ChainRivals CLI 🤝

> **Join us in securing the future of Web3**

Thank you for your interest in contributing to ChainRivals CLI! This document provides guidelines and information for contributors.

## 📋 **Table of Contents**

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Setup](#development-setup)
4. [Contribution Workflow](#contribution-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation](#documentation)
8. [Community](#community)

## 📜 **Code of Conduct**

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Using welcoming and inclusive language
- Being respectful of differing opinions and viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [code-conduct@chainrivals.xyz](mailto:code-conduct@chainrivals.xyz).

## 🎯 **How Can I Contribute?**

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Run command '...'
2. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Node.js Version: [e.g. 16.0.0]
 - ChainRivals CLI Version: [e.g. 1.0.0]
 - dfx Version: [e.g. 0.15.0] (if applicable)

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

If you have a suggestion for a new feature or enhancement, please use the enhancement issue template:

**Enhancement Template:**

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### Contributing Code

We welcome code contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests**
5. **Update documentation**
6. **Submit a pull request**

## 🛠️ **Development Setup**

### Prerequisites

- **Node.js** (v16 or higher)
- **Git** (for version control)
- **dfx** (for ICP development)
- **Code Editor** (VS Code recommended)

### Quick Start

```bash
# Install globally (recommended)
npm install -g chainrivals-cli

# Or for development:
git clone https://github.com/LESOM-Dynamics/ChainRivals-CLI
cd chainrivals-cli
npm install
npm link

# Run tests to verify setup
npm test
```

### Environment Configuration

Create a `.env` file for development:

```env
# AI Integration
OPENAI_ENDPOINT=https://your-openai-endpoint.com
OPENAI_KEY=your-openai-api-key

# Development
NODE_ENV=development
DEBUG=chainrivals:*

# ICP Configuration
DFX_NETWORK=local
```

## 🔄 **Contribution Workflow**

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/LESOM-Dynamics/ChainRivals-CLI
cd chainrivals-cli

# Add the original repository as upstream
git remote add upstream https://github.com/LESOM-Dynamics/ChainRivals-CLI
```

### 2. Create Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. Make Changes

- Write your code following our coding standards
- Add comprehensive tests
- Update documentation
- Ensure all tests pass

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Good commit messages
git commit -m "feat: add new vulnerability detection pattern"
git commit -m "fix: resolve CLI encoding issue"
git commit -m "docs: update API documentation"
git commit -m "test: add integration tests for ICP canister"
git commit -m "refactor: improve error handling in scan module"

# Bad commit messages
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"
```

### 5. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

### 6. Pull Request Process

1. **Fill out the PR template**
2. **Ensure all checks pass**
3. **Request review from maintainers**
4. **Address feedback and make changes**
5. **Maintainers will merge when ready**

## 📝 **Coding Standards**

### JavaScript/Node.js

- **ESLint**: Follow Airbnb style guide
- **Prettier**: Automatic code formatting
- **JSDoc**: Document all public functions
- **TypeScript**: Type definitions for complex modules

### Motoko

- **Style Guide**: Follow [Official Motoko Style Guide](https://internetcomputer.org/docs/current/developer-docs/setup/motoko_style_guide)
- **Documentation**: Comprehensive comments
- **Error Handling**: Proper error management
- **Testing**: Unit tests for all functions

### Git Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(analyzers): add new vulnerability detection pattern
fix(cli): resolve encoding issue in Windows
docs(api): update method documentation
test(icp): add integration tests for canister
```

## 🧪 **Testing Guidelines**

### Test Structure

```
tests/
├── unit/                         # Unit tests
│   ├── analyzers/               # Analyzer tests
│   ├── cli/                     # CLI tests
│   └── utils/                   # Utility tests
├── integration/                  # Integration tests
│   ├── icp/                     # ICP integration tests
│   └── end-to-end/              # End-to-end tests
└── fixtures/                     # Test data
```

### Writing Tests

#### Unit Tests

```javascript
const { analyze } = require('../../analyzers/icp');

describe('ICP Analyzer', () => {
  test('should detect public methods without guards', () => {
    const code = 'public func transfer() {}';
    const results = analyze(code);
    
    expect(results).toHaveLength(1);
    expect(results[0].severity).toBe('HIGH');
    expect(results[0].message).toContain('Public method without guard');
  });

  test('should handle empty code', () => {
    const results = analyze('');
    expect(results).toHaveLength(0);
  });
});
```

#### Integration Tests

```javascript
const { ICPManager } = require('../../cli/ic');

describe('ICP Integration', () => {
  let icpManager;

  beforeEach(() => {
    icpManager = new ICPManager();
  });

  afterEach(async () => {
    // Cleanup
  });

  test('should initialize dfx setup', async () => {
    await expect(icpManager.init()).resolves.not.toThrow();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/analyzers/icp.test.js
```

### Manual CLI Testing

```bash
# Example: scan a contract
chainrivals scan --target examples/test-contract.mo --chain icp

# Example: deploy ICP canister
chainrivals ic:init
chainrivals ic:deploy

# Example: call canister method
chainrivals ic:call analyze_code "public func test() {}"
```

### Test Coverage

We aim for at least 80% test coverage. Run coverage reports:

```bash
npm run test:coverage
```

## 📚 **Documentation**

### Code Documentation

- **JSDoc**: Document all public functions and classes
- **Inline Comments**: Explain complex logic
- **README Updates**: Update relevant documentation

### Example JSDoc

```javascript
/**
 * Analyzes Motoko code for security vulnerabilities
 * @param {string} content - The Motoko code to analyze
 * @returns {Array<Object>} Array of vulnerability objects
 * @example
 * const results = analyze('public func transfer() {}');
 * console.log(results[0].severity); // 'HIGH'
 */
function analyze(content) {
  // Implementation
}
```

### Documentation Updates

When adding new features, update:

1. **README.md** - User-facing documentation
2. **TECHNICAL_DOCUMENTATION.md** - Technical details
3. **API Documentation** - Function signatures and examples
4. **Examples** - Usage examples

## 🌟 **Community**

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and ideas
- **Discord**: Real-time chat and community
- **Email**: conduct@chainrivals.xyz

### Recognition

Contributors are recognized in:

- **Contributors Page**: [GitHub Contributors](https://github.com/LESOM-Dynamics/ChainRivals-CLI/graphs/contributors)
- **Release Notes**: Mentioned in release announcements
- **Documentation**: Listed in contributor acknowledgments
- **Hall of Fame**: Special recognition for significant contributions

### Getting Help

If you need help with your contribution:

1. **Check existing issues** for similar problems
2. **Search documentation** for relevant information
3. **Ask in Discussions** for community help
4. **Join Discord** for real-time assistance
5. **Email maintainers** for direct support

## 🎉 **Thank You**

Thank you for contributing to ChainRivals CLI! Your contributions help make Web3 more secure for everyone.

### Special Thanks

We especially appreciate contributions in these areas:

- **Security Research**: New vulnerability detection patterns
- **Performance Optimization**: Faster analysis and better resource usage
- **Documentation**: Clearer guides and examples
- **Testing**: Comprehensive test coverage
- **Community**: Helping other contributors

---

**Together, we're securing the future of Web3! 🛡️**

*Made with ❤️ by the ChainRivals Community* 