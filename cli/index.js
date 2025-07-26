#!/usr/bin/env node
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
  .description("ChainRivals CLI: Scan smart contract files for vulnerabilities across ICP, EVM, and Solana")
  .version("1.1.0");

program
  .command("scan")
  .description("Scan a smart contract file for vulnerabilities")
  .requiredOption("--target <path>", "Path to the smart contract file")
  .requiredOption("--chain <chain>", "Target blockchain: icp, eth, solana")
  .option("--output <format>", "Output format: json, md, cli", "cli")
  .option("--explain", "Enable AI explanations", false)
  .option("--export <path>", "Export output to file")
  .option("--use-canister", "Use ICP canister for analysis", false)
  .action(runScan);

program
  .command("submit-bounty")
  .description("Submit contract as bug bounty")
  .requiredOption("--target <path>", "Path to contract file")
  .requiredOption("--chain <chain>", "Target blockchain")
  .requiredOption("--title <title>", "Bounty title")
  .requiredOption("--description <desc>", "Bounty description")
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
  .command("ic:init")
  .description("Initialize dfx setup")
  .action(async () => {
    await icpManager.init();
  });

program
  .command("ic:deploy")
  .description("Deploy ICP canister")
  .action(async () => {
    await icpManager.deploy();
  });

program
  .command("ic:call")
  .description("Call canister method")
  .argument("<method>", "Method name")
  .argument("[args...]", "Arguments")
  .action(async (method, args) => {
    await icpManager.call(method, args);
  });

program.addHelpText("after", `
Examples:
  $ chainrivals scan --target ./contracts/MyContract.mo --chain icp
  $ chainrivals scan --target ./contracts/MyContract.mo --chain icp --use-canister
  $ chainrivals ic:init
  $ chainrivals ic:deploy
  $ chainrivals ic:call analyze_code "public func test() {}"
`);

program.parse(process.argv);
