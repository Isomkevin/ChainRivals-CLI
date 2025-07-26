# ChainRivals CLI 🛡️

> **World-Class Cross-Chain Smart Contract Security Analysis Tool**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![dfx](https://img.shields.io/badge/dfx-0.15+-blue.svg)](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
[![ChainRivals](https://img.shields.io/badge/ChainRivals-Platform-orange.svg)](https://chainrivals.xyz)

**ChainRivals CLI** is a cutting-edge, cross-chain smart contract security analysis tool that integrates with the Internet Computer (ICP) blockchain through dfx. It provides both static analysis and canister-based analysis capabilities, making it the ultimate tool for securing decentralized applications across multiple blockchain ecosystems.

## 🌟 **Key Features**

### 🔍 **Multi-Chain Security Analysis**

- **ICP/Motoko**: Advanced canister-based analysis with dfx integration
- **Ethereum/Solidity**: Comprehensive EVM contract scanning
- **Solana/Rust**: Rust-based program analysis

### 🚀 **ICP Canister Integration**

- **Deployable Motoko Canister**: On-chain security analysis
- **Real-time Analysis**: Live vulnerability detection
- **Fallback Mechanisms**: Graceful degradation to static analysis

### 🤖 **AI-Powered Insights**

- **Context-Aware Explanations**: Understand vulnerabilities deeply
- **Remediation Suggestions**: Get actionable security advice
- **Severity Scoring**: Prioritize security fixes effectively

### 📊 **Multiple Output Formats**

- **CLI**: Human-readable terminal output
- **JSON**: Machine-readable for CI/CD integration
- **Markdown**: Professional reports for documentation

### 🔗 **Bug Bounty Integration**

- **Direct Submission**: Submit contracts to [ChainRivals Platform](https://chainrivals.xyz) for Bug Bounty Challenge Campaigns
- **Automated Workflow**: Streamlined security review process
- **Community-Driven**: Leverage crowdsourced security expertise

## 🚀 **Quick Start**

### Prerequisites

- **Node.js** (v16 or higher)
- **dfx** (for ICP integration) - [Install Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install/)

### Installation

```bash
# Install globally from npm (recommended)
npm install -g chainrivals-cli

# Or clone the repository and link for development
# git clone https://github.com/LESOM-Dynamics/ChainRivals-CLI
# cd chainrivals-cli
# npm install
# npm link
```

### Basic Usage

```bash
# Static analysis of a Motoko contract
chainrivals scan --target examples/test-contract.mo --chain icp

# Enhanced analysis with ICP canister
chainrivals scan --target examples/test-contract.mo --chain icp --use-canister

# With AI explanations
chainrivals scan --target examples/test-contract.mo --chain icp --explain

# Export to JSON for CI/CD
chainrivals scan --target examples/test-contract.mo --chain icp --output json --export results.json
```

## 📖 **Comprehensive Documentation**

- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Complete API reference and architecture guide
- **[ICP Integration Guide](ICP_INTEGRATION.md)** - Detailed ICP backend setup and usage
- **[Development Guide](DEVELOPMENT.md)** - Contributing and extending the tool

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Layer     │    │   Analysis      │    │   ICP Backend   │
│                 │    │   Layer         │    │                 │
│ • Commander.js  │◄──►│ • Static        │◄──►│ • Motoko        │
│ • User Input    │    │   Analyzers     │    │   Canister      │
│ • Output Format │    │ • ICP Manager   │    │ • dfx           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File System   │    │   AI Explainer  │    │   ChainRivals   │
│                 │    │                 │    │   Platform      │
│ • Contract      │    │ • OpenAI        │    │ • Bug Bounty    │
│   Files         │    │ • Explanations  │    │ • Submission    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 **Advanced Usage**

### ICP Backend Management

```bash
# Initialize dfx setup
chainrivals ic:init

# Deploy the canister
chainrivals ic:deploy

# Call canister methods directly
chainrivals ic:call analyze_code "public func test() {}"
chainrivals ic:call get_info
chainrivals ic:call health
```

### Multi-Format Analysis

```bash
# CLI output (default)
chainrivals scan --target contract.mo --chain icp

# JSON output for automation
chainrivals scan --target contract.mo --chain icp --output json

# Markdown report
chainrivals scan --target contract.mo --chain icp --output md --export report.md
```

### Bug Bounty Submission

```bash
chainrivals submit-bounty \
  --target examples/test-contract.mo \
  --chain icp \
  --title "Security Review Request" \
  --description "Please review this contract for vulnerabilities"
```

## 📊 **Performance Benchmarks**

| Contract Size | Static Analysis | Canister Analysis | Memory Usage |
|---------------|----------------|-------------------|--------------|
| < 100 lines   | ~50ms          | ~150ms           | ~20MB        |
| 100-500 lines | ~200ms         | ~300ms           | ~30MB        |
| > 500 lines   | ~500ms         | ~600ms           | ~50MB        |

## 🛡️ **Security Features**

### Vulnerability Detection

- **Access Control Issues**: Public methods without guards
- **State Management**: Missing post-upgrade hooks
- **Loop Vulnerabilities**: Dynamic termination conditions
- **Caller Validation**: Manual authentication patterns
- **Resource Management**: Memory and cycle optimization

### Analysis Modes

1. **Static Analysis**: Fast, local pattern matching
2. **Canister Analysis**: Advanced on-chain analysis
3. **AI-Enhanced**: Context-aware explanations
4. **Hybrid Mode**: Best of both worlds with fallback

## 🔄 **CI/CD Integration**

### GitHub Actions Example

```yaml
name: Security Analysis
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: chainrivals scan --target contracts/ --chain icp --output json --export security-report.json
      
      - name: Upload Security Report
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: security-report.json
```

## 🤝 **Contributing**

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone
git clone https://github.com/LESOM-Dynamics/ChainRivals-CLI
cd chainrivals-cli

# Install dependencies
npm install

# Run tests
npm run test:scan
npm run test:integration

# Make changes and submit PR
```

## 📈 **Roadmap**

### Phase 1 (Current) ✅

- [x] Basic static analysis
- [x] ICP canister integration
- [x] Multi-format output
- [x] AI explanations

### Phase 2 (Next) 🔄

- [ ] Advanced vulnerability detection
- [ ] CI/CD integration snippets
- [ ] Plugin architecture
- [ ] Multi-chain canisters

### Phase 3 (Future) 📋

- [ ] Machine learning integration
- [ ] Real-time monitoring
- [ ] Automated remediation
- [ ] Enterprise features

## 🏆 **Why ChainRivals CLI?**

### **For Developers**

- **Early Detection**: Catch vulnerabilities before deployment
- **Learning Tool**: Understand security concepts through AI explanations
- **Workflow Integration**: Seamless CLI experience

### **For Teams**

- **Consistent Analysis**: Standardized security checks across projects
- **CI/CD Ready**: Automated security scanning in pipelines
- **Documentation**: Professional reports for stakeholders

### **For Organizations**

- **Multi-Chain Support**: Single tool for multiple blockchain ecosystems
- **Scalable**: From local development to enterprise deployment
- **Community-Driven**: Leverage ChainRivals platform expertise

## 📞 **Support & Community**

- **Documentation**: [Technical Docs](TECHNICAL_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/LESOM-Dynamics/ChainRivals-CLI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LESOM-Dynamics/ChainRivals-CLI/discussions)
- **Platform**: [ChainRivals.xyz](https://chainrivals.xyz)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Internet Computer Foundation** for dfx and Motoko
- **ChainRivals Platform** for bug bounty integration
- **OpenAI** for AI-powered explanations
- **Community Contributors** for feedback and improvements

---

**Made with ❤️ by the ChainRivals Team**

*Securing the future of Web3, one contract at a time.*
