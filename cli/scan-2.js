const path = require('path');
const fs = require('fs');
const icpAnalyzer = require('../analyzers/icp');
const ethAnalyzer = require('../analyzers/eth');
const solanaAnalyzer = require('../analyzers/solana');
const aiExplainer = require('../ai-explainer');

const analyzers = {
  icp: icpAnalyzer,
  eth: ethAnalyzer,
  solana: solanaAnalyzer,
};

async function runScan(cmd) {
  const { target, chain, output, explain } = cmd;
  const analyzer = analyzers[chain];

  if (!analyzer) {
    console.error(`Unsupported chain: ${chain}`);
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), target);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  console.log(`Analyzing ${target} for ${chain}...`);
  const results = analyzer.analyze(fileContent);

  if (explain) {
    for (let result of results) {
      result.explanation = await aiExplainer.explain(result);
    }
  }

  printResults(results, output);
}

function printResults(results, format) {
  switch (format) {
    case 'json':
      console.log(JSON.stringify(results, null, 2));
      break;
    case 'md':
      results.forEach(result => {
        console.log(`### [${result.severity}] ${result.message}`);
        console.log(`- Location: ${result.location}`);
        if (result.explanation) {
          console.log(`- Explanation: ${result.explanation}`);
        }
        console.log();
      });
      break;
    default:
      results.forEach(result => {
        console.log(`[${result.severity}] ${result.message} at ${result.location}`);
        if (result.explanation) {
          console.log(`Explanation: ${result.explanation}`);
        }
        console.log();
      });
      break;
  }
}

module.exports = { runScan };