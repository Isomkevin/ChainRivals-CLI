const path = require("path");
const fs = require("fs");
const icpAnalyzer = require("../analyzers/icp");
const ethAnalyzer = require("../analyzers/eth");
const solanaAnalyzer = require("../analyzers/solana");
const aiExplainer = require("../ai-explainer");
const { ICPManager } = require("./ic.js");

const analyzers = {
  icp: icpAnalyzer,
  eth: ethAnalyzer,
  solana: solanaAnalyzer,
};

async function runScan(cmd) {
  const { target, chain, output, explain, export: exportPath, useCanister } = cmd;
  const analyzer = analyzers[chain];

  if (!analyzer) {
    console.error(`Unsupported chain: ${chain}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(path.resolve(target), "utf-8");
  
  let results;
  
  // Use ICP canister for analysis if specified and chain is ICP
  if (useCanister && chain === "icp") {
    console.log(" Using ICP canister for analysis...");
    try {
      const icpManager = new ICPManager();
      const canisterResult = await icpManager.analyzeCode(fileContent);
      
      // Convert canister result to standard format
      results = [{
        severity: "INFO",
        message: "ICP Canister Analysis",
        location: "Canister: ic_backend",
        explanation: canisterResult
      }];
    } catch (error) {
      console.log("  Canister analysis failed, falling back to static analysis...");
      console.log("   Error:", error.message);
      results = analyzer.analyze(fileContent);
    }
  } else {
    // Use traditional static analysis
    results = analyzer.analyze(fileContent);
  }

  if (explain && !useCanister) {
    for (let result of results) {
      result.explanation = await aiExplainer.explain(result);
    }
  }

  printResults(results, output, exportPath);
}

function printResults(results, format, exportPath) {
  let outputStr = "";
  switch (format) {
    case "json":
      outputStr = JSON.stringify(results, null, 2);
      break;
    case "md":
      outputStr = results
        .map(
          r => [
            `---`,
            `### Severity: **${r.severity}**`,
            `**Message:** ${r.message}`,
            `**Location:** \`${r.location}\``,
            r.explanation
              ? `\n**Explanation:**\n\n${r.explanation.trim()}`
              : ""
          ].join("\n")
        )
        .join("\n\n");
      break;
    default:
      outputStr = results
        .map(
          r => [
            `------------------------------`,
            `Severity : ${r.severity}`,
            `Message  : ${r.message}`,
            `Location : ${r.location}`,
            r.explanation
              ? `\nExplanation:\n${r.explanation.trim()}`
              : ""
          ].join("\n")
        )
        .join("\n\n");
      break;
  }

  if (exportPath) {
    fs.writeFileSync(exportPath, outputStr, "utf-8");
    console.log(`Results exported to ${exportPath}`);
  } else {
    console.log(outputStr);
  }
}

module.exports = { runScan };
