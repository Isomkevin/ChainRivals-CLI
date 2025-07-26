# Changelog

All notable changes to ChainRivals CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced vulnerability detection patterns
- Improved error handling and user feedback
- Additional test coverage for edge cases

### Changed
- Updated dependencies to latest versions
- Improved documentation and examples

### Fixed
- Minor bug fixes and performance improvements

## [1.1.0] - 2025-07-26

### Added
- **ICP Canister Integration**: Full dfx integration with deployable Motoko canister
- **Enhanced Scan Command**: New `--use-canister` option for ICP analysis
- **ICP Backend Management**: `ic:init`, `ic:deploy`, and `ic:call` commands
- **Fallback Mechanisms**: Graceful degradation when canister unavailable
- **Comprehensive Documentation**: Technical documentation and development guides
- **Test Scripts**: `test-ic.js` and `test-scan.js` for integration testing
- **Example Contracts**: Test contracts for different blockchain platforms

### Changed
- **Improved CLI Structure**: Better command organization with colon-separated commands
- **Enhanced Error Handling**: More informative error messages and fallback options
- **Updated Dependencies**: Added `execa` and `fs-extra` for better process management
- **Documentation Overhaul**: Complete rewrite of README and technical documentation

### Fixed
- **PowerShell Encoding Issues**: Resolved file encoding problems in Windows environment
- **Commander.js Syntax**: Fixed command group syntax for proper CLI functionality
- **File Path Handling**: Improved cross-platform file path management
- **Module Import Issues**: Resolved dependency and import path problems

### Technical Details
- **ICP Manager Class**: Complete implementation with init, deploy, call, and analyzeCode methods
- **Motoko Canister**: Security analysis canister with analyze_code, get_info, and health methods
- **Candid Interface**: Proper interface definition for canister methods
- **dfx Configuration**: Complete dfx.json setup for local development

## [1.0.0] - 2025-07-25

### Added
- **Initial Release**: Basic CLI framework with Commander.js
- **Multi-Chain Support**: ICP, Ethereum, and Solana contract analysis
- **Static Analysis**: Pattern-based vulnerability detection
- **AI Integration**: OpenAI-powered vulnerability explanations
- **Multiple Output Formats**: CLI, JSON, and Markdown output
- **Bug Bounty Integration**: Direct submission to ChainRivals platform
- **Basic Analyzers**: Initial implementations for ICP, ETH, and Solana

### Features
- **Scan Command**: Core vulnerability scanning functionality
- **Submit Bounty**: Contract submission to bug bounty platform
- **AI Explanations**: Context-aware vulnerability explanations
- **Export Options**: File export in multiple formats
- **Cross-Platform Support**: Windows, macOS, and Linux compatibility

### Technical Implementation
- **Modular Architecture**: Separated analyzers, CLI, and AI components
- **Error Handling**: Basic error management and user feedback
- **Configuration**: Environment variable support for API keys
- **Documentation**: Initial README and basic documentation

## [0.9.0] - 2025-07-20

### Added
- **Project Foundation**: Initial project structure and setup
- **Basic CLI Framework**: Commander.js integration
- **Package Configuration**: npm setup with dependencies
- **Git Repository**: Version control setup with .gitignore

### Development
- **Code Structure**: Organized directory structure
- **Dependencies**: Core Node.js packages (commander, axios, dotenv)
- **Basic Documentation**: Initial project description

---

## Version History Summary

| Version | Date | Major Features | Status |
|---------|------|----------------|--------|
| 1.1.0 | 2025-07-26 | ICP Canister Integration | ✅ Released |
| 1.0.0 | 2025-07-25 | Initial Release | ✅ Released |
| 0.9.0 | 2025-07-20 | Project Foundation | ✅ Released |

## Migration Guide

### Upgrading from 1.0.0 to 1.1.0

1. **Install New Dependencies:**
```bash
npm install
```

2. **Initialize ICP Backend (Optional):**
```bash
node cli/index.js ic:init
```

3. **Update Usage (Optional):**
```bash
# New canister-based analysis
node cli/index.js scan --target contract.mo --chain icp --use-canister

# New ICP commands
node cli/index.js ic:init
node cli/index.js ic:deploy
node cli/index.js ic:call analyze_code "code"
```

### Breaking Changes

- **None**: All changes are backward compatible

### Deprecations

- **None**: No features have been deprecated

## Contributing to Changelog

When contributing to the project, please update this changelog by adding an entry under the [Unreleased] section. Follow the existing format and include:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

## Release Process

1. **Update Version:**
```bash
npm version patch|minor|major
```

2. **Update Changelog:**
- Move [Unreleased] content to new version
- Add release date
- Update version history table

3. **Create Release:**
```bash
git tag v1.1.0
git push origin v1.1.0
```

---

**For detailed technical information, see [Technical Documentation](TECHNICAL_DOCUMENTATION.md).** 