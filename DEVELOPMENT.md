# Development Guide 🛠️

> **Contributing to ChainRivals CLI**

This guide provides everything you need to know to contribute to ChainRivals CLI, from setting up your development environment to submitting pull requests.

## 📋 **Table of Contents**

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Adding New Features](#adding-new-features)
7. [Submitting Changes](#submitting-changes)
8. [Release Process](#release-process)

## 🚀 **Getting Started**

### Prerequisites

- **Node.js** (v16 or higher)
- **Git** (for version control)
- **dfx** (for ICP development) - [Install Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
- **Code Editor** (VS Code recommended)

### Quick Setup

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

## 🏗️ **Project Structure**

```
ChainRivals-CLI/
├── cli/                          # CLI application layer
│   ├── index.js                  # Main CLI entry point
│   ├── scan.js                   # Scan command implementation
│   └── ic.js                     # ICP integration module
├── analyzers/                    # Static analysis engines
│   ├── icp.js                    # ICP/Motoko analyzer
│   ├── eth.js                    # Ethereum/Solidity analyzer
│   └── solana.js                 # Solana/Rust analyzer
├── ai-explainer/                 # AI explanation module
│   └── index.js                  # OpenAI integration
├── ic_backend/                   # ICP backend project
│   ├── dfx.json                  # dfx configuration
│   └── src/
│       └── ic_backend/
│           ├── main.mo           # Motoko canister code
│           └── ic_backend.did    # Candid interface
├── examples/                     # Example contracts
├── tests/                        # Test files
├── docs/                         # Documentation
├── scripts/                      # Build and deployment scripts
├── package.json                  # Node.js dependencies
└── README.md                     # Project documentation
```

## ⚙️ **Development Setup**

### Environment Configuration

1. **Create Environment File:**
```bash
cp .env.example .env
```

2. **Configure Environment Variables:**
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

### Development Scripts

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Build project
npm run build

# Start development server
npm run dev

# Run integration tests
npm run test:integration
```

## 📝 **Coding Standards**

### JavaScript/Node.js

- **ESLint Configuration**: Airbnb style guide
- **Prettier**: Code formatting
- **JSDoc**: Documentation comments
- **TypeScript**: Type definitions (optional)

### Motoko

- **Official Style Guide**: Follow [Motoko Style Guide](https://internetcomputer.org/docs/current/developer-docs/setup/motoko_style_guide)
- **Documentation**: Comprehensive comments
- **Error Handling**: Proper error management

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new vulnerability detection pattern
fix: resolve CLI encoding issue
docs: update API documentation
test: add integration tests for ICP canister
refactor: improve error handling in scan module
```

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (unless major version)
- [ ] Security considerations addressed
- [ ] Performance impact assessed

## 🧪 **Testing**

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

### Writing Tests

#### Unit Test Example

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
});
```

#### Integration Test Example

```javascript
const { ICPManager } = require('../../cli/ic');

describe('ICP Integration', () => {
  let icpManager;

  beforeEach(() => {
    icpManager = new ICPManager();
  });

  test('should initialize dfx setup', async () => {
    await expect(icpManager.init()).resolves.not.toThrow();
  });
});
```

## 🆕 **Adding New Features**

### 1. Adding a New Analyzer

#### Create Analyzer File

```javascript
// analyzers/newchain.js
function analyze(content) {
  const results = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Add your analysis logic here
    if (line.includes('vulnerable_pattern')) {
      results.push({
        severity: 'HIGH',
        message: 'Vulnerability description',
        location: `line ${index + 1}: ${line.trim()}`
      });
    }
  });
  
  return results;
}

module.exports = { analyze };
```

#### Register Analyzer

```javascript
// cli/scan.js
const newchainAnalyzer = require('../analyzers/newchain');

const analyzers = {
  icp: icpAnalyzer,
  eth: ethAnalyzer,
  solana: solanaAnalyzer,
  newchain: newchainAnalyzer, // Add new analyzer
};
```

#### Update CLI

```javascript
// cli/index.js
.requiredOption('--chain <chain>', 'Target blockchain: icp, eth, solana, newchain')
```

#### Add Tests

```javascript
// tests/unit/analyzers/newchain.test.js
const { analyze } = require('../../../analyzers/newchain');

describe('NewChain Analyzer', () => {
  test('should detect vulnerabilities', () => {
    const code = 'vulnerable_pattern';
    const results = analyze(code);
    expect(results).toHaveLength(1);
  });
});
```

### 2. Extending ICP Canister

#### Add Method to main.mo

```motoko
// ic_backend/src/ic_backend/main.mo
public shared query func new_analysis(text: Text) : async Text {
  // Add your analysis logic here
  return "Analysis result";
};
```

#### Update Candid Interface

```candid
// ic_backend/src/ic_backend/ic_backend.did
service : {
  "analyze_code": (text) -> (text) query;
  "new_analysis": (text) -> (text) query; // Add new method
  "get_info": () -> (text) query;
  "health": () -> (text) query;
};
```

#### Add CLI Support

```javascript
// cli/ic.js
async newAnalysis(code) {
  return await this.call('new_analysis', [`"${code}"`]);
}
```

### 3. Adding New CLI Commands

```javascript
// cli/index.js
program
  .command('new-command')
  .description('Description of new command')
  .option('--option <value>', 'Option description')
  .action(async (cmd) => {
    // Command implementation
  });
```

## 📤 **Submitting Changes**

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code following coding standards
- Add comprehensive tests
- Update documentation
- Update changelog if needed

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add new vulnerability detection pattern"
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

### 5. Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (unless major version)
```

## 🚀 **Release Process**

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update Version:**
```bash
npm version patch|minor|major
```

2. **Update Changelog:**
```bash
npm run changelog
```

3. **Build Project:**
```bash
npm run build
```

4. **Run Full Test Suite:**
```bash
npm run test:full
```

5. **Create Release:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Automated Release

We use GitHub Actions for automated releases:

```yaml
name: Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Create Release
        uses: actions/create-release@v1
```

## 🤝 **Community Guidelines**

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

### Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Discord**: Join our [Discord server](https://discord.gg/chainrivals) for real-time chat

### Recognition

Contributors are recognized in:
- [Contributors](https://github.com/LESOM-Dynamics/ChainRivals-CLI/graphs/contributors) page
- Release notes
- Project documentation

## 📚 **Additional Resources**

- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Complete API reference
- **[Architecture Guide](ARCHITECTURE.md)** - System design and patterns
- **[Security Guidelines](SECURITY.md)** - Security best practices
- **[Performance Guide](PERFORMANCE.md)** - Optimization strategies

---

**Thank you for contributing to ChainRivals CLI! 🎉**

*Together, we're securing the future of Web3.* 