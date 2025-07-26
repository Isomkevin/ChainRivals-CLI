# Project Structure

## Overview

ChainRivals CLI is organized as a modular, scalable architecture with clear separation of concerns. This document provides a detailed overview of the project structure and the purpose of each component.

## Directory Structure

```
ChainRivals-CLI/
├── 📁 cli/                          # CLI application layer
│   ├── 📄 index.js                  # Main CLI entry point (Commander.js)
│   ├── 📄 scan.js                   # Core scanning logic and output formatting
│   └── 📄 ic.js                     # ICP integration and canister management
├── 📁 analyzers/                    # Static analysis engines
│   ├── 📄 icp.js                    # ICP/Motoko vulnerability detection
│   ├── 📄 eth.js                    # Ethereum/Solidity analysis
│   └── 📄 solana.js                 # Solana/Rust program analysis
├── 📁 ai-explainer/                 # AI-powered explanations
│   └── 📄 index.js                  # OpenAI integration for vulnerability explanations
├── 📁 ic_backend/                   # ICP backend project (dfx)
│   ├── 📄 dfx.json                  # dfx configuration for local development
│   └── 📁 src/
│       └── 📁 ic_backend/
│           ├── 📄 main.mo           # Motoko canister implementation
│           └── 📄 ic_backend.did    # Candid interface definition
├── 📁 examples/                     # Example contracts for testing
│   ├── 📄 test-contract.mo          # Test contract with known vulnerabilities
│   ├── 📄 example.mo                # Comprehensive Motoko example
│   └── 📄 example.sol               # Solidity contract example
├── 📄 package.json                  # Node.js project configuration
├── 📄 package-lock.json             # Dependency lock file
├── 📄 README.md                     # Main project documentation
├── 📄 TECHNICAL_DOCUMENTATION.md    # Comprehensive technical guide
├── 📄 DEVELOPMENT.md                # Development and contribution guide
├── 📄 CONTRIBUTING.md               # Community contribution guidelines
├── 📄 SECURITY.md                   # Security policy and vulnerability reporting
├── 📄 CHANGELOG.md                  # Version history and changes
├── 📄 CODE_OF_CONDUCT.md            # Community behavior guidelines
├── 📄 LICENSE                       # MIT License
├── 📄 .gitignore                    # Git ignore patterns
├── 📄 test-scan.js                  # Scan functionality test script
├── 📄 test-ic.js                    # ICP integration test script
└── 📄 result.example.md             # Example analysis output
```

## Core Components

### 1. CLI Layer (`cli/`)

The CLI layer handles user interaction, command parsing, and orchestration of the analysis process.

#### `cli/index.js`
- **Purpose**: Main entry point using Commander.js
- **Key Features**:
  - Command parsing and validation
  - Option handling and help text
  - Integration with all analysis modules
- **Commands**:
  - `scan`: Contract vulnerability analysis
  - `submit-bounty`: Bug bounty submission
  - `ic:init`: Initialize ICP backend
  - `ic:deploy`: Deploy ICP canister
  - `ic:call`: Call canister methods

#### `cli/scan.js`
- **Purpose**: Core scanning logic with multiple analysis modes
- **Key Features**:
  - Static analysis integration
  - Canister analysis with fallback
  - Multiple output formats (CLI, JSON, Markdown)
  - AI explanation integration

#### `cli/ic.js`
- **Purpose**: ICP integration and canister management
- **Key Features**:
  - `ICPManager` class for dfx operations
  - Canister deployment and management
  - Method calling and result processing
  - Error handling and fallback mechanisms

### 2. Analysis Layer (`analyzers/`)

The analysis layer contains specialized vulnerability detection engines for different blockchain platforms.

#### `analyzers/icp.js`
- **Purpose**: Motoko contract vulnerability detection
- **Vulnerability Patterns**:
  - Public methods without access control (HIGH)
  - Missing post-upgrade hooks (MEDIUM)
  - Loops with dynamic termination (LOW)
  - Manual caller validation detection (INFO)

#### `analyzers/eth.js`
- **Purpose**: Ethereum/Solidity contract analysis
- **Vulnerability Patterns**:
  - Reentrancy vulnerabilities
  - Integer overflow/underflow
  - Access control issues
  - Gas optimization problems

#### `analyzers/solana.js`
- **Purpose**: Solana/Rust program analysis
- **Vulnerability Patterns**:
  - Account validation issues
  - Program-derived address vulnerabilities
  - Cross-program invocation risks
  - State management problems

### 3. AI Explainer (`ai-explainer/`)

The AI explainer provides context-aware vulnerability explanations using OpenAI.

#### `ai-explainer/index.js`
- **Purpose**: AI-powered vulnerability explanations
- **Features**:
  - Context-aware explanations
  - Severity-based explanations
  - Remediation suggestions
  - Integration with scan results

### 4. ICP Backend (`ic_backend/`)

The ICP backend provides on-chain security analysis capabilities.

#### `ic_backend/dfx.json`
- **Purpose**: dfx project configuration
- **Configuration**:
  - Canister definitions
  - Network settings
  - Build configurations
  - Development environment setup

#### `ic_backend/src/ic_backend/main.mo`
- **Purpose**: Motoko canister implementation
- **Key Methods**:
  - `analyze_code`: Security analysis endpoint
  - `get_info`: Canister information
  - `health`: Health check endpoint
- **Features**:
  - Pattern-based vulnerability detection
  - Timestamped analysis reports
  - Severity scoring
  - Recommendation generation

#### `ic_backend/src/ic_backend/ic_backend.did`
- **Purpose**: Candid interface definition
- **Interface**:
  - Method signatures
  - Parameter types
  - Return types
  - Query/update method specifications

### 5. Examples (`examples/`)

Example contracts for testing and demonstration purposes.

#### `examples/test-contract.mo`
- **Purpose**: Test contract with known vulnerabilities
- **Vulnerabilities**:
  - Public methods without guards
  - Missing post-upgrade hooks
  - Dynamic loop termination
  - Manual caller validation

#### `examples/example.mo`
- **Purpose**: Comprehensive Motoko example
- **Features**:
  - Various contract patterns
  - Security best practices
  - Common vulnerabilities
  - Educational content

#### `examples/example.sol`
- **Purpose**: Solidity contract example
- **Features**:
  - Basic smart contract structure
  - Common patterns
  - Vulnerability examples

## Configuration Files

### `package.json`
- **Purpose**: Node.js project configuration
- **Key Sections**:
  - Project metadata and description
  - Dependencies and devDependencies
  - Scripts for development and testing
  - Binary configuration for global installation
  - Repository and author information

### `.gitignore`
- **Purpose**: Git ignore patterns
- **Patterns**:
  - Node.js artifacts (node_modules, logs)
  - Environment files (.env)
  - Build outputs
  - IDE-specific files
  - OS-specific files

## Documentation Files

### `README.md`
- **Purpose**: Main project documentation
- **Content**:
  - Project overview and features
  - Quick start guide
  - Usage examples
  - Installation instructions
  - Architecture overview

### `TECHNICAL_DOCUMENTATION.md`
- **Purpose**: Comprehensive technical guide
- **Content**:
  - Detailed architecture documentation
  - API reference
  - Implementation details
  - Performance analysis
  - Security considerations

### `DEVELOPMENT.md`
- **Purpose**: Development and contribution guide
- **Content**:
  - Development setup instructions
  - Coding standards
  - Testing guidelines
  - Feature development workflow
  - Release process

### `CONTRIBUTING.md`
- **Purpose**: Community contribution guidelines
- **Content**:
  - Code of conduct
  - Contribution workflow
  - Issue reporting
  - Pull request process
  - Community guidelines

### `SECURITY.md`
- **Purpose**: Security policy and vulnerability reporting
- **Content**:
  - Vulnerability reporting process
  - Security best practices
  - Bug bounty program
  - Security team contacts
  - Responsible disclosure

### `CHANGELOG.md`
- **Purpose**: Version history and changes
- **Content**:
  - Version history
  - Feature additions
  - Bug fixes
  - Breaking changes
  - Migration guides

### `CODE_OF_CONDUCT.md`
- **Purpose**: Community behavior guidelines
- **Content**:
  - Community standards
  - Enforcement procedures
  - Reporting mechanisms
  - Inclusive environment guidelines

## Test Files

### `test-scan.js`
- **Purpose**: Scan functionality testing
- **Features**:
  - Static analysis testing
  - Canister analysis testing
  - Output format testing
  - Error handling testing

### `test-ic.js`
- **Purpose**: ICP integration testing
- **Features**:
  - dfx setup testing
  - Canister deployment testing
  - Method calling testing
  - Error handling testing

## Build and Deployment

### Global Installation
The project is designed to be installed globally via npm:
```bash
npm install -g chainrivals-cli
```

### Development Installation
For development, the project can be cloned and linked:
```bash
git clone <repository>
cd chainrivals-cli
npm install
npm link
```

### Binary Configuration
The `package.json` includes binary configuration:
```json
{
  "bin": {
    "chainrivals": "cli/index.js"
  }
}
```

This allows the CLI to be invoked as `chainrivals` after global installation.

## File Naming Conventions

- **Directories**: Lowercase with hyphens for multi-word names
- **JavaScript Files**: camelCase for variables and functions, PascalCase for classes
- **Motoko Files**: snake_case for functions and variables
- **Configuration Files**: lowercase with appropriate extensions
- **Documentation**: UPPERCASE with descriptive names

## Module Dependencies

```
cli/index.js
├── cli/scan.js
├── cli/ic.js
├── analyzers/icp.js
├── analyzers/eth.js
├── analyzers/solana.js
└── ai-explainer/index.js

cli/scan.js
├── analyzers/icp.js
├── analyzers/eth.js
├── analyzers/solana.js
├── ai-explainer/index.js
└── cli/ic.js

cli/ic.js
└── (external: dfx, execa, fs-extra)
```

## Security Considerations

- **Input Validation**: All user inputs are validated
- **Output Sanitization**: All outputs are properly encoded
- **Error Handling**: Secure error handling without information disclosure
- **Dependency Management**: Regular security updates for dependencies
- **Code Review**: Security-focused code reviews for all contributions

---

This structure provides a solid foundation for a world-class security analysis tool with clear separation of concerns, comprehensive documentation, and scalable architecture. 