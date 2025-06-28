# ChainRivals

ChainRivals is a cross-chain smart contract security toolset focused on ICP, Ethereum, and Solana smart contracts. It helps developers catch vulnerabilities early, understand them better, and secure decentralized applications across ecosystems.

The CLI is tool that has been created to come closer to you and make it easier to use the ChainRivals toolset. It is a command-line interface that allows you to interact with the ChainRivals AI toolset in a more user-friendly way and create a pipeline to our web3 Bug Bounty Program (chainrivals.xyz)

## Installation

```bash
npm install -g chainrivals


### Repository Structure

```bash
chainrivals_cli/
├── cli/
│   ├── index.js
│   ├── scan.js
├── analyzers/
│   ├── icp.js
│   ├── eth.js
│   ├── solana.js
├── ai-explainer/
│   ├── index.js
├── examples/
│   ├── example.mo
│   ├── example.sol
├── docs/
│   ├── README.md
├── package.json
├── .gitignore
└── README.md
```

### `package.json`

### `cli/index.js`

### `cli/scan.js`

### `analyzers/icp.js`

### `analyzers/eth.js`

### `analyzers/solana.js`

### `ai-explainer/index.js`


### Dependencies Setup

Run the following commands to set up your project:

```bash
npm init -y
npm install commander axios
chmod +x cli/index.js
npm link
```

### Usage Example

```bash
chainrivals scan --target ./examples/example.mo --chain icp --output json --explain
```


```bash
npm install -g chainrivals
```

## Usage

```bash
chainrivals scan --target ./path/to/contract.mo --chain icp
```

## Development

Feel free to contribute! Fork the repo, make changes, and submit a PR.

## License

MIT License



This foundation provides a basic implementation of the ChainRivals structure and logic. You would need to expand significantly, especially on the specific analysis and AI explainer logic, as well as implement thorough testing.