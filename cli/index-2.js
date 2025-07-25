﻿#!/usr/bin/env node

require("dotenv").config();
const { program } = require("commander");
const { runScan } = require("./scan.js");
const { ICPManager } = require("./ic.js");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

program
  .name("chainrivals-cli")
  .description("ChainRivals CLI: Scan smart contract files for vulnerabilities across ICP, EVM, and Solana, get AI-powered explanations for findings, and submit smart contracts as bounties to the web3 bug bounty platform https://www.chainrivals.xyz/.")
  .version("1.1.0");

program
  .command("scan")
  .description("Scan a smart contract file for vulnerabilities using static analysis and optionally get AI explanations for each finding.")
  .requiredOption("--target <path>", "Path to the smart contract file you want to scan (e.g., ./contracts/MyContract.mo)")
  .requiredOption("--chain <chain>", "Target blockchain for analysis. Supported values: icp, eth, solana")
  .option("--output <format>", "Output format: json (machine-readable), md (Markdown), or cli (plain text, default)", "cli")
  .option("--explain", "Enable AI module to provide detailed explanations for each vulnerability found", false)
  .option("--export <path>", "Export output to a file (e.g., result.md)")
  .option("--use-canister", "Use ICP canister for analysis (only works with --chain icp)", false)
  .action(runScan);

program
  .command("submit-bounty")
  .description("Package a smart contract file and submit it to https://www.chainrivals.xyz/ as a bug bounty")
  .requiredOption("--target <path>", "Path to the smart contract file you want to submit")
  .requiredOption("--chain <chain>", "Target blockchain for the contract. Supported values: icp, eth, solana")
  .requiredOption("--title <title>", "Title for your bounty submission")
  .requiredOption("--description <desc>", "Description of the contract and what you want reviewed")
  .action(async (cmd) => {
    const { target, chain, title, description } = cmd;
    const filePath = path.resolve(process.cwd(), target);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    const form = new FormData();
    form.append("chain", chain);
    form.append("title", title);
    form.append("description", description);
    form.append("contract", fs.createReadStream(filePath));

    try {
      const response = await axios.post(
        "https://www.chainrivals.xyz/api/bounties/submit",
        form,
        { headers: form.getHeaders() }
      );
      console.log("Bounty submitted successfully!");
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Failed to submit bounty:", err.response?.data || err.message);
      process.exit(1);
    }
  });

// ICP Commands
const icpManager = new ICPManager();

program
  .command("ic")
  .description("Internet Computer (ICP) backend management commands");

program
  .command("ic:init")
  .description("Initialize dfx setup for ICP backend")
  .action(async () => {
    await icpManager.init();
  });

program
  .command("ic:deploy")
  .description("Deploy the ICP backend canister")
  .action(async () => {
    await icpManager.deploy();
  });

program
  .command("ic:call")
  .description("Call a method on the deployed canister")
  .argument("<method>", "Method name to call (e.g., analyze_code, get_info, health)")
  .argument("[args...]", "Arguments to pass to the method")
  .action(async (method, args) => {
    await icpManager.call(method, args);
  });

program.addHelpText("after", `
Examples:
  $ chainrivals scan --target ./contracts/MyContract.mo --chain icp
  $ chainrivals scan --target ./contracts/MyContract.mo --chain icp --use-canister
  $ chainrivals scan --target ./contracts/MyContract.sol --chain eth --output json --explain --export result.json
  $ chainrivals submit-bounty --target ./contracts/MyContract.sol --chain eth --title "My Smart Contract Bounty" --description "Please review for vulnerabilities."
  
ICP Commands:
  $ chainrivals ic:init                    # Initialize dfx setup
  $ chainrivals ic:deploy                  # Deploy the ICP backend canister
  $ chainrivals ic:call analyze_code "code" # Call analyze_code method
  $ chainrivals ic:call get_info           # Get canister info
  $ chainrivals ic:call health             # Health check

Environment Variables:
  OPENAI_ENDPOINT   Azure OpenAI endpoint for AI explanations (required if --explain is used)
  OPENAI_KEY        Azure OpenAI API key (required if --explain is used)
`);

program.parse(process.argv);
